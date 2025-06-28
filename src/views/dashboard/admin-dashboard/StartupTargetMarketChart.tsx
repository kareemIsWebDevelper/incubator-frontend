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

// Sample data - replace with actual data
const targetMarketData = [
  { market: "B2B", count: 52 },
  { market: "B2C", count: 38 },
  { market: "B2B2C", count: 25 },
  { market: "C2C", count: 12 },
  { market: "Government", count: 8 },
  { market: "Non-Profit", count: 5 }
];

const StartupTargetMarketChart = () => {
  // Hook
  const theme = useTheme();

  // Vars
  const textSecondary = "var(--mui-palette-text-secondary)";
  const primaryColor = "var(--mui-palette-primary-main)";

  const series = targetMarketData.map(item => item.count);

  const options: ApexOptions = {
    colors: [
      primaryColor,
      "rgba(var(--mui-palette-success-mainChannel) / 0.8)",
      "rgba(var(--mui-palette-warning-mainChannel) / 0.8)",
      "rgba(var(--mui-palette-error-mainChannel) / 0.8)",
      "rgba(var(--mui-palette-info-mainChannel) / 0.8)",
      "rgba(var(--mui-palette-secondary-mainChannel) / 0.8)"
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
    },
    tooltip: { 
      enabled: true, 
      theme: "false",
      y: {
        formatter: (val) => `${val} startups`
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (val: string) => `${parseInt(val, 10)}%`,
    },
    labels: targetMarketData.map(item => item.market),
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
              label: "Total Markets",
              color: primaryColor,
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.body1.fontSize as string,
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a: number, b: number) => {
                  return a + b;
                }, 0);
              }
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 1200,
        options: {
          chart: { height: 320 },
          legend: {
            position: 'bottom',
            fontSize: '12px'
          }
        }
      },
      {
        breakpoint: 992,
        options: {
          chart: { height: 380 },
          legend: {
            position: 'bottom',
            fontSize: '12px'
          }
        }
      }
    ]
  };

  return (
    <Card className="h-full">
      <CardContent>
        <div className="flex items-center space-x-3 mb-6">
          <i className="tabler-target h-6 w-6 text-primary" />
          <div className="flex flex-col">
            <Typography variant="h5" fontWeight="bold">
              Target Market Distribution
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Startup business models
            </Typography>
          </div>
        </div>
        <AppReactApexCharts
          type="donut"
          height={350}
          width="100%"
          series={series}
          options={options}
        />
      </CardContent>
    </Card>
  );
};

export default StartupTargetMarketChart;
