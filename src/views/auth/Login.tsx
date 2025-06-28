"use client";

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
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";

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
} from "valibot";
import type { SubmitHandler } from "react-hook-form";
import type { InferInput } from "valibot";

// Type Imports
import type { Locale } from "@configs/i18n";

// Component Imports
import Logo from "@components/layout/shared/Logo";
import CustomTextField from "@core/components/mui/TextField";

// Config Imports
import themeConfig from "@configs/themeConfig";

// Util Imports
import { getLocalizedUrl } from "@/utils/i18n";
import AuthIllustrationWrapper from "./AuthIllustrationWrapper";
import { SystemMode } from "@/@core/types";

// Form Validation Schema
type ErrorType = {
  message: string[];
};

type FormData = InferInput<typeof schema>;

const schema = object({
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
});

const Login = ({ mode }: { mode: SystemMode }) => {
  const router = useRouter();
  const searchParams = useSearchParams()

  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [errorState, setErrorState] = useState<ErrorType | null>(null);

  // Hooks
  const { lang: locale } = useParams();

  const handleClickShowPassword = () => setIsPasswordShown((show) => !show);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const redirectURL = searchParams.get('redirectTo') ?? '/'
    router.replace(getLocalizedUrl(redirectURL, locale as Locale))

    // const res = await signIn('credentials', {
    //   email: data.email,
    //   password: data.password,
    //   redirect: false
    // })

    // if (res && res.ok && res.error === null) {
    //   // Vars
    //   const redirectURL = searchParams.get('redirectTo') ?? '/'

    //   router.replace(getLocalizedUrl(redirectURL, locale as Locale))
    // } else {
    //   if (res?.error) {
    //     const error = JSON.parse(res.error)

    //     setErrorState(error)
    //   }
    // }

     // set isAuthenticated to true in local storage
    // localStorage.setItem('isAuthenticated', 'true');
    // redirect to dashboard page
    // router.push(getLocalizedUrl("/dashboard", locale as Locale));
  }

  return (
    <AuthIllustrationWrapper>
      <Card className="flex flex-col sm:is-[450px]">
        <CardContent className="sm:!p-12">
          <Link
            href={getLocalizedUrl("/dashboard", locale as Locale)}
            className="flex justify-center mbe-6"
          >
            <Logo />
          </Link>
          <div className="flex flex-col gap-1 mbe-6">
            <Typography variant="h4">{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
            <Typography>
              Please sign-in to your account and start the adventure
            </Typography>
          </div>
          <form
            noValidate
            autoComplete="off"
            action={() => {}}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  autoFocus
                  fullWidth
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    errorState !== null && setErrorState(null);
                  }}
                  {...((errors.email || errorState !== null) && {
                    error: true,
                    helperText:
                      errors?.email?.message || errorState?.message[0],
                  })}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label="Password"
                  placeholder="············"
                  id="login-password"
                  type={isPasswordShown ? "text" : "password"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    errorState !== null && setErrorState(null);
                  }}
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
                              isPasswordShown ? "tabler-eye" : "tabler-eye-off"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...(errors.password && {
                    error: true,
                    helperText: errors.password.message,
                  })}
                />
              )}
            />
            <div className="flex justify-between items-center gap-x-3 gap-y-1 flex-wrap">
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember me"
              />
              <Typography
                className="text-end"
                color="primary"
                component={Link}
                href={getLocalizedUrl("/forgot-password", locale as Locale)}
              >
                Forgot password?
              </Typography>
            </div>
            <Button fullWidth variant="contained" type="submit">
              Login
            </Button>
            <div className="flex justify-center items-center flex-wrap gap-2">
              <Typography>New on our platform?</Typography>
              <Typography
                component={Link}
                href={getLocalizedUrl("/register", locale as Locale)}
                color="primary"
              >
                Create an account
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

export default Login;
