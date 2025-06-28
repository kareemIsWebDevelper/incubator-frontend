"use client";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useEffect } from "react";
import {
  object,
  string,
  pipe,
  nonEmpty,
  array,
  optional,
  union,
  literal,
  forward,
  check,
} from "valibot";
import type { SubmitHandler } from "react-hook-form";

import CustomTextField from "@/@core/components/mui/TextField";
import CustomTimePicker from "@/@core/components/mui/TimePicker";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";
import { DayAvailability, TimeSlot } from "@/types/MentorTypes";
import moment from 'moment';

// Define form schema with validation
const slotSchema = pipe(
  object({
    start: pipe(string(), nonEmpty("Start time is required")),
    end: pipe(string(), nonEmpty("End time is required")),
  }),
  forward(
    check((input) => {
      const startTime = moment(input.start, 'HH:mm');
      const endTime = moment(input.end, 'HH:mm');
      return endTime.isAfter(startTime);
    }, "End time must be after start time"),
    ["end"]
  )
);

const availabilitySchema = object({
  day: pipe(
    string(),
    nonEmpty("Day selection is required"),
    union([
      literal("monday"),
      literal("tuesday"),
      literal("wednesday"),
      literal("thursday"),
      literal("friday"),
      literal("saturday"),
      literal("sunday"),
    ])
  ),
  available: pipe(string(), nonEmpty("Availability status is required")),
  timeSlots: array(slotSchema),
});

type AvailabilityFormInputs = {
  day:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  available: string;
  timeSlots: TimeSlot[];
};

// Default form values
const defaultValues: AvailabilityFormInputs = {
  day: "monday",
  available: "true",
  timeSlots: [{ start: "09:00", end: "10:00" }], // 1-hour slot instead of 8-hour
};

interface AvailabilitySlotsDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: DayAvailability) => void;
  existingAvailability?: DayAvailability | null;
  mode?: "add" | "edit";
}

const daysOfWeek = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

const AvailabilitySlotsDialog = ({
  open,
  setOpen,
  onSubmit,
  existingAvailability = null,
  mode = "add",
}: AvailabilitySlotsDialogProps) => {
  // Initialize form with valibot resolver
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<AvailabilityFormInputs>({
    resolver: valibotResolver(availabilitySchema),
    defaultValues,
  });

  // Field array for time slots
  const { fields, append, remove } = useFieldArray({
    control,
    name: "timeSlots",
  });

  const watchAvailable = watch("available");
  const watchTimeSlots = watch("timeSlots");

  // Effect to reset form when dialog opens or availability changes
  useEffect(() => {
    if (open) {
      if (existingAvailability) {
        // Handle both edit mode and add mode with pre-selected day
        reset({
          day: existingAvailability.day,
          available: existingAvailability.available.toString(),
          timeSlots:
            existingAvailability.timeSlots.length > 0
              ? existingAvailability.timeSlots
              : [{ start: "09:00", end: "10:00" }],
        });
      } else {
        // No existing availability - use default values
        reset(defaultValues);
      }
    }
  }, [open, existingAvailability, mode, reset]);

  // Form submission handler
  const onFormSubmit: SubmitHandler<AvailabilityFormInputs> = (data) => {
    const dayAvailability: DayAvailability = {
      day: data.day,
      available: data.available === "true",
      timeSlots: data.available === "true" ? data.timeSlots : [],
    };

    onSubmit(dayAvailability);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    reset(defaultValues);
  };

  const addTimeSlot = () => {
    append({ start: "09:00", end: "10:00" });
  };

  const removeTimeSlot = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const dialogTitle = () => {
    if (mode === "edit" && existingAvailability) {
      const dayName = daysOfWeek.find(d => d.value === existingAvailability.day)?.label || existingAvailability.day;
      return `Edit ${dayName} Availability`;
    }
    return mode === "edit" ? "Edit Availability" : "Add Availability";
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
    >
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      <DialogTitle mb={-5}>{dialogTitle()}</DialogTitle>

      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <DialogContent>
          <Grid container spacing={3}>
            {/* Day Selection */}
            <Grid item xs={12}>
              <Controller
                name="day"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Day of Week"
                    error={!!errors.day}
                    helperText={errors.day?.message}
                    disabled={mode === "edit" && !!existingAvailability}
                  >
                    {daysOfWeek.map((day) => (
                      <MenuItem key={day.value} value={day.value}>
                        {day.label}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            {/* Availability Status */}
            <Grid item xs={12}>
              <Controller
                name="available"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Availability Status"
                    error={!!errors.available}
                    helperText={errors.available?.message}
                  >
                    <MenuItem value="true">Available</MenuItem>
                    <MenuItem value="false">Not Available</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>

            {/* Time Slots - only show if available */}
            {watchAvailable === "true" && (
              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Time Slots
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Define available time periods for this day
                  </Typography>
                </Box>

                {fields.map((field, index) => (
                  <Box key={field.id} sx={{ mb: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                      {/* Start Time */}
                      <Grid item xs={5}>
                        <Controller
                          name={`timeSlots.${index}.start`}
                          control={control}
                          render={({ field: timeField }) => (
                            <CustomTimePicker
                              {...timeField}
                              fullWidth
                              label="Start Time"
                              ampm={true}
                              error={!!errors.timeSlots?.[index]?.start}
                              helperText={
                                errors.timeSlots?.[index]?.start?.message
                              }
                            />
                          )}
                        />
                      </Grid>

                      {/* End Time */}
                      <Grid item xs={5}>
                        <Controller
                          name={`timeSlots.${index}.end`}
                          control={control}
                          render={({ field: timeField }) => (
                            <CustomTimePicker
                              {...timeField}
                              fullWidth
                              label="End Time"
                              ampm={true}
                              error={!!errors.timeSlots?.[index]?.end}
                              helperText={
                                errors.timeSlots?.[index]?.end?.message
                              }
                            />
                          )}
                        />
                      </Grid>

                      {/* Remove Button */}
                      <Grid item xs={2}>
                        {fields.length > 1 && (
                          <IconButton
                            onClick={() => removeTimeSlot(index)}
                            color="error"
                            size="small"
                          >
                            <i className="ri-delete-bin-line" />
                          </IconButton>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                ))}

                {/* Add Time Slot Button */}
                <Button
                  variant="outlined"
                  onClick={addTimeSlot}
                  startIcon={<i className="ri-add-line" />}
                  sx={{ mt: 1 }}
                >
                  Add Time Slot
                </Button>
              </Grid>
            )}

            {/* Preview */}
            {watchAvailable === "true" && (
              <Grid item xs={12}>
                <Box
                  sx={{ p: 2, bgcolor: "background.default", borderRadius: 1 }}
                >
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Preview
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, minHeight: '32px' }}>
                    {watchTimeSlots && watchTimeSlots.length > 0 ? (
                      watchTimeSlots
                        .filter(slot => slot.start && slot.end) // Only show slots with both start and end times
                        .map((slot, index) => (
                          <Chip
                            key={index}
                            label={`${slot.start} - ${slot.end}`}
                            variant="outlined"
                            size="small"
                            color={
                              slot.start && slot.end && slot.start < slot.end 
                                ? "primary" 
                                : "error"
                            }
                          />
                        ))
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        Add time slots above to see preview
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            )}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            variant="text"
            color="secondary"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {mode === "edit" ? "Update" : "Add"} Availability
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AvailabilitySlotsDialog;
