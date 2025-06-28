import { useState, useEffect } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

// Default colors for the radar chart
const defaultColors = [
  "#8884d8", // purple
  "#82ca9d", // green
  "#ff7300", // orange
  "#0088fe", // blue
  "#ff5252", // red
  "#8dd1e1", // light blue
];

// Sample data
const initialData = [
  { subject: "Performance", score: 85, color: "#8884d8" },
  { subject: "Reliability", score: 78, color: "#82ca9d" },
  { subject: "Usability", score: 92, color: "#ff7300" },
  { subject: "Features", score: 81, color: "#0088fe" },
  { subject: "Support", score: 75, color: "#ff5252" },
  { subject: "Value", score: 88, color: "#8dd1e1" },
];

interface ChartDataItem {
  subject: string;
  score: number;
  color?: string;
}

interface RadarChartProps {
  data?: ChartDataItem[];
  title?: string;
}

const CustomRadarChart = ({ 
  data = initialData, 
  title = "Product Evaluation Radar Chart",
}: RadarChartProps) => {
  // Animation state
  const [animationActive, setAnimationActive] = useState(false);
  
  // Trigger animation when component mounts
  useEffect(() => {
    setAnimationActive(true);
  }, []);

  // Assign colors to data items that don't have colors
  const dataWithColors = data.map((item, index) => ({
    ...item,
    color: item.color || defaultColors[index % defaultColors.length]
  }));

  // Transform data for recharts
  // Each subject needs its own dataKey for individual coloring
  const transformedData = dataWithColors.reduce((result, item) => {
    const scoreObj: Record<string, string | number> = { subject: item.subject };
    // Use bracket notation with explicit typing
    scoreObj[item.subject] = item.score;
    return [...result, scoreObj];
  }, [] as Array<Record<string, string | number>>);

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto p-4 space-y-6">
      {/* <div className="text-center">
        <h2 className="text-2xl font-bold py-2">{title}</h2>
      </div> */}

      <div className="flex justify-center">
        <div className="w-full md:w-2/3 h-96">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart 
              cx="50%" 
              cy="50%" 
              outerRadius="80%" 
              data={transformedData}
              margin={{ top: 10, right: 30, bottom: 10, left: 30 }}
            >
              {/* Improved grid styling */}
              <PolarGrid 
                gridType="circle" 
                stroke="#e0e0e0" 
                strokeDasharray="3 3"
              />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#666', fontSize: 12, fontWeight: 500 }}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tickCount={5}
                stroke="#888"
                tickFormatter={(value) => `${value}%`}
              />
              {/* Re-enable tooltip with better formatting */}
              <Tooltip 
                formatter={(value) => [`${value}%`, "Score"]} 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  border: '1px solid #eee',
                  padding: '8px 12px'
                }}
                labelStyle={{ fontWeight: 'bold', marginBottom: '5px' }}
                cursor={{ strokeDasharray: '3 3' }}
              />
              {dataWithColors.map((item) => (
                <Radar
                  key={item.subject}
                  name={item.subject}
                  dataKey={item.subject}
                  stroke={item.color}
                  fill={item.color}
                  fillOpacity={0.4}
                  // Enhanced line styling
                  strokeWidth={2}
                  // Add animation
                  isAnimationActive={animationActive}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                  // Add dots at data points
                  dot={{ 
                    stroke: item.color, 
                    strokeWidth: 2,
                    fill: 'white',
                    r: 4 
                  }}
                  // Add hover effect
                  activeDot={{ 
                    stroke: item.color, 
                    strokeWidth: 2,
                    fill: item.color,
                    r: 6 
                  }}
                />
              ))}
              <Legend 
                iconType="circle" 
                iconSize={10}
                wrapperStyle={{
                  paddingTop: '15px',
                  fontSize: '12px'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Enhanced color legend */}
      <div className="flex flex-wrap justify-center gap-5 mt-6">
        {dataWithColors.map((item) => (
          <div 
            key={item.subject} 
            className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <div 
              className="w-5 h-5 rounded-full shadow-sm flex items-center justify-center" 
              style={{ backgroundColor: item.color }}
            >
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <span className="font-medium">
              {item.subject}: <span className="font-bold">{item.score}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomRadarChart;
