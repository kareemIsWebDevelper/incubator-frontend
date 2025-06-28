import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Divider,
} from "@mui/material";
import KpiCard from "./KpiCard";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const mentorshipKpiData = [
  {
    id: "mentorshipTotalSessions",
    value: 32,
    label: "Total Sessions",
    icon: <i className="tabler tabler-users" />,
    color: "text-blue-500",
  },
  {
    id: "mentorshipTotalHours",
    value: 48.0,
    label: "Total Hours",
    icon: <i className="tabler tabler-clock" />,
    color: "text-green-500",
  },
  {
    id: "mentorshipAverageRating",
    value: 4.6,
    label: "Average Rating",
    icon: <i className="tabler tabler-star" />,
    color: "text-yellow-500",
  },
];

// Mock data
const mentorshipData = {
  mentors: [
    { id: 1, name: "John Smith" },
    { id: 2, name: "Sarah Johnson" },
    { id: 3, name: "Michael Lee" },
  ],
  companies: [
    { id: 1, name: "Company A" },
    { id: 2, name: "Company B" },
    { id: 3, name: "Company C" },
  ],
  mentorshipRequests: [
    // Company grouping data
    {
      userId: 1,
      company: { name: "Company A" },
      mentor: { first_name: "John", last_name: "Smith" },
      totalSessions: 12,
      totalHours: 18.5,
      rating: 4.8,
    },
    {
      userId: 2,
      company: { name: "Company B" },
      mentor: { first_name: "Sarah", last_name: "Johnson" },
      totalSessions: 8,
      totalHours: 12.0,
      rating: 4.2,
    },
    {
      userId: 3,
      company: { name: "Company C" },
      mentor: { first_name: "Michael", last_name: "Lee" },
      totalSessions: 5,
      totalHours: 7.5,
      rating: 4.7,
    },
    // Mentor grouping data
    {
      mentorId: 1,
      mentor: { name: "John Smith" },
      totalSessions: 15,
      totalHours: 22.5,
      rating: 4.6,
    },
    {
      mentorId: 2,
      mentor: { name: "Sarah Johnson" },
      totalSessions: 10,
      totalHours: 15.0,
      rating: 4.3,
    },
    {
      mentorId: 3,
      mentor: { name: "Michael Lee" },
      totalSessions: 7,
      totalHours: 10.5,
      rating: 4.9,
    },
  ],
  kpis: {
    totalSessions: 32,
    totalHours: 48.0,
    averageRating: 4.6,
  },
};

// Chart data
const sessionDistributionData = [
  { name: "John Smith", value: 15 },
  { name: "Sarah Johnson", value: 10 },
  { name: "Michael Lee", value: 7 },
];

const mentorRatingData = [
  { name: "John Smith", rating: 4.6 },
  { name: "Sarah Johnson", rating: 4.3 },
  { name: "Michael Lee", rating: 4.9 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

interface MentorshipTabProps {
  chartColors: string[];
  chartFont: object;
}

const MentorshipTab = ({ chartColors, chartFont }: MentorshipTabProps) => {
  const [mentor, setMentor] = useState("");
  const [company, setCompany] = useState("");
  const [zoomDate, setZoomDate] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ mentor, company, zoomDate });
    // Filter functionality would go here
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      {/* Filters Section */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          bgcolor: "action.hover",
        }}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <i className="tabler-filter" style={{ marginRight: 8 }}></i>
          <Typography variant="h6" fontWeight="bold">
            Filter Options (Mentorship)
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item md={3} xs={12}>
              <FormControl size="small" fullWidth>
                <InputLabel id="mentor-select-label">Mentor</InputLabel>
                <Select
                  labelId="mentor-select-label"
                  id="mentorFilterMentor"
                  value={mentor}
                  label="Mentor"
                  onChange={(e) => setMentor(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {mentorshipData.mentors.map((mentor) => (
                    <MenuItem key={mentor.id} value={mentor.id}>
                      {mentor.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={3} xs={12}>
              <FormControl size="small" fullWidth>
                <InputLabel id="company-select-label">Company</InputLabel>
                <Select
                  labelId="company-select-label"
                  id="mentorFilterCompany"
                  value={company}
                  label="Company"
                  onChange={(e) => setCompany(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {mentorshipData.companies.map((company) => (
                    <MenuItem key={company.id} value={company.id}>
                      {company.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={3} xs={12}>
              <TextField
                size="small"
                fullWidth
                id="mentorFilterDateStart"
                label="From Date"
                type="date"
                value={zoomDate}
                onChange={(e) => setZoomDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item md={3} xs={12} textAlign="left">
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "50%" }}
                startIcon={<i className="tabler-search"></i>}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* KPIs Row */}
      <Grid container spacing={3} justifyContent="center" sx={{ mb: 4, mt: 4 }}>
        {mentorshipKpiData.map((kpi) => (
          <Grid item lg={3} md={6} xs={12}>
            <KpiCard
              icon={kpi.icon}
              value={kpi.value}
              label={kpi.label}
              iconColor={kpi.color}
            />
          </Grid>
        ))}
      </Grid>

      <Divider className="my-6" />

      {/* Tables and Charts Section */}
      <Grid container spacing={3}>
        <Grid item lg={7} xs={12}>
          {/* Table 1: Mentorship Details per Company */}
          <Box mb={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <i
                className="tabler-building-user"
                style={{ marginRight: 8, color: "#3f51b5" }}
              ></i>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ borderBottom: 2, borderColor: "primary.main", pb: 0.5 }}
              >
                Mentorship Details by Company
              </Typography>
            </Box>

            <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Mentor</TableCell>
                    <TableCell>Sessions</TableCell>
                    <TableCell>Hours</TableCell>
                    <TableCell>Mentor Rating</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mentorshipData.mentorshipRequests
                    .filter((item) => item.userId)
                    .map((item, index) => (
                      <TableRow key={index} hover>
                        <TableCell>{item?.company?.name}</TableCell>
                        <TableCell>{`${item.mentor.first_name} ${item.mentor.last_name}`}</TableCell>
                        <TableCell>{item.totalSessions}</TableCell>
                        <TableCell>{item.totalHours.toFixed(1)}</TableCell>
                        <TableCell>
                          <Chip
                            label={`${item.rating.toFixed(1)}/5`}
                            color={item.rating >= 4.5 ? "success" : "primary"}
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Table 2: Mentor Performance */}
          <Box>
            <Box display="flex" alignItems="center" mb={2}>
              <i
                className="tabler-user-tie"
                style={{ marginRight: 8, color: "#3f51b5" }}
              ></i>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ borderBottom: 2, borderColor: "primary.main", pb: 0.5 }}
              >
                Mentor Performance
              </Typography>
            </Box>

            <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mentor</TableCell>
                    <TableCell>Total Sessions</TableCell>
                    <TableCell>Total Hours</TableCell>
                    <TableCell>Average Rating</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mentorshipData.mentorshipRequests
                    .filter((item) => item.mentorId)
                    .map((item, index) => (
                      <TableRow key={index} hover>
                        <TableCell>{item.mentor.name}</TableCell>
                        <TableCell>{item.totalSessions}</TableCell>
                        <TableCell>{item.totalHours.toFixed(1)}</TableCell>
                        <TableCell>
                          <Chip
                            label={`${item.rating.toFixed(1)}/5`}
                            color={item.rating >= 4.5 ? "success" : "primary"}
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>

        <Grid item lg={5} xs={12}>
          {/* Chart 1: Session Distribution */}
          <Paper sx={{ p: 3, mb: 4, boxShadow: 1 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <i
                className="tabler-chart-pie"
                style={{ marginRight: 8, color: "#3f51b5" }}
              ></i>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ borderBottom: 2, borderColor: "primary.main", pb: 0.5 }}
              >
                Session Distribution
              </Typography>
            </Box>
            <Box
              sx={{
                height: 300,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sessionDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sessionDistributionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} sessions`, "Sessions"]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>

          {/* Chart 2: Mentor Average Rating */}
          <Paper sx={{ p: 3, boxShadow: 1 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <i
                className="tabler-chart-bar"
                style={{ marginRight: 8, color: "#3f51b5" }}
              ></i>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ borderBottom: 2, borderColor: "primary.main", pb: 0.5 }}
              >
                Mentor Average Ratings
              </Typography>
            </Box>
            <Box
              sx={{
                height: 300,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mentorRatingData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="rating" name="Rating" fill="#ff9800" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MentorshipTab;
