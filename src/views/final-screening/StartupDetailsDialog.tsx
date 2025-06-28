"use client";

// React Imports
import React from "react";

// MUI Imports
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
  Chip,
  Grid,
  Card,
  CardContent,
  Divider,
  LinearProgress,
} from "@mui/material";

// Types Imports
import { FinalScreeningStartupType } from "@/types/finalScreeningTypes";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";

interface StartupDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  startup: FinalScreeningStartupType | null;
  onAssignJudgers?: () => void;
  onViewEvaluation?: () => void;
}

const StartupDetailsDialog: React.FC<StartupDetailsDialogProps> = ({
  open,
  onClose,
  startup,
  onAssignJudgers,
  onViewEvaluation,
}) => {
  if (!startup) return null;

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "not-started":
        return "Not Started";
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  const getProgressPercentage = () => {
    switch (startup.evaluationStatus) {
      case "not-started":
        return 0;
      case "in-progress":
        return 50;
      case "completed":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
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
              <Typography variant="h5" fontWeight="bold" className="mb-1">
                {startup.name}
              </Typography>
              <Typography variant="h6" className="opacity-90" gutterBottom>
                {startup.sector}
              </Typography>
              <Box className="flex items-center gap-2 mt-1">
                <Chip
                  label={getStatusLabel(startup.evaluationStatus)}
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
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12} md={6}>
            <Card className="h-full border">
              <CardContent className="flex flex-col justify-between">
                <Box className="flex items-center gap-2 mb-3">
                  <i
                    className="tabler-info-circle"
                    style={{ fontSize: "20px", color: "#666" }}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    Basic Information
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight="medium"
                    className="mb-1"
                  >
                    Sector
                  </Typography>
                  <Chip
                    label={startup.sector}
                    variant="outlined"
                    className="font-medium shadow-sm"
                  />
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight="medium"
                    className="mb-2"
                  >
                    Founders ({startup.founders.length})
                  </Typography>
                  <Box className="flex flex-wrap gap-1">
                    {startup.founders.map((founder, index) => (
                      <Chip
                        key={index}
                        label={founder}
                        variant="outlined"
                        size="small"
                        className="font-medium shadow-sm"
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Evaluation Status */}
          <Grid item xs={12} md={6}>
            <Card className="h-full border">
              <CardContent className="flex flex-col justify-between h-full">
                <Box className="flex items-center gap-2 mb-3">
                  <i
                    className="tabler-chart-line"
                    style={{ fontSize: "20px", color: "#666" }}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    Evaluation Status
                  </Typography>
                </Box>
                <Box
                  className="flex-grow flex flex-col justify-between"
                >
                  <Box>
                    <Box
                      className="flex justify-between items-center mb-2"
                    >
                      <Typography variant="body2" color="text.secondary">
                        Progress
                      </Typography>
                      <Chip
                        label={getStatusLabel(startup.evaluationStatus)}
                        variant="outlined"
                        size="small"
                        className="font-semibold shadow-sm"
                      />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={getProgressPercentage()}
                      className="h-2 rounded"
                    />
                  </Box>
                  <Box className="flex justify-between items-center mt-4">
                    {startup.finalScore !== undefined && (
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Final Score
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                          {startup.finalScore.toFixed(1)}
                        </Typography>
                      </Box>
                    )}
                    {startup.rank !== undefined && (
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Current Rank
                        </Typography>
                        <Chip
                          label={`#${startup.rank}`}
                          variant="outlined"
                          className="font-bold text-base shadow-sm"
                          size="medium"
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Assigned Judgers */}
          <Grid item xs={12}>
            <Card className="h-full border">
              <CardContent className="p-6">
                <Box
                  className="flex justify-between items-center mb-6"
                >
                  <Box className="flex items-center gap-2">
                    <i
                      className="tabler-users"
                      style={{ fontSize: "20px", color: "#666" }}
                    />
                    <Typography variant="h6" fontWeight="bold">
                      Assigned Judgers ({startup.assignedJudgers.length})
                    </Typography>
                  </Box>
                  <Button
                    variant="tonal"
                    size="small"
                    startIcon={<i className="tabler-user-plus" />}
                    onClick={onAssignJudgers}
                  >
                    Manage Judgers
                  </Button>
                </Box>
                {startup.assignedJudgers.length === 0 ? (
                  <Box
                    className="text-center py-8 rounded border border-dashed border-gray-300"
                  >
                    <i
                      className="tabler-user-x"
                      style={{
                        fontSize: "24px",
                        color: "#999",
                        marginBottom: "8px",
                      }}
                    />
                    <Typography color="text.secondary" className="mb-4">
                      No judgers assigned yet
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<i className="tabler-user-plus" />}
                      onClick={onAssignJudgers}
                    >
                      Assign Judgers
                    </Button>
                  </Box>
                ) : (
                  <Grid container spacing={2}>
                    {startup.assignedJudgers.map((judger, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box
                          className="flex items-center gap-2 py-2 px-4 border border-gray-200 rounded hover:border-primary transition-colors shadow-sm"
                        >
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              fontSize: "0.9rem",
                            }}
                          >
                            {judger
                              .split(" ")
                              .map((name) => name.charAt(0))
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </Avatar>
                          <Typography variant="body2" fontWeight="medium">
                            {judger}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions className="mt-6">
        <Button onClick={onClose} variant="text" color="secondary" sx={{ minWidth: 100 }}>
          Close
        </Button>
        <Button
          variant="contained"
          startIcon={<i className="tabler-chart-bar" />}
          onClick={onViewEvaluation}
          sx={{ minWidth: 180 }}
        >
          View Evaluation Details
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StartupDetailsDialog;
