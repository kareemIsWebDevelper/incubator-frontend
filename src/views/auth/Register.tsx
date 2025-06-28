"use client";

// CSS Imports
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

// React Imports
import { useState } from "react";

// Next Imports
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";

// MUI Imports
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import { Radio } from "@mui/material";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import { Controller, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  email,
  object,
  minLength,
  string,
  pipe,
  nonEmpty,
  maxLength,
  custom,
  array,
  boolean,
} from "valibot";
import type { SubmitHandler } from "react-hook-form";
import type { BaseIssue, BaseSchema, InferInput } from "valibot";

// Type Imports
import type { Locale } from "@configs/i18n";

// Component Imports
import Logo from "@components/layout/shared/Logo";
import CustomTextField from "@core/components/mui/TextField";

// Util Imports
import { getLocalizedUrl } from "@/utils/i18n";

// Styled Component Imports
import AuthIllustrationWrapper from "./AuthIllustrationWrapper";
import { SystemMode } from "@/@core/types";

// Form Validation Schema
type ErrorType = {
  message: string[];
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  jobTitle?: string;
  bio?: string;
  linkedInProfile?: string;
  expertise?: string[];
  terms: boolean;
};

const Register = ({ mode }: { mode: SystemMode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [role, setRole] = useState<"Founder" | "Mentor">("Founder");

  // Hooks
  const { lang: locale } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClickShowPassword = () => setIsPasswordShown((show) => !show);

  // Dynamic schema based on role
  const getSchema = (role: "Founder" | "Mentor") =>
    object({
      firstName: pipe(
        string(),
        nonEmpty("This field is required"),
        minLength(2, "First name must be at least 2 characters long"),
        maxLength(20, "First name is too long")
      ),
      lastName: pipe(
        string(),
        nonEmpty("This field is required"),
        minLength(2, "Last name must be at least 2 characters long"),
        maxLength(20, "Last name is too long")
      ),
      email: pipe(
        string(),
        minLength(8, "This field is required"),
        email("Email is invalid")
      ),
      password: pipe(
        string(),
        nonEmpty("This field is required"),
        minLength(8, "Password must be at least 8 characters long"),
        maxLength(20, "Password is too long"),
        custom(
          (input) => {
            const value = input as string;
            const hasUpperCase = /[A-Z]/.test(value);
            const hasLowerCase = /[a-z]/.test(value);
            const hasNumbers = /\d/.test(value);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
            
            if (!hasUpperCase) {
              return false;
            }
            if (!hasLowerCase) {
              return false;
            }
            if (!hasNumbers) {
              return false;
            }
            if (!hasSpecialChar) {
              return false;
            }
            
            return true;
          },
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
      ),
      confirmPassword: pipe(
        string(),
        nonEmpty("This field is required"),
        minLength(8, "Password must be at least 8 characters long"),
        maxLength(20, "Password is too long"),
        custom(
          (input) => {
            const value = input as string;
            const hasUpperCase = /[A-Z]/.test(value);
            const hasLowerCase = /[a-z]/.test(value);
            const hasNumbers = /\d/.test(value);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
            
            if (!hasUpperCase) {
              return false;
            }
            if (!hasLowerCase) {
              return false;
            }
            if (!hasNumbers) {
              return false;
            }
            if (!hasSpecialChar) {
              return false;
            }
            
            return true;
          },
          "Confirm Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ) 
      ),
      phone: pipe(
        string(),
        nonEmpty("This field is required"),
        minLength(8, "Phone number is too short")
      ),
      terms: pipe(
        boolean(),
        custom((value) => value === true, "You must agree to the terms")
      ),
      ...(role === "Mentor" && {
        jobTitle: pipe(
          string(),
          minLength(2, "This field is required"),
          maxLength(50, "Job title is too long")
        ),
        bio: pipe(
          string(),
          minLength(2, "This field is required"),
          maxLength(200, "Bio is too long")
        ),
        linkedInProfile: pipe(
          string(),
          nonEmpty("This field is required"),
          minLength(2, "LinkedIn profile is too short"),
          maxLength(100, "LinkedIn profile is too long"),
          custom(
            (value) =>
              (value as string).startsWith("https://www.linkedin.com/"),
            "LinkedIn profile must start with https://www.linkedin.com/"
          )
        ),
        expertise: pipe(
          array(string()),
          nonEmpty("This field is required"),
          custom(
            (value) => (value as string[]).length >= 1,
            "Select at least one expertise"
          )
        ),
      }),
    });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: valibotResolver(
      getSchema(role) as BaseSchema<unknown, unknown, BaseIssue<unknown>>
    ),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      jobTitle: "",
      bio: "",
      linkedInProfile: "",
      expertise: [],
      terms: false,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    // Handle form submission
    console.log(data);
    
    // Redirect based on role
    const redirectPath = role === "Founder" ? "/startup-profile" : "/user-profile";
    router.replace(getLocalizedUrl(redirectPath, locale as Locale));
  };

  return (
    <AuthIllustrationWrapper>
      <Card className="flex flex-col sm:is-[550px]">
        <CardContent className="sm:!p-12">
          <Link
            href={getLocalizedUrl("/dashboard", locale as Locale)}
            className="flex justify-center mbe-6"
          >
            <Logo />
          </Link>
          <div className="flex flex-col gap-1 mbe-6">
            <Typography variant="h4">Adventure starts here 🚀</Typography>
            <Typography>Make your app management easy and fun!</Typography>
          </div>

          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* Role Selection */}
            <div className="flex flex-col gap-2">
              <Typography variant="subtitle2" color="black">
                Select your role:
              </Typography>
              <div className="flex justify-between items-center">
                <div className="flex-1 pis-8 py-1 border-2 rounded-md mie-4">
                  <FormControl>
                    <FormControlLabel
                      control={
                        <Radio
                          checked={role === "Founder"}
                          onChange={() => setRole("Founder")}
                          value="Founder"
                          name="role"
                        />
                      }
                      label="Founder"
                    />
                  </FormControl>
                </div>
                <div className="flex-1 pis-8 py-1 border-2 rounded-md">
                  <FormControl>
                    <FormControlLabel
                      control={
                        <Radio
                          checked={role === "Mentor"}
                          onChange={() => setRole("Mentor")}
                          value="Mentor"
                          name="role"
                        />
                      }
                      label="Mentor"
                    />
                  </FormControl>
                </div>
              </div>
            </div>

            {/* Shared Fields */}
            <Controller
              name="firstName"
              control={control}
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  autoFocus
                  fullWidth
                  label="First Name"
                  placeholder="Enter your first name"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label="Last Name"
                  placeholder="Enter your last name"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label="Email"
                  placeholder="Enter your email"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label="Password"
                  placeholder="············"
                  type={isPasswordShown ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleClickShowPassword}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          <i
                            className={
                              isPasswordShown ? "tabler-eye-off" : "tabler-eye"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label="Confirm Password"
                  placeholder="············"
                  type={isPasswordShown ? "text" : "password"}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            {role === "Mentor" && (
              <>
                <Controller
                  name="jobTitle"
                  control={control}
                  render={({ field, fieldState }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label="Job Title"
                      placeholder="Enter your job title"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
                <Controller
                  name="expertise"
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl fullWidth error={!!fieldState.error}>
                      <InputLabel id="expertise-label">Expertise</InputLabel>
                      <Select
                        {...field}
                        labelId="expertise-label"
                        label="Expertise"
                        multiple
                        value={field.value || []}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        <MenuItem value="Technology">Technology</MenuItem>
                        <MenuItem value="Business">Business</MenuItem>
                        <MenuItem value="Marketing">Marketing</MenuItem>
                        <MenuItem value="Finance">Finance</MenuItem>
                      </Select>
                      {fieldState.error && (
                        <Typography variant="caption" color="error">
                          {fieldState.error.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  name="bio"
                  control={control}
                  render={({ field, fieldState }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label="Bio"
                      placeholder="Tell us about yourself"
                      multiline
                      rows={2}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
                <Controller
                  name="linkedInProfile"
                  control={control}
                  render={({ field, fieldState }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label="LinkedIn Profile"
                      placeholder="Enter your LinkedIn profile URL"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </>
            )}

            <div className="flex flex-col">
              <Typography
                variant="subtitle2"
                color={
                  errors.phone ? "error" : mode === "dark" ? "white" : "black"
                }
                mb={1}
              >
                Phone Number:
              </Typography>
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <PhoneInput
                    {...field}
                    international
                    defaultCountry="EG"
                    style={{
                      border: fieldState.error ? "1px solid red" : "",
                      borderRadius: "0.375rem",
                    }}
                  />
                )}
              />

              {errors.phone && (
                <Typography
                  variant="caption"
                  color="error"
                  style={{ marginTop: "0.5rem" }}
                >
                  {errors.phone.message}
                </Typography>
              )}
            </div>

            <div className="flex flex-col">
              <Controller
                name="terms"
                control={control}
                render={({ field, fieldState }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label={
                      <>
                        <span>I agree to </span>
                        <Link
                          className="text-primary"
                          href="/"
                          onClick={(e) => e.preventDefault()}
                        >
                          privacy policy & terms
                        </Link>
                      </>
                    }
                  />
                )}
              />

              {errors.terms && (
                <Typography variant="caption" color="error">
                  {errors.terms.message}
                </Typography>
              )}
            </div>

            <Button fullWidth variant="contained" type="submit">
              Sign Up
            </Button>
            <div className="flex justify-center items-center flex-wrap gap-2">
              <Typography>Already have an account?</Typography>
              <Typography
                component={Link}
                href={getLocalizedUrl("/login", locale as Locale)}
                color="primary"
              >
                Sign in instead
              </Typography>
            </div>
            <Divider className="gap-2 text-textPrimary">or</Divider>
            <div className="flex justify-center items-center gap-1.5">
              <IconButton className="text-facebook" size="small">
                <i className="tabler-brand-facebook-filled" />
              </IconButton>
              <IconButton className="text-twitter" size="small">
                <i className="tabler-brand-twitter-filled" />
              </IconButton>
              <IconButton className="text-textPrimary" size="small">
                <i className="tabler-brand-github-filled" />
              </IconButton>
              <IconButton className="text-error" size="small">
                <i className="tabler-brand-google-filled" />
              </IconButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </AuthIllustrationWrapper>
  );
};

export default Register;
