// MUI imports
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

// Recharts imports
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Data for the chart
const sessionData = [
  { month: "Jan", sessions: 12, hours: 24 },
  { month: "Feb", sessions: 18, hours: 36 },
  { month: "Mar", sessions: 15, hours: 30 },
  { month: "Apr", sessions: 22, hours: 44 },
  { month: "May", sessions: 19, hours: 38 },
  { month: "Jun", sessions: 24, hours: 48 },
];

const SessionsChart = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center space-x-3 mb-6">
          <i className="tabler-chart-bar h-6 w-6 text-primary" />
          <div className="flex flex-col">
            <Typography variant="h5" fontWeight="bold">
              Session Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Monthly sessions and hours mentored
            </Typography>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={355}>
          <BarChart data={sessionData} margin={{ left: -35, top: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="month" 
              className="text-xs"
              type="category"
              axisLine={true}
              tickLine={true}
              mirror={false}
              reversed={false}
              allowDecimals={true}
              allowDuplicatedCategory={true}
            />
            <YAxis 
              className="text-xs"
              type="number"
              axisLine={true}
              tickLine={true}
              mirror={false}
              allowDecimals={true}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                color: "#333333",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              }}
              labelStyle={{ color: "#666666", fontWeight: "600" }}
              itemStyle={{ color: "#333333" }}
            />
            <Bar
              dataKey="sessions"
              fill="rgb(var(--mui-palette-primary-mainChannel) / 0.5)"
              name="Sessions"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="hours"
              fill="#675DD8"
              name="Hours"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SessionsChart;
