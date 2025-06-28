import React, { useState } from "react";
import dynamic from "next/dynamic";

import { Card, CardContent, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Recharts imports for bar chart
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Styled Component Imports
import AppRecharts from "@/libs/styles/AppRecharts";

// Third-party Imports for donut chart
import type { ApexOptions } from "apexcharts";

// Styled Component Imports
const AppReactApexCharts = dynamic(
  () => import("@/libs/styles/AppReactApexCharts")
);

export interface SDG {
  id: number;
  title: string;
  color: string;
  icon: string;
  description: string;
  startupCount: number;
}

export interface Startup {
  id: string;
  name: string;
  sdgIds: number[];
  funding: number;
  stage: "Seed" | "Series A" | "Series B" | "Series C+";
  foundedYear: number;
  sector: string;
  location: string;
  impactScore: number;
}

export interface ChartData {
  label: string;
  value: number;
  color: string;
  percentage: number;
}

interface SdgChartProps {
  sdgData?: SDG[];
}

export const sdgData: SDG[] = [
  {
    id: 1,
    title: "No Poverty",
    color: "var(--mui-palette-error-main)",
    icon: "🚫",
    description: "End poverty in all its forms everywhere",
    startupCount: 89,
  },
  {
    id: 2,
    title: "Zero Hunger",
    color: "var(--mui-palette-warning-main)",
    icon: "🌾",
    description: "End hunger, achieve food security and improved nutrition",
    startupCount: 156,
  },
  {
    id: 3,
    title: "Good Health",
    color: "var(--mui-palette-success-main)",
    icon: "🏥",
    description: "Ensure healthy lives and promote well-being for all",
    startupCount: 234,
  },
  {
    id: 4,
    title: "Quality Education",
    color: "var(--mui-palette-info-main)",
    icon: "📚",
    description: "Ensure inclusive and equitable quality education",
    startupCount: 178,
  },
  {
    id: 5,
    title: "Gender Equality",
    color: "var(--mui-palette-primary-main)",
    icon: "⚖️",
    description: "Achieve gender equality and empower all women and girls",
    startupCount: 67,
  },
  {
    id: 6,
    title: "Clean Water",
    color: "var(--mui-palette-secondary-main)",
    icon: "💧",
    description: "Ensure availability and sustainable management of water",
    startupCount: 98,
  },
  {
    id: 7,
    title: "Clean Energy",
    color: "var(--mui-palette-primary-light)",
    icon: "⚡",
    description: "Ensure access to affordable, reliable, sustainable energy",
    startupCount: 312,
  },
  {
    id: 8,
    title: "Economic Growth",
    color: "var(--mui-palette-error-dark)",
    icon: "📈",
    description: "Promote sustained, inclusive economic growth",
    startupCount: 445,
  },
  {
    id: 9,
    title: "Innovation",
    color: "var(--mui-palette-warning-dark)",
    icon: "🏭",
    description: "Build resilient infrastructure, promote innovation",
    startupCount: 567,
  },
  {
    id: 10,
    title: "Reduced Inequalities",
    color: "var(--mui-palette-success-dark)",
    icon: "⚖️",
    description: "Reduce inequality within and among countries",
    startupCount: 123,
  },
  {
    id: 11,
    title: "Sustainable Cities",
    color: "var(--mui-palette-info-dark)",
    icon: "🏙️",
    description: "Make cities and human settlements inclusive, safe",
    startupCount: 289,
  },
  {
    id: 12,
    title: "Responsible Consumption",
    color: "var(--mui-palette-primary-dark)",
    icon: "♻️",
    description: "Ensure sustainable consumption and production patterns",
    startupCount: 201,
  },
];

export const mockStartups: Startup[] = [
  {
    id: "1",
    name: "EcoTech Solutions",
    sdgIds: [7, 12, 13],
    funding: 12500000,
    stage: "Series A",
    foundedYear: 2020,
    sector: "Clean Energy",
    location: "San Francisco, CA",
    impactScore: 8.5,
  },
  {
    id: "2",
    name: "HealthAI",
    sdgIds: [3, 9],
    funding: 8700000,
    stage: "Seed",
    foundedYear: 2021,
    sector: "Healthcare",
    location: "Boston, MA",
    impactScore: 9.2,
  },
];

const SdgChart: React.FC<SdgChartProps> = ({}) => {
  const [chartType, setChartType] = useState<"bar" | "donut">("bar");

  const BarChart = () => (
    <AppRecharts>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={sdgData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="id" 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="recharts-custom-tooltip">
                      <p className="font-semibold text-gray-900">
                        SDG {label}: {data.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        Startups: {data.startupCount}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {data.description}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="startupCount" radius={[4, 4, 0, 0]}>
              {sdgData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </AppRecharts>
  );

  const DonutChart = () => {
    // Hook
    const theme = useTheme();
    
    const totalStartups = sdgData.reduce(
      (sum, sdg) => sum + sdg.startupCount,
      0
    );
    const top6SDGs = [...sdgData]
      .sort((a, b) => b.startupCount - a.startupCount)
      .slice(0, 6);

    // Vars
    const textSecondary = "var(--mui-palette-text-secondary)";
    
    const series = top6SDGs.map(sdg => sdg.startupCount);
    const colors = top6SDGs.map(sdg => sdg.color);

    const options: ApexOptions = {
      colors: colors,
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
          const sdg = top6SDGs[opts.seriesIndex];
          return `SDG ${sdg.id}: ${sdg.title}`;
        }
      },
      tooltip: { 
        enabled: true,
        y: {
          formatter: function(value, { seriesIndex }) {
            const sdg = top6SDGs[seriesIndex];
            const percentage = ((value / totalStartups) * 100).toFixed(1);
            return `${value} startups (${percentage}%)`;
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (val: string) => `${parseFloat(val).toFixed(1)}%`,
        style: {
          fontSize: '12px',
          fontWeight: 600,
          colors: ['#fff']
        }
      },
      labels: top6SDGs.map(sdg => `SDG ${sdg.id}`),
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
                fontSize: "24px",
                color: "var(--mui-palette-text-primary)",
                formatter: () => totalStartups.toString(),
              },
              total: {
                show: true,
                label: "Total Startups",
                fontSize: "12px",
                color: textSecondary,
                fontFamily: theme.typography.fontFamily,
                formatter: () => totalStartups.toString(),
              },
            },
          },
        },
      },
      responsive: [
        {
          breakpoint: 992,
          options: {
            chart: {
              height: 380,
            },
            legend: {
              position: "bottom",
            },
          },
        },
        {
          breakpoint: 576,
          options: {
            chart: {
              height: 320,
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
      <div className="h-[400px]">
        <AppReactApexCharts
          type="donut"
          height={400}
          width="100%"
          series={series}
          options={options}
        />
      </div>
    );
  };

  return (
    <div>
      <Card>
        <CardContent>
          {/* Chart Type Selector */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3 mb-6">
              <i className="tabler-menu-deep h-6 w-6 text-primary" />
              <div className="flex flex-col">
                <Typography variant="h5" fontWeight="bold">
                  Startups by SDG
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Distribution of startups across Sustainable Development Goals
                </Typography>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => setChartType("bar")}
                variant={chartType === "bar" ? "contained" : "outlined"}
                size="small"
                startIcon={<i className="tabler-chart-bar h-4 w-4" />}
                sx={{ mr: 1 }}
              >
                Startup Count
              </Button>
              <Button
                onClick={() => setChartType("donut")}
                variant={chartType === "donut" ? "contained" : "outlined"}
                size="small"
                startIcon={<i className="tabler-chart-pie h-4 w-4" />}
              >
                Distribution
              </Button>
            </div>
          </div>

          {/* Chart Content */}
          <div className="min-h-[400px]">
            {chartType === "bar" && <BarChart />}
            {chartType === "donut" && <DonutChart />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SdgChart;
