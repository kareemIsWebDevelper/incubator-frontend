import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Rating,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  object,
  number,
  boolean,
  string,
  pipe,
  minValue,
  maxValue,
  optional,
} from "valibot";
import type { SubmitHandler } from "react-hook-form";
import type { InferInput } from "valibot";
import CustomTextField from "@core/components/mui/TextField";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";
import { Mentor, MentorRating } from "@/types/MentorTypes";

// Define the schema for the form validation
const mentorRatingSchema = object({
  rating: pipe(
    number(),
    minValue(1, "Rating is required"),
    maxValue(5, "Rating must be between 1 and 5")
  ),
  attendance: boolean(),
  notes: optional(string()),
});

// Create a type based on the schema using InferInput
type MentorRatingFormInputs = InferInput<typeof mentorRatingSchema>;

// Default form values
const defaultValues: MentorRatingFormInputs = {
  rating: 0,
  attendance: false,
  notes: "",
};

interface RateMentorDialogProps {
  open: boolean;
  onClose: () => void;
  mentor: Mentor | null;
  onSubmit: (data: MentorRating) => void;
  existingRating?: MentorRating | null;
}

const RateMentorDialog = ({
  open,
  onClose,
  mentor,
  onSubmit,
  existingRating,
}: RateMentorDialogProps) => {
  // Initialize form with valibot resolver
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MentorRatingFormInputs>({
    defaultValues,
    resolver: valibotResolver(mentorRatingSchema),
  });

  // Reset form when dialog opens or mentor data changes
  useEffect(() => {
    if (open) {
      if (existingRating) {
        reset({
          rating: existingRating.rating,
          attendance: existingRating.attendance,
          notes: existingRating.notes || "",
        });
      } else {
        reset(defaultValues);
      }
    }
  }, [open, existingRating, reset]);

  // Form submission handler
  const onFormSubmit: SubmitHandler<MentorRatingFormInputs> = (formData) => {
    if (!mentor) return;

    const ratingData: MentorRating = {
      id: existingRating?.id || crypto.randomUUID(),
      mentorId: mentor.id,
      rating: formData.rating,
      attendance: formData.attendance,
      notes: formData.notes,
      createdAt: existingRating?.createdAt || new Date().toISOString(),
    };

    onSubmit(ratingData);
    handleClose();
  };

  const handleClose = () => {
    onClose();
    reset(defaultValues);
  };

  const dialogTitle = existingRating ? "Edit Mentor Rating" : "Rate Mentor";

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      maxWidth="sm"
      fullWidth
      aria-labelledby="rate-mentor-dialog-title"
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      <DialogTitle id="rate-mentor-dialog-title" mb={-2}>
        {dialogTitle}
      </DialogTitle>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent>
          <Grid container spacing={5}>
            {/* Mentor Info */}
            {mentor && (
              <Grid item xs={12}>
                <div className="flex items-center gap-3 p-4 border rounded-lg bg-gray-50">
                  <img
                    // src={mentor.image_url}
                    src="/images/avatars/1.png"
                    alt={mentor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <Typography variant="h6" className="font-medium">
                      {mentor.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {mentor.title}
                    </Typography>
                  </div>
                </div>
              </Grid>
            )}

            {/* Rating */}
            <Grid item xs={12}>
              <Typography variant="body1" className="mb-2 font-medium">
                Rate this mentor
              </Typography>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <div>
                    <Rating
                      {...field}
                      value={field.value}
                      onChange={(_, newValue) => {
                        field.onChange(newValue || 0);
                      }}
                      size="large"
                      precision={1}
                      emptyIcon={<i className="tabler-star" />}
                      icon={<i className="tabler-star-filled" />}
                    />
                    {errors.rating && (
                      <Typography
                        variant="caption"
                        color="error"
                        className="block mt-1"
                      >
                        {errors.rating.message}
                      </Typography>
                    )}
                  </div>
                )}
              />
            </Grid>

            {/* Attendance */}
            <Grid item xs={12}>
              <Controller
                name="attendance"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    }
                    label="Mentor was present/attended"
                  />
                )}
              />
            </Grid>

            {/* Notes */}
            <Grid item xs={12}>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    multiline
                    rows={4}
                    label="Notes (Optional)"
                    placeholder="Add any comments about this mentor's performance..."
                    error={!!errors.notes}
                    helperText={errors.notes?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="gap-2">
          <Button variant="text" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : existingRating
                ? "Update Rating"
                : "Submit Rating"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RateMentorDialog;
