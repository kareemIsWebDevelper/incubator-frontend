'use client';
import { useState } from "react";
import { 
  BarChart, Bar, 
  PieChart, Pie, Cell, 
  LineChart, Line, 
  XAxis, YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
// import { 
//   Bell, Search, Menu, User, MessageSquare, 
//   FileText, Heart, Clock, Shield, Settings,
//   ChevronDown
// } from "lucide-react";

// Sample data for charts
const activityData = [
  { name: "Product Reviews", value: 3 },
  { name: "Feature Requests", value: 4 },
  { name: "Customer Support", value: 2 },
  { name: "Sales", value: 1 },
  { name: "Other", value: 2 }
];

const timeData = [
  { name: "Mon", value: 3 },
  { name: "Tue", value: 2 },
  { name: "Wed", value: 4 },
  { name: "Thu", value: 1 },
  { name: "Fri", value: 3 },
  { name: "Sat", value: 2 },
  { name: "Sun", value: 0 },
];

const tierData = [
  { name: "Free", value: 67 },
  { name: "Basic", value: 33 },
];

const companyData = [
  { name: "SMB", value: 25 },
  { name: "Enterprise", value: 35 },
  { name: "Mid-Market", value: 40 },
];

const sourceData = [
  { name: "Email", value: 45 },
  { name: "Web", value: 25 },
  { name: "Mobile", value: 15 },
  { name: "API", value: 10 },
  { name: "Other", value: 5 },
];

// Color palettes
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe'];
const PIE_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe', '#00C49F', '#FFBB28'];
const COMPANY_COLORS = ['#ff9eb3', '#6236ff', '#0052cc'];
const SOURCE_COLORS = ['#6236ff', '#00C49F', '#FFBB28', '#FF8042', '#a4de6c'];

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Main content */}
      <div className="flex-1">
        
        {/* Dashboard content */}
        <main className="p-6">
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="rounded-full bg-blue-100 p-2 mr-4">
                  {/* <Shield size={18} className="text-blue-500" /> */}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Messages</p>
                  <h3 className="text-xl font-bold">5</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="rounded-full bg-red-100 p-2 mr-4">
                  {/* <Bell size={18} className="text-red-500" /> */}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Notifications</p>
                  <h3 className="text-xl font-bold">8</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="rounded-full bg-purple-100 p-2 mr-4">
                  {/* <FileText size={18} className="text-purple-500" /> */}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Documents</p>
                  <h3 className="text-xl font-bold">32</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="rounded-full bg-cyan-100 p-2 mr-4">
                  {/* <Clock size={18} className="text-cyan-500" /> */}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Sessions</p>
                  <h3 className="text-xl font-bold">42</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="rounded-full bg-pink-100 p-2 mr-4">
                  {/* <Heart size={18} className="text-pink-500" /> */}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Favorites</p>
                  <h3 className="text-xl font-bold">13</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="rounded-full bg-cyan-100 p-2 mr-4">
                  {/* <MessageSquare size={18} className="text-cyan-500" /> */}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Comments</p>
                  <h3 className="text-xl font-bold">116</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="rounded-full bg-blue-100 p-2 mr-4">
                  {/* <FileText size={18} className="text-blue-500" /> */}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Reports</p>
                  <h3 className="text-xl font-bold">5</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="rounded-full bg-rose-100 p-2 mr-4">
                  {/* <Bell size={18} className="text-rose-500" /> */}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Alerts</p>
                  <h3 className="text-xl font-bold">20</h3>
                </div>
              </div>
            </div>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activity by Region */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-medium text-gray-700 mb-4">Activity by Region</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={false} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Messages by Status */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-medium text-gray-700 mb-4">Messages by Status</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* User Tier Distribution */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-medium text-gray-700 mb-4">User Tier Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tierData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {tierData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Company by Customer Size */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-medium text-gray-700 mb-4">Company by Customer Size</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={companyData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {companyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COMPANY_COLORS[index % COMPANY_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Messages by Source */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-medium text-gray-700 mb-4">Messages by Source</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={SOURCE_COLORS[index % SOURCE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Recent Progress */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-medium text-gray-700 mb-4">Project Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Implementation Planning</span>
                    <span className="text-sm font-medium text-gray-700">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}