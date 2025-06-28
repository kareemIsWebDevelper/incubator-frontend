"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  MenuItem,
  Switch,
  FormControlLabel,
  Slider,
  Typography,
  Box,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  object,
  string,
  pipe,
  nonEmpty,
  minLength,
  maxLength,
  boolean,
  number,
  optional,
  union,
  literal,
} from "valibot";
import type { SubmitHandler } from "react-hook-form";
import type { InferInput } from "valibot";

// Component Imports
import CustomTextField from "@/@core/components/mui/TextField";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";

// Types
import { QuestionType } from "@/types/surveyTypes";

// Define the form schema
const questionSchema = object({
  text: pipe(
    string(),
    nonEmpty("Question text is required"),
    minLength(10, "Question text must be at least 10 characters"),
    maxLength(500, "Question text must not exceed 500 characters")
  ),
  type: pipe(
    string(),
    nonEmpty("Question type is required")
  ),
  required: boolean(),
  maxRating: optional(number()),
});

type QuestionFormInputs = InferInput<typeof questionSchema>;

// Default form values
const defaultValues: QuestionFormInputs = {
  text: "",
  type: "question-answer",
  required: false,
  maxRating: 5,
};

interface QuestionFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (question: Partial<QuestionType>) => void;
  question?: QuestionType | null;
  mode?: "add" | "edit";
}

const QuestionFormDialog = ({
  open,
  onClose,
  onSubmit,
  question,
  mode = "add",
}: QuestionFormDialogProps) => {
  // Initialize form with valibot resolver
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<QuestionFormInputs>({
    defaultValues,
    resolver: valibotResolver(questionSchema),
  });

  const watchType = watch("type");

  // Reset form when dialog opens or question data changes
  useEffect(() => {
    if (open) {
      if (question && mode === "edit") {
        reset({
          text: question.text,
          type: question.type,
          required: question.required || false,
          maxRating: question.maxRating || 5,
        });
      } else {
        reset(defaultValues);
      }
    }
  }, [open, question, mode, reset]);

  // Form submission handler
  const onFormSubmit: SubmitHandler<QuestionFormInputs> = (data) => {
    const questionData: Partial<QuestionType> = {
      ...data,
      type: data.type as "star-rating" | "yes-no" | "question-answer",
      id: question?.id || `q-${Date.now()}`,
      ...(data.type === "star-rating" && { maxRating: data.maxRating }),
    };
    
    onSubmit(questionData);
    handleClose();
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  const dialogTitle = mode === "edit" ? "Edit Question" : "Add New Question";

  // Question type options
  const questionTypes = [
    {
      value: "star-rating",
      label: "Star Rating",
      icon: "tabler-star",
      description: "Rate with stars (1-5 scale)"
    },
    {
      value: "yes-no",
      label: "Yes/No",
      icon: "tabler-check-x",
      description: "Simple yes or no answer"
    },
    {
      value: "question-answer",
      label: "Text Answer",
      icon: "tabler-message-question",
      description: "Open-ended text response"
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      aria-labelledby="question-dialog-title"
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      
      <DialogTitle id="question-dialog-title">{dialogTitle}</DialogTitle>
      
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent sx={{ overflowY: "auto", flex: "1 1 auto", pb: 2 }}>
          <Grid container spacing={5}>
            {/* Question Text */}
            <Grid item xs={12}>
              <Controller
                name="text"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    multiline
                    rows={3}
                    label="Question Text"
                    placeholder="Enter your question text here..."
                    error={!!errors.text}
                    helperText={errors.text?.message}
                  />
                )}
              />
            </Grid>

            {/* Question Type */}
            <Grid item xs={12}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Question Type"
                    placeholder="Select question type"
                    error={!!errors.type}
                    helperText={errors.type?.message}
                  >
                    {questionTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <i className={`${type.icon} text-lg`} />
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {type.label}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {type.description}
                            </Typography>
                          </Box>
                        </Box>
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            {/* Max Rating (only for star-rating type) */}
            {watchType === "star-rating" && (
              <Grid item xs={12}>
                <Typography variant="body2" gutterBottom>
                  Maximum Rating
                </Typography>
                <Controller
                  name="maxRating"
                  control={control}
                  render={({ field }) => (
                    <Box sx={{ px: 2 }}>
                      <Slider
                        {...field}
                        value={field.value || 5}
                        onChange={(_, value) => field.onChange(value)}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={3}
                        max={10}
                        sx={{ mb: 2 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Users will rate from 1 to {field.value || 5} stars
                      </Typography>
                    </Box>
                  )}
                />
              </Grid>
            )}

            {/* Required Toggle */}
            <Grid item xs={12}>
              <Controller
                name="required"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={field.value}
                        onChange={field.onChange}
                        color="primary"
                      />
                    }
                    label="Required Question"
                  />
                )}
              />
              <Typography variant="caption" color="text.secondary" display="block">
                Users must answer this question to submit the survey
              </Typography>
            </Grid>

            {/* Preview Section */}
            <Grid item xs={12}>
              <Box
                sx={{
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  backgroundColor: "background.paper",
                }}
              >
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Preview:
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Typography variant="body1" fontWeight="medium">
                    {watch("text") || "Your question will appear here..."}
                  </Typography>
                  {watch("required") && (
                    <Typography variant="body2" color="error">
                      *
                    </Typography>
                  )}
                </Box>
                
                {/* Question Type Preview */}
                {watchType === "star-rating" && (
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    {Array.from({ length: watch("maxRating") || 5 }).map((_, index) => (
                      <i key={index} className="tabler-star text-gray-300" />
                    ))}
                  </Box>
                )}
                
                {watchType === "yes-no" && (
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button variant="outlined" size="small" disabled>
                      Yes
                    </Button>
                    <Button variant="outlined" size="small" disabled>
                      No
                    </Button>
                  </Box>
                )}
                
                {watchType === "question-answer" && (
                  <CustomTextField
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Text answer will be entered here..."
                    disabled
                    size="small"
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions className="gap-2">
          <Button variant="text" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : mode === "edit" ? "Update Question" : "Add Question"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default QuestionFormDialog;
