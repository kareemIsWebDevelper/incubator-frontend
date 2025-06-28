import React, { useMemo } from "react";
import {
  Typography,
  Grid,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Card,
  CardContent,
} from "@mui/material";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import KpiCard from "./KpiCard";

// Mock data - in a real app, this would come from props or state management
const summaryKpiData = [
  {
    id: "summaryTotalStartups",
    value: 9,
    label: "Total Companies",
    icon: <i className="tabler tabler-building mr-2" />,
    color: "text-blue-500",
  },
  {
    id: "summaryTotalMentors",
    value: 5,
    label: "Total Mentors",
    icon: <i className="tabler tabler-user-cog mr-2" />,
    color: "text-sky-500",
  },
  {
    id: "summaryTotalWorkshops",
    value: 14,
    label: "Total Workshops",
    icon: <i className="tabler tabler-school mr-2" />,
    color: "text-green-500",
  },
  {
    id: "summaryAvgFinalScore",
    value: "--",
    label: "Average Final Score",
    icon: <i className="tabler tabler-star mr-2" />,
    color: "text-yellow-500",
  }, // Calculated
  {
    id: "summaryEvaluationsComplete",
    value: "83%",
    label: "Evaluations Complete",
    icon: <i className="tabler tabler-circle-check mr-2" />,
    color: "text-red-500",
  },
];

const programStages = [
  {
    text: "مرحلة التسجيل والاختيار",
    icon: <i className="tabler tabler-circle-check text-green-500 mr-2" />,
    completed: true,
  },
  {
    text: "مرحلة ورش العمل التأسيسية",
    icon: <i className="tabler tabler-circle-check text-green-500 mr-2" />,
    completed: true,
  },
  {
    text: "مرحلة الإرشاد والتوجيه",
    icon: <i className="tabler tabler-circle-check text-green-500 mr-2" />,
    completed: true,
  },
  {
    text: "مرحلة التقييم النهائي والعروض",
    icon: (
      <i className="tabler tabler-refresh text-blue-500 mr-2 animate-spin" />
    ),
    completed: false,
    current: true,
  },
  {
    text: "مرحلة ما بعد البرنامج",
    icon: <i className="tabler tabler-circle text-gray-400 mr-2" />,
    completed: false,
  },
];

// This data would typically be derived from final evaluation data
const finalStatusData = [
  { name: "الأعلى تقييماً", value: 2 }, // Example: 2 companies
  { name: "أداء جيد", value: 5 }, // Example: 5 companies
  { name: "بحاجة لتحسين", value: 2 }, // Example: 2 companies
];

interface SummaryTabProps {
  chartColors: string[];
  chartFont: object;
}

const SummaryTab = ({ chartColors, chartFont }: SummaryTabProps) => {
  // In a real app, this would be calculated from actual evaluation data
  const avgFinalScore = useMemo(() => {
    // Dummy calculation for now
    const scores = [92.5, 85.0, 78.0, 90.0, 70.0]; // Example scores
    if (scores.length === 0) return "--";
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
  }, []);

  const updatedKpiData = summaryKpiData.map((kpi) =>
    kpi.id === "summaryAvgFinalScore" ? { ...kpi, value: avgFinalScore } : kpi
  );

  return (
    <Paper className="shadow-none">
      <Grid container spacing={2} className="justify-center mb-6">
        {updatedKpiData.map((kpi) => (
          <Grid item key={kpi.id} xs={12} sm={6} md={4} lg>
            <KpiCard
              icon={kpi.icon}
              value={kpi.value}
              label={kpi.label}
              iconColor={kpi.color}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card className="border h-full">
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                className="border-b-2 border-primary flex items-center mb-10"
              >
                <i className="tabler tabler-list-check text-primary me-2" /> Current Program
                Status
              </Typography>
              <Typography paragraph>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Deserunt illo aliquam quaerat doloremque et molestiae autem
                omnis? Consectetur similique ullam cupiditate vitae suscipit?
                Quasi natus blanditiis fuga placeat mollitia modi!
              </Typography>
              <Typography variant="h6" className="mt-8 mb-3 font-bold">
                Main Stages of the Program:
              </Typography>
              <List dense>
                {programStages.map((stage) => (
                  <ListItem key={stage.text} className="mb-2" disablePadding>
                    <ListItemIcon className="min-w-[auto] mr-2">
                      {stage.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={stage.text}
                      className={stage.current ? "font-bold text-blue-600" : ""}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="border h-full">
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                className="border-b-2 border-primary flex items-center"
              >
                <i className="tabler tabler-chart-pie text-primary me-2" /> Distribution by
                Final Status
              </Typography>
              <Box className="h-[250px] md:h-[300px] w-full">
                {" "}
                {/* Tailwind for height */}
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={finalStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius="80%"
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }
                    >
                      {finalStatusData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={chartColors[index % chartColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip wrapperStyle={chartFont} />
                    <Legend
                      wrapperStyle={{ ...chartFont, paddingTop: "20px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Typography variant="h6" className="mt-4 font-bold">
                Summary of Results:
              </Typography>
              <List dense className="summary-list">
                <ListItem>
                  <ListItemIcon className="min-w-[auto] mr-2">
                    <i className="tabler tabler-trophy text-yellow-500" />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Highest Rated: ${finalStatusData.find((s) => s.name === "الأعلى تقييماً")?.value || 0} Companies`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon className="min-w-[auto] mr-2">
                    <i className="tabler tabler-thumb-up text-green-500" />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Good Performance: ${finalStatusData.find((s) => s.name === "أداء جيد")?.value || 0} Companies`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon className="min-w-[auto] mr-2">
                    <i className="tabler tabler-flag text-red-500" />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Needs Improvement: ${finalStatusData.find((s) => s.name === "بحاجة لتحسين")?.value || 0} Companies`}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SummaryTab;
