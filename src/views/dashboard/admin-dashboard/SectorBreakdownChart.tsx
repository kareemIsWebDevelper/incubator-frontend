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
const sectorBreakdownData = [
  { sector: "AI & Machine Learning", percentage: 18.5 },
  { sector: "Mobile Apps", percentage: 16.2 },
  { sector: "Web Development", percentage: 14.8 },
  { sector: "IoT Solutions", percentage: 12.3 },
  { sector: "Blockchain", percentage: 9.7 },
  { sector: "Cybersecurity", percentage: 8.9 },
  { sector: "Cloud Services", percentage: 7.6 },
  { sector: "Data Analytics", percentage: 6.4 },
  { sector: "AR/VR", percentage: 3.2 },
  { sector: "Others", percentage: 2.4 }
];

const series = sectorBreakdownData.map(item => item.percentage);

const SectorBreakdownChart = () => {
  // Hook
  const theme = useTheme();

  // Vars
  const textSecondary = "var(--mui-palette-text-secondary)";
  const infoColor = "var(--mui-palette-info-main)";

  const options: ApexOptions = {
    colors: [
      infoColor,
      "rgba(var(--mui-palette-info-mainChannel) / 0.8)",
      "rgba(var(--mui-palette-info-mainChannel) / 0.6)",
      "rgba(var(--mui-palette-success-mainChannel) / 0.8)",
      "rgba(var(--mui-palette-warning-mainChannel) / 0.8)",
      "rgba(var(--mui-palette-error-mainChannel) / 0.8)",
      "rgba(var(--mui-palette-primary-mainChannel) / 0.8)",
      "rgba(var(--mui-palette-secondary-mainChannel) / 0.8)",
      "rgba(var(--mui-palette-info-mainChannel) / 0.4)",
      "rgba(var(--mui-palette-text-secondaryChannel) / 0.6)"
    ],
    stroke: { width: 2 },
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
        formatter: (val) => `${val}%`
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (val: string) => `${parseFloat(val).toFixed(1)}%`,
      style: {
        fontSize: '11px',
        fontWeight: '500'
      }
    },
    labels: sectorBreakdownData.map(item => item.sector),
    states: {
      hover: {
        filter: { type: "lighten" },
      },
      active: {
        filter: { type: "none" },
      },
    },
    grid: {
      padding: {
        top: -10,
        bottom: -18,
      },
    },
    plotOptions: {
      pie: {
        customScale: 0.9,
        expandOnClick: true,
        offsetX: 0,
        offsetY: 0
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
          },
          dataLabels: {
            style: {
              fontSize: '10px'
            }
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
          },
          dataLabels: {
            style: {
              fontSize: '10px'
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
          <i className="tabler-chart-pie h-6 w-6 text-primary" />
          <div className="flex flex-col">
            <Typography variant="h5" fontWeight="bold">
              Sector Breakdown
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Detailed technology breakdown
            </Typography>
          </div>
        </div>
        <AppReactApexCharts
          type="pie"
          height={350}
          width="100%"
          series={series}
          options={options}
        />
      </CardContent>
    </Card>
  );
};

export default SectorBreakdownChart;
