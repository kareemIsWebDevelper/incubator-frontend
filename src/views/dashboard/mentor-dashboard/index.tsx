"use client";

// React Imports

// MUI Imports
import { Grid } from "@mui/material";

// Component Imports
import LatestServices from "../LatestServices";
import LatestEvents from "../LatestEvents";
import MentorStatisticsCards from "./MentorStatisticsCards";
import SessionsChart from "./SessionsChart";
import MentorUpcomingSessions from "./MentorUpcomingSessions";
import AvailabilitySchedule from "./AvailabilitySchedule";

const MentorDashboard = () => {
  
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <MentorStatisticsCards />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SessionsChart />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MentorUpcomingSessions />
      </Grid>
      <Grid item xs={12}>
        <AvailabilitySchedule />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LatestServices />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LatestEvents />
      </Grid>
    </Grid>
  );
};

export default MentorDashboard;
