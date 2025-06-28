"use client";
import { useState } from "react";
import React from "react";
import Questionnaire from "./Questionnaire";
import AssessmentHistory from "./AssessmentHistory";
import { db } from "@/fake-db/pages/assessment";
import { Grid, Paper, Tab, Tabs } from "@mui/material";
import AssessmentAnalysis from "./AssessmentAnalysis";

const StartupAssessment = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <Grid>
      <Paper className="shadow-sm" sx={{ padding: 2.5, marginBottom: 5 }}>
        <Tabs
          value={activeIndex}
          onChange={(event, newValue) => setActiveIndex(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="standard"
          sx={{ borderBottom: "none" }}
        >
          <Tab label="Analysis" sx={{ marginInlineEnd: 2 }} />
          <Tab label="Questions" sx={{ marginInlineEnd: 2 }} />
          <Tab label="History" />
        </Tabs>
      </Paper>

      {activeIndex === 0 ? (
        <AssessmentAnalysis />
      ) : activeIndex === 1 ? (
        <Questionnaire assessmentData={db} />
      ) : (
        <AssessmentHistory />
      )}
    </Grid>
  );
};

export default StartupAssessment;
