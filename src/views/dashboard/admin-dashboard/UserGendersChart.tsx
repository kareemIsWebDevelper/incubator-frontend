"use client";

// Next Imports
import dynamic from "next/dynamic";

// MUI Imports
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";

// Third-party Imports
import type { ApexOptions } from "apexcharts";

// Styled Component Imports
const AppReactApexCharts = dynamic(
  () => import("@/libs/styles/AppReactApexCharts")
);

const series = [32, 41];

const UserGendersChart = () => {
  // Hook
  const theme = useTheme();

  // Vars
  const textSecondary = "var(--mui-palette-text-secondary)";
  const successColor = "var(--mui-palette-success-main)";

  const options: ApexOptions = {
    colors: [
      successColor,
      "rgba(var(--mui-palette-success-mainChannel) / 0.7)",
      // 'rgba(var(--mui-palette-success-mainChannel) / 0.5)',
      // 'var(--mui-palette-success-lightOpacity)'
    ],
    stroke: { width: 0 },
legend: {
      fontSize: '13px',
      position: 'bottom',
      markers: {
        offsetX: theme.direction === 'rtl' ? 7 : -4
      },
      labels: { colors: textSecondary },
      itemMargin: {
        horizontal: 9
      }
    },    tooltip: { enabled: true, theme: "false" },
    dataLabels: {
      enabled: true,
      formatter: (val: string) => `${parseInt(val, 10)}%`,
    },
    labels: ["Male", "Female"],
    states: {
      hover: {
        filter: { type: "none" },
      },
      active: {
        filter: { type: "none" },
      },
    },
    grid: {
      padding: {
        top: -22,
        bottom: -18,
      },
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        expandOnClick: false,
        donut: {
          size: "65%",
          labels: {
            show: true,
            name: {
              offsetY: 25,
              color: textSecondary,
              fontFamily: theme.typography.fontFamily,
            },
            value: {
              offsetY: -15,
              fontWeight: 500,
              formatter: (val) => `${val}`,
              color: "var(--mui-palette-text-primary)",
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.h3.fontSize as string,
            },
            total: {
              show: true,
              showAlways: true,
              label: "Total Users",
              color: successColor,
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.body1.fontSize as string,
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        options: {
          chart: { width: 220, height: 220 },
        },
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          chart: { width: 180, height: 180 },
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          chart: { width: 160, height: 160 },
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          chart: { width: 140, height: 140 },
        },
      },
    ],
  };

  return (
    <Card className="overflow-visible h-full">
      <CardContent className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col justify-between flex-1">
          <div className="flex items-center gap-2">
            <i className="tabler-chart-donut h-7 w-7 text-primary" />
            <div className="flex flex-col">
              <Typography variant="h5" fontWeight="bold">
                User Gender
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Male / Female Ratio
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-start mt-4 sm:mt-0">
            <Typography variant="h5" className="text-sm sm:text-base lg:text-lg">
              Male (32), Female (41)
            </Typography>
            <div className="flex items-center gap-1">
              <i className="tabler-chevron-up text-success text-xl"></i>
              <Typography color="success.main" component="span">
                +15.8%
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full sm:w-auto">
          <div className="h-36 w-36 sm:h-44 sm:w-44 flex justify-center items-center">
            <AppReactApexCharts
              type="donut"
              height={176}
              series={series}
              options={options}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserGendersChart;
