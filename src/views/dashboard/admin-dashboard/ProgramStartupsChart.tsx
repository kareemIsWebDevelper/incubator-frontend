// Next Imports
import dynamic from "next/dynamic";

// MUI Imports
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// Third-party Imports
import type { ApexOptions } from "apexcharts";

// Styled Component Imports
const AppReactApexCharts = dynamic(
  () => import("@/libs/styles/AppReactApexCharts")
);

const ProgramStartupsChart = () => {
  // Sample data - replace with your actual data
  const programData = [
    { program: "Accelerator", startups: 24 },
    { program: "Incubator", startups: 18 },
    { program: "Seed Fund", startups: 12 },
    { program: "Growth Program", startups: 9 },
    { program: "Venture Studio", startups: 15 },
    { program: "Corporate Innovation", startups: 7 },
  ];

  // Vars
  const divider = "var(--mui-palette-divider)";
  const disabledText = "var(--mui-palette-text-disabled)";

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    colors: ["#826af9"],
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        borderRadius: 8,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
        barHeight: "30%",
        horizontal: true,
      },
    },
    grid: {
      borderColor: divider,
      xaxis: {
        lines: { show: false },
      },
      padding: {
        top: -10,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: disabledText,
          fontSize: "12px",
        },
        align: "left",
      },
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: divider },
      categories: programData.map((item) => item.program),
      labels: {
        style: { colors: disabledText, fontSize: "13px" },
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <div className="flex items-center space-x-3 mb-6">
          <i className="tabler-menu-deep h-6 w-6 text-primary" />
          <div className="flex flex-col">
            <Typography variant="h5" fontWeight="bold">
              Program Startups
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Startups count per program
            </Typography>
          </div>
        </div>
        <AppReactApexCharts
          type="bar"
          width="100%"
          height={400}
          options={options}
          series={[
            {
              name: "Startups Count",
              data: programData.map((item) => item.startups),
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default ProgramStartupsChart;
