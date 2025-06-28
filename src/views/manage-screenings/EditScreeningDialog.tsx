"use client";

// React Imports
import React, { useEffect } from "react";

// Moment Import
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogActions } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Chip } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Divider } from "@mui/material";

// Components Imports
import CustomTextField from "@core/components/mui/TextField";
import CustomDatePicker from "@core/components/mui/DatePicker";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";

// React Hook Form Imports
import { Controller, useForm } from "react-hook-form";

// Valibot Imports
import { valibotResolver } from "@hookform/resolvers/valibot";
import * as Vilbot from "valibot";
import type { SubmitHandler } from "react-hook-form";
import type { InferInput } from "valibot";

// Moment Import
import moment from "moment";

// Types Import
import { ScreeningType } from "@/types/screeningTypes";

// Define the form schema with validation
const screeningSchema = Vilbot.pipe(
  Vilbot.object({
    id: Vilbot.string(),
    title: Vilbot.pipe(
      Vilbot.string(),
      Vilbot.nonEmpty("Title is required"),
      Vilbot.minLength(3, "Title must be at least 3 characters"),
      Vilbot.maxLength(100, "Title must not exceed 100 characters")
    ),
    type: Vilbot.pipe(
      Vilbot.union([
        Vilbot.literal("one-to-all"),
        Vilbot.literal("group-to-group"),
        Vilbot.literal("group-to-all"),
      ]),
      Vilbot.nonEmpty("Type is required")
    ),
    judgers: Vilbot.pipe(
      Vilbot.array(Vilbot.string()),
      Vilbot.minLength(1, "At least one judger must be selected")
    ),
    startDate: Vilbot.pipe(
      Vilbot.string(),
      Vilbot.nonEmpty("Start date is required")
    ),
    endDate: Vilbot.pipe(
      Vilbot.string(),
      Vilbot.nonEmpty("End date is required")
    ),
  }),
  Vilbot.forward(
    Vilbot.check((input) => {
      if (input.startDate && input.endDate) {
        const startDate = moment(input.startDate, "YYYY-MM-DD");
        const endDate = moment(input.endDate, "YYYY-MM-DD");
        return endDate.isAfter(startDate);
      }
      return true;
    }, "End date must be after start date"),
    ["endDate"]
  )
);

// Create a type based on the schema
type ScreeningFormInputs = InferInput<typeof screeningSchema>;

interface EditScreeningDialogProps {
  open: boolean;
  onClose: () => void;
  screening: ScreeningType | null;
  onSave: (updatedScreening: ScreeningType) => void;
}

const EditScreeningDialog: React.FC<EditScreeningDialogProps> = ({
  open,
  onClose,
  screening,
  onSave,
}) => {
  // Available judgers list
  const availableJudgers = [
    "Dr. Sarah Johnson",
    "Prof. Michael Chen",
    "Emily Davis",
    "Mr. Ahmed Hassan",
    "Ms. Lisa Thompson",
    "Robert Chen",
    "Ms. Maria Garcia",
    "Dr. David Lee",
    "Prof. Jennifer Brown",
    "Mr. Alex Rodriguez",
  ];

  // Initialize form with valibot resolver
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ScreeningFormInputs>({
    resolver: valibotResolver(screeningSchema),
    defaultValues: {
      id: "",
      title: "",
      type: "one-to-all",
      judgers: [],
      startDate: "",
      endDate: "",
    },
  });

  // Watch the start date to set minimum date for end date
  const startDateValue = watch("startDate");

  // Reset form when dialog opens or screening data changes
  useEffect(() => {
    if (open && screening) {
      reset({
        id: screening.id,
        title: screening.title,
        type: screening.type,
        judgers: screening.judgers,
        startDate: screening.startDate,
        endDate: screening.endDate,
      });
    }
  }, [open, screening, reset]);

  const handleRemoveJudger = (judgerToRemove: string) => {
    const currentJudgers = getValues("judgers");
    const updatedJudgers = currentJudgers.filter(
      (judger: string) => judger !== judgerToRemove
    );
    setValue("judgers", updatedJudgers);
  };

  // Form submission handler
  const onFormSubmit: SubmitHandler<ScreeningFormInputs> = (data) => {
    onSave(data as ScreeningType);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
    >
      <DialogCloseButton onClick={onClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>

      <DialogTitle id="assessment-dialog-title" mb={2}>
        Edit Screening
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label="Title"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  select
                  fullWidth
                  label="Type"
                  error={!!errors.type}
                  helperText={errors.type?.message}
                >
                  <MenuItem value="one-to-all">One to All</MenuItem>
                  <MenuItem value="group-to-group">Group to Group</MenuItem>
                  <MenuItem value="group-to-all">Group to All</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>

          {/* Dates */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <CustomDatePicker
                  {...field}
                  fullWidth
                  label="Start Date"
                  error={!!errors.startDate}
                  helperText={errors.startDate?.message}
                  // disablePast
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
                  error={!!errors.endDate}
                  helperText={errors.endDate?.message}
                  minDate={
                    startDateValue
                      ? moment(startDateValue, "YYYY-MM-DD").add(1, "day")
                      : undefined
                  }
                  // disablePast
                />
              )}
            />
          </Grid>

          <Divider className="mt-6 mb-3 w-full" />

          {/* Judgers */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Judgers
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="judgers"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  select
                  fullWidth
                  label="Select Judgers"
                  placeholder="Select judgers"
                  value={field.value}
                  error={!!errors.judgers}
                  helperText={errors.judgers?.message}
                  SelectProps={{
                    multiple: true,
                    onChange: (e) => field.onChange(e.target.value as string[]),
                    renderValue: (selected) => (
                      <div className="flex flex-wrap gap-2 w-full min-h-6">
                        {(selected as string[]).map((judger) => (
                          <Chip
                            key={judger}
                            clickable
                            onMouseDown={(event) => event.stopPropagation()}
                            size="small"
                            label={judger}
                            onDelete={() => handleRemoveJudger(judger)}
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </div>
                    ),
                  }}
                >
                  {availableJudgers.map((judger) => (
                    <MenuItem key={judger} value={judger}>
                      {judger}
                    </MenuItem>
                  ))}
                </CustomTextField>
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions className="mt-6">
        <Button onClick={onClose} variant="text" color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onFormSubmit)}
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditScreeningDialog;
