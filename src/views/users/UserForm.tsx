import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  object,
  string,
  pipe,
  nonEmpty,
  minLength,
  maxLength,
  email as emailValidator,
  custom,
  regex,
} from "valibot";
import type { SubmitHandler } from "react-hook-form";
import type { InferInput } from "valibot";
import CustomTextField from "@core/components/mui/TextField";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";

// Define the roles for the role select field
const ROLES = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
  { value: "moderator", label: "Moderator" },
  { value: "guest", label: "Guest" },
];

// Define the schema for the form validation
const userSchema = object({
  firstname: pipe(
    string(),
    nonEmpty("First name is required"),
    minLength(2, "First name must be at least 2 characters"),
    maxLength(50, "First name must not exceed 50 characters")
  ),
  lastname: pipe(
    string(),
    nonEmpty("Last name is required"),
    minLength(2, "Last name must be at least 2 characters"),
    maxLength(50, "Last name must not exceed 50 characters")
  ),
  gender: pipe(string(), nonEmpty("Gender is required")),
  role: pipe(string(), nonEmpty("Role is required")),
  email: pipe(
    string(),
    nonEmpty("Email is required"),
    emailValidator("Please enter a valid email address")
  ),
  phone: pipe(
    string(),
    nonEmpty("Phone number is required"),
    regex(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      "Please enter a valid phone number"
    )
  ),
  password: pipe(
    string(),
    nonEmpty("Password is required"),
    minLength(8, "Password must be at least 8 characters"),
    custom((value) => {
      // Check if password has at least one uppercase, one lowercase, one number, and one special character
      const passwordStr = value as string;
      const hasUpperCase = /[A-Z]/.test(passwordStr);
      const hasLowerCase = /[a-z]/.test(passwordStr);
      const hasNumber = /\d/.test(passwordStr);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwordStr);

      return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    }, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
  ),
  confirmPassword: pipe(string(), nonEmpty("Confirm password is required")),
});

// Add a custom validation to check if password and confirmPassword match
interface PasswordValidationErrors {
  confirmPassword?: string;
}

const validatePasswordMatch = (
  data: UserFormInputs
): PasswordValidationErrors => {
  if (data.password !== data.confirmPassword) {
    return { confirmPassword: "Passwords do not match" };
  }
  return {};
};

// Create a type based on the schema
type UserFormInputs = InferInput<typeof userSchema>;

// Default form values
const defaultValues: UserFormInputs = {
  firstname: "",
  lastname: "",
  gender: "",
  role: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

interface UserFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: UserFormInputs;
  onSubmit: (data: UserFormInputs) => void;
}

const UserDialog = ({ open, setOpen, data, onSubmit }: UserFormProps) => {
  // Initialize form with valibot resolver
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserFormInputs>({
    defaultValues,
    resolver: valibotResolver(userSchema),
  });

  // Reset form when dialog opens or user data changes
  useEffect(() => {
    if (open) {
      if (data) {
        reset(data);
      } else {
        reset(defaultValues);
      }
    }
  }, [open, data, reset]);

  // Form submission handler
  const onFormSubmit: SubmitHandler<UserFormInputs> = (data) => {
    // Custom validation for password match
    const passwordErrors = validatePasswordMatch(data);

    if (Object.keys(passwordErrors).length > 0) {
      // Set error if passwords don't match
      setError("confirmPassword", {
        type: "manual",
        message: passwordErrors.confirmPassword,
      });
      return;
    }

    // Submit form data if validation passes
    onSubmit(data);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    reset(defaultValues);
  };

  const dialogTitle = data ? "Edit User" : "Add User";

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ "& .MuiDialog-paper": { overflow: "auto" } }}
      maxWidth="md"
      fullWidth
      // Make the dialog full screen on mobile devices
      aria-labelledby="user-dialog-title"
      fullScreen={typeof window !== undefined ? window.innerWidth < 600 : false}
      scroll="paper"
    >
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent>
          <Grid container spacing={5}>
            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstname"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="First Name"
                    placeholder="Enter first name"
                    error={!!errors.firstname}
                    helperText={errors.firstname?.message}
                  />
                )}
              />
            </Grid>

            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastname"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Last Name"
                    placeholder="Enter last name"
                    error={!!errors.lastname}
                    helperText={errors.lastname?.message}
                  />
                )}
              />
            </Grid>

            {/* Gender */}
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
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>

            {/* Role */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Role"
                    error={!!errors.role}
                    helperText={errors.role?.message}
                  >
                    {ROLES.map((role) => (
                      <MenuItem key={role.value} value={role.value}>
                        {role.label}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Email"
                    placeholder="user@example.com"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>

            {/* Phone Number */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Phone Number"
                    placeholder="(123) 456-7890"
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    type="password"
                    fullWidth
                    label="Password"
                    placeholder="Enter password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Grid>

            {/* Confirm Password */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    type="password"
                    fullWidth
                    label="Confirm Password"
                    placeholder="Confirm password"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="text" color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            {data ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserDialog;
