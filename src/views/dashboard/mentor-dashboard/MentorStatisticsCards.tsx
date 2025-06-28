// MUI Imports
import Grid from "@mui/material/Grid";

// Types Imports
import type { CardStatsHorizontalWithBorderProps } from "@/types/pages/widgetTypes";

// Components Imports
import HorizontalWithBorder from "@components/card-statistics/HorizontalWithBorder";

const data: CardStatsHorizontalWithBorderProps[] = [
  {
    title: "Total Sessions",
    stats: 156,
    trendNumber: 12.5,
    avatarIcon: "tabler-calendar",
    color: "primary",
  },
  {
    title: "Hours Mentored",
    stats: 324,
    trendNumber: 8.3,
    avatarIcon: "tabler-clock",
    color: "success",
  },
  {
    title: "Upcoming Sessions",
    stats: 8,
    trendNumber: 2.1,
    avatarIcon: "tabler-calendar-event",
    color: "info",
  },
  {
    title: "Average Rating",
    stats: 4.8,
    trendNumber: 0.2,
    avatarIcon: "tabler-star",
    color: "warning",
  },
];

const MentorStatisticsCards = () => {
  return (
    data && (
      <Grid container spacing={6}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <HorizontalWithBorder {...item} index={index} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default MentorStatisticsCards;
