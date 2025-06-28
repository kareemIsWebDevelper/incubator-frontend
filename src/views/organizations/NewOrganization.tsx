"use client";

import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { object, string, pipe, nonEmpty, minLength, maxLength } from "valibot";
import type { SubmitHandler } from "react-hook-form";
import type { InferInput } from "valibot";
import CustomTextField from "@core/components/mui/TextField";

// Form Validation Schema
const schema = object({
  name: pipe(
    string(),
    nonEmpty("Organization name is required"),
    minLength(2, "Organization name must be at least 2 characters"),
    maxLength(50, "Organization name is too long")
  ),
  status: pipe(string(), nonEmpty("Status is required")),
  color: pipe(string(), nonEmpty("Color is required")),
  managerName: pipe(
    string(),
    nonEmpty("Manager name is required"),
    minLength(2, "Manager name must be at least 2 characters"),
    maxLength(50, "Manager name is too long")
  ),
  gender: pipe(string(), nonEmpty("Gender is required")),
  phone: pipe(
    string(),
    nonEmpty("Phone number is required"),
    minLength(10, "Phone number must be at least 10 digits"),
    maxLength(15, "Phone number is too long")
  ),
  email: pipe(
    string(),
    nonEmpty("Email is required"),
    minLength(5, "Email is too short"),
    maxLength(100, "Email is too long")
  ),
  password: pipe(
    string(),
    nonEmpty("Password is required"),
    minLength(8, "Password must be at least 8 characters"),
    maxLength(50, "Password is too long")
  ),
  confirmPassword: pipe(string(), nonEmpty("Please confirm your password")),
});

type FormData = InferInput<typeof schema>;

const NewOrganization = () => {
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
      name: "",
      status: "",
      color: "",
      managerName: "",
      gender: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // TODO: Handle form submission
    console.log(data);
    handleClose();
  };

  return (
    <Grid item xs={12} lg={4}>
      <div className="w-full h-full flex justify-center lg:justify-end items-center">
        <Button
          variant="contained"
          color="primary"
          className="flex items-center"
          onClick={handleOpen}
        >
          <i className="tabler-plus text-xl me-1" />
          Add New
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Organization</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <div className="space-y-4">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Organization Name"
                    placeholder="Enter organization name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="managerName"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Organization Manager Name"
                    placeholder="Enter manager name"
                    error={!!errors.managerName}
                    helperText={errors.managerName?.message}
                  />
                )}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        select
                        fullWidth
                        label="Status"
                        error={!!errors.status}
                        helperText={errors.status?.message}
                        value={"active"}
                      >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        select
                        fullWidth
                        label="Gender"
                        error={!!errors.gender}
                        helperText={errors.gender?.message}
                        value={"male"}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>
              </Grid>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Phone Number"
                    placeholder="Enter phone number"
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Email"
                    placeholder="Enter email address"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        type="password"
                        label="Password"
                        placeholder="Enter password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        type="password"
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  );
};

export default NewOrganization;
