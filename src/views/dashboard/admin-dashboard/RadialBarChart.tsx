// Next Imports
import dynamic from "next/dynamic";

// MUI Imports
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";

// Third-party Imports
import type { ApexOptions } from "apexcharts";

// Styled Component Imports
const AppReactApexCharts = dynamic(
  () => import("@/libs/styles/AppReactApexCharts")
);

const RadialBarChart = () => {
  // Vars
  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true },
      parentHeightOffset: 0,
    },
    grid: {
      padding: {
        bottom: 5,
      },
    },
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    colors: ["var(--mui-palette-warning-main)"],
    plotOptions: {
      radialBar: {
        endAngle: 90,
        startAngle: -90,
        hollow: { size: "60%" },
        track: { background: "var(--mui-palette-divider)", strokeWidth: "40%" },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 0,
            fontWeight: 500,
            fontSize: "1.5rem",
            color: "var(--mui-palette-text-primary)",
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 1200,
        options: {
          chart: {
            width: 180,
            height: 120,
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                value: {
                  fontSize: "1.25rem",
                },
              },
            },
          },
        },
      },
      {
        breakpoint: 900,
        options: {
          chart: {
            width: 160,
            height: 110,
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                value: {
                  fontSize: "1.125rem",
                },
              },
            },
          },
        },
      },
      {
        breakpoint: 600,
        options: {
          chart: {
            width: 140,
            height: 100,
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                value: {
                  fontSize: "1rem",
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
      <CardContent className="flex flex-col justify-between h-full items-center p-4 sm:p-6">
        <div className="flex items-center gap-2 w-full text-left mb-2 sm:mb-3">
          <i className="tabler-circle-dashed-percentage text-primary w-4 h-4 sm:w-5 sm:h-5" />
          <Typography variant="h6" fontWeight="bold" className="text-sm sm:text-base">
            Startup Attendance Rate
          </Typography>
        </div>
        <div className="flex justify-center items-center flex-1 min-h-[100px] sm:min-h-[120px]">
          <AppReactApexCharts
            type="radialBar"
            height={148}
            width="100%"
            options={options}
            series={[78]}
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

export default RadialBarChart;
