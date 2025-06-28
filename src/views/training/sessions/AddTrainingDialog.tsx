"use client";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { Controller, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useEffect } from "react";
import {
  object,
  string,
  pipe,
  nonEmpty,
  minLength,
  maxLength,
  optional,
  union,
  literal,
  email as emailValidator,
} from "valibot";
import type { SubmitHandler } from "react-hook-form";

import CustomTextField from "@/@core/components/mui/TextField";
import CustomDatePicker from "@/@core/components/mui/DatePicker";
import CustomTimePicker from "@/@core/components/mui/TimePicker";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";
import { TrainingType } from "@/types/TrainingTypes";

interface AddTrainingDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onAddTraining: (training: TrainingType) => void;
}

// Define the validation schema
const trainingSchema = object({
  title: pipe(
    string(),
    nonEmpty("Title is required"),
    minLength(3, "Title must be at least 3 characters"),
    maxLength(100, "Title must not exceed 100 characters")
  ),
  description: pipe(
    string(),
    nonEmpty("Description is required"),
    minLength(10, "Description must be at least 10 characters"),
    maxLength(500, "Description must not exceed 500 characters")
  ),
  stepName: pipe(string(), nonEmpty("Step name is required")),
  type: union([
    literal("online-training"),
    literal("online-session"),
    literal("traditional-session"),
  ]),
  // duration: pipe(string(), nonEmpty("Duration is required")),
  date: pipe(string(), nonEmpty("Date is required")),
  // Fields for online-training
  startDate: pipe(string(), nonEmpty("Start Date is required")),
  endDate: pipe(string(), nonEmpty("End Date is required")),
  onlineCourse: optional(string()),
  // Fields for online-session and traditional-session
  startTime: pipe(string(), nonEmpty("Start Time is required")),
  endTime: pipe(string(), nonEmpty("End Time is required")),
  trainerName: optional(string()),
  trainerEmail: optional(string()),
  // Fields for traditional-session only
  locationAddress: optional(string()),
  locationMapLink: optional(string()),
});

const AddTrainingDialog = ({
  open,
  setOpen,
  onAddTraining,
}: AddTrainingDialogProps) => {
  // Training step options
  const steps = [
    "Frontend Development",
    "Backend Development",
    "Programming Languages",
    "DevOps",
    "Design",
    "Testing",
    "Project Management",
  ];

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: valibotResolver(trainingSchema),
    defaultValues: {
      title: "",
      description: "",
      stepName: "",
      type: "online-training" as const,
      duration: "",
      // Fields for online-training
      date: "",
      onlineCourse: "",
      // Fields for online-session and traditional-session
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      trainerName: "",
      trainerEmail: "",
      // Fields for traditional-session only
      locationAddress: "",
      locationMapLink: "",
    },
  });

  const selectedType: string = watch("type");
  const startTime = watch("startTime");
  const endTime = watch("endTime");

  // Calculate duration when both start and end times are available
  useEffect(() => {
    if (startTime && endTime) {
      // Parse the HH:mm format
      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);
      
      // Calculate total minutes
      let startTotalMinutes = startHour * 60 + startMinute;
      let endTotalMinutes = endHour * 60 + endMinute;
      
      // Handle case where end time is on the next day
      if (endTotalMinutes < startTotalMinutes) {
        endTotalMinutes += 24 * 60; // Add 24 hours in minutes
      }
      
      const durationMinutes = endTotalMinutes - startTotalMinutes;
      
      // Format the duration as hours and minutes
      const hours = Math.floor(durationMinutes / 60);
      const minutes = durationMinutes % 60;
      
      let durationText = "";
      if (hours > 0) {
        durationText += `${hours} hour${hours > 1 ? 's' : ''}`;
      }
      if (minutes > 0) {
        if (durationText) durationText += " ";
        durationText += `${minutes} minute${minutes > 1 ? 's' : ''}`;
      }
      
      setValue("duration", durationText);
    }
  }, [startTime, endTime, setValue]);

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    // Create a new training with a unique ID
    const newTraining: TrainingType = {
      id: `${Date.now()}`,
      ...data,
      participants: 0, // Initialize with 0 participants
    };

    onAddTraining(newTraining);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      PaperProps={{
        sx: {
          maxHeight: "96vh",
          padding: 2,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
        },
      }}
      // Make the dialog full screen on mobile devices
      aria-labelledby="user-dialog-title"
      fullScreen={typeof window !== undefined ? window.innerWidth < 600 : false}
      scroll="paper"
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>

      <DialogTitle>Add New Training</DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}       style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                overflow: "hidden",
              }}
            >
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
                    label="Title"
                    placeholder="Enter training title"
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
                    placeholder="Enter training description"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            {/* Step Name */}
            <Grid item xs={12} md={6}>
              <Controller
                name="stepName"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Training Step"
                    placeholder="Select training step"
                    error={!!errors.stepName}
                    helperText={errors.stepName?.message}
                  >
                    {steps.map((step) => (
                      <MenuItem key={step} value={step}>
                        {step}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            {/* Type */}
            <Grid item xs={12} md={6}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Training Type"
                    placeholder="Select training type"
                    error={!!errors.type}
                    helperText={errors.type?.message}
                  >
                    <MenuItem value="online-training">Online Training</MenuItem>
                    <MenuItem value="online-session">Online Session</MenuItem>
                    <MenuItem value="traditional-session">
                      Traditional Session
                    </MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>

            {/* Type-specific fields */}
            {selectedType === "online-training" && (
              <>
                {/* Start Date and End Date in 2 columns */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <CustomDatePicker
                        fullWidth
                        label="Start Date"
                        {...field}
                        error={!!errors.startDate}
                        helperText={errors.startDate?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <CustomDatePicker
                        fullWidth
                        label="End Date"
                        {...field}
                        error={!!errors.endDate}
                        helperText={errors.endDate?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Online Course */}
                <Grid item xs={12}>
                  <Controller
                    name="onlineCourse"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        select
                        fullWidth
                        label="Online Course"
                        placeholder="Select online course"
                        error={!!errors.onlineCourse}
                        helperText={errors.onlineCourse?.message}
                      >
                        <MenuItem value="udemy">Udemy</MenuItem>
                        <MenuItem value="coursera">Coursera</MenuItem>
                        <MenuItem value="pluralsight">Pluralsight</MenuItem>
                        <MenuItem value="linkedin-learning">
                          LinkedIn Learning
                        </MenuItem>
                        <MenuItem value="edx">edX</MenuItem>
                        <MenuItem value="custom">Custom Course</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>
              </>
            )}

            {selectedType === "online-session" && (
              <>
              {/* Date */}
            <Grid item xs={12} md={12}>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <CustomDatePicker
                    fullWidth
                    label="Date"
                    {...field}
                    error={!!errors.date}
                    helperText={errors.date?.message}
                  />
                )}
              />
            </Grid>
                {/* Start Time, End Time and Duration in 3 columns */}
                <Grid item xs={12} md={4}>
                  <Controller
                    name="startTime"
                    control={control}
                    render={({ field }) => (
                      <CustomTimePicker
                        {...field}
                        fullWidth
                        label="Start Time"
                        error={!!errors.startTime}
                        helperText={errors.startTime?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Controller
                    name="endTime"
                    control={control}
                    render={({ field }) => (
                      <CustomTimePicker
                        {...field}
                        fullWidth
                        label="End Time"
                        error={!!errors.endTime}
                        helperText={errors.endTime?.message}
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
                        fullWidth
                        label="Duration"
                        placeholder="Auto-calculated"
                        disabled
                        InputProps={{
                          readOnly: true,
                        }}
                        error={!!errors.duration}
                        helperText={errors.duration?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Trainer Name */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="trainerName"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label="Trainer Name"
                        placeholder="Enter trainer's name"
                        error={!!errors.trainerName}
                        helperText={errors.trainerName?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Trainer Email */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="trainerEmail"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        type="email"
                        label="Trainer Email"
                        placeholder="Enter trainer's email"
                        error={!!errors.trainerEmail}
                        helperText={errors.trainerEmail?.message}
                      />
                    )}
                  />
                </Grid>
              </>
            )}

            {selectedType === "traditional-session" && (
              <>
              {/* Date */}
            <Grid item xs={12} md={12}>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <CustomDatePicker
                    fullWidth
                    label="Date"
                    {...field}
                    error={!!errors.date}
                    helperText={errors.date?.message}
                  />
                )}
              />
            </Grid>
                {/* Start Time, End Time and Duration in 3 columns */}
                <Grid item xs={12} md={4}>
                  <Controller
                    name="startTime"
                    control={control}
                    render={({ field }) => (
                      <CustomTimePicker
                        {...field}
                        fullWidth
                        label="Start Time"
                        error={!!errors.startTime}
                        helperText={errors.startTime?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Controller
                    name="endTime"
                    control={control}
                    render={({ field }) => (
                      <CustomTimePicker
                        {...field}
                        fullWidth
                        label="End Time"
                        error={!!errors.endTime}
                        helperText={errors.endTime?.message}
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
                        fullWidth
                        label="Duration"
                        placeholder="Auto-calculated"
                        disabled
                        InputProps={{
                          readOnly: true,
                        }}
                        error={!!errors.duration}
                        helperText={errors.duration?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Location Address */}
                <Grid item xs={12}>
                  <Controller
                    name="locationAddress"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label="Location Address"
                        placeholder="Enter the physical location address"
                        multiline
                        rows={2}
                        error={!!errors.locationAddress}
                        helperText={errors.locationAddress?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Google Maps Link */}
                <Grid item xs={12}>
                  <Controller
                    name="locationMapLink"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label="Google Maps Link"
                        placeholder="Enter Google Maps location URL"
                        error={!!errors.locationMapLink}
                        helperText={errors.locationMapLink?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Trainer Name */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="trainerName"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label="Trainer Name"
                        placeholder="Enter trainer's name"
                        error={!!errors.trainerName}
                        helperText={errors.trainerName?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Trainer Email */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="trainerEmail"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        type="email"
                        label="Trainer Email"
                        placeholder="Enter trainer's email"
                        error={!!errors.trainerEmail}
                        helperText={errors.trainerEmail?.message}
                      />
                    )}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>

        <DialogActions className="mt-6">
          <Button variant="text" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Add Training
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddTrainingDialog;