import React from "react";
import { db } from "@/fake-db/apps/submissionList";
import SubmissionsTable from "./SubmissionsTable";
import { FormSubmissionType } from "@/types/apps/formsTypes";
import { Grid, Typography } from "@mui/material";

const Submissions = ({
  submissions,
}: {
  submissions: FormSubmissionType[];
}) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant="h4" className="mbe-1" fontWeight="bold">
          Submissions List
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <SubmissionsTable submissions={db} />
      </Grid>
    </Grid>
  );
};

export default Submissions;
