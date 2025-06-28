"use client";

// React Imports
import { useEffect } from "react";

// MUI Imports
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

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
  minLength,
  maxLength,
  optional,
} from "valibot";
import type { InferInput } from "valibot";

// Utility Imports
import moment from "moment";

// Component Imports
import CustomTextField from "@/@core/components/mui/TextField";
import CustomDateTimePicker from "@/@core/components/mui/DateTimePicker";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";

// Type Imports
import type { MentorAvailability, TimeSlot } from "@/types/MentorTypes";

// Define the mentor data interface
interface MentorData {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  avatar: string;
  rating: number;
  sessionsCompleted: number;
  availability?: MentorAvailability;
}

// Form validation schema
const mentorshipRequestSchema = object({
  preferredDateTime: pipe(
    string(),
    nonEmpty("Please select a preferred date and time")
  ),
  duration: pipe(string(), nonEmpty("Please select session duration")),
  // description: pipe(
  //   string(),
  //   nonEmpty("Please provide a description"),
  //   minLength(20, "Description must be at least 20 characters"),
  //   maxLength(500, "Description must be less than 500 characters")
  // ),
  additionalNotes: optional(string()),
});

// Create a type based on the schema
type MentorshipRequestFormInputs = InferInput<typeof mentorshipRequestSchema>;

// Default form values
const defaultValues: MentorshipRequestFormInputs = {
  preferredDateTime: "",
  duration: "",
  // description: "",
  additionalNotes: "",
};

// Utility functions for availability
const formatDay = (day: string): string => {
  return day.charAt(0).toUpperCase() + day.slice(1);
};

const formatTimeSlot = (slot: TimeSlot): string => {
  return `${slot.start} - ${slot.end}`;
};

const isDateTimeAvailable = (
  dateTime: moment.Moment,
  availability?: MentorAvailability
): boolean => {
  if (!availability) return true; // Allow all times if no availability is set

  const dayName = dateTime.format('dddd').toLowerCase() as 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  const dayAvailability = availability.weeklySchedule.find(day => day.day === dayName);
  
  if (!dayAvailability || !dayAvailability.available) {
    return false;
  }

  const timeStr = dateTime.format('HH:mm');
  return dayAvailability.timeSlots.some(slot => {
    return timeStr >= slot.start && timeStr <= slot.end;
  });
};

const shouldDisableDate = (date: moment.Moment, availability?: MentorAvailability): boolean => {
  if (!availability) return false; // Allow all dates if no availability is set

  const dayName = date.format('dddd').toLowerCase() as 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  const dayAvailability = availability.weeklySchedule.find(day => day.day === dayName);
  
  return !dayAvailability || !dayAvailability.available || dayAvailability.timeSlots.length === 0;
};

interface RequestMentorshipDialogProps {
  open: boolean;
  onClose: () => void;
  mentor: MentorData | null;
  onSubmit: (
    request: MentorshipRequestFormInputs & { mentorId: string }
  ) => void;
}

const RequestMentorshipDialog = ({
  open,
  onClose,
  mentor,
  onSubmit,
}: RequestMentorshipDialogProps) => {
  // Initialize form with valibot resolver
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MentorshipRequestFormInputs>({
    defaultValues,
    resolver: valibotResolver(mentorshipRequestSchema),
  });

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [open, reset]);

  // Form submission handler
  const onFormSubmit: SubmitHandler<MentorshipRequestFormInputs> = (
    formData
  ) => {
    if (mentor) {
      const requestData = {
        ...formData,
        mentorId: mentor.id,
      };
      onSubmit(requestData);
    }
  };

  const handleClose = () => {
    onClose();
    reset(defaultValues);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="request-mentorship-dialog-title"
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>

      <DialogTitle id="request-mentorship-dialog-title" className="-mb-8">
        Request Mentorship Session
      </DialogTitle>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent>
          <Grid container spacing={4}>
            {/* Mentor Info & Availability */}
            {mentor && (
              <Grid item xs={12}>
                <Box className="p-4 border rounded-lg bg-gradient-to-r from-gray-50 to-blue-50 mb-4">
                  {/* Mentor Basic Info */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-2xl">{mentor.avatar}</div>
                    <div className="flex-grow min-w-0">
                      <Typography variant="h6" className="font-medium text-sm">
                        {mentor.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" className="text-xs">
                        {mentor.title} at {mentor.company}
                      </Typography>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`tabler-star h-2.5 w-2.5 ${
                                i < Math.floor(mentor.rating)
                                  ? "text-yellow-400 tabler-star-filled"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">
                            {mentor.rating}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          • {mentor.sessionsCompleted} sessions
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Availability Section */}
                  {mentor.availability && (
                    <div className="border-t pt-3 mt-3">
                      <Typography variant="subtitle2" className="font-medium mb-2 flex items-center text-xs">
                        <i className="tabler-clock h-3 w-3 mr-1" />
                        Available Times ({mentor.availability.timezone})
                      </Typography>
                      
                      {mentor.availability.weeklySchedule.every(day => !day.available || day.timeSlots.length === 0) ? (
                        <Typography variant="body2" color="text.secondary" className="italic text-xs">
                          No availability set
                        </Typography>
                      ) : (
                        <Box className="space-y-1">
                          {mentor.availability.weeklySchedule
                            .filter(day => day.available && day.timeSlots.length > 0)
                            .slice(0, 3) // Show only first 3 days to keep it compact
                            .map((day) => (
                              <Box key={day.day} className="flex items-center gap-2">
                                <Typography variant="body2" className="font-medium w-12 text-xs">
                                  {formatDay(day.day).slice(0, 3)}:
                                </Typography>
                                <Box className="flex flex-wrap gap-1">
                                  {day.timeSlots.slice(0, 2).map((slot, index) => (
                                    <Chip
                                      key={index}
                                      label={formatTimeSlot(slot)}
                                      size="small"
                                      variant="outlined"
                                      className="bg-white text-xs h-5"
                                      sx={{ fontSize: '0.65rem', height: '20px' }}
                                    />
                                  ))}
                                  {day.timeSlots.length > 2 && (
                                    <Chip
                                      label={`+${day.timeSlots.length - 2} more`}
                                      size="small"
                                      variant="outlined"
                                      className="bg-blue-100 text-xs h-5"
                                      sx={{ fontSize: '0.65rem', height: '20px' }}
                                    />
                                  )}
                                </Box>
                              </Box>
                            ))}
                          {mentor.availability.weeklySchedule.filter(day => day.available && day.timeSlots.length > 0).length > 3 && (
                            <Typography variant="body2" color="text.secondary" className="text-xs italic">
                              +{mentor.availability.weeklySchedule.filter(day => day.available && day.timeSlots.length > 0).length - 3} more days available
                            </Typography>
                          )}
                        </Box>
                      )}
                    </div>
                  )}
                </Box>
              </Grid>
            )}

            {/* Preferred Date Time */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="preferredDateTime"
                control={control}
                render={({ field }) => (
                  <CustomDateTimePicker
                    {...field}
                    label="Preferred Date & Time"
                    error={!!errors.preferredDateTime}
                    helperText={errors.preferredDateTime?.message || (mentor?.availability ? "Only available time slots can be selected" : "")}
                    fullWidth
                    disablePast
                    shouldDisableDate={(date: moment.Moment) => shouldDisableDate(date, mentor?.availability)}
                    shouldDisableTime={(value: moment.Moment) => !isDateTimeAvailable(value, mentor?.availability)}
                  />
                )}
              />
            </Grid>

            {/* Duration */}
            <Grid item xs={12} sm={6}>
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
                    <MenuItem value="30">30 minutes</MenuItem>
                    <MenuItem value="45">45 minutes</MenuItem>
                    <MenuItem value="60">1 hour</MenuItem>
                    <MenuItem value="90">1.5 hours</MenuItem>
                    <MenuItem value="120">2 hours</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>

            {/* Description */}
            {/* <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    multiline
                    rows={3}
                    label="Session Description"
                    placeholder="Describe what you'd like to discuss in this session..."
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid> */}

            {/* Additional Notes */}
            <Grid item xs={12}>
              <Controller
                name="additionalNotes"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    multiline
                    rows={4}
                    label="Additional Notes (Optional)"
                    placeholder="Any additional information or special requests..."
                    error={!!errors.additionalNotes}
                    helperText={errors.additionalNotes?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions className="p-6">
          <Button
            onClick={handleClose}
            variant="text"
            color="secondary"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            startIcon={<i className="tabler-send" />}
          >
            {isSubmitting ? "Submitting..." : "Send Request"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RequestMentorshipDialog;
