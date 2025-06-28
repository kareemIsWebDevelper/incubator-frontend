import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Chip,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Static data
const finalEvaluationData = [
  {
    rank: 1,
    companyName: "Alpha Tech",
    totalScore: 92.5,
    comments:
      "Outstanding performance across all evaluation metrics with exceptional innovation and market potential.",
    status: "Highest Rated",
  },
  {
    rank: 2,
    companyName: "Beta Solutions",
    totalScore: 85.0,
    comments:
      "Innovative solution with strong business model and execution strategy.",
    status: "Good Performance",
  },
  {
    rank: 3,
    companyName: "Gamma Systems",
    totalScore: 79.5,
    comments:
      "Solid technical foundation with some concerns about scalability.",
    status: "Good Performance",
  },
  {
    rank: 4,
    companyName: "Delta Innovations",
    totalScore: 68.0,
    comments:
      "Good concept but needs refinement in business model and go-to-market strategy.",
    status: "Needs Improvement",
  },
  {
    rank: 5,
    companyName: "Epsilon Tech",
    totalScore: 62.5,
    comments: "Interesting technology but significant gaps in execution plan.",
    status: "Needs Improvement",
  },
];

const scoreDistributionData = [
  { range: "90-100", count: 1 },
  { range: "80-89", count: 1 },
  { range: "70-79", count: 1 },
  { range: "60-69", count: 2 },
  { range: "50-59", count: 0 },
  { range: "0-49", count: 0 },
];

const evaluators = [
  {
    name: "Mohammed Abdullah",
    completed: 10,
    pending: 2,
    progress: 83,
  },
  {
    name: "Fatima Al-Zahra",
    completed: 12,
    pending: 0,
    progress: 100,
  },
  {
    name: "Khalid Mahmoud",
    completed: 9,
    pending: 3,
    progress: 75,
  },
];

const FinalEvaluationTab = () => {
  const [filterStatus, setFilterStatus] = useState("");
  const [filterMinScore, setFilterMinScore] = useState("");

  // Filter logic
  const filteredData = finalEvaluationData.filter((item) => {
    if (filterStatus && item.status !== filterStatus) return false;
    if (filterMinScore && item.totalScore < parseFloat(filterMinScore))
      return false;
    return true;
  });

  // Get top companies and improvement needed companies
  const topCompanies = finalEvaluationData
    .filter((item) => item.status === "Highest Rated")
    .map((item) => `${item.companyName} (${item.totalScore})`);

  const improvementCompanies = finalEvaluationData
    .filter((item) => item.status === "Needs Improvement")
    .map((item) => `${item.companyName} (${item.totalScore})`);

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
            Filter Options (Final)
          </Typography>
        </Box>

        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                id="feFilterStatus"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Highest Rated">Highest</MenuItem>
                <MenuItem value="Good Performance">Good</MenuItem>
                <MenuItem value="Needs Improvement">Improvement</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="feFilterMinScore"
              label="Minimum Score"
              type="number"
              size="small"
              inputProps={{ min: 0, max: 100, step: 5 }}
              placeholder="e.g., 70"
              value={filterMinScore}
              onChange={(e) => setFilterMinScore(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              sx={{ width: { xs: "100%", md: "50%" } }}
            >
              <i className="tabler-search me-2"></i> Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Content */}
      <Grid container spacing={8}>
        <Grid item xs={12} lg={8}>
          {/* Final Evaluations Table */}
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                variant="h5"
                className="border-b-2 border-primary flex items-center mb-4"
              >
                <i className="tabler-clipboard-list text-primary me-2"></i>{" "}
                Final Company Evaluations
              </Typography>

              <Box>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  sx={{ mr: 1 }}
                >
                  <i className="tabler-file text-sm me-1"></i> PDF
                </Button>
                <Button variant="outlined" color="success" size="small">
                  <i className="tabler-file-spreadsheet me-1 text-sm"></i> Excel
                </Button>
              </Box>
            </Box>

            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                aria-label="final evaluations table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Total Score</TableCell>
                    <TableCell>Judge Comments (Summary)</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((row) => (
                    <TableRow
                      key={row.rank}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        {row.rank}{" "}
                        {row.rank === 1 && (
                          <i className="tabler-medal ms-2"></i>
                        )}
                        {row.rank === 2 && (
                          <i className="tabler-award ms-2"></i>
                        )}
                      </TableCell>
                      <TableCell>{row.companyName}</TableCell>
                      <TableCell>{row.totalScore} / 100</TableCell>
                      <TableCell>{row.comments}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.status}
                          color={
                            row.status === "Highest Rated"
                              ? "success"
                              : row.status === "Good Performance"
                                ? "primary"
                                : "warning"
                          }
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Chart */}
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h5"
              className="border-b-2 border-primary flex items-center mb-4"
            >
              <i className="tabler-chart-bar text-primary me-2"></i> Score
              Distribution
            </Typography>

            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={scoreDistributionData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="count"
                    name="Number of Companies"
                    fill="#1976d2"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} lg={4}>
          {/* Evaluator Status */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              className="border-b-2 border-primary flex items-center mb-4"
            >
              <i className="tabler-user-check text-primary me-2"></i> Evaluator
              Status
            </Typography>

            {evaluators.map((evaluator, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent
                  sx={{ display: "flex", alignItems: "center", py: 1 }}
                >
                  <Box
                    sx={{
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: "grey.200",
                    }}
                  >
                    <i className="tabler-user"></i>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1">
                      {evaluator.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    >
                      <span style={{ color: "green" }}>
                        {evaluator.completed} C
                      </span>{" "}
                      /{" "}
                      <span style={{ color: "red" }}>
                        {evaluator.pending} P
                      </span>
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={evaluator.progress}
                      color="success"
                      sx={{ height: 8, borderRadius: 1 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Results Summary */}
          <Box>
            <Typography
              variant="h5"
              className="border-b-2 border-primary flex items-center mb-4"
            >
              <i className="tabler-target text-primary me-2"></i> Final Results
              Summary
            </Typography>

            <Typography
              variant="subtitle1"
              color="success.main"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              Highest Rated:
            </Typography>
            <List dense disablePadding>
              {topCompanies.map((company, index) => (
                <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                  <ListItemText primary={company} />
                </ListItem>
              ))}
              {topCompanies.length === 0 && (
                <ListItem disablePadding sx={{ py: 0.5 }}>
                  <ListItemText primary="No companies in this category" />
                </ListItem>
              )}
            </List>

            <Typography
              variant="subtitle1"
              color="error.main"
              sx={{ fontWeight: "bold", mt: 3, mb: 1 }}
            >
              Needs Improvement:
            </Typography>
            <List dense disablePadding>
              {improvementCompanies.map((company, index) => (
                <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                  <ListItemText primary={company} />
                </ListItem>
              ))}
              {improvementCompanies.length === 0 && (
                <ListItem disablePadding sx={{ py: 0.5 }}>
                  <ListItemText primary="No companies in this category" />
                </ListItem>
              )}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FinalEvaluationTab;
