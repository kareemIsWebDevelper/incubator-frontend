"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Box,
  Chip,
  Card,
  CardContent,
  alpha,
  useTheme,
} from "@mui/material";
import { StepType } from "@/types/stepTypes";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";
import { useParams, useRouter } from "next/navigation";
import { getLocalizedUrl } from "@/utils/i18n";
import { Locale } from "@/configs/i18n";

interface StepDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  step: StepType | null;
}

const StepDetailsDialog: React.FC<StepDetailsDialogProps> = ({
  open,
  onClose,
  step,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const { lang: locale } = useParams();

  if (!step) return null;

  // Helper function to get step type chip color
  const getStepTypeColor = (stepType: string) => {
    switch (stepType) {
      case "Training":
        return "info";
      case "custom-form":
        return "primary";
      case "screening":
        return "secondary";
      case "mentorship":
        return "info";
      case "final-evaluation":
        return "error";
      default:
        return "default";
    }
  };

  // Helper function to format step type display name
  const formatStepType = (stepType: string) => {
    return stepType
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Calculate duration in days
  const durationInDays = Math.ceil(
    (step.endDate.getTime() - step.startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      aria-labelledby="step-details-dialog-title"
    >
      <DialogCloseButton onClick={onClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>

      <DialogTitle id="step-details-dialog-title">
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontWeight: 600,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            pr: 6, // Account for close button
          }}
        >
          {step.title}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          {/* Step Metadata */}
          <Grid item xs={12}>
            <Card elevation={0} className="border">
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    color: "text.primary",
                    fontWeight: 600,
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "primary.main",
                    }}
                  />
                  Step Details
                </Typography>
                <Grid container spacing={3}>
                  {/* Step Type and Form */}
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: (theme) =>
                          alpha(theme.palette.primary.main, 0.05),
                        border: (theme) =>
                          `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ fontWeight: 500 }}
                      >
                        Step Type
                      </Typography>
                      {step.stepType ? (
                        <Chip
                          icon={
                            <i
                              className="tabler-category"
                              style={{ fontSize: "14px" }}
                            />
                          }
                          label={formatStepType(step.stepType)}
                          variant="tonal"
                          color={getStepTypeColor(step.stepType)}
                          sx={{
                            fontWeight: 500,
                            fontSize: "0.875rem",
                            height: 32,
                          }}
                        />
                      ) : (
                        <Typography variant="body2" color="text.disabled">
                          No step type specified
                        </Typography>
                      )}
                    </Box>
                  </Grid>

                  {/* Selected Form */}
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: (theme) =>
                          alpha(theme.palette.secondary.main, 0.05),
                        border: (theme) =>
                          `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ fontWeight: 500 }}
                      >
                        Associated Form
                      </Typography>
                      {step.selectedForm ? (
                        <Chip
                          icon={
                            <i
                              className="tabler-file-text"
                              style={{ fontSize: "14px" }}
                            />
                          }
                          label={step.selectedForm}
                          variant="outlined"
                          color="secondary"
                          sx={{
                            fontWeight: 500,
                            fontSize: "0.875rem",
                            height: 32,
                          }}
                        />
                      ) : (
                        <Typography variant="body2" color="text.disabled">
                          No form associated
                        </Typography>
                      )}
                    </Box>
                  </Grid>

                  {/* Program Information */}
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: (theme) =>
                          alpha(theme.palette.info.main, 0.05),
                        border: (theme) =>
                          `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ fontWeight: 500 }}
                      >
                        Program
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 600, color: "text.primary" }}
                        >
                          {step.program.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {step.program.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Duration and Timeline */}
          <Grid item xs={12}>
            <Card elevation={0} className="border">
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    color: "text.primary",
                    fontWeight: 600,
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "success.main",
                    }}
                  />
                  Timeline & Duration
                </Typography>
                <Grid container spacing={3}>
                  {/* Start Date */}
                  <Grid item xs={12} sm={4}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: (theme) =>
                          alpha(theme.palette.success.main, 0.05),
                        border: (theme) =>
                          `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ fontWeight: 500 }}
                      >
                        Start Date
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                        }}
                      >
                        <i
                          className="tabler-calendar-event"
                          style={{
                            fontSize: "16px",
                            color: theme.palette.success.main,
                          }}
                        />
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {step.startDate.toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {/* End Date */}
                  <Grid item xs={12} sm={4}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: (theme) =>
                          alpha(theme.palette.warning.main, 0.05),
                        border: (theme) =>
                          `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ fontWeight: 500 }}
                      >
                        End Date
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                        }}
                      >
                        <i
                          className="tabler-calendar-time"
                          style={{
                            fontSize: "16px",
                            color: theme.palette.warning.main,
                          }}
                        />
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {step.endDate.toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Duration */}
                  <Grid item xs={12} sm={4}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: (theme) =>
                          alpha(theme.palette.primary.main, 0.05),
                        border: (theme) =>
                          `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ fontWeight: 500 }}
                      >
                        Duration
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                        }}
                      >
                        <i
                          className="tabler-clock"
                          style={{
                            fontSize: "16px",
                            color: theme.palette.primary.main,
                          }}
                        />
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {durationInDays} day{durationInDays !== 1 ? "s" : ""}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Description */}
          {step.description && (
            <Grid item xs={12}>
              <Card elevation={0} className="border">
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      color: "text.primary",
                      fontWeight: 600,
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: "info.main",
                      }}
                    />
                    Description
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: (theme) =>
                        alpha(theme.palette.text.primary, 0.02),
                      border: (theme) =>
                        `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.6,
                        color: "text.primary",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button variant="text" color="secondary" onClick={onClose}>
          Close
        </Button>
        {step.stepType === "custom-form" && (
          <>
            <Button
              onClick={() => router.push(`/forms/1`)}
              variant="contained"
              color="info"
              startIcon={<i className="tabler-file-text" />}
            >
              View Form
            </Button>
            <Button
              onClick={() => router.push(`/form-builder`)}
              variant="contained"
              color="warning"
              startIcon={<i className="tabler-settings" />}
            >
              Edit Form
            </Button>
          </>
        )}
        {step.stepType === "training" && (
          <Button
            // onClick={() => router.push(`/training/sessions?stepId=${step.id}`)}
            href={getLocalizedUrl(
              `/training/sessions?stepId=${step.id}`,
              locale as Locale
            )}
            variant="contained"
            color="primary"
            startIcon={<i className="tabler-play" />}
          >
            Start Training
          </Button>
        )}
        {step.stepType === "mentorship" && (
          <Button
            onClick={() => router.push(`/mentorship/${step.id}`)}
            variant="contained"
            color="primary"
            startIcon={<i className="tabler-users" />}
          >
            View Mentorship
          </Button>
        )}
        {step.stepType === "mentorship" && (
          <Button
            onClick={() => router.push(`/mentorship/${step.id}`)}
            variant="contained"
            color="primary"
            startIcon={<i className="tabler-users" />}
          >
            View Mentorship
          </Button>
        )}
        {step.stepType === "final-evaluation" && (
          <Button
            onClick={() => router.push(`/evaluation/${step.id}`)}
            variant="contained"
            color="error"
            startIcon={<i className="tabler-check" />}
          >
            View Evaluation
          </Button>
        )}
        {step.stepType === "screening" && (
          <Button
            onClick={() => router.push(`/screening/${step.id}`)}
            variant="contained"
            color="secondary"
            startIcon={<i className="tabler-check" />}
          >
            View Screening
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default StepDetailsDialog;
