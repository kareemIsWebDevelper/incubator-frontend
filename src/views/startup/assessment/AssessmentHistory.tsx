"use client";

import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  LinearProgress,
  Avatar,
} from "@mui/material";
import moment from "moment";

// Define type for assessment history items
interface AssessmentHistoryItem {
  id: string;
  title: string;
  date: string;
  score: number;
  status: "completed" | "in-progress" | "pending";
  category: string;
  evaluator?: string;
  evaluatorAvatar?: string;
}

const AssessmentHistory = () => {
  // Sample assessment history data
  const assessmentHistoryData: AssessmentHistoryItem[] = [
    {
      id: "1",
      title: "Business Model Assessment",
      date: "2025-05-01",
      score: 85,
      status: "in-progress",
      category: "Business",
      evaluator: "John Smith",
      evaluatorAvatar: "/images/avatars/1.png",
    },
    {
      id: "2",
      title: "Technical Infrastructure Assessment",
      date: "2025-04-25",
      score: 72,
      status: "completed",
      category: "Technical",
      evaluator: "Emily Johnson",
      evaluatorAvatar: "/images/avatars/2.png",
    },
  ];

  return (
    <Grid container spacing={4}>
      {assessmentHistoryData.map((assessment) => (
        <Grid item xs={12} key={assessment.id}>
          <Card className="border hover:shadow-md transition-shadow">
            <CardContent>
              <Box className="flex justify-between items-start">
                <Box>
                  <Typography
                    variant="h5"
                    className="text-primary mb-2"
                    fontWeight="bold"
                  >
                    {assessment.title}
                  </Typography>
                  <Box className="flex gap-2 items-center">
                    <Chip
                      label={assessment.status}
                      // icon={<i className="tabler-scale" />}
                      variant="outlined"
                      size="small"
                      color={
                        assessment?.status === "completed"
                          ? "success"
                          : "primary"
                      }
                    />
                    <Chip
                      label={moment(assessment.date).format("MMM D, YYYY")}
                      icon={<i className="tabler-calendar" />}
                      variant="filled"
                      size="small"
                      color="default"
                    />
                  </Box>
                </Box>
                {assessment?.status !== "completed" && (
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => alert("View Details")}
                  >
                    Continue
                    <i className="tabler-arrow-right mis-2 text-lg" />
                  </Button>
                )}
              </Box>

              {assessment.status !== "pending" && (
                <Box className="mt-4">
                  <Box className="flex justify-between mb-1">
                    <Typography variant="body2">Progress</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {assessment.status === "completed" ? "100%" : "65%"}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={assessment.status === "completed" ? 100 : 65}
                    color={
                      assessment.status === "completed" ? "success" : "primary"
                    }
                    className="rounded-lg h-2"
                  />
                </Box>
              )}

              {assessment.evaluator && (
                <Box className="mt-4 pt-4 border-t border-gray-100">
                  <Box className="flex items-center gap-2">
                    <Avatar
                      src={assessment.evaluatorAvatar}
                      alt={assessment.evaluator}
                      sx={{ width: 32, height: 32 }}
                    />
                    <Box>
                      <Typography variant="body2" className="font-medium">
                        Evaluated by {assessment.evaluator}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {assessment.status === "completed"
                          ? "Final Assessment"
                          : "In Review"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AssessmentHistory;
