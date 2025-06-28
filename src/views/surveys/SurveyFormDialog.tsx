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
  Chip,
  Typography,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
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
  array,
  optional,
} from "valibot";
import type { SubmitHandler } from "react-hook-form";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { InferInput } from "valibot";

// Component Imports
import CustomTextField from "@/@core/components/mui/TextField";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";

// Types
import { SurveyType, SurveyFormInputs } from "@/types/surveyTypes";

// Mock data
import { mockOrganizations } from "@/fake-db/pages/surveys";

// Define the form schema
const surveySchema = object({
  title: pipe(
    string(),
    nonEmpty("Title is required"),
    minLength(3, "Title must be at least 3 characters"),
    maxLength(100, "Title must not exceed 100 characters")
  ),
  description: optional(string()),
  organizationId: pipe(string(), nonEmpty("Organization is required")),
  tags: array(string()),
});

// Default form values
const defaultValues: SurveyFormInputs = {
  title: "",
  description: "",
  organizationId: "",
  tags: [],
};

// Sample tags for the tags input
const SAMPLE_TAGS = [
  "customer-satisfaction",
  "product-feedback",
  "market-research",
  "user-experience",
  "business-strategy",
  "innovation",
  "technology",
  "startup",
  "mentorship",
  "training",
];

interface SurveyFormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (survey: Partial<SurveyType>) => void;
  survey?: SurveyType | null;
  mode?: "add" | "edit";
}

const SurveyFormDialog = ({
  open,
  setOpen,
  onSubmit,
  survey,
  mode = "add",
}: SurveyFormDialogProps) => {
  // Initialize form with valibot resolver
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<SurveyFormInputs>({
    defaultValues,
    resolver: valibotResolver(surveySchema),
  });

  // Reset form when dialog opens or survey data changes
  useEffect(() => {
    if (open) {
      if (survey && mode === "edit") {
        reset({
          title: survey.title,
          description: survey.description || "",
          organizationId: survey.organization?.id || "",
          tags: survey.tags || [],
        });
      } else {
        reset(defaultValues);
      }
    }
  }, [open, survey, mode, reset]);

  // Handle tags change
  const handleTagsChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setValue("tags", value);
  };

  // Form submission handler
  const onFormSubmit: SubmitHandler<SurveyFormInputs> = (data) => {
    const selectedOrganization = mockOrganizations.find(
      (org) => org.id === data.organizationId
    );

    const currentDate = new Date().toISOString();
    
    const surveyData: Partial<SurveyType> = {
      ...data,
      organization: selectedOrganization!,
      questions: survey?.questions || [],
      ...(survey && mode === "edit" ? { id: survey.id } : { id: `survey-${Date.now()}` }),
      createdAt: survey?.createdAt || currentDate,
      updatedAt: currentDate,
      totalResponses: survey?.totalResponses || 0,
    };
    
    onSubmit(surveyData);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const dialogTitle = mode === "edit" ? "Edit Survey" : "Create New Survey";

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      aria-labelledby="survey-dialog-title"
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      
      <DialogTitle id="survey-dialog-title">{dialogTitle}</DialogTitle>
      
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent sx={{ overflowY: "auto", flex: "1 1 auto", pb: 2 }}>
          <Grid container spacing={5}>
            {/* Title */}
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Survey Title"
                    placeholder="Enter survey title"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    placeholder="Enter survey description"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            {/* Organization */}
            <Grid item xs={12}>
              <Controller
                name="organizationId"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Organization"
                    placeholder="Select organization"
                    error={!!errors.organizationId}
                    helperText={errors.organizationId?.message}
                  >
                    {mockOrganizations.map((org) => (
                      <MenuItem key={org.id} value={org.id}>
                        {org.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            {/* Tags */}
            <Grid item xs={12} mt={2}>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="tags-label">Tags</InputLabel>
                    <Select
                      labelId="tags-label"
                      multiple
                      value={field.value}
                      onChange={handleTagsChange}
                      input={<OutlinedInput label="Tags" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} size="small" />
                          ))}
                        </Box>
                      )}
                    >
                      {SAMPLE_TAGS.map((tag) => (
                        <MenuItem key={tag} value={tag}>
                          {tag}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            {mode === "edit" && survey && (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Questions: {survey.questions.length} | 
                  Responses: {survey.totalResponses || 0} | 
                  Created: {new Date(survey.createdAt).toLocaleDateString()}
                </Typography>
              </Grid>
            )}
          </Grid>
        </DialogContent>

        <DialogActions className="mt-8">
          <Button variant="text" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : mode === "edit" ? "Update Survey" : "Create Survey"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SurveyFormDialog;
