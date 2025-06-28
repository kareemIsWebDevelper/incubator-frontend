"use client";

import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CustomTextField from "@core/components/mui/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const statsData = [
  {
    label: "Startups",
    value: 12,
    icon: "tabler-rocket",
    color: "bg-purple-100 text-purple-600",
  },
  {
    label: "Not Started",
    value: 4,
    icon: "tabler-gavel",
    color: "bg-gray-100 text-gray-600",
  },
  {
    label: "In Progress",
    value: 4,
    icon: "tabler-file-text",
    color: "bg-blue-100 text-blue-600",
  },
  {
    label: "Completed",
    value: 4,
    icon: "tabler-check",
    color: "bg-green-100 text-green-600",
  },
];

const startupData = [
  {
    id: 1,
    name: "Startup One",
    status: "Completed",
    statusIcon: "tabler-circle-check",
    statusColor: "text-purple-600",
  },
  {
    id: 2,
    name: "Startup Two",
    status: "In Progress",
    statusIcon: "tabler-file-text",
    statusColor: "text-blue-600",
  },
  {
    id: 3,
    name: "Startup Three",
    status: "Not Started",
    statusIcon: "tabler-gavel",
    statusColor: "text-gray-600",
  },
  {
    id: 4,
    name: "Startup One",
    status: "Completed", 
    statusIcon: "tabler-circle-check",
    statusColor: "text-purple-600",
  },
  {
    id: 5,
    name: "Startup Two",
    status: "In Progress",
    statusIcon: "tabler-file-text",
    statusColor: "text-blue-600",
  },
  {
    id: 6,
    name: "Startup Three",
    status: "Not Started",
    statusIcon: "tabler-gavel",
    statusColor: "text-gray-600",
  },
  {
    id: 7,
    name: "Startup One",
    status: "Completed",
    statusIcon: "tabler-circle-check",
    statusColor: "text-purple-600",
  },
  {
    id: 8,
    name: "Startup Two",
    status: "In Progress",
    statusIcon: "tabler-file-text",
    statusColor: "text-blue-600",
  },
  {
    id: 9,
    name: "Startup Three",
    status: "Not Started",
    statusIcon: "tabler-gavel",
    statusColor: "text-gray-600",
  },
];

export default function JudgerScreening() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStartups = startupData.filter((startup) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "not-started" && startup.status === "Not Started") ||
      (filter === "in-progress" && startup.status === "In Progress") ||
      (filter === "completed" && startup.status === "Completed");

    const matchesSearch = startup.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {stat.label}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {stat.value}
                    </Typography>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <i className={`${stat.icon} h-6 w-6`}></i>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filter and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Typography variant="subtitle2" color="text.secondary">
                  Filter
                </Typography>
                <RadioGroup
                  value={filter}
                  onChange={handleFilterChange}
                  row
                >
                  <FormControlLabel
                    value="all"
                    control={<Radio size="small" />}
                    label={<Typography variant="body2">All</Typography>}
                  />
                  <FormControlLabel
                    value="not-started"
                    control={<Radio size="small" />}
                    label={<Typography variant="body2">Not Started</Typography>}
                  />
                  <FormControlLabel
                    value="in-progress"
                    control={<Radio size="small" />}
                    label={<Typography variant="body2">In Progress</Typography>}
                  />
                  <FormControlLabel
                    value="completed"
                    control={<Radio size="small" />}
                    label={<Typography variant="body2">Completed</Typography>}
                  />
                </RadioGroup>
              </div>

              <Box sx={{ maxWidth: 300, width: "100%" }}>
                <CustomTextField 
                  fullWidth
                  size="small"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <i className="tabler-search text-gray-400"></i>
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
            </div>
          </CardContent>
        </Card>

        {/* Startup Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStartups.map((startup) => (
            <Card
              key={startup.id}
              className="bg-white hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Typography variant="subtitle2" color="text.secondary">
                        GL
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="caption" color="text.secondary">
                        growth
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        labs
                      </Typography>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <i className={`${startup.statusIcon} ${startup.statusColor} mb-1`}></i>
                    <Typography variant="caption" color="text.secondary">
                      {startup.status}
                    </Typography>
                  </div>
                </div>

                <Typography variant="h6" gutterBottom>
                  {startup.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit.
                  Dolorum, itaque nam? Sint dolore, reiciendis soluta eveniet
                  impedit consectetur rerum nam quidem delectus amet nostrum
                  repudiandae, quos aspernatur dolor reprehenderit nesciunt.
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
