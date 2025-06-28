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
import {
  object,
  string,
  pipe,
  nonEmpty,
  minLength,
  maxLength,
} from "valibot";
import type { SubmitHandler } from "react-hook-form";
import type { InferInput } from "valibot";
import { mockPrograms, mockUsers } from "@/fake-db/pages/mentorshipSessions";

// Component Imports
import CustomTextField from "@/@core/components/mui/TextField";
import CustomDatePicker from "@/@core/components/mui/DatePicker";
import CustomTimePicker from "@/@core/components/mui/TimePicker";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";

// Define the form schema
const mentorshipSessionSchema = object({
  title: pipe(
    string(),
    nonEmpty("Session title is required"),
    minLength(3, "Title must be at least 3 characters"),
    maxLength(100, "Title must not exceed 100 characters")
  ),
  description: pipe(
    string(),
    maxLength(500, "Description must not exceed 500 characters")
  ),
  programId: pipe(string(), nonEmpty("Program selection is required")),
  mentorId: pipe(string(), nonEmpty("Mentor selection is required")),
  startupOwnerId: pipe(
    string(),
    nonEmpty("Startup owner selection is required")
  ),
  scheduledDate: pipe(string(), nonEmpty("Date is required")),
  scheduledTime: pipe(string(), nonEmpty("Time is required")),
  duration: pipe(string(), nonEmpty("Duration is required")),
  meetingLink: string(),
});

// Create a type based on the schema
type MentorshipSessionFormInputs = InferInput<typeof mentorshipSessionSchema>;

interface MentorshipSessionDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (sessionData: any) => void;
}

const MentorshipSessionDialog: React.FC<MentorshipSessionDialogProps> = ({
  open,
  setOpen,
  onSubmit,
}) => {
  // Duration options
  const durationOptions = [
    { value: "30", label: "30 minutes" },
    { value: "60", label: "60 minutes" },
    { value: "90", label: "90 minutes" },
    { value: "120", label: "120 minutes" },
  ];

  // Default form values
  const defaultValues: MentorshipSessionFormInputs = {
    title: "",
    description: "",
    programId: "",
    mentorId: "",
    startupOwnerId: "",
    scheduledDate: "",
    scheduledTime: "",
    duration: "60",
    meetingLink: "",
  };

  // Form setup
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<MentorshipSessionFormInputs>({
    resolver: valibotResolver(mentorshipSessionSchema),
    defaultValues,
  });

  // Watch for program changes to reset mentor and startup selections
  const selectedProgramId = watch("programId");

  // Reset dependent fields when program changes
  useEffect(() => {
    if (selectedProgramId) {
      setValue("mentorId", "");
      setValue("startupOwnerId", "");
    }
  }, [selectedProgramId, setValue]);

  // Filter users based on selected program and role
  const getAvailableMentors = () => {
    const mentors = mockUsers.filter((user) => user.role === "mentor");
    if (!selectedProgramId) return mentors;
    return mentors.filter((user) =>
      user.programIds.includes(selectedProgramId)
    );
  };

  const getAvailableStartups = () => {
    const startupOwners = mockUsers.filter(
      (user) => user.role === "startup_owner"
    );
    if (!selectedProgramId) return startupOwners;
    return startupOwners.filter((user) =>
      user.programIds.includes(selectedProgramId)
    );
  };

  // Form submission handler
  const onFormSubmit: SubmitHandler<MentorshipSessionFormInputs> = (data) => {
    const scheduledAt = new Date(
      `${data.scheduledDate}T${data.scheduledTime}`
    ).toISOString();

    const sessionData = {
      ...data,
      duration: parseInt(data.duration),
      scheduledAt,
      status: "scheduled",
      createdAt: new Date().toISOString(),
    };

    onSubmit(sessionData);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    reset(defaultValues);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      aria-labelledby="mentorship-session-dialog-title"
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>

      <DialogTitle id="mentorship-session-dialog-title" className="-mb-6">
        Create New Mentorship Session
      </DialogTitle>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent sx={{ overflowY: "auto", flex: "1 1 auto", pb: 2 }}>
          <Grid container spacing={5}>
            {/* Session Title */}
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Session Title"
                    placeholder="e.g., Business Strategy Session"
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
                    rows={3}
                    label="Description"
                    placeholder="Brief description of what will be covered..."
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            {/* Program Selection */}
            <Grid item xs={12}>
              <Controller
                name="programId"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Program"
                    placeholder="Select a program"
                    error={!!errors.programId}
                    helperText={errors.programId?.message}
                  >
                    <MenuItem value="">Select a program</MenuItem>
                    {mockPrograms.map((program) => (
                      <MenuItem key={program.id} value={program.id}>
                        {program.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            {/* Mentor and Startup Owner Selection */}
            <Grid item xs={12} md={6}>
              <Controller
                name="mentorId"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Mentor"
                    placeholder="Select a mentor"
                    disabled={!selectedProgramId}
                    error={!!errors.mentorId}
                    helperText={errors.mentorId?.message}
                  >
                    <MenuItem value="">Select a mentor</MenuItem>
                    {getAvailableMentors().map((mentor) => (
                      <MenuItem key={mentor.id} value={mentor.id}>
                        {mentor.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="startupOwnerId"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Startup Owner"
                    placeholder="Select a startup owner"
                    disabled={!selectedProgramId}
                    error={!!errors.startupOwnerId}
                    helperText={errors.startupOwnerId?.message}
                  >
                    <MenuItem value="">Select a startup owner</MenuItem>
                    {getAvailableStartups().map((startup) => (
                      <MenuItem key={startup.id} value={startup.id}>
                        {startup.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            {/* Date, Time, and Duration */}
            <Grid item xs={12} md={4}>
              <Controller
                name="scheduledDate"
                control={control}
                render={({ field }) => (
                  <CustomDatePicker
                    {...field}
                    fullWidth
                    label="Date"
                    placeholder="Select date"
                    error={!!errors.scheduledDate}
                    helperText={errors.scheduledDate?.message}
                    disablePast
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="scheduledTime"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <CustomTimePicker
                    {...field}
                    value={value && value.trim() ? value : null}
                    onChange={(newValue: string | null) =>
                      onChange(newValue || "")
                    }
                    fullWidth
                    label="Time"
                    placeholder="Select time"
                    ampm={true}
                    error={!!errors.scheduledTime}
                    helperText={errors.scheduledTime?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Duration"
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

            {/* Meeting Link */}
            <Grid item xs={12}>
              <Controller
                name="meetingLink"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Meeting Link (optional)"
                    placeholder="https://meet.example.com/session"
                    error={!!errors.meetingLink}
                    helperText={errors.meetingLink?.message}
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
          >
            Create Session
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MentorshipSessionDialog;
