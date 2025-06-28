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
const sectorData = [
  { sector: "Technology", count: 35 },
  { sector: "Healthcare", count: 28 },
  { sector: "FinTech", count: 22 },
  { sector: "E-commerce", count: 18 },
  { sector: "Education", count: 15 },
  { sector: "Energy", count: 12 },
  { sector: "Agriculture", count: 10 },
  { sector: "Others", count: 8 }
];

const series = sectorData.map(item => item.count);

const TopStartupSectorsChart = () => {
  // Hook
  const theme = useTheme();

  // Vars
  const textSecondary = "var(--mui-palette-text-secondary)";
  const primaryColor = "var(--mui-palette-primary-main)";

  const options: ApexOptions = {
    colors: [
      primaryColor,
      "rgba(var(--mui-palette-primary-mainChannel) / 0.8)",
      "rgba(var(--mui-palette-primary-mainChannel) / 0.6)",
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
    labels: sectorData.map(item => item.sector),
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
          size: "70%",
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
              label: "Total Startups",
              color: primaryColor,
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.body1.fontSize as string,
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
          <i className="tabler-chart-donut h-6 w-6 text-primary" />
          <div className="flex flex-col">
            <Typography variant="h5" fontWeight="bold">
              Top Startup Sectors
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Distribution by industry sectors
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

export default TopStartupSectorsChart;
