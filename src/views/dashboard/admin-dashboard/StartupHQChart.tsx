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
const hqData = [
  { country: "Egypt", count: 45 },
  { country: "UAE", count: 32 },
  { country: "Saudi Arabia", count: 28 },
  { country: "Jordan", count: 18 },
  { country: "Lebanon", count: 12 },
  { country: "Kuwait", count: 8 },
  { country: "Others", count: 15 }
];

const StartupHQChart = () => {
  // Hook
  const theme = useTheme();

  // Vars
  const textSecondary = "var(--mui-palette-text-secondary)";
  const primaryColor = "var(--mui-palette-primary-main)";

  const series = hqData.map(item => item.count);
  const categories = hqData.map(item => item.country);

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      type: 'bar',
    },
    colors: [
      primaryColor,
      "rgba(var(--mui-palette-primary-mainChannel) / 0.8)",
      "rgba(var(--mui-palette-primary-mainChannel) / 0.6)",
      "rgba(var(--mui-palette-success-mainChannel) / 0.8)",
      "rgba(var(--mui-palette-warning-mainChannel) / 0.8)",
      "rgba(var(--mui-palette-error-mainChannel) / 0.8)",
      "rgba(var(--mui-palette-info-mainChannel) / 0.8)"
    ],
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        distributed: true,
        barHeight: '40%',
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        colors: ['#fff']
      },
      formatter: (val) => `${val}`,
    },
    legend: { show: false },
    grid: {
      strokeDashArray: 8,
      borderColor: "rgba(var(--mui-palette-divider) / 0.6)",
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
      padding: { bottom: 5 }
    },
    states: {
      hover: {
        filter: { type: "none" },
      },
      active: {
        filter: { type: "none" },
      },
    },
    xaxis: {
      categories: categories,
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: {
        style: {
          fontSize: "13px",
          colors: textSecondary,
          fontFamily: theme.typography.fontFamily,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "13px",
          colors: textSecondary,
          fontFamily: theme.typography.fontFamily,
        },
      },
    },
    tooltip: {
      enabled: true,
      theme: "false",
      y: {
        formatter: (val) => `${val} startups`
      }
    },
    responsive: [
      {
        breakpoint: 1200,
        options: {
          chart: { height: 320 },
          plotOptions: {
            bar: {
              barHeight: '35%',
            }
          }
        }
      },
      {
        breakpoint: 992,
        options: {
          chart: { height: 280 },
          plotOptions: {
            bar: {
              barHeight: '30%',
            }
          }
        }
      }
    ]
  };

  return (
    <Card className="h-full">
      <CardContent>
        <div className="flex items-center space-x-3 mb-6">
          <i className="tabler-world h-6 w-6 text-primary" />
          <div className="flex flex-col">
            <Typography variant="h5" fontWeight="bold">
              Startup Headquarters
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Distribution by country/region
            </Typography>
          </div>
        </div>
        <AppReactApexCharts
          type="bar"
          height={350}
          width="100%"
          series={[{ name: 'Startups', data: series }]}
          options={options}
        />
      </CardContent>
    </Card>
  );
};

export default StartupHQChart;
