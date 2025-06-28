"use client";

import { FormsType } from "@/types/apps/formsTypes";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import React from "react";
import FormsTable from "./FormsTable";

const FormsList = ({ formsData }: { formsData: Array<FormsType> }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" className="mbe-1" fontWeight="bold">
          Forms List
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormsTable formsData={formsData} />
      </Grid>
    </Grid>
  );
};

export default FormsList;
