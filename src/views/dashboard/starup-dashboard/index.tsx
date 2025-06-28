"use client";

// React Imports
import { useState } from "react";

// MUI Imports
import { Grid } from "@mui/material";

// Component Imports
import StartupHeroCard from "@/views/dashboard/starup-dashboard/StartupHeroCard";
import StatisticsCard from "@/views/dashboard/starup-dashboard/StatisticsCard";
import ProgramSteps from "@/views/dashboard/starup-dashboard/ProgramSteps";
import ProgramAnalyticsChart from "@/views/dashboard/starup-dashboard/ProgramAnalyticsChart";
import ProgramMentors from "@/views/dashboard/starup-dashboard/ProgramMentors";
import UpcomingSessions from "@/views/dashboard/starup-dashboard/UpcomingSessions";
import AvailableSurveys from "@/views/dashboard/starup-dashboard/AvailableSurveys";
import RateMentorsTable from "@/views/dashboard/starup-dashboard/RateMentorsTable";
import { db } from "@/fake-db/pages/mentors";

// Types
import { MentorRating } from "@/types/MentorTypes";
import LatestServices from "../LatestServices";
import LatestEvents from "../LatestEvents";

const StartupDashboard = () => {
  // State for managing mentor ratings
  const [mentorRatings, setMentorRatings] = useState<MentorRating[]>([]);

  // Handle rating submission
  const handleRatingSubmit = (newRating: MentorRating) => {
    setMentorRatings((prevRatings) => {
      // Check if rating already exists for this mentor
      const existingIndex = prevRatings.findIndex(
        (r) => r.mentorId === newRating.mentorId
      );

      if (existingIndex >= 0) {
        // Update existing rating
        const updatedRatings = [...prevRatings];
        updatedRatings[existingIndex] = newRating;
        return updatedRatings;
      } else {
        // Add new rating
        return [...prevRatings, newRating];
      }
    });

    // Here you would typically send the rating to your backend API
    console.log("Rating submitted:", newRating);
  };
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={4}>
        <StartupHeroCard />
      </Grid>
      <Grid item xs={12} md={8}>
        <StatisticsCard />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ProgramSteps />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ProgramAnalyticsChart />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ProgramMentors />
      </Grid>
      <Grid item xs={12} sm={6}>
        <UpcomingSessions />
      </Grid>

      <Grid item xs={12} sm={6} lg={5}>
        <AvailableSurveys />
      </Grid>
      <Grid item xs={12} lg={7}>
        <RateMentorsTable
          mentorsData={db}
          onRatingSubmit={handleRatingSubmit}
          existingRatings={mentorRatings}
        />
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

export default StartupDashboard;
