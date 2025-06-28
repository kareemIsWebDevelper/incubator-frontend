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

// Sample data for startup development stages
const developmentStageData = [
  { stage: "Ideation", count: 15, description: "Startups in the idea validation phase" },
  { stage: "MVP Development", count: 22, description: "Building minimum viable product" },
  { stage: "Market Testing", count: 18, description: "Testing product-market fit" },
  { stage: "Growth", count: 12, description: "Scaling and expanding operations" },
  { stage: "Maturity", count: 8, description: "Established market presence" },
  { stage: "Expansion", count: 5, description: "International or market expansion" }
];

const series = developmentStageData.map(item => item.count);

const StartupDevelopmentStagesChart = () => {
  // Hook
  const theme = useTheme();

  // Vars
  const textSecondary = "var(--mui-palette-text-secondary)";
  const primaryColor = "var(--mui-palette-primary-main)";

  const options: ApexOptions = {
    colors: [
      primaryColor,
      "rgba(var(--mui-palette-primary-mainChannel) / 0.8)",
      "rgba(var(--mui-palette-success-mainChannel) / 0.9)",
      "rgba(var(--mui-palette-warning-mainChannel) / 0.8)",
      "rgba(var(--mui-palette-error-mainChannel) / 0.8)",
      "rgba(var(--mui-palette-info-mainChannel) / 0.8)"
    ],
    stroke: { width: 2, colors: ['var(--mui-palette-background-paper)'] },
    legend: {
      fontSize: '13px',
      position: 'bottom',
      markers: {
        offsetX: theme.direction === 'rtl' ? 7 : -4
      },
      labels: { colors: textSecondary },
      itemMargin: {
        horizontal: 9,
        vertical: 4
      }
    },
    tooltip: { 
      enabled: true,
      y: {
        formatter: function(value, { seriesIndex }) {
          const stage = developmentStageData[seriesIndex];
          return `${value} startups<br/><span style="font-size: 12px; color: #666;">${stage.description}</span>`;
        }
      },
      style: {
        fontSize: '12px'
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function(val: number) {
        return val.toString();
      },
      style: {
        fontSize: '12px',
        fontWeight: '500',
        colors: ['#fff']
      }
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              fontSize: '1.125rem'
            },
            value: {
              fontSize: '1rem',
              color: textSecondary,
              formatter: function(val: string) {
                return `${val} startups`;
              }
            },
            total: {
              show: true,
              fontSize: '1.125rem',
              label: 'Total Startups',
              color: 'var(--mui-palette-text-secondary)',
              formatter: function() {
                return developmentStageData.reduce((sum, item) => sum + item.count, 0).toString();
              }
            }
          }
        }
      }
    },
    labels: developmentStageData.map(item => item.stage),
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: "1rem",
                  },
                  value: {
                    fontSize: "1rem",
                  },
                  total: {
                    fontSize: "1rem",
                  },
                },
              },
            },
          },
        },
      },
    ],
  };

  return (
    <Card className="h-full">
      <CardContent>
        <div className="flex items-center space-x-3 mb-6">
          <i className="tabler-timeline h-6 w-6 text-primary" />
          <div className="flex flex-col">
            <Typography variant="h5" fontWeight="bold">
              Development Stages
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Startup distribution by development phase ({developmentStageData.reduce((sum, item) => sum + item.count, 0)} total)
            </Typography>
          </div>
        </div>

        <div className="min-h-[400px]">
          <AppReactApexCharts
            type="donut"
            height={400}
            width="100%"
            series={series}
            options={options}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default StartupDevelopmentStagesChart;
