// MUI imports
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

// Recharts imports
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// Sample data for user demographics by Egyptian governorates
const allDemographicsData = [
  { location: "Cairo", count: 89, color: "#6366f1" },
  { location: "Giza", count: 67, color: "#10b981" },
  { location: "Alexandria", count: 54, color: "#f59e0b" },
  { location: "Qalyubia", count: 32, color: "#ef4444" },
  { location: "Sharqia", count: 28, color: "#ec4899" },
  { location: "Dakahlia", count: 25, color: "#8b5cf6" },
  { location: "Behera", count: 22, color: "#06b6d4" },
  { location: "Gharbiya", count: 20, color: "#84cc16" },
  { location: "Menoufia", count: 18, color: "#f97316" },
  { location: "Kafr el-Sheikh", count: 16, color: "#db2777" },
  { location: "Faiyum", count: 14, color: "#7c3aed" },
  { location: "Ismailia", count: 12, color: "#059669" },
  { location: "Suez", count: 10, color: "#dc2626" },
  { location: "Port Said", count: 9, color: "#ca8a04" },
  { location: "Damietta", count: 8, color: "#2563eb" },
  { location: "Beni Suef", count: 15, color: "#9333ea" },
  { location: "Minya", count: 13, color: "#c2410c" },
  { location: "Assiut", count: 11, color: "#0d9488" },
  { location: "Sohag", count: 9, color: "#7c2d12" },
  { location: "Qena", count: 7, color: "#581c87" },
  { location: "Luxor", count: 6, color: "#1e40af" },
  { location: "Aswan", count: 5, color: "#be123c" },
  { location: "Red Sea", count: 4, color: "#166534" },
  { location: "North Sinai", count: 3, color: "#92400e" },
  { location: "South Sinai", count: 2, color: "#6b7280" },
  { location: "New Valley", count: 2, color: "#a855f7" },
  { location: "Matrouh", count: 1, color: "#0ea5e9" },
];

import { useState } from "react";

const UsersDemographicsChart = () => {
  const [chartType, setChartType] = useState<"pie" | "bar">("bar");
  const [showAll, setShowAll] = useState(false);

  // Process data to show top locations and group others
  const getProcessedData = () => {
    if (showAll) {
      return allDemographicsData;
    }
    
    // Show top 8 locations and group the rest as "Others"
    const sortedData = [...allDemographicsData].sort((a, b) => b.count - a.count);
    const topLocations = sortedData.slice(0, 8);
    const otherLocations = sortedData.slice(8);
    
    if (otherLocations.length > 0) {
      const othersCount = otherLocations.reduce((sum, item) => sum + item.count, 0);
      topLocations.push({
        location: `Others (${otherLocations.length} countries)`,
        count: othersCount,
        color: "#6b7280"
      });
    }
    
    return topLocations;
  };

  const processedData = getProcessedData();
  const totalUsers = allDemographicsData.reduce((sum, item) => sum + item.count, 0);
  const topLocation = allDemographicsData.reduce((prev, current) => 
    prev.count > current.count ? prev : current
  );

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-700">
            Location: {data.location}
          </p>
          <p className="text-sm text-gray-600">
            Users: {data.count}
          </p>
          <p className="text-sm text-gray-600">
            Percentage: {((data.count / totalUsers) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label function for pie chart
  const renderCustomLabel = ({ location, percent }: any) => {
    // Only show label if percentage is > 3% to avoid clutter
    if (percent > 0.03) {
      return `${location.length > 12 ? location.substring(0, 12) + '...' : location} (${(percent * 100).toFixed(0)}%)`;
    }
    return '';
  };

  // Pie Chart Component
  const PieChartView = () => (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={processedData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomLabel}
          outerRadius={showAll ? 70 : 80}
          fill="#8884d8"
          dataKey="count"
        >
          {processedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        {!showAll && (
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
            wrapperStyle={{
              paddingTop: "20px",
              fontSize: "12px"
            }}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );

  // Bar Chart Component
  const BarChartView = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={processedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis 
          dataKey="location" 
          angle={-45}
          textAnchor="end"
          height={80}
          fontSize={10}
          interval={0}
        />
        <YAxis fontSize={12} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {processedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <Card className="h-full">
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <i className="tabler-world h-6 w-6 text-primary" />
            <div className="flex flex-col">
              <Typography variant="h5" fontWeight="bold">
                User Demographics
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Distribution across Egyptian governorates ({allDemographicsData.length} governorates)
              </Typography>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setChartType("bar")}
              variant={chartType === "bar" ? "contained" : "outlined"}
              size="small"
              startIcon={<i className="tabler-chart-bar h-4 w-4" />}
            >
              Bar
            </Button>
            <Button
              onClick={() => setChartType("pie")}
              variant={chartType === "pie" ? "contained" : "outlined"}
              size="small"
              startIcon={<i className="tabler-chart-pie h-4 w-4" />}
            >
              Pie
            </Button>
          </div>
        </div>

        {/* Toggle for showing all data */}
        <Box className="mb-4">
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="text"
            size="small"
            color="primary"
          >
            {showAll ? `Show Top Governorates Only` : `Show All ${allDemographicsData.length} Governorates`}
          </Button>
        </Box>

        <div className="h-64 sm:h-72 md:h-80 lg:h-[400px] xl:h-96">
          {chartType === "pie" ? <PieChartView /> : <BarChartView />}
        </div>
        
        {/* Summary Statistics */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <Typography variant="h6" className="text-primary font-bold">
                {totalUsers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Users
              </Typography>
            </div>
            <div>
              <Typography variant="h6" className="text-success font-bold">
                {topLocation.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Top Governorate
              </Typography>
            </div>
            <div>
              <Typography variant="h6" className="text-warning font-bold">
                {allDemographicsData.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Governorates
              </Typography>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersDemographicsChart;
