import { Grid } from "@mui/material";
import React from "react";
import StartupCard from "./StartupCard";
import { StartupType } from "@/types/startupTypes";

const StartupList = ({ startups }: { startups: StartupType[] }) => {
  return (
    <Grid container spacing={3}>
      {startups.map((startup) => (
        <Grid item xs={12} md={4} key={startup.id}>
          <StartupCard startup={startup} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StartupList;
