"use client";

import React, { useState, useEffect } from "react";
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
} from "valibot";
import type { SubmitHandler } from "react-hook-form";
import { UserType } from "@/types/UserTypes";
import { AssessmentType } from "./AssessmentsTable";

// Component Imports
import CustomDatePicker from "@/@core/components/mui/DatePicker";
import CustomTextField from "@/@core/components/mui/TextField";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";

// Define the form schema
const assessmentSchema = object({
  start_date: pipe(
    string(),
    nonEmpty("Start date is required")
  ),
  user_name: pipe(
    string(),
    nonEmpty("User is required")
  ),
});

// Create a type based on the schema
type AssessmentFormInputs = {
  start_date: string;
  user_name: string;
};

interface AssessmentFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (assessment: Partial<AssessmentType>) => void;
  assessment?: AssessmentType | null;
}

const AssessmentForm = ({ open, setOpen, onSubmit, assessment }: AssessmentFormProps) => {
  // Mock users data - replace with actual data from your API
  const [users, setUsers] = useState<Array<UserType>>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      gender: "Male",
      role: "Admin",
      hasCompany: true,
      created_at: "2023-01-15",
      image: null
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+0987654321",
      gender: "Female",
      role: "Not Verified",
      hasCompany: false,
      created_at: "2023-02-20",
      image: null
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "+1122334455",
      gender: "Male",
      role: "User",
      hasCompany: true,
      created_at: "2023-03-10",
      image: null
    }
  ]);

  // Initialize form with valibot resolver
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssessmentFormInputs>({
    defaultValues: {
      start_date: "",
      user_name: "",
    },
    resolver: valibotResolver(assessmentSchema),
  });

  // Reset form when dialog opens or assessment data changes
  useEffect(() => {
    if (open) {
      if (assessment) {
        reset({
          start_date: assessment.start_date,
          user_name: assessment.user_name,
        });
      } else {
        reset({
          start_date: "",
          user_name: "",
        });
      }
    }
  }, [open, assessment, reset]);

  // Form submission handler
  const onFormSubmit: SubmitHandler<AssessmentFormInputs> = (data) => {
    // Calculate end date as 5 days after start date for this example
    const startDate = new Date(data.start_date);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 5);

    const formattedEndDate = endDate.toISOString().split('T')[0];
    
    const newAssessment: Partial<AssessmentType> = {
      ...data,
      end_date: formattedEndDate,
      created_at: new Date().toISOString().split('T')[0],
      status: "pending"
    };
    
    onSubmit(newAssessment);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const dialogTitle = assessment ? "Edit Assessment" : "Create New Assessment";

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      aria-labelledby="assessment-dialog-title"
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      
      <DialogTitle id="assessment-dialog-title">{dialogTitle}</DialogTitle>
      
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent sx={{ overflowY: "auto", flex: "1 1 auto", pb: 2 }}>
          <Grid container spacing={5}>
            {/* User Selection */}
            <Grid item xs={12} md={12}>
              <Controller
                name="user_name"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Select User"
                    error={!!errors.user_name}
                    helperText={errors.user_name?.message}
                  >
                    {users.map((user) => (
                      <MenuItem key={user.id} value={user.name}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            {/* Start Date */}
            <Grid item xs={12} md={12}>
              <Controller
                name="start_date"
                control={control}
                render={({ field }) => (
                  <CustomDatePicker
                    {...field}
                    fullWidth
                    label="Start Date"
                    error={!!errors.start_date}
                    helperText={errors.start_date?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions className="mt-8">
          <Button variant="text" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {assessment ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AssessmentForm;