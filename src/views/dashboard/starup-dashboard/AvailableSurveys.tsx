"use client";

// MUI Imports
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Third-party Imports
import classnames from "classnames";

import type { ThemeColor } from "@core/types";

// Components Imports
import OptionMenu from "@core/components/option-menu";
import CustomAvatar from "@core/components/mui/Avatar";

type DataType = {
  title: string;
  subtitle: string;
  avatarIcon: string;
  avatarColor: ThemeColor;
  responses?: number;
  duration?: string;
};

// Vars
const data: DataType[] = [
  {
    title: "Customer Satisfaction Survey",
    subtitle: "Retail Experience",
    avatarColor: "primary",
    avatarIcon: "tabler-mood-smile",
    responses: 245,
    duration: "5 min",
  },
  {
    title: "Product Feedback",
    subtitle: "Mobile App Usage",
    avatarColor: "success",
    avatarIcon: "tabler-device-mobile",
    responses: 128,
    duration: "3 min",
  },
  {
    title: "Market Research",
    subtitle: "Consumer Preferences",
    avatarColor: "info",
    avatarIcon: "tabler-chart-bar",
    responses: 89,
    duration: "8 min",
  },
  {
    title: "Employee Engagement",
    subtitle: "Workplace Culture",
    avatarColor: "warning",
    avatarIcon: "tabler-users",
    responses: 67,
    duration: "10 min",
  },
  {
    title: "Brand Awareness",
    subtitle: "Marketing Campaign",
    avatarColor: "error",
    avatarIcon: "tabler-brand-instagram",
    responses: 156,
    duration: "4 min",
  },
  {
    title: "User Experience",
    subtitle: "Website Navigation",
    avatarColor: "secondary",
    avatarIcon: "tabler-mouse",
    responses: 203,
    duration: "6 min",
  },
  {
    title: "Training Effectiveness",
    subtitle: "Skills Assessment",
    avatarColor: "success",
    avatarIcon: "tabler-school",
    responses: 45,
    duration: "12 min",
  },
];

const AvailableSurveys = () => {
  return (
    <Card className="bs-full flex flex-col">
      <CardHeader
        title="AvailableSurveys"
        subheader="Total 58 surveys available"
        action={<OptionMenu options={["Show all surveys"]} />}
        className="-mb-4"
      />
      <CardContent className="flex grow flex-col justify-between max-sm:gap-5">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-4 py-1">
            <CustomAvatar
              skin="light"
              variant="rounded"
              color={item.avatarColor}
              size={34}
            >
              <i className={classnames(item.avatarIcon, "text-[22px]")} />
            </CustomAvatar>
            <div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full">
              <div className="flex flex-col">
                <Typography className="font-medium" color="text.primary">
                  {item.title}
                </Typography>
                <Typography variant="body2">{item.subtitle}</Typography>
              </div>
              <div className="flex flex-col items-end gap-1">
                {item.responses && (
                  <Typography variant="body2" color="text.secondary">
                    {item.responses} responses • {item.duration}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<i className="tabler-play" />}
                  onClick={() => {
                    // Handle survey start
                    console.log(`Starting survey: ${item.title}`);
                  }}
                >
                  Start
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AvailableSurveys;
