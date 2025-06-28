import React from "react";
import {
  Paper,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import DetailedScoreCards from "./DetailedScoredCards";
import CustomRadarChart from "./RadarChart";

const cardData = [
  {
    category: "BUSINESS CONCEPT",
    score: "4.80%",
    bgColor: "bg-orange-100",
    textColor: "text-orange-700",
  },
  {
    category: "ORGANISATION",
    score: "9.40%",
    bgColor: "bg-green-100",
    textColor: "text-green-700",
  },
  {
    category: "CUSTOMER RELATIONS",
    score: "1.20%",
    bgColor: "bg-red-100",
    textColor: "text-red-700",
  },
  {
    category: "OPERATIONS",
    score: "0.00%",
    bgColor: "bg-cyan-100",
    textColor: "text-cyan-700",
  },
];

const AnalysisAssessment = () => {
  return (
    <div className="w-full flex flex-col space-y-6">
      <Card>
        {/* Header Section */}
        <CardContent>
          <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <Typography
              variant="h4"
              component="h1"
              className="font-semibold text-gray-800 mb-2 sm:mb-0"
            >
              Analysis Assessment
            </Typography>
            <Box className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <Box className="flex items-center text-sm text-gray-600">
                <Typography variant="caption" className="mr-2 text-gray-500">
                  Created At
                </Typography>
                <Box className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full">
                  <i className="tabler-calendar text-gray-500 mr-1"></i>
                  <Typography
                    variant="caption"
                    className="text-gray-700 font-medium"
                  >
                    2025-01-24 17:11:27
                  </Typography>
                </Box>
              </Box>
              {/* <IconButton size="small" className="bg-purple-600 text-white hover:bg-purple-700 ml-2 hidden md:inline-flex">
              <SettingsIcon fontSize="small" />
            </IconButton> */}
            </Box>
          </Box>

          {/* Overall Recommendations & Actions */}
          <Box className="mb-8">
            <Box className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <Box className="space-y-3">
                <Box className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0 md:space-x-3">
                  <Typography
                    variant="body1"
                    className="text-gray-600 whitespace-nowrap"
                  >
                    Overall Recommendation
                  </Typography>
                  <Box
                    component="span"
                    className="bg-gray-200 text-gray-800 px-4 py-1.5 rounded-full text-sm font-medium"
                  >
                    Good progress, but room for scaling
                  </Box>
                </Box>
                <Box className="flex items-center space-x-3">
                  <Typography
                    variant="body1"
                    className="text-gray-600 whitespace-nowrap"
                  >
                    Overall Weighted Score
                  </Typography>
                  <Box
                    component="span"
                    className="bg-teal-100 text-teal-700 px-4 py-1.5 rounded-full text-sm font-semibold"
                  >
                    15.4
                  </Box>
                </Box>
              </Box>
              <Box className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-4 md:mt-0">
                <Button variant="contained" color="primary">
                  <i className="tabler-plus mie-2"></i>
                  New Assessment
                </Button>
                <Button
                  variant="contained"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-none normal-case font-medium"
                >
                  <i className="tabler-file-text mie-2"></i>
                  Export as Pdf
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Score Cards Grid */}
          <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardData.map((card, index) => (
              <Paper
                key={index}
                elevation={1}
                className="p-5 rounded-lg shadow-md bg-white"
              >
                <Box
                  className={`inline-block px-4 py-2 rounded-full text-xs font-semibold uppercase mb-4 ${card.bgColor} ${card.textColor}`}
                >
                  {card.category}
                </Box>
                <Box className="flex justify-between items-end">
                  <Typography
                    variant="h5"
                    component="p"
                    className="font-bold text-gray-800"
                  >
                    {card.score}
                  </Typography>
                  <Typography variant="caption" className="text-gray-500 ml-2">
                    Score
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        </CardContent>
      </Card>

      <Paper elevation={1} className="p-5 rounded-lg shadow-md">
        <CustomRadarChart />
      </Paper>

      <DetailedScoreCards />
    </div>
  );
};

export default AnalysisAssessment;
