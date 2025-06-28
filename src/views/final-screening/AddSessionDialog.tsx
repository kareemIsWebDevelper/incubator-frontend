"use client";

// React Imports
import React, { useEffect } from "react";

// MUI Imports
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";

// Form Imports
import { Controller, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import type { SubmitHandler } from "react-hook-form";

// Valibot Imports
import {
  object,
  string,
  pipe,
  nonEmpty,
  optional,
} from "valibot";
import type { InferInput } from "valibot";

// Utility Imports
import moment from "moment";

// Component Imports
import CustomTextField from "@core/components/mui/TextField";
import CustomDateTimePicker from "@core/components/mui/DateTimePicker";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";

// Types Imports
import { FinalScreeningStartupType } from "@/types/finalScreeningTypes";

// Form validation schema
const sessionSchema = object({
  preferredDateTime: pipe(
    string(),
    nonEmpty("Please select a preferred date and time")
  ),
  duration: pipe(string(), nonEmpty("Please select session duration")),
  notes: optional(string()),
});

// Create a type based on the schema
type SessionFormInputs = InferInput<typeof sessionSchema>;

interface AddSessionDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (sessionData: SessionFormInputs) => void;
  startup: FinalScreeningStartupType | null;
}

const AddSessionDialog: React.FC<AddSessionDialogProps> = ({
  open,
  onClose,
  onSubmit,
  startup,
}) => {
  // Duration options (30 min to 5 hours)
  const durationOptions = [
    { value: "30", label: "30 minutes" },
    { value: "60", label: "1 hour" },
    { value: "90", label: "1.5 hours" },
    { value: "120", label: "2 hours" },
    { value: "150", label: "2.5 hours" },
    { value: "180", label: "3 hours" },
    { value: "210", label: "3.5 hours" },
    { value: "240", label: "4 hours" },
    { value: "270", label: "4.5 hours" },
    { value: "300", label: "5 hours" },
  ];

  // Default form values
  const defaultValues: SessionFormInputs = {
    preferredDateTime: "",
    duration: "60",
    notes: "",
  };

  // Form setup
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SessionFormInputs>({
    resolver: valibotResolver(sessionSchema),
    defaultValues,
  });

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [open, reset]);

  // Form submission handler
  const onFormSubmit: SubmitHandler<SessionFormInputs> = (data) => {
    onSubmit(data);
    handleClose();
  };

  const handleClose = () => {
    onClose();
    reset(defaultValues);
  };

  // Check if startup has assigned judgers
  const hasAssignedJudgers = startup?.assignedJudgers && startup.assignedJudgers.length > 0;

  // Don't render if startup has no assigned judgers
  if (!hasAssignedJudgers) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      aria-labelledby="add-session-dialog-title"
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>

      <DialogTitle id="add-session-dialog-title">
        Add Evaluation Session
      </DialogTitle>

      {startup && (
        <>
          <DialogContent sx={{ paddingTop: 1 }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Creating session for: <strong>{startup.name}</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Assigned Judgers: {startup.assignedJudgers.join(", ")}
            </Typography>
          </DialogContent>

          <form onSubmit={handleSubmit(onFormSubmit)}>
            <DialogContent sx={{ paddingTop: 0 }}>
              <Grid container spacing={4}>
                {/* Preferred Date & Time */}
                <Grid item xs={12}>
                  <Controller
                    name="preferredDateTime"
                    control={control}
                    render={({ field }) => (
                      <CustomDateTimePicker
                        {...field}
                        label="Preferred Date & Time"
                        placeholder="Select date and time"
                        error={!!errors.preferredDateTime}
                        helperText={errors.preferredDateTime?.message}
                        disablePast
                        fullWidth
                      />
                    )}
                  />
                </Grid>

                {/* Meeting Duration */}
                <Grid item xs={12}>
                  <Controller
                    name="duration"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        select
                        fullWidth
                        label="Meeting Duration"
                        error={!!errors.duration}
                        helperText={errors.duration?.message}
                      >
                        {durationOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                {/* Additional Notes */}
                <Grid item xs={12}>
                  <Controller
                    name="notes"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        multiline
                        rows={3}
                        label="Additional Notes (Optional)"
                        placeholder="Any special requirements or notes for the session..."
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                startIcon={<i className="tabler-calendar-plus" />}
              >
                {isSubmitting ? "Creating..." : "Create Session"}
              </Button>
            </DialogActions>
          </form>
        </>
      )}
    </Dialog>
  );
};

export default AddSessionDialog;
