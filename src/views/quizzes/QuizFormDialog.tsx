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
  Typography,
  Switch,
  FormControlLabel,
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
  number,
  minValue,
  maxValue,
  optional,
  boolean,
} from "valibot";
import type { SubmitHandler } from "react-hook-form";
import type { InferInput } from "valibot";

// Component Imports
import CustomTextField from "@/@core/components/mui/TextField";
import CustomDatePicker from "@/@core/components/mui/DatePicker";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";

// Types
import { QuizType } from "@/types/quizTypes";

// Mock data
import { mockOrganizations, mockPrograms } from "@/fake-db/pages/surveys";
import moment from "moment";

// Define the form schema
const quizSchema = object({
  title: pipe(
    string(),
    nonEmpty("Title is required"),
    minLength(3, "Title must be at least 3 characters"),
    maxLength(100, "Title must not exceed 100 characters")
  ),
  description: optional(string()),
  organizationId: pipe(string(), nonEmpty("Organization is required")),
  programId: pipe(string(), nonEmpty("Program is required")),
  startDate: pipe(string(), nonEmpty("Start date is required")),
  endDate: pipe(string(), nonEmpty("End date is required")),
  passPercentage: pipe(
    number(),
    minValue(0, "Pass percentage must be at least 0"),
    maxValue(100, "Pass percentage must not exceed 100")
  ),
  status: pipe(string(), nonEmpty("Status is required")),
  duration: optional(number()),
  attempts: optional(
    pipe(
      number(),
      minValue(1, "Attempts must be at least 1"),
      maxValue(10, "Attempts must not exceed 10")
    )
  ),
  shuffleQuestions: optional(boolean()),
});

// Infer the form type from the schema
type QuizFormInputs = InferInput<typeof quizSchema>;

// Default form values
const defaultValues: QuizFormInputs = {
  title: "",
  description: "",
  organizationId: "",
  programId: "",
  startDate: "",
  endDate: "",
  passPercentage: 70,
  status: "draft",
  duration: 60,
  attempts: 3,
  shuffleQuestions: true,
};

interface QuizFormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (quiz: Partial<QuizType>) => void;
  quiz?: QuizType | null;
  mode?: "add" | "edit";
}

const QuizFormDialog = ({
  open,
  setOpen,
  onSubmit,
  quiz,
  mode = "add",
}: QuizFormDialogProps) => {
  // Initialize form with valibot resolver
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuizFormInputs>({
    resolver: valibotResolver(quizSchema),
    defaultValues,
  });

  // Reset form when dialog opens/closes or when quiz changes
  useEffect(() => {
    if (open && quiz && mode === "edit") {
      reset({
        title: quiz.title || "",
        description: quiz.description || "",
        organizationId: quiz.organization?.id || "",
        programId: quiz.program?.id || "",
        startDate: moment(quiz.startDate).format("YYYY-MM-DD"),
        endDate: moment(quiz.endDate).format("YYYY-MM-DD"),
        passPercentage: quiz.passPercentage || 70,
        status: quiz.status || "draft",
        duration: quiz.duration || 60,
        attempts: quiz.attempts || 3,
        shuffleQuestions:
          quiz.shuffleQuestions !== undefined ? quiz.shuffleQuestions : true,
      });
    } else if (open && mode === "add") {
      reset(defaultValues);
    } else if (!open) {
      // Reset form when dialog closes to clear any errors
      reset(defaultValues);
    }
  }, [open, quiz, mode, reset]);

  // Handle form submission
  const handleFormSubmit: SubmitHandler<QuizFormInputs> = (data) => {
    try {
      const selectedOrganization = mockOrganizations.find(
        (org) => org.id === data.organizationId
      );
      const selectedProgram = mockPrograms.find(
        (prog) => prog.id === data.programId
      );

      if (!selectedOrganization) {
        console.error("Selected organization not found");
        return;
      }

      if (!selectedProgram) {
        console.error("Selected program not found");
        return;
      }

      const quizData: Partial<QuizType> = {
        id: quiz?.id || `quiz-${Date.now()}`,
        title: data.title,
        description: data.description,
        organization: selectedOrganization,
        program: selectedProgram,
        startDate: moment(data.startDate).format("YYYY-MM-DD"),
        endDate: moment(data.endDate).format("YYYY-MM-DD"),
        passPercentage: data.passPercentage,
        status: data.status as "published" | "draft",
        duration: data.duration,
        attempts: data.attempts,
        shuffleQuestions: data.shuffleQuestions,
        participants: quiz?.participants || 0,
        createdAt: quiz?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        totalQuestions: quiz?.totalQuestions || 0,
        averageScore: quiz?.averageScore || 0,
      };

      onSubmit(quizData);
      setOpen(false);
      reset(defaultValues);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle dialog close
  const handleClose = () => {
    setOpen(false);
    // Don't reset here as it's handled in the useEffect
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>

      <DialogTitle>{mode === "add" ? "Add New Quiz" : "Edit Quiz"}</DialogTitle>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent sx={{ pt: 1 }}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Quiz Title"
                    placeholder="Enter quiz title"
                    error={Boolean(errors.title)}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    multiline
                    rows={3}
                    label="Description"
                    placeholder="Enter quiz description"
                    error={Boolean(errors.description)}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="organizationId"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Organization"
                    error={Boolean(errors.organizationId)}
                    helperText={errors.organizationId?.message}
                  >
                    <MenuItem value="">Select Organization</MenuItem>
                    {mockOrganizations.map((org) => (
                      <MenuItem key={org.id} value={org.id}>
                        {org.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="programId"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Program"
                    error={Boolean(errors.programId)}
                    helperText={errors.programId?.message}
                  >
                    <MenuItem value="">Select Program</MenuItem>
                    {mockPrograms.map((program) => (
                      <MenuItem key={program.id} value={program.id}>
                        {program.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <CustomDatePicker
                    {...field}
                    fullWidth
                    label="Start Date"
                    placeholder="Select start date"
                    error={Boolean(errors.startDate)}
                    helperText={errors.startDate?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <CustomDatePicker
                    {...field}
                    fullWidth
                    label="End Date"
                    placeholder="Select end date"
                    error={Boolean(errors.endDate)}
                    helperText={errors.endDate?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="passPercentage"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type="number"
                    label="Pass Percentage"
                    placeholder="70"
                    inputProps={{ min: 0, max: 100 }}
                    error={Boolean(errors.passPercentage)}
                    helperText={errors.passPercentage?.message}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type="number"
                    label="Duration (minutes)"
                    placeholder="60"
                    inputProps={{ min: 1 }}
                    error={Boolean(errors.duration)}
                    helperText={errors.duration?.message}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Status"
                    error={Boolean(errors.status)}
                    helperText={errors.status?.message}
                  >
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="published">Published</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="attempts"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type="number"
                    label="Number of Attempts"
                    placeholder="3"
                    inputProps={{ min: 1, max: 10 }}
                    error={Boolean(errors.attempts)}
                    helperText={errors.attempts?.message}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="shuffleQuestions"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        {...field}
                        checked={field.value || false}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Shuffle Questions"
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="secondary"
            type="reset"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            {mode === "add" ? "Create Quiz" : "Update Quiz"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default QuizFormDialog;
