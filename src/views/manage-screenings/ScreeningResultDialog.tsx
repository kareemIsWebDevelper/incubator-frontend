"use client";

// React Imports
import React, { useState, useMemo } from "react";

// MUI Imports
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Box } from "@mui/material";
import { Chip } from "@mui/material";
import { Avatar } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Rating } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { Paper } from "@mui/material";
import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import { Button } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuList } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";

// Component Imports
import CustomTextField from "@core/components/mui/TextField";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";

// Type Imports
import { ScreeningType } from "@/types/screeningTypes";
import { StartupType } from "@/types/startupTypes";
import { StepType } from "@/types/stepTypes";

interface ScreeningResultDialogProps {
  open: boolean;
  onClose: () => void;
  screening: ScreeningType | null;
}

// Mock data for demonstration
const mockStartups: StartupType[] = [
  {
    id: "1",
    logo: "/images/logos/startup1.png",
    name: "TechFlow Solutions",
    sector: "Technology",
    establishmentDate: "2023-01-15",
    state: "California",
    country: "USA",
    city: "San Francisco",
    founders: [
      { name: "John Smith", role: "CEO" },
      { name: "Sarah Johnson", role: "CTO" },
    ],
    sustainabilityGoals: ["Clean Energy", "Digital Innovation"],
  },
  {
    id: "2",
    logo: "/images/logos/startup2.png",
    name: "GreenEco Innovations",
    sector: "Environment",
    establishmentDate: "2023-03-20",
    state: "New York",
    country: "USA",
    city: "New York City",
    founders: [
      { name: "Emily Davis", role: "CEO" },
      { name: "Michael Chen", role: "COO" },
    ],
    sustainabilityGoals: ["Environmental Protection", "Renewable Energy"],
  },
  {
    id: "3",
    logo: "/images/logos/startup3.png",
    name: "HealthTech Pro",
    sector: "Healthcare",
    establishmentDate: "2022-11-10",
    state: "Texas",
    country: "USA",
    city: "Austin",
    founders: [
      { name: "Dr. Lisa Thompson", role: "CEO" },
      { name: "Robert Wilson", role: "CTO" },
    ],
    sustainabilityGoals: ["Healthcare Innovation", "Digital Health"],
  },
];

const mockProgramSteps: StepType[] = [
  {
    id: "step1",
    title: "Business Model Canvas",
    description: "Initial business model evaluation",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-15"),
    program: { id: "1", title: "Innovation Hub Program" },
    stepType: "screening",
  },
  {
    id: "step2",
    title: "Technical Assessment",
    description: "Technical feasibility review",
    startDate: new Date("2024-01-16"),
    endDate: new Date("2024-01-30"),
    program: { id: "1", title: "Innovation Hub Program" },
    stepType: "assessment",
  },
  {
    id: "step3",
    title: "Market Research",
    description: "Market analysis and validation",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-02-14"),
    program: { id: "1", title: "Innovation Hub Program" },
    stepType: "evaluation",
  },
];

// Mock evaluation data
const mockEvaluationData = {
  "1": {
    step1: {
      score: 8.5,
      evaluatedBy: ["Emily Davis", "Robert Chen"],
      completedAt: "2024-01-12",
    },
    step2: {
      score: 7.8,
      evaluatedBy: ["Dr. Sarah Johnson", "Prof. Michael Chen"],
      completedAt: "2024-01-28",
    },
    step3: {
      score: 9.2,
      evaluatedBy: ["Emily Davis", "Mr. Ahmed Hassan"],
      completedAt: "2024-02-10",
    },
  },
  "2": {
    step1: {
      score: 7.2,
      evaluatedBy: ["Emily Davis", "Robert Chen"],
      completedAt: "2024-01-14",
    },
    step2: {
      score: 8.9,
      evaluatedBy: ["Dr. Sarah Johnson", "Prof. Michael Chen"],
      completedAt: "2024-01-29",
    },
    step3: {
      score: 8.1,
      evaluatedBy: ["Emily Davis", "Mr. Ahmed Hassan"],
      completedAt: "2024-02-12",
    },
  },
  "3": {
    step1: {
      score: 9.1,
      evaluatedBy: ["Emily Davis", "Robert Chen"],
      completedAt: "2024-01-13",
    },
    step2: {
      score: 8.7,
      evaluatedBy: ["Dr. Sarah Johnson", "Prof. Michael Chen"],
      completedAt: "2024-01-27",
    },
    step3: {
      score: 8.8,
      evaluatedBy: ["Emily Davis", "Mr. Ahmed Hassan"],
      completedAt: "2024-02-11",
    },
  },
};

const ScreeningResultDialog: React.FC<ScreeningResultDialogProps> = ({
  open,
  onClose,
  screening,
}) => {
  const [selectedStep, setSelectedStep] = useState<string>("step1");
  const [exportMenuAnchor, setExportMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  // Calculate average scores for each startup
  const startupsWithScores = useMemo(() => {
    return mockStartups.map((startup) => {
      const evaluations =
        mockEvaluationData[startup.id as keyof typeof mockEvaluationData];
      const scores = Object.values(evaluations || {}).map(
        (evaluation: any) => evaluation.score
      );
      const averageScore =
        scores.length > 0
          ? scores.reduce((a, b) => a + b, 0) / scores.length
          : 0;

      return {
        ...startup,
        averageScore,
        evaluations: evaluations || {},
      };
    });
  }, []);

  const currentStepData = mockProgramSteps.find(
    (step) => step.id === selectedStep
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return "success";
    if (score >= 7.0) return "warning";
    return "error";
  };

  const exportToCSV = () => {
    const headers = [
      "Startup Name",
      "City",
      "State",
      "Sector",
      "Founders",
      "Current Step Score",
      "Overall Average",
      "Progress (%)",
      "Completed Steps",
      "Total Steps",
    ];

    const rows = startupsWithScores.map((startup) => {
      const currentStepEval = startup.evaluations[
        selectedStep as keyof typeof startup.evaluations
      ] as any;
      const completedSteps = Object.keys(startup.evaluations).length;
      const totalSteps = mockProgramSteps.length;
      const progressPercent = (completedSteps / totalSteps) * 100;

      const foundersString = startup.founders
        .map((f) => `${f.name} (${f.role})`)
        .join("; ");

      return [
        startup.name,
        startup.city,
        startup.state,
        startup.sector,
        foundersString,
        currentStepEval ? currentStepEval.score.toFixed(1) : "Not Evaluated",
        startup.averageScore.toFixed(1),
        progressPercent.toFixed(1),
        completedSteps.toString(),
        totalSteps.toString(),
      ];
    });

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `screening-results-${screening?.title?.replace(/\s+/g, "-").toLowerCase()}-${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setExportMenuAnchor(null);
  };

  const exportToExcel = () => {
    const headers = [
      "Startup Name",
      "City",
      "State",
      "Sector",
      "Founders",
      "Current Step Score",
      "Overall Average",
      "Progress (%)",
      "Completed Steps",
      "Total Steps",
    ];

    const rows = startupsWithScores.map((startup) => {
      const currentStepEval = startup.evaluations[
        selectedStep as keyof typeof startup.evaluations
      ] as any;
      const completedSteps = Object.keys(startup.evaluations).length;
      const totalSteps = mockProgramSteps.length;
      const progressPercent = (completedSteps / totalSteps) * 100;

      const foundersString = startup.founders
        .map((f) => `${f.name} (${f.role})`)
        .join("; ");

      return [
        startup.name,
        startup.city,
        startup.state,
        startup.sector,
        foundersString,
        currentStepEval ? currentStepEval.score.toFixed(1) : "Not Evaluated",
        startup.averageScore.toFixed(1),
        progressPercent.toFixed(1),
        completedSteps.toString(),
        totalSteps.toString(),
      ];
    });

    // Create Excel-compatible HTML table
    const htmlContent = `
      <table border="1">
        <thead>
          <tr>
            ${headers.map((header) => `<th>${header}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (row) =>
                `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`
            )
            .join("")}
        </tbody>
      </table>
    `;

    const blob = new Blob([htmlContent], {
      type: "application/vnd.ms-excel;charset=utf-8;",
    });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `screening-results-${screening?.title?.replace(/\s+/g, "-").toLowerCase()}-${new Date().toISOString().split("T")[0]}.xls`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setExportMenuAnchor(null);
  };

  const handleExportMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setExportMenuAnchor(event.currentTarget);
  };

  const handleExportMenuClose = () => {
    setExportMenuAnchor(null);
  };

  // Early return after all hooks
  if (!screening) return null;

  const currentStepJudgers = screening.judgers;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      sx={{ "& .MuiDialog-paper": { overflow: "visible", minHeight: "80vh" } }}
    >
      <DialogCloseButton onClick={onClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>

      <DialogTitle>
        <div className="flex items-center gap-2">
          <i className="tabler-chart-bar text-xl text-primary" />
          <div>
            <Typography variant="h5" component="span">
              Screening Results
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {screening.title} - {screening.programName}
            </Typography>
          </div>
        </div>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          {/* Step Selection */}
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <Typography variant="h6" className="flex items-center gap-2">
                    <i className="tabler-stairs text-lg" />
                    Current Step
                  </Typography>
                  <Chip
                    label={`${screening.evaluatedStartups}/${screening.totalStartups} Evaluated`}
                    color="primary"
                    variant="outlined"
                  />
                </div>
                <CustomTextField
                  select
                  fullWidth
                  value={selectedStep}
                  onChange={(e) => setSelectedStep(e.target.value)}
                  label="Select Program Step"
                >
                  {mockProgramSteps.map((step) => (
                    <MenuItem key={step.id} value={step.id}>
                      <div className="flex items-center gap-2">
                        <i className="tabler-circle-dot text-sm" />
                        <span>{step.title}</span>
                        <Chip
                          size="small"
                          label={step.stepType}
                          variant="outlined"
                        />
                      </div>
                    </MenuItem>
                  ))}
                </CustomTextField>
                {currentStepData && (
                  <Box
                    sx={{
                      mt: 2,
                      p: 2,
                      bgcolor: "action.hover",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2" color="textSecondary">
                      {currentStepData.description}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Duration:{" "}
                      {formatDate(currentStepData.startDate.toISOString())} -{" "}
                      {formatDate(currentStepData.endDate.toISOString())}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Judgers for Current Step */}
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  className="flex items-center gap-2 mb-3"
                >
                  <i className="tabler-users text-lg" />
                  Assigned Judgers
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {currentStepJudgers.map((judger, index) => (
                    <Chip
                      key={index}
                      avatar={
                        <Avatar
                          sx={{ width: 24, height: 24, fontSize: "0.75rem" }}
                        >
                          {judger.charAt(0).toUpperCase()}
                        </Avatar>
                      }
                      label={judger}
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Startups Results Table */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <Typography variant="h6" className="flex items-center gap-2">
                    <i className="tabler-building text-lg" />
                    Registered Startups & Results
                  </Typography>
                  <div>
                    <Button
                      variant="outlined"
                      startIcon={<i className="tabler-download" />}
                      endIcon={<i className="tabler-chevron-down" />}
                      onClick={handleExportMenuOpen}
                      size="small"
                    >
                      Export
                    </Button>
                    <Menu
                      anchorEl={exportMenuAnchor}
                      open={Boolean(exportMenuAnchor)}
                      onClose={handleExportMenuClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <MenuList>
                        <MenuItem onClick={exportToCSV}>
                          <ListItemIcon>
                            <i className="tabler-file-type-csv text-lg" />
                          </ListItemIcon>
                          <ListItemText>Export as CSV</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={exportToExcel}>
                          <ListItemIcon>
                            <i className="tabler-file-type-xls text-lg" />
                          </ListItemIcon>
                          <ListItemText>Export as Excel</ListItemText>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </div>
                </div>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Startup</TableCell>
                        <TableCell>Founders</TableCell>
                        <TableCell>Sector</TableCell>
                        <TableCell>Current Step Score</TableCell>
                        <TableCell>Overall Average</TableCell>
                        <TableCell>Progress</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {startupsWithScores.map((startup) => {
                        const currentStepEval = startup.evaluations[
                          selectedStep as keyof typeof startup.evaluations
                        ] as any;
                        const completedSteps = Object.keys(
                          startup.evaluations
                        ).length;
                        const totalSteps = mockProgramSteps.length;
                        const progressPercent =
                          (completedSteps / totalSteps) * 100;

                        return (
                          <TableRow key={startup.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar
                                  src={startup.logo}
                                  sx={{ width: 40, height: 40 }}
                                >
                                  {startup.name.charAt(0)}
                                </Avatar>
                                <div>
                                  <Typography
                                    variant="body2"
                                    fontWeight="medium"
                                  >
                                    {startup.name}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="textSecondary"
                                  >
                                    {startup.city}, {startup.state}
                                  </Typography>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-1">
                                {startup.founders.map((founder, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-1"
                                  >
                                    <Avatar
                                      sx={{
                                        width: 20,
                                        height: 20,
                                        fontSize: "0.7rem",
                                      }}
                                    >
                                      {founder.name.charAt(0)}
                                    </Avatar>
                                    <Typography variant="caption">
                                      {founder.name} ({founder.role})
                                    </Typography>
                                  </div>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={startup.sector}
                                size="small"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              {currentStepEval ? (
                                <div className="flex items-center gap-2">
                                  <Rating
                                    value={currentStepEval.score / 2}
                                    precision={0.1}
                                    size="small"
                                    readOnly
                                  />
                                  <Chip
                                    label={currentStepEval.score.toFixed(1)}
                                    size="small"
                                    color={
                                      getScoreColor(
                                        currentStepEval.score
                                      ) as any
                                    }
                                  />
                                </div>
                              ) : (
                                <Chip
                                  label="Not Evaluated"
                                  size="small"
                                  variant="outlined"
                                />
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Rating
                                  value={startup.averageScore / 2}
                                  precision={0.1}
                                  size="small"
                                  readOnly
                                />
                                <Chip
                                  label={startup.averageScore.toFixed(1)}
                                  size="small"
                                  color={
                                    getScoreColor(startup.averageScore) as any
                                  }
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <Box
                                sx={{
                                  width: 100,
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <LinearProgress
                                  variant="determinate"
                                  value={progressPercent}
                                  sx={{
                                    flexGrow: 1,
                                    height: 6,
                                    borderRadius: 3,
                                  }}
                                  color={
                                    progressPercent === 100
                                      ? "success"
                                      : "primary"
                                  }
                                />
                                <Typography variant="caption">
                                  {completedSteps}/{totalSteps}
                                </Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Summary Statistics */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h4" color="primary.main">
                      {mockStartups.length}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Total Startups
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h4" color="success.main">
                      {
                        startupsWithScores.filter(
                          (s) =>
                            Object.keys(s.evaluations).length ===
                            mockProgramSteps.length
                        ).length
                      }
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Fully Evaluated
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h4" color="warning.main">
                      {(
                        startupsWithScores.reduce(
                          (sum, s) => sum + s.averageScore,
                          0
                        ) / startupsWithScores.length
                      ).toFixed(1)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Average Score
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h4" color="info.main">
                      {mockProgramSteps.length}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Total Steps
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ScreeningResultDialog;
