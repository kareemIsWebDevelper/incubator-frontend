"use client";

import React from "react";
import { Typography, Grid } from "@mui/material";

// Component Imports
import SurveysResultsTable from "./SurveysResultsTable";

// Types
import { SurveyResultType } from "@/types/surveysResultsTypes";

const SurveysResults = ({ data }: { data: SurveyResultType[] }) => {

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Typography variant="h4" className="mb-1" fontWeight="bold">
              Survey Results
            </Typography>
            <Typography variant="body1" color="text.secondary">
              View and analyze survey responses from users across different programs
            </Typography>
          </div>
        </div>
      </Grid>

      <Grid item xs={12}>
        <SurveysResultsTable resultsData={data} />
      </Grid>
    </Grid>
  );
};

export default SurveysResults;