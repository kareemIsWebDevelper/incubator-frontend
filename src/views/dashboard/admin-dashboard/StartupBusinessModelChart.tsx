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

// Sample data for startup business models
const businessModelData = [
  { model: "SaaS", count: 28, description: "Software as a Service model" },
  { model: "E-commerce", count: 22, description: "Online retail and marketplace" },
  { model: "Freemium", count: 18, description: "Free basic with premium features" },
  { model: "Subscription", count: 15, description: "Recurring payment model" },
  { model: "Marketplace", count: 12, description: "Platform connecting buyers/sellers" },
  { model: "Advertising", count: 10, description: "Revenue from advertisements" },
  { model: "Commission", count: 8, description: "Percentage from transactions" },
  { model: "Licensing", count: 7, description: "Technology or content licensing" }
];

const series = businessModelData.map(item => item.count);

const StartupBusinessModelChart = () => {
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
    stroke: { width: 2, colors: ['var(--mui-palette-background-paper)'] },
    legend: {
      fontSize: '13px',
      position: 'right',
      markers: {
        offsetX: theme.direction === 'rtl' ? 7 : -4
      },
      labels: { colors: textSecondary },
      itemMargin: {
        horizontal: 9,
        vertical: 4
      },
      formatter: function(seriesName, opts) {
        const model = businessModelData[opts.seriesIndex];
        return `${seriesName} (${model.count})`;
      }
    },
    tooltip: { 
      enabled: true,
      y: {
        formatter: function(value, { seriesIndex }) {
          const model = businessModelData[seriesIndex];
          return `${value} startups<br/><span style="font-size: 12px; color: #666;">${model.description}</span>`;
        }
      },
      style: {
        fontSize: '12px'
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function(val: number, opts: any) {
        const count = businessModelData[opts.seriesIndex].count;
        if (val > 5) { // Only show label if percentage > 5%
          return count.toString();
        }
        return '';
      },
      style: {
        fontSize: '11px',
        fontWeight: '500',
        colors: ['#fff']
      }
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '65%',
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
                return businessModelData.reduce((sum, item) => sum + item.count, 0).toString();
              }
            }
          }
        }
      }
    },
    labels: businessModelData.map(item => item.model),
    responsive: [
      {
        breakpoint: 1200,
        options: {
          legend: {
            position: 'bottom'
          }
        }
      },
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
          <i className="tabler-building-store h-6 w-6 text-primary" />
          <div className="flex flex-col">
            <Typography variant="h5" fontWeight="bold">
              Business Models
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Revenue model distribution ({businessModelData.reduce((sum, item) => sum + item.count, 0)} total)
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

export default StartupBusinessModelChart;
