// MUI Imports
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Type Imports
import type { ThemeColor } from "@core/types";

// Component Imports
import CustomAvatar from "@core/components/mui/Avatar";

type DataType = {
  icon: string;
  stats: string;
  title: string;
  color: ThemeColor;
};

const data: DataType[] = [
  {
    stats: "75%",
    title: "Program Progress",
    color: "primary",
    icon: "tabler-chart-line",
  },
  {
    color: "info",
    stats: "12",
    title: "Services",
    icon: "tabler-briefcase",
  },
  {
    color: "warning",
    stats: "8",
    title: "Mentors",
    icon: "tabler-user-star",
  },
  {
    stats: "24",
    color: "success",
    title: "Completed Tasks",
    icon: "tabler-check",
  },
];

const StatisticsCard = () => {
  return (
    <Card>
      <CardHeader
        className="-mb-6"
        title={
          <Typography variant="h5" fontWeight="bold">
            Statistics
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            Overview of program statistics and progress
          </Typography>
        }
        action={
          <Typography variant="subtitle2" color="text.disabled">
            Updated 1 month ago
          </Typography>
        }
      />
      <CardContent className="flex justify-between flex-wrap gap-4 md:pbs-10 max-md:pbe-6 max-[1060px]:pbe-[74px] max-[1200px]:pbe-[52px] max-[1320px]:pbe-[74px] max-[1501px]:pbe-[52px]">
        <Grid container spacing={4}>
          {data.map((item, index) => (
            <Grid
              key={index}
              item
              xs
              className="flex items-center gap-4"
              sx={{ marginInlineEnd: index === 0 ? 5 : 0 }}
            >
              <CustomAvatar
                color={item.color}
                variant="rounded"
                size={40}
                skin="light"
              >
                <i className={item.icon}></i>
              </CustomAvatar>
              <div className="flex flex-col">
                <Typography variant="h5">{item.stats}</Typography>
                <Typography variant="body2">{item.title}</Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
