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
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { object, string, pipe, nonEmpty, minLength, maxLength, forward, check } from "valibot";
import type { SubmitHandler } from "react-hook-form";
import type { InferInput } from "valibot";

// Component Imports
import CustomTextField from "@/@core/components/mui/TextField";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";
import LoadingButton from "@mui/lab/LoadingButton";
import { StepType } from "@/types/stepTypes";

// Define the form schema
const stepSchema = pipe(
  object({
    stepType: pipe(string(), nonEmpty("Step type is required")),
    selectedForm: pipe(string(), nonEmpty("Form selection is required")),
    stepTitle: pipe(
      string(),
      nonEmpty("Step title is required"),
      minLength(3, "Step title must be at least 3 characters"),
      maxLength(100, "Step title must not exceed 100 characters")
    ),
    startDate: pipe(string(), nonEmpty("Start date is required")),
    endDate: pipe(string(), nonEmpty("End date is required")),
    description: pipe(
      string(),
      nonEmpty("Description is required"),
      minLength(10, "Description must be at least 10 characters"),
      maxLength(500, "Description must not exceed 500 characters")
    ),
  }),
  forward(
    check(
      (input) => {
        if (input.startDate && input.endDate) {
          const startDate = new Date(input.startDate);
          const endDate = new Date(input.endDate);
          return endDate > startDate;
        }
        return true;
      },
      "End date must be after start date"
    ),
    ["endDate"]
  )
);

// Create a type based on the schema
type StepFormInputs = InferInput<typeof stepSchema>;

// Default form values
const defaultValues: StepFormInputs = {
  stepType: "",
  selectedForm: "",
  stepTitle: "",
  startDate: "",
  endDate: "",
  description: "",
};

interface StepFormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: StepFormInputs) => void;
  step?: StepType | null;
  mode?: "add" | "edit";
}

// Step type options
const stepTypeOptions = [
  { value: "custom-form", label: "Custom Form" },
  { value: "screening", label: "Screening" },
  { value: "mentorship", label: "Mentorship" },
  { value: "training", label: "Training" },
  { value: "final-evaluation", label: "Final Evaluation" },
];

// Form options
const formOptions = [
  { value: "form1", label: "Form 1" },
  { value: "form2", label: "Form 2" },
  { value: "form3", label: "Form 3" },
];

const StepFormDialog = ({ open, setOpen, onSubmit, step = null, mode = "add" }: StepFormDialogProps) => {
  // Initialize form with valibot resolver
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StepFormInputs>({
    defaultValues,
    resolver: valibotResolver(stepSchema),
  });

  // Reset form when dialog opens or step changes
  useEffect(() => {
    if (open) {
      if (step && mode === "edit") {
        reset({
          stepType: step.stepType || "",
          selectedForm: step.selectedForm || "",
          stepTitle: step.title,
          startDate: step.startDate ? new Date(step.startDate).toISOString().split('T')[0] : "",
          endDate: step.endDate ? new Date(step.endDate).toISOString().split('T')[0] : "",
          description: step.description || "",
        });
      } else {
        reset(defaultValues);
      }
    }
  }, [open, step, mode, reset]);

  // Form submission handler
  const onFormSubmit: SubmitHandler<StepFormInputs> = (data) => {
    onSubmit(data);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    reset(defaultValues);
  };

  const dialogTitle = mode === "edit" ? "Edit Step" : "Add New Step";
  const submitButtonText = mode === "edit" ? "Update Step" : "Create Step";

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      aria-labelledby="step-form-dialog-title"
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>

      <DialogTitle id="step-form-dialog-title">{dialogTitle}</DialogTitle>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent sx={{ overflowY: "auto", flex: "1 1 auto", pb: 2 }}>
          <Grid container spacing={5}>
            {/* Step Type */}
            <Grid item xs={12}>
              <Controller
                name="stepType"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Step Type"
                    placeholder="Select step type"
                    error={!!errors.stepType}
                    helperText={errors.stepType?.message}
                  >
                    {stepTypeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            {/* Select Form */}
            <Grid item xs={12}>
              <Controller
                name="selectedForm"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Select Form"
                    placeholder="Choose a form"
                    error={!!errors.selectedForm}
                    helperText={errors.selectedForm?.message}
                  >
                    {formOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            {/* Step Title */}
            <Grid item xs={12}>
              <Controller
                name="stepTitle"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Step Title"
                    placeholder="Enter step title"
                    error={!!errors.stepTitle}
                    helperText={errors.stepTitle?.message}
                  />
                )}
              />
            </Grid>

            {/* Start Date */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type="date"
                    label="Start Date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.startDate}
                    helperText={errors.startDate?.message}
                  />
                )}
              />
            </Grid>

            {/* End Date */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type="date"
                    label="End Date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.endDate}
                    helperText={errors.endDate?.message}
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
                    placeholder="Enter step description"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions className="mt-6">
          <Button
            variant="text"
            color="secondary"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={isSubmitting}
            disabled={isSubmitting}
            sx={{
              "& .MuiCircularProgress-root": {
                color: "white",
              },
            }}
          >
            {submitButtonText}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StepFormDialog;
