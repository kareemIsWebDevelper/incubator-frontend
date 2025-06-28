"use client";

// React Imports
import React from "react";

// MUI Imports
import { Button, Grid, Typography, Card, CardContent, Box } from "@mui/material";

// Components Imports
import FinalScreeningTable from "./FinalScreeningTable";

// Types Imports
import { FinalScreeningStartupType, JudgerAssignmentType } from "@/types/finalScreeningTypes";

// Mock data - replace with actual API calls
const mockStartups: FinalScreeningStartupType[] = [
  {
    id: "1",
    name: "TechVision AI",
    logo: "/images/startups/techvision.png",
    sector: "Artificial Intelligence",
    founders: ["John Smith", "Sarah Wilson"],
    assignedJudgers: ["Dr. Emily Davis", "Prof. Robert Chen"],
    evaluationStatus: "completed",
    finalScore: 8.7,
    rank: 1,
    currentProgram: "Accelerator Program",
    currentStep: "Market Validation",
  },
  {
    id: "2",
    name: "GreenTech Solutions",
    logo: "/images/startups/greentech.png",
    sector: "Clean Energy",
    founders: ["Mike Johnson", "Lisa Brown", "Alex Thompson"],
    assignedJudgers: ["Dr. Maria Garcia"],
    evaluationStatus: "in-progress",
    finalScore: 7.9,
    rank: 2,
    currentProgram: "Incubator Program",
    currentStep: "Business Model Canvas",
  },
  {
    id: "3",
    name: "HealthCare Plus",
    logo: "/images/startups/healthcare.png",
    sector: "Healthcare",
    founders: ["David Lee", "Amy Chen"],
    assignedJudgers: [],
    evaluationStatus: "not-started",
    currentProgram: "Seed Fund Program",
    currentStep: "Initial Assessment",
  },
  {
    id: "4",
    name: "FinTech Innovations",
    logo: "/images/startups/fintech.png",
    sector: "Financial Technology",
    founders: ["James Wilson", "Rachel Kim", "Tom Anderson"],
    assignedJudgers: ["Dr. Emily Davis", "Prof. Robert Chen", "Dr. Maria Garcia"],
    evaluationStatus: "completed",
    finalScore: 8.2,
    rank: 3,
    currentProgram: "Growth Program",
    currentStep: "Technical Assessment",
  },
  {
    id: "5",
    name: "EduTech Revolution",
    logo: "/images/startups/edutech.png",
    sector: "Education Technology",
    founders: ["Sophie Martinez", "Carlos Rodriguez"],
    assignedJudgers: ["Prof. Robert Chen"],
    evaluationStatus: "in-progress",
    currentProgram: "Accelerator Program",
    currentStep: "MVP Development",
  },
  {
    id: "6",
    name: "Smart Logistics",
    logo: "/images/startups/logistics.png",
    sector: "Logistics & Supply Chain",
    founders: ["Mark Taylor", "Jessica Liu"],
    assignedJudgers: ["Dr. Emily Davis", "Dr. Maria Garcia"],
    evaluationStatus: "not-started",
    currentProgram: "Venture Studio",
    currentStep: "Concept Validation",
  },
];

const mockJudgers = [
  "Dr. Emily Davis",
  "Prof. Robert Chen", 
  "Dr. Maria Garcia",
  "Prof. Michael Chen",
  "Dr. Sarah Johnson",
  "Mr. Ahmed Hassan",
  "Ms. Lisa Thompson",
  "Robert Chen",
  "Ms. Maria Garcia",
  "Dr. David Lee",
  "Prof. Jennifer Brown",
  "Mr. Alex Rodriguez"
];

const FinalScreening: React.FC = () => {
  const [startupsData, setStartupsData] = React.useState(mockStartups);
  const [judgers] = React.useState(mockJudgers);

  const handleJudgerAssignment = (assignments: JudgerAssignmentType[]) => {
    setStartupsData((prev) =>
      prev.map((startup) => {
        const assignment = assignments.find((a) => a.startupId === startup.id);
        if (assignment) {
          return {
            ...startup,
            assignedJudgers: assignment.judgerIds,
          };
        }
        return startup;
      })
    );
    console.log("Judger assignments:", assignments);
  };

  const handleUpdate = (updatedStartup: FinalScreeningStartupType) => {
    setStartupsData((prev) =>
      prev.map((startup) =>
        startup.id === updatedStartup.id ? updatedStartup : startup
      )
    );
    console.log("Updated startup:", updatedStartup);
  };

  const handleDelete = (startupId: string) => {
    setStartupsData((prev) =>
      prev.filter((startup) => startup.id !== startupId)
    );
    console.log("Deleted startup with ID:", startupId);
  };

  // Calculate summary statistics
  const summaryStats = React.useMemo(() => {
    const totalStartups = startupsData.length;
    const assignedStartups = startupsData.filter(s => s.assignedJudgers.length > 0).length;
    const completedEvaluations = startupsData.filter(s => s.evaluationStatus === 'completed').length;
    const inProgressEvaluations = startupsData.filter(s => s.evaluationStatus === 'in-progress').length;
    const averageScore = startupsData
      .filter(s => s.finalScore !== undefined)
      .reduce((sum, s) => sum + (s.finalScore || 0), 0) / 
      startupsData.filter(s => s.finalScore !== undefined).length || 0;

    return {
      totalStartups,
      assignedStartups,
      completedEvaluations,
      inProgressEvaluations,
      averageScore,
    };
  }, [startupsData]);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h4" className="mbe-1" fontWeight="bold">
          Final Screening
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Assign judgers to startups and monitor final evaluation progress
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} className="flex justify-end items-center">
        <Button
          variant="contained"
          color="primary"
          startIcon={<i className="tabler-download" />}
          onClick={() => console.log("Export data")}
        >
          Export
        </Button>
      </Grid>

      {/* Summary Cards */}
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="h-24 flex items-center">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: 'info.light',
                      color: 'info.contrastText'
                    }}
                  >
                    <i className="tabler-users text-xl" />
                  </Box>
                  <Box>
                    <Typography variant="h4">{summaryStats.totalStartups}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Total Startups
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="h-24 flex items-center">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: 'primary.light',
                      color: 'primary.contrastText'
                    }}
                  >
                    <i className="tabler-user-check text-xl" />
                  </Box>
                  <Box>
                    <Typography variant="h4">{summaryStats.assignedStartups}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Assigned Judgers
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="h-24 flex items-center">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: 'success.light',
                      color: 'success.contrastText'
                    }}
                  >
                    <i className="tabler-check text-xl" />
                  </Box>
                  <Box>
                    <Typography variant="h4">{summaryStats.completedEvaluations}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Completed
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="h-24 flex items-center">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: 'warning.light',
                      color: 'warning.contrastText'
                    }}
                  >
                    <i className="tabler-chart-line text-xl" />
                  </Box>
                  <Box>
                    <Typography variant="h4">
                      {summaryStats.averageScore ? summaryStats.averageScore.toFixed(1) : '—'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Average Score
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Final Screening Table */}
      <Grid item xs={12}>
        <FinalScreeningTable
          data={startupsData}
          judgers={judgers}
          onAssignJudgers={handleJudgerAssignment}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </Grid>
    </Grid>
  );
};

export default FinalScreening;