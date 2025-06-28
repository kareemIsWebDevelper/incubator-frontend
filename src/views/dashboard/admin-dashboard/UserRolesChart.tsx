// MUI imports
import { Card, CardContent, Typography } from "@mui/material";

// Recharts imports
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Sample data for user roles with enhanced colors
const userRoleData = [
  {
    role: "Startups",
    count: 20,
    color: "#6366f1",
  },
  {
    role: "Mentors",
    count: 24,
    color: "#10b981",
  },
  {
    role: "Judges",
    count: 12,
    color: "#f59e0b",
  },
  {
    role: "Managers",
    count: 3,
    color: "#ef4444",
  },
  {
    role: "Organizations",
    count: 6,
    color: "#ec4899",
  },
];

const UserRolesChart = () => {
  return (
    <Card className="h-full">
      <CardContent>
        <div className="flex items-center space-x-3 mb-6">
          <i className="tabler-chart-bar h-6 w-6 text-primary" />
          <div className="flex flex-col">
            <Typography variant="h5" fontWeight="bold">
              User Roles
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Distribution of user roles
            </Typography>
          </div>
        </div>
        <div className="h-64 sm:h-72 md:h-80 lg:h-[375px] xl:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={userRoleData}
              height={450}
              margin={{ 
                top: 0, 
                right: 10, 
                left: -20, 
                bottom: 0 
              }}
            >
              <defs>
                {userRoleData.map((item, index) => (
                  <linearGradient
                    key={index}
                    id={`gradient-${index}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={item.color}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="100%"
                      stopColor={item.color}
                      stopOpacity={0.3}
                    />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="role" 
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderColor: "#e2e8f0",
                }}
                labelStyle={{ color: "#4a5568" }}
                itemStyle={{ color: "#2d3748" }}
                formatter={(value, name) => [`${value}`, `${name}`]}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {userRoleData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#gradient-${index})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserRolesChart;
