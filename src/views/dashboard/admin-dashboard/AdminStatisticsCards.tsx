// MUI Imports
import Grid from "@mui/material/Grid";

// Components Imports
import MetricsCard from "@/components/MetricsCard";
import { ThemeColor } from "@/@core/types";

type MetricsCardProps = {
  title: string;
  subTitle?: string;
  stats: number | string;
  trendNumber?: number;
  avatarIcon: string;
  color?: ThemeColor;
};

const data: MetricsCardProps[] = [
  {
    title: "Total Users",
    stats: 156,
    trendNumber: 12.5,
    avatarIcon: "tabler-users",
    color: "primary",
  },
  {
    title: "Total Sessions",
    stats: 23,
    trendNumber: 8.3,
    avatarIcon: "tabler-calendar",
    color: "success",
  },
  {
    title: "Sessions Duration",
    stats: "12h",
    trendNumber: 2.1,
    avatarIcon: "tabler-clock",
    color: "info",
  },
  {
    title: "Screening",
    stats: 20,
    subTitle: "First (8), Final (12)",
    avatarIcon: "tabler-clipboard-check",
    color: "warning",
  },
];

const AdminStatisticsCards = () => {
  return (
    data && (
      <Grid container spacing={6}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <MetricsCard {...item} index={index} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default AdminStatisticsCards;
