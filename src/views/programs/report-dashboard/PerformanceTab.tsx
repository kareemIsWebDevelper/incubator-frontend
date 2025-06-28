import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// Mock data for the component
const sectors = [
  { id: 1, name_en: "Technology", name_ar: "تكنولوجيا" },
  { id: 2, name_en: "Healthcare", name_ar: "الرعاية الصحية" },
  { id: 3, name_en: "Finance", name_ar: "التمويل" },
  { id: 4, name_en: "Education", name_ar: "التعليم" },
];

const stages = [
  { id: 1, name_en: "Seed", name_ar: "المرحلة الأولية" },
  { id: 2, name_en: "Early Stage", name_ar: "المرحلة المبكرة" },
  { id: 3, name_en: "Growth", name_ar: "النمو" },
  { id: 4, name_en: "Expansion", name_ar: "التوسع" },
];

const companies = [
  {
    id: 1,
    name_en: "Tech Innovators",
    name_ar: "مبتكرو التكنولوجيا",
    sector: "Technology",
    stage: "Seed",
    rating: 4.2,
    progress: 65,
    notes: "Promising startup with innovative tech solutions",
  },
  {
    id: 2,
    name_en: "Health Solutions",
    name_ar: "حلول صحية",
    sector: "Healthcare",
    stage: "Early Stage",
    rating: 3.8,
    progress: 45,
    notes: "Working on healthcare accessibility platform",
  },
  {
    id: 3,
    name_en: "FinTech Pro",
    name_ar: "فينتك برو",
    sector: "Finance",
    stage: "Growth",
    rating: 4.5,
    progress: 80,
    notes: "Rapidly expanding payment solution provider",
  },
  {
    id: 4,
    name_en: "EduLearn",
    name_ar: "إيدوليرن",
    sector: "Education",
    stage: "Seed",
    rating: 3.2,
    progress: 30,
    notes: "Developing new learning management system",
  },
  {
    id: 5,
    name_en: "AI Systems",
    name_ar: "أنظمة الذكاء الاصطناعي",
    sector: "Technology",
    stage: "Expansion",
    rating: 4.7,
    progress: 90,
    notes: "Leading AI solutions for enterprise clients",
  },
];

interface PerformanceTabProps {
  chartColors: string[];
  chartFont: object;
}

const PerformanceTab = ({ chartColors, chartFont }: PerformanceTabProps) => {
  // State for filters
  const [sectorFilter, setSectorFilter] = useState("");
  const [stageFilter, setStageFilter] = useState("");
  const [minRating, setMinRating] = useState("");
  const [minProgress, setMinProgress] = useState("");

  // Language setting (en or ar)
  const language = "en";

  // Filtered companies based on filters
  const filteredCompanies = companies.filter((company) => {
    if (sectorFilter && company.sector !== sectorFilter) return false;
    if (stageFilter && company.stage !== stageFilter) return false;
    if (minRating && company.rating < parseFloat(minRating)) return false;
    if (minProgress && company.progress < parseInt(minProgress)) return false;
    return true;
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you might fetch data here
    console.log("Search with filters:", {
      sectorFilter,
      stageFilter,
      minRating,
      minProgress,
    });
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      {/* Filters for this specific report */}
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
            Filter Options (Performance)
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSearch}>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item md={3} sm={6} xs={12}>
              <FormControl size="small" fullWidth>
                <InputLabel id="sector-label">Sector</InputLabel>
                <Select
                  labelId="sector-label"
                  id="perfFilterSector"
                  value={sectorFilter}
                  label="Sector"
                  onChange={(e) => setSectorFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {sectors.map((sector) => (
                    <MenuItem key={sector.id} value={sector.name_en}>
                      {sector[`name_${language}`]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={3} sm={6} xs={12}>
              <FormControl size="small" fullWidth>
                <InputLabel id="stage-label">Stage</InputLabel>
                <Select
                  labelId="stage-label"
                  id="perfFilterStage"
                  value={stageFilter}
                  label="Stage"
                  onChange={(e) => setStageFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {stages.map((stage) => (
                    <MenuItem key={stage.id} value={stage.name_en}>
                      {stage[`name_${language}`]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={2} sm={6} xs={12}>
              <TextField
                size="small"
                fullWidth
                id="perfFilterMinRating"
                label="Min Rating"
                type="number"
                InputProps={{ inputProps: { min: 1, max: 5, step: 0.1 } }}
                placeholder="e.g., 3.5"
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
              />
            </Grid>

            <Grid item md={2} sm={6} xs={12}>
              <TextField
                size="small"
                fullWidth
                id="perfFilterMinProgress"
                label="Min Progress (%)"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 100, step: 5 } }}
                placeholder="e.g., 50"
                value={minProgress}
                onChange={(e) => setMinProgress(e.target.value)}
              />
            </Grid>

            <Grid item md={2} sm={12} xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                startIcon={<i className="tabler tabler-search" />}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Content from performance report */}
      <Grid container spacing={4}>
        <Grid item xs={12} mb={8}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              {/* Chart 1: Startups by Sector */}
              <Card className="border">
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className="border-b-2 border-primary flex items-center mb-8"
                  >
                    <i className="tabler tabler-vector-bezier-arc text-primary me-2" />
                    Distribution by Sector
                  </Typography>
                  <Box
                    sx={{
                      height: 300,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={filteredCompanies.map((company) => ({
                            name: company.sector,
                            value: company.progress,
                          }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius="80%"
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) =>
                            `${name} (${(percent * 100).toFixed(0)}%)`
                          }
                        >
                          {filteredCompanies.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={chartColors[index % chartColors.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item md={6} xs={12}>
              {/* Chart 2: Average Progress by Stage */}
              <Card className="border">
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className="border-b-2 border-primary flex items-center mb-8"
                  >
                    <i className="tabler tabler-chart-bar text-primary me-2" />
                    Average Progress by Stage
                  </Typography>
                  <Box
                    sx={{
                      height: 300,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={filteredCompanies.map((company) => ({
                          name: company.stage,
                          progress: company.progress,
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                          dataKey="progress"
                          fill="#8884d8"
                          name="Progress (%)"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Card className="border">
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                className="border-b-2 border-primary flex items-center"
              >
                <i className="tabler tabler-list-details text-primary me-2" />
                Startup Performance List
              </Typography>

              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Company Name</TableCell>
                      <TableCell>Sector</TableCell>
                      <TableCell>Stage</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Progress (%)</TableCell>
                      <TableCell>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredCompanies.map((company, index) => (
                      <TableRow key={company.id} hover>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{company[`name_${language}`]}</TableCell>
                        <TableCell>{company.sector}</TableCell>
                        <TableCell>{company.stage}</TableCell>
                        <TableCell>{company.rating}</TableCell>
                        <TableCell>{company.progress}</TableCell>
                        <TableCell>{company.notes}</TableCell>
                      </TableRow>
                    ))}
                    {filteredCompanies.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          No matching records found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PerformanceTab;
