import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import {
  LineChart,
  PieChart,
  Pie,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import KpiCard from "./KpiCard";

const WorkshopsTab = () => {
  // Static data
  const trainerNames = [
    "John Doe",
    "Jane Smith",
    "Robert Johnson",
    "Emily White",
  ];

  const workshops = [
    {
      id: 1,
      title: "Introduction to React",
      trainer_name: "John Doe",
      reports_count: 15,
      type: "online",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      trainer_name: "Jane Smith",
      reports_count: 23,
      type: "offline",
    },
    {
      id: 3,
      title: "UX Design Principles",
      trainer_name: "Robert Johnson",
      reports_count: 18,
      type: "online",
    },
    {
      id: 4,
      title: "Project Management",
      trainer_name: "Emily White",
      reports_count: 12,
      type: "offline",
    },
  ];

  const companies = [
    {
      id: 1,
      name: "Tech Solutions Inc.",
      completion_rate: 95,
      has_passed: true,
    },
    {
      id: 2,
      name: "Digital Innovations",
      completion_rate: 82,
      has_passed: true,
    },
    {
      id: 3,
      name: "Creative Media Group",
      completion_rate: 68,
      has_passed: false,
    },
    {
      id: 4,
      name: "Enterprise Systems",
      completion_rate: 91,
      has_passed: true,
    },
  ];

  const surveyResponses = [
    {
      id: 1,
      user: { first_name_en: "Michael", last_name_en: "Brown" },
      responses: JSON.stringify([
        {
          question: "How would you rate the workshop content?",
          answers: [
            { text: "Excellent", status: true },
            { text: "Good", status: false },
            { text: "Average", status: false },
            { text: "Poor", status: false },
          ],
        },
        {
          question: "Was the trainer knowledgeable?",
          answers: [
            { text: "Very knowledgeable", status: true },
            { text: "Somewhat knowledgeable", status: false },
            { text: "Not knowledgeable", status: false },
          ],
        },
      ]),
    },
    {
      id: 2,
      user: { first_name_en: "Sarah", last_name_en: "Johnson" },
      responses: JSON.stringify([
        {
          question: "How would you rate the workshop content?",
          answers: [
            { text: "Excellent", status: false },
            { text: "Good", status: true },
            { text: "Average", status: false },
            { text: "Poor", status: false },
          ],
        },
        {
          question: "Was the trainer knowledgeable?",
          answers: [
            { text: "Very knowledgeable", status: true },
            { text: "Somewhat knowledgeable", status: false },
            { text: "Not knowledgeable", status: false },
          ],
        },
      ]),
    },
  ];

  // Statistics for KPIs
  const totalWorkshops = 34;
  const totalHours = 87;
  const zoomWorkshops = 20;
  const inPersonWorkshops = 14;

  // Chart data
  const workshopTypeData = [
    { name: "Zoom", value: zoomWorkshops },
    { name: "In-Person", value: inPersonWorkshops },
  ];

  const trainerRatingData = [
    { name: "John Doe", rating: 4.7 },
    { name: "Jane Smith", rating: 4.2 },
    { name: "Robert Johnson", rating: 4.9 },
    { name: "Emily White", rating: 4.5 },
  ];

  const kpiData = [
    {
      id: "totalWorkshops",
      value: totalWorkshops,
      label: "Total Workshops",
      icon: <i className="tabler-school text-primary"></i>,
      color: "#3f51b5",
    },
    {
      id: "totalHours",
      value: totalHours,
      label: "Total Hours",
      icon: <i className="tabler-clock text-success"></i>,
      color: "#4caf50",
    },
    {
      id: "zoomWorkshops",
      value: zoomWorkshops,
      label: "Zoom Workshops",
      icon: <i className="tabler-video text-warning"></i>,
      color: "#ff9800",
    },
    {
      id: "inPersonWorkshops",
      value: inPersonWorkshops,
      label: "In-Person Workshops",
      icon: <i className="tabler-users text-info"></i>,
      color: "#2196f3",
    },
  ];

  const COLORS = ["#0088FE", "#FFBB28", "#FF8042", "#00C49F"];

  return (
    <Box>
      {/* Filters */}
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
            Filter Options (Workshop)
          </Typography>
        </Box>

        <Grid container spacing={3} alignItems="flex-end">
          <Grid item md={3} xs={12}>
            <FormControl size="small" fullWidth>
              <InputLabel id="trainer-select-label">Trainer</InputLabel>
              <Select
                labelId="trainer-select-label"
                id="wsFilterTrainer"
                label="Trainer"
                defaultValue=""
              >
                <MenuItem value="">All</MenuItem>
                {trainerNames.map((trainer, index) => (
                  <MenuItem key={index} value={trainer}>
                    {trainer}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={3} xs={12}>
            <TextField
              size="small"
              fullWidth
              id="wsFilterWorkshop"
              label="Workshop Name"
              variant="outlined"
            />
          </Grid>

          <Grid item md={3} xs={12}>
            <FormControl size="small" fullWidth>
              <InputLabel id="type-select-label">Workshop Type</InputLabel>
              <Select
                labelId="type-select-label"
                id="wsFilterType"
                label="Workshop Type"
                defaultValue=""
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="online">Zoom</MenuItem>
                <MenuItem value="offline">In-Person</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={3} xs={12} textAlign="left">
            <Button
              variant="contained"
              sx={{ width: "50%" }}
              startIcon={<i className="tabler-search"></i>}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* KPIs Row */}
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 4, mt: 4 }}>
        {kpiData.map((kpi) => (
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

      <Divider className="my-6" />

      <Grid container spacing={6}>
        <Grid item lg={7} xs={12}>
          {/* Workshop Details Table */}
          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="h5"
                className="flex items-center w-full border-b-2 border-primary"
              >
                <i className="tabler-list-check text-primary me-2"></i>
                Workshop Details
              </Typography>
            </Box>

            <TableContainer component={Paper}>
              <Table aria-label="workshop details table">
                <TableHead>
                  <TableRow>
                    <TableCell>Workshop Name</TableCell>
                    <TableCell>Trainer</TableCell>
                    <TableCell>Participants</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {workshops.map((workshop) => (
                    <TableRow key={workshop.id}>
                      <TableCell>{workshop.title}</TableCell>
                      <TableCell>{workshop.trainer_name || "-"}</TableCell>
                      <TableCell>{workshop.reports_count || "-"}</TableCell>
                      <TableCell>
                        <Chip
                          label="-"
                          color="primary"
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            workshop.type === "online" ? "Zoom" : "In-Person"
                          }
                          color={
                            workshop.type === "online" ? "secondary" : "warning"
                          }
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Company Performance Table */}
          <Box>
            <Typography
              variant="h5"
              className="flex items-center w-full border-b-2 border-primary"
            >
              <i className="tabler-certificate text-primary me-2"></i>
              Company Performance
            </Typography>

            <TableContainer component={Paper}>
              <Table aria-label="company performance table">
                <TableHead>
                  <TableRow>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Completion Rate</TableCell>
                    <TableCell>Pass/Fail</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {companies.map((company) => {
                    const rate = company.completion_rate || 0;
                    const chipColor =
                      rate >= 90
                        ? "success"
                        : rate >= 75
                          ? "warning"
                          : "default";

                    return (
                      <TableRow key={company.id}>
                        <TableCell>{company.name}</TableCell>
                        <TableCell>
                          <Chip
                            label={`${rate}%`}
                            color={chipColor}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {company.has_passed ? (
                            <i
                              className="tabler-circle-check"
                              style={{ color: "#4caf50", fontSize: "1.2rem" }}
                            ></i>
                          ) : (
                            <i
                              className="tabler-circle-x"
                              style={{ color: "#f44336", fontSize: "1.2rem" }}
                            ></i>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>

        <Grid item lg={5} xs={12}>
          {/* Chart 1: Workshop Type Distribution */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              className="flex items-center w-full border-b-2 border-primary"
            >
              <i className="tabler-chart-pie text-primary me-2"></i>
              Workshop Type Distribution
            </Typography>

            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={workshopTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {workshopTypeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Box>

          {/* Chart 2: Average Rating per Trainer */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              className="flex items-center w-full border-b-2 border-primary"
            >
              <i className="tabler-chart-bar text-primary me-2"></i>
              Average Trainer Ratings
            </Typography>

            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trainerRatingData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="rating"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Box>

          {/* Survey Results */}
          <Box>
            <Typography
              variant="h5"
              className="flex items-center w-full border-b-2 border-primary"
            >
              <i className="tabler-chart-dots text-primary me-2"></i>
              Survey Results
            </Typography>

            {surveyResponses.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  p: 3,
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                }}
              >
                <i
                  className="tabler-info-circle"
                  style={{ marginRight: "4px" }}
                ></i>{" "}
                No survey responses found.
              </Box>
            ) : (
              <TableContainer component={Paper}>
                <Table aria-label="survey results table">
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Responses</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {surveyResponses.map((response) => {
                      const decodedResponses = JSON.parse(response.responses);
                      return (
                        <TableRow key={response.id}>
                          <TableCell>
                            {`${response.user.first_name_en} ${response.user.last_name_en}` ||
                              "-"}
                          </TableCell>
                          <TableCell>
                            {Array.isArray(decodedResponses) ? (
                              <ul style={{ paddingLeft: "20px", margin: 0 }}>
                                {decodedResponses.map((item, idx) => {
                                  const selectedAnswer = item.answers.find(
                                    (answer: any) => answer.status === true
                                  );
                                  return (
                                    <li key={idx}>
                                      <strong>{item.question}:</strong>{" "}
                                      {selectedAnswer
                                        ? selectedAnswer.text
                                        : ""}
                                    </li>
                                  );
                                })}
                              </ul>
                            ) : (
                              <span style={{ color: "#757575" }}>-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkshopsTab;
