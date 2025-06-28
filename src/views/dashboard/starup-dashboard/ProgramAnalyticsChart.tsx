"use client";

import { Card, CardContent, Typography } from "@mui/material";
// Recharts components import
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const analytics = {
  programProgress: 60,
  tasksCompleted: 15,
  totalTasks: 24,
  mentorshipHours: 18,
  weeklyProgress: [
    { week: "Week 1", progress: 10, tasks: 2 },
    { week: "Week 2", progress: 25, tasks: 4 },
    { week: "Week 3", progress: 35, tasks: 3 },
    { week: "Week 4", progress: 45, tasks: 5 },
    { week: "Week 5", progress: 55, tasks: 3 },
    { week: "Week 6", progress: 60, tasks: 2 },
  ],
  categoryProgress: [
    { category: "Product", completed: 5, total: 8 },
    { category: "Finance", completed: 3, total: 5 },
    { category: "Legal", completed: 2, total: 4 },
    { category: "Marketing", completed: 3, total: 4 },
    { category: "Research", completed: 2, total: 3 },
  ],
};

const ProgramAnalyticsChart = () => {
  return (
    <Card className="h-full">
      <CardContent>
        <div className="flex items-center space-x-3 mb-6">
          <i className="tabler-chart-bar h-6 w-6 text-primary" />
          <Typography variant="h5" fontWeight="bold">Weekly Progress</Typography>
        </div>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart
            data={analytics.weeklyProgress}
            margin={{ left: -30, top: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="progress" fill="#7367F0" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ProgramAnalyticsChart;
