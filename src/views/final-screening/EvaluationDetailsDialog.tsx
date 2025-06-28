"use client";

// React Imports
import React, { useState } from "react";

// MUI Imports
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Avatar,
  Grid,
  Card,
  CardContent,
  Rating,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  ButtonGroup,
  Button,
  CardHeader,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Types Imports
import { FinalScreeningStartupType } from "@/types/finalScreeningTypes";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";

// Utility Imports
import moment from "moment";

// Styled Components
const ScoreCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.lightOpacity} 100%)`,
  color: theme.palette.primary.contrastText,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    width: "120px",
    height: "120px",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "50%",
    transform: "translate(40px, -40px)",
  },
}));

interface Props {
  open: boolean;
  onClose: () => void;
  startup: FinalScreeningStartupType | null;
}

// Mock evaluation data
const mockEvaluationData = {
  criteria: [
    {
      name: "Business Model Assessment",
      weight: 30,
      subCriteria: [
        { name: "Market Opportunity", score: 8.5, weight: 30 },
        { name: "Revenue Model", score: 7.8, weight: 25 },
        { name: "Competitive Advantage", score: 8.2, weight: 25 },
        { name: "Scalability", score: 8.0, weight: 20 },
      ],
    },
    {
      name: "Technical Evaluation",
      weight: 25,
      subCriteria: [
        { name: "Technology Innovation", score: 9.0, weight: 40 },
        { name: "Technical Feasibility", score: 8.3, weight: 35 },
        { name: "IP & Patents", score: 7.5, weight: 25 },
      ],
    },
    {
      name: "Team Assessment",
      weight: 20,
      subCriteria: [
        { name: "Team Experience", score: 8.7, weight: 50 },
        { name: "Team Diversity", score: 8.0, weight: 30 },
        { name: "Leadership", score: 8.5, weight: 20 },
      ],
    },
    {
      name: "Market Potential",
      weight: 25,
      subCriteria: [
        { name: "Market Size", score: 8.8, weight: 40 },
        { name: "Growth Potential", score: 8.2, weight: 35 },
        { name: "Market Entry Strategy", score: 7.9, weight: 25 },
      ],
    },
  ],
  judgerFeedback: [
    {
      judger: "Dr. Emily Davis",
      overallScore: 8.7,
      feedback:
        "Excellent business model with strong technical foundation. The team shows great potential for scaling.",
      date: "2024-01-20",
    },
    {
      judger: "Prof. Robert Chen",
      overallScore: 8.2,
      feedback:
        "Solid technical innovation, but market entry strategy needs refinement. Strong team dynamics.",
      date: "2024-01-21",
    },
  ],
};

const EvaluationDetailsDialog = ({ open, onClose, startup }: Props) => {
  const [activeSection, setActiveSection] = useState<"breakdown" | "feedback">(
    "breakdown"
  );

  if (!startup) return null;

  const calculateCriteriaScore = (criteria: any) => {
    return criteria.subCriteria.reduce(
      (sum: number, sub: any) => sum + (sub.score * sub.weight) / 100,
      0
    );
  };

  const finalScore = mockEvaluationData.criteria.reduce(
    (sum, criteria) =>
      sum + (calculateCriteriaScore(criteria) * criteria.weight) / 100,
    0
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      PaperProps={{
        sx: {
          minHeight: "90vh",
          padding: { xs: 0, sm: 3, md: 4 },
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
        },
      }}
      // Make the dialog full screen on mobile devices
      aria-labelledby="screening-dialog-title"
      fullScreen={typeof window !== undefined ? window.innerWidth < 600 : false}
      scroll="paper"
    >
      <DialogCloseButton onClick={onClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      <DialogTitle>
        <Box className="flex justify-between items-center">
          <Box className="flex items-center gap-3">
            <Avatar
              src={startup.logo}
              alt={startup.name}
              className="w-16 h-16 border-3 shadow-sm"
            >
              {startup.name.charAt(0).toUpperCase()}
            </Avatar>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Typography variant="h5" fontWeight="bold">
                  {startup.name}
                </Typography>
                <Box className="flex items-center gap-2 mis-4">
                  <Chip
                    label={`Score: ${finalScore.toFixed(1)}/10`}
                    variant="tonal"
                    size="small"
                  />
                  {startup.rank && (
                    <Chip
                      label={`Rank #${startup.rank}`}
                      variant="tonal"
                      size="small"
                    />
                  )}
                </Box>
              </div>
              <Typography variant="h6" sx={{ opacity: 0.9 }} gutterBottom>
                Evaluation Results
              </Typography>
            </div>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} className="mb-4">
            <Button
              variant={activeSection === "breakdown" ? "contained" : "tonal"}
              onClick={() => setActiveSection("breakdown")}
              startIcon={<i className="tabler-chart-pie" />}
              size="small"
              className="me-2"
            >
              Score Breakdown
            </Button>
            <Button
              variant={activeSection === "feedback" ? "contained" : "tonal"}
              onClick={() => setActiveSection("feedback")}
              startIcon={<i className="tabler-message-2" />}
              size="small"
            >
              Judger Feedback
            </Button>
          </Grid>

          {/* Toggle Buttons */}
          <Grid item xs={12}>
            {/* Score Breakdown Section */}
            {activeSection === "breakdown" && (
              <Box>
                <div className="flex items-center gap-2 mb-4">
                  <i className="tabler-chart-pie text-xl text-primary" />
                  <Typography variant="h6" fontWeight="bold">
                    Score Breakdown by Criteria
                  </Typography>
                </div>
                <Grid container spacing={2}>
                  {mockEvaluationData.criteria.map((criteria, index) => (
                    <Grid item xs={12} sm={6} md={6} key={index}>
                      <Card className="h-full">
                        <CardContent>
                          <Box className="flex justify-between items-center mb-2">
                            <Typography
                              variant="body1"
                              fontWeight="600"
                              color="text.primary"
                            >
                              {criteria.name}
                            </Typography>
                            <Chip
                              label={`${calculateCriteriaScore(criteria).toFixed(1)}/10`}
                              color="primary"
                              variant="filled"
                              size="small"
                              sx={{ fontWeight: "bold" }}
                            />
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={
                              (calculateCriteriaScore(criteria) / 10) * 100
                            }
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              mb: 2,
                              bgcolor: "grey.200",
                              "& .MuiLinearProgress-bar": {
                                borderRadius: 4,
                              },
                            }}
                          />
                          <Box
                            sx={{
                              pl: 2,
                              bgcolor: "grey.50",
                              borderRadius: 1,
                              p: 2,
                            }}
                          >
                            {criteria.subCriteria.map((sub, subIndex) => (
                              <Box
                                key={subIndex}
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  py: 0.5,
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {sub.name} ({sub.weight}%)
                                </Typography>
                                <Typography variant="body2" fontWeight="medium">
                                  {sub.score}/10
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Judger Feedback Section */}
            {activeSection === "feedback" && (
              <div className="flex flex-col">
                <Box className="flex items-center gap-2 mb-4">
                  <i className="tabler-message-2 text-primary text-xl" />
                  <Typography variant="h6" fontWeight="bold">
                    Judger Feedback ({mockEvaluationData.judgerFeedback.length})
                  </Typography>
                </Box>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead className="bg-gray-100">
                      <TableRow>
                        <TableCell>Judger</TableCell>
                        <TableCell align="center">Score</TableCell>
                        <TableCell>Feedback</TableCell>
                        <TableCell align="center">Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockEvaluationData.judgerFeedback.map(
                        (feedback, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:hover": { bgcolor: "grey.50" },
                              transition: "background-color 0.2s ease",
                            }}
                          >
                            <TableCell>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 2,
                                }}
                              >
                                <Avatar className="w-10 h-10 border shadow-sm">
                                  {feedback.judger
                                    .split(" ")
                                    .map((name) => name.charAt(0))
                                    .join("")
                                    .slice(0, 2)}
                                </Avatar>
                                <Typography variant="body2" fontWeight="medium">
                                  {feedback.judger}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                label={`${feedback.overallScore}/10`}
                                color="primary"
                                variant="tonal"
                                size="small"
                                sx={{ fontWeight: "bold" }}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="body2"
                                sx={{ lineHeight: 1.6 }}
                              >
                                {feedback.feedback}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {moment(feedback.date).format("MMM D, YYYY")}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}
          </Grid>
        </Grid>
      </DialogContent>

      {/* <DialogActions
        sx={{
          p: 3,
          bgcolor: "grey.100",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Button onClick={onClose} variant="outlined" sx={{ minWidth: 100 }}>
          Close
        </Button>
        <Button
          variant="outlined"
          startIcon={<i className="tabler-download" />}
          onClick={() =>
            console.log("Export evaluation report for:", startup.name)
          }
          sx={{ minWidth: 140 }}
        >
          Export Report
        </Button>
        <Button
          variant="contained"
          startIcon={<i className="tabler-edit" />}
          onClick={() => console.log("Edit evaluation for:", startup.name)}
          sx={{
            minWidth: 140,
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            "&:hover": {
              background: "linear-gradient(45deg, #1976D2 30%, #0097A7 90%)",
            },
          }}
        >
          Edit Evaluation
        </Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default EvaluationDetailsDialog;
