"use client";

// Next Imports
import dynamic from "next/dynamic";

// MUI Imports
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

// Third Party Imports
import classnames from "classnames";
import type { ApexOptions } from "apexcharts";

// Types Imports
import type { ThemeColor } from "@core/types";

// Components Imports
import OptionMenu from "@core/components/option-menu";
import CustomAvatar from "@core/components/mui/Avatar";

// Styled Component Imports
const AppReactApexCharts = dynamic(
  () => import("@/libs/styles/AppReactApexCharts")
);

type DataType = {
  title: string;
  subtitle: string;
  avatarIcon: string;
  avatarColor?: ThemeColor;
};

// Vars
const data: DataType[] = [
  {
    title: "New Tickets",
    subtitle: "142",
    avatarColor: "primary",
    avatarIcon: "tabler-ticket",
  },
  {
    title: "Open Tickets",
    subtitle: "28",
    avatarColor: "info",
    avatarIcon: "tabler-check",
  },
  {
    title: "Response Time",
    subtitle: "1 Day",
    avatarColor: "warning",
    avatarIcon: "tabler-clock",
  },
];

const TasksTracker = () => {
  // Hooks
  const theme = useTheme();

  // Vars
  const disabledText = "var(--mui-palette-text-disabled)";

  const options: ApexOptions = {
    stroke: { dashArray: 10 },
    labels: ["Completed Task"],
    colors: ["var(--mui-palette-primary-main)"],
    states: {
      hover: {
        filter: { type: "none" },
      },
      active: {
        filter: { type: "none" },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        opacityTo: 0.5,
        opacityFrom: 1,
        shadeIntensity: 0.5,
        stops: [30, 70, 100],
        inverseColors: false,
        gradientToColors: ["var(--mui-palette-primary-main)"],
      },
    },
    plotOptions: {
      radialBar: {
        endAngle: 130,
        startAngle: -140,
        hollow: { size: "50%" },
        track: { background: "transparent" },
        dataLabels: {
          name: {
            show: false,
            offsetY: -24,
            color: disabledText,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.subtitle2.fontSize as string,
          },
          value: {
            offsetY: 8,
            fontWeight: 400,
            formatter: (value) => `${value}%`,
            color: "var(--mui-palette-text-primary)",
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.h5.fontSize as string,
          },
        },
      },
    },
    grid: {
      padding: {
        top: -18,
        left: 0,
        right: 0,
        bottom: 14,
      },
    },
    responsive: [
      {
        breakpoint: 1380,
        options: {
          grid: {
            padding: {
              top: 8,
              left: 12,
            },
          },
        },
      },
      {
        breakpoint: 1280,
        options: {
          chart: {
            height: 280,
          },
          grid: {
            padding: {
              top: 12,
              left: 12,
            },
          },
        },
      },
      {
        breakpoint: 1201,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1135,
        options: {
          chart: {
            height: 280,
          },
        },
      },
      {
        breakpoint: 980,
        options: {
          chart: {
            height: 240,
          },
        },
      },
      {
        breakpoint: 900,
        options: {
          chart: {
            height: 260,
          },
        },
      },
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 200,
          },
          grid: {
            padding: {
              top: 8,
              left: 8,
              right: 8,
            },
          },
        },
      },
    ],
  };

  return (
    <Card className="h-full">
      <CardContent className="flex flex-col justify-between p-4 sm:p-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <i className="tabler-circle-check text-primary w-4 h-4 sm:w-5 sm:h-5" />
          <Typography variant="h6" fontWeight="bold" className="text-sm sm:text-base">
            Completed Tasks
          </Typography>
        </div>
        <div className="flex justify-center items-center flex-1 min-h-[120px] sm:min-h-[140px]">
          <AppReactApexCharts
            type="radialBar"
            height={140}
            width="100%"
            series={[85]}
            options={options}
          />
        </div>
        <Typography
          variant="body2"
          color="text.disabled"
          className="text-center text-xs sm:text-sm mt-2"
        >
          <span className="text-success">+0.3 %</span> Rate more than last month
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TasksTracker;
