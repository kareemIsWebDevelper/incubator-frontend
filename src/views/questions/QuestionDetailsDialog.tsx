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
  Divider,
} from "@mui/material";
import { QuestionType } from "@/types/questionTypes";
import DialogCloseButton from "../../components/dialogs/DialogCloseButton";

interface QuestionDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  question: QuestionType | null;
}

const QuestionDetailsDialog = ({
  open,
  onClose,
  question,
}: QuestionDetailsDialogProps) => {
  if (!question) return null;

  // Helper function to get question type chip color
  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case "Multiple choice question":
        return "primary";
      case "True/false question":
        return "secondary";
      case "Essay question":
        return "info";
      case "Short answer question":
        return "success";
      default:
        return "default";
    }
  };

  // Helper function to get difficulty level chip color
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "easy":
        return "success";
      case "medium":
        return "warning";
      case "hard":
        return "error";
      default:
        return "default";
    }
  };

  // Helper function to get question group color
  const getQuestionGroupColor = (group: string) => {
    switch (group) {
      case "assessment":
        return "primary";
      case "quiz":
        return "secondary";
      case "survey":
        return "info";
      case "interview":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      aria-labelledby="question-details-dialog-title"
    >
      <DialogCloseButton onClick={onClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>

      <DialogTitle id="question-details-dialog-title">
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
          Question Details
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          {/* Question Metadata */}
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
                  Question Information
                </Typography>
                <Grid container spacing={3}>
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
                        sx={{ fontWeight: 500, mb: 0.5 }}
                      >
                        Question ID
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {question.id}
                      </Typography>
                    </Box>
                  </Grid>
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
                        sx={{ fontWeight: 500, mb: 0.5 }}
                      >
                        Question Type
                      </Typography>
                      <Chip
                        label={question.type}
                        color={getQuestionTypeColor(question.type)}
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                        sx={{ fontWeight: 500, mb: 0.5 }}
                      >
                        Question Group
                      </Typography>
                      <Chip
                        label={question.questionGroup}
                        color={getQuestionGroupColor(question.questionGroup)}
                        size="small"
                        sx={{ fontWeight: 600, textTransform: 'capitalize' }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: (theme) =>
                          alpha(theme.palette.warning.main, 0.05),
                        border: (theme) =>
                          `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: 500, mb: 0.5 }}
                      >
                        Difficulty Level
                      </Typography>
                      <Chip
                        label={question.difficultyLevel}
                        color={getDifficultyColor(question.difficultyLevel)}
                        size="small"
                        sx={{ fontWeight: 600, textTransform: 'capitalize' }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Question Title */}
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
                      backgroundColor: "secondary.main",
                    }}
                  />
                  Question Title
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.primary",
                    lineHeight: 1.6,
                    fontSize: "1.1rem",
                    fontWeight: 500,
                  }}
                >
                  {question.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Category */}
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
                  Question Category
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.primary",
                    fontWeight: 500,
                  }}
                >
                  {question.questionCategory}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Tags */}
          {question.tags && question.tags.length > 0 && (
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
                    Tags
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {question.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: "primary.main",
                          color: "primary.main",
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Assigned Organizations */}
          {question.assignedOrganizations && question.assignedOrganizations.length > 0 && (
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
                        backgroundColor: "warning.main",
                      }}
                    />
                    Assigned Organizations
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {question.assignedOrganizations.map((org, index) => (
                      <Chip
                        key={index}
                        label={org}
                        size="small"
                        color="primary"
                        sx={{ fontWeight: 500 }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Explanation */}
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
                      backgroundColor: "error.main",
                    }}
                  />
                  Explanation
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.primary",
                    lineHeight: 1.6,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {question.explanation}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionDetailsDialog;
