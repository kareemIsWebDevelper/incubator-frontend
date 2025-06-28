"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Chip,
  Box,
  Divider,
} from "@mui/material";

// Component Imports
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";

// Types
import { SurveyType } from "@/types/surveyTypes";

interface SurveyDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  survey: SurveyType | null;
  onViewResults: (survey: SurveyType) => void;
}

const SurveyDetailsDialog = ({
  open,
  onClose,
  survey,
  onViewResults,
}: SurveyDetailsDialogProps) => {
  if (!survey) return null;

  const handleViewResults = () => {
    onViewResults(survey);
    onClose();
  };

  const getEngagementText = (rate: number) => {
    if (rate >= 80) return "Excellent";
    if (rate >= 60) return "Good";
    if (rate >= 40) return "Fair";
    return "Poor";
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={open}
      onClose={onClose}
      sx={{ 
        "& .MuiDialog-paper": { 
          overflow: "visible",
          borderRadius: 2,
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)'
        } 
      }}
      aria-labelledby="survey-details-dialog-title"
    >
      <DialogCloseButton onClick={onClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>

      <DialogTitle id="survey-details-dialog-title">
        <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
          Survey Details
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        <Grid container spacing={3}>
          {/* Survey Title */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, color: 'text.primary' }}>
              {survey.title}
            </Typography>
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
              Description
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.6 }}>
              {survey.description || "No description available"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ borderColor: 'divider' }} />
          </Grid>

          {/* Context Information */}
          {(survey.program || survey.startup || survey.mentor) && (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Context Information
                </Typography>
              </Grid>

              {/* Program */}
              {survey.program && (
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    sx={{ fontWeight: 500 }}
                  >
                    Program
                  </Typography>
                  <Box>
                    <Typography variant="body1" fontWeight="medium" color="text.primary">
                      {survey.program.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {survey.program.description}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label={`${survey.program.participantCount} participants`}
                        size="small"
                        variant="outlined"
                        sx={{ 
                          borderColor: 'divider',
                          color: 'text.secondary',
                          backgroundColor: 'grey.50'
                        }}
                      />
                      <Chip
                        label={`${survey.program.mentorCount} mentors`}
                        size="small"
                        variant="outlined"
                        sx={{ 
                          borderColor: 'divider',
                          color: 'text.secondary',
                          backgroundColor: 'grey.50'
                        }}
                      />
                      <Chip
                        label={survey.program.isActive ? "Active" : "Inactive"}
                        size="small"
                        variant="filled"
                        sx={{ 
                          backgroundColor: survey.program.isActive ? 'grey.200' : 'grey.100',
                          color: 'text.primary',
                          '&:hover': {
                            backgroundColor: survey.program.isActive ? 'grey.300' : 'grey.200'
                          }
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              )}

              {/* Startup */}
              {survey.startup && (
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    sx={{ fontWeight: 500 }}
                  >
                    Startup
                  </Typography>
                  <Box>
                    <Typography variant="body1" fontWeight="medium" color="text.primary">
                      {survey.startup.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {survey.startup.sector}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {survey.startup.city}, {survey.startup.state},{" "}
                      {survey.startup.country}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        mt: 1,
                      }}
                    >
                      {survey.startup.founders.map((founder, index) => (
                        <Chip
                          key={index}
                          label={`${founder.name} (${founder.role})`}
                          size="small"
                          variant="outlined"
                          sx={{ 
                            borderColor: 'divider',
                            color: 'text.secondary',
                            backgroundColor: 'grey.50'
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>
              )}

              {/* Mentor */}
              {survey.mentor && (
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    sx={{ fontWeight: 500 }}
                  >
                    Mentor
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box>
                      <Typography variant="body1" fontWeight="medium" color="text.primary">
                        {survey.mentor.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {survey.mentor.title}
                      </Typography>
                      {survey.mentor.rating && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            mt: 0.5
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Rating: {survey.mentor.rating}/5
                          </Typography>
                          <i
                            className="tabler-star-filled"
                            style={{ fontSize: 16, color: "#9E9E9E" }}
                          />
                        </Box>
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 0.5,
                          mt: 1,
                        }}
                      >
                        {survey.mentor.mentorExpertises.map(
                          (expertise, index) => (
                            <Chip
                              key={index}
                              label={expertise.title}
                              size="small"
                              variant="outlined"
                              sx={{ 
                                borderColor: 'divider',
                                color: 'text.secondary',
                                backgroundColor: 'grey.50'
                              }}
                            />
                          )
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              )}

              <Grid item xs={12}>
                <Divider sx={{ borderColor: 'divider' }} />
              </Grid>
            </>
          )}

          {/* Organization */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
              Organization
            </Typography>
            <Typography variant="body1" fontWeight="medium" color="text.primary">
              {survey.organization.name}
            </Typography>
          </Grid>

          {/* Status */}
          {/* <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Status
            </Typography>
            <Chip
              label={
                survey.status.charAt(0).toUpperCase() + survey.status.slice(1)
              }
              size="small"
              variant="outlined"
              sx={{ textTransform: "capitalize" }}
            />
          </Grid> */}

          {/* Scope */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
              Scope
            </Typography>
            <Chip
              label={
                survey.scope
                  ? survey.scope.charAt(0).toUpperCase() + survey.scope.slice(1)
                  : "N/A"
              }
              size="small"
              variant="outlined"
              sx={{ 
                borderColor: 'divider',
                color: 'text.secondary',
                backgroundColor: 'grey.50',
                textTransform: 'capitalize'
              }}
            />
          </Grid>

          {/* Triggered After */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
              Triggered After
            </Typography>
            <Chip
              label={
                survey.triggeredAfter
                  ? survey.triggeredAfter.charAt(0).toUpperCase() +
                    survey.triggeredAfter.slice(1)
                  : "N/A"
              }
              size="small"
              variant="outlined"
              sx={{ 
                borderColor: 'divider',
                color: 'text.secondary',
                backgroundColor: 'grey.50',
                textTransform: 'capitalize'
              }}
            />
          </Grid>

          {/* Engagement Rate */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
              Engagement Rate
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                {survey.engagementRate?.toFixed(1) || "0"}%
              </Typography>
              <Chip
                label={getEngagementText(survey.engagementRate || 0)}
                size="small"
                variant="filled"
                sx={{ 
                  backgroundColor: 'grey.200',
                  color: 'text.primary',
                  fontWeight: 500
                }}
              />
            </Box>
          </Grid>

          {/* Total Responses */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
              Total Responses
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="text.primary">
              {survey.totalResponses || 0}
            </Typography>
          </Grid>

          {/* Questions Count */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
              Questions
            </Typography>
            <Typography variant="body1" color="text.primary">
              {survey.questions.length} question
              {survey.questions.length !== 1 ? "s" : ""}
            </Typography>
          </Grid>

          {/* Tags */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
              Tags
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {survey.tags.length > 0 ? (
                survey.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{ 
                      borderColor: 'divider',
                      color: 'text.secondary',
                      backgroundColor: 'grey.50'
                    }}
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No tags
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ borderColor: 'divider' }} />
          </Grid>

          {/* Dates */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
              Created At
            </Typography>
            <Typography variant="body2" color="text.primary">
              {new Date(survey.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
              Last Updated
            </Typography>
            <Typography variant="body2" color="text.primary">
              {new Date(survey.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <Divider sx={{ borderColor: 'divider' }} />

      <DialogActions sx={{ p: 3, justifyContent: 'flex-end' }}>
        <Button 
          variant="text" 
          color="secondary" 
          onClick={onClose}
        >
          Close
        </Button>
        {/* <Button
          variant="contained"
          startIcon={<i className="tabler-chart-bar" />}
          onClick={handleViewResults}
          disabled={!survey.totalResponses || survey.totalResponses === 0}
        >
          View Results
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default SurveyDetailsDialog;
