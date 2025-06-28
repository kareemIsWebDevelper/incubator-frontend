// MUI imports
import { Card, CardContent, Typography } from "@mui/material";

// Recharts imports
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Sample data for programs progress over time
const programsProgressData = [
  {
    month: "Jan",
    "Accelerator Program": 45,
    "Incubator Program": 32,
    "Seed Fund Program": 28,
    "Growth Program": 65,
    "Venture Studio": 38,
  },
  {
    month: "Feb",
    "Accelerator Program": 52,
    "Incubator Program": 41,
    "Seed Fund Program": 35,
    "Growth Program": 72,
    "Venture Studio": 45,
  },
  {
    month: "Mar",
    "Accelerator Program": 58,
    "Incubator Program": 48,
    "Seed Fund Program": 42,
    "Growth Program": 78,
    "Venture Studio": 52,
  },
  {
    month: "Apr",
    "Accelerator Program": 65,
    "Incubator Program": 55,
    "Seed Fund Program": 48,
    "Growth Program": 85,
    "Venture Studio": 58,
  },
  {
    month: "May",
    "Accelerator Program": 72,
    "Incubator Program": 62,
    "Seed Fund Program": 55,
    "Growth Program": 88,
    "Venture Studio": 65,
  },
  {
    month: "Jun",
    "Accelerator Program": 78,
    "Incubator Program": 68,
    "Seed Fund Program": 62,
    "Growth Program": 92,
    "Venture Studio": 72,
  },
  {
    month: "Jul",
    "Accelerator Program": 85,
    "Incubator Program": 75,
    "Seed Fund Program": 68,
    "Growth Program": 95,
    "Venture Studio": 78,
  },
  {
    month: "Aug",
    "Accelerator Program": 88,
    "Incubator Program": 82,
    "Seed Fund Program": 75,
    "Growth Program": 98,
    "Venture Studio": 85,
  },
  {
    month: "Sep",
    "Accelerator Program": 92,
    "Incubator Program": 88,
    "Seed Fund Program": 82,
    "Growth Program": 100,
    "Venture Studio": 92,
  },
  {
    month: "Oct",
    "Accelerator Program": 95,
    "Incubator Program": 92,
    "Seed Fund Program": 88,
    "Growth Program": 100,
    "Venture Studio": 95,
  },
  {
    month: "Nov",
    "Accelerator Program": 98,
    "Incubator Program": 95,
    "Seed Fund Program": 92,
    "Growth Program": 100,
    "Venture Studio": 98,
  },
  {
    month: "Dec",
    "Accelerator Program": 100,
    "Incubator Program": 98,
    "Seed Fund Program": 95,
    "Growth Program": 100,
    "Venture Studio": 100,
  },
];

// Colors for different programs
const programColors = {
  "Accelerator Program": "#6366f1",
  "Incubator Program": "#10b981",
  "Seed Fund Program": "#f59e0b",
  "Growth Program": "#ef4444",
  "Venture Studio": "#ec4899",
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800">{`${label} 2024`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {`${entry.dataKey}: ${entry.value}%`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ProgramsProgressChart = () => {
  return (
    <Card className="h-full">
      <CardContent>
        <div className="flex items-center space-x-3 mb-6">
          <i className="tabler-chart-line h-6 w-6 text-primary" />
          <div className="flex flex-col">
            <Typography variant="h5" fontWeight="bold">
              Programs Progress Over Time
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Monthly progress tracking for all programs
            </Typography>
          </div>
        </div>
        <div className="h-80 sm:h-96 md:h-[400px] lg:h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={programsProgressData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
                domain={[0, 100]}
                label={{ 
                  value: 'Progress %', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              
              {Object.entries(programColors).map(([program, color]) => (
                <Line
                  key={program}
                  type="monotone"
                  dataKey={program}
                  stroke={color}
                  strokeWidth={3}
                  dot={{ 
                    fill: color, 
                    strokeWidth: 2, 
                    r: 4 
                  }}
                  activeDot={{ 
                    r: 6, 
                    stroke: color,
                    strokeWidth: 2,
                    fill: 'white'
                  }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramsProgressChart;
