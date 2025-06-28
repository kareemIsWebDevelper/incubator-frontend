import React from "react";
import { Box, Typography } from "@mui/material";

interface StatItemDisplayProps {
  icon?: React.ReactElement | string;
  label: string;
  value: number | string | any;
  iconBgColor: string;
  iconTextColor: string;
  valueBgColor: string;
  valueTextColor: string;
  classes?: string;
}

// Memoize the StatItem component since it doesn't need to re-render if props don't change
const StatItem = React.memo<StatItemDisplayProps>(
  ({ icon = 'tabler-circle-dotted-letter-i', label, value, valueBgColor, valueTextColor, classes }) => {
    let iconBgColor = "bg-gray-100";
    let iconTextColor = "text-gray-600";

    if (label === "startup") {
      icon = "tabler-building-skyscraper";
      iconBgColor = "bg-purple-100";
      iconTextColor = "text-purple-600";
    } else if (label === "steps") {
      icon = "tabler-stack-2";
      iconBgColor = "bg-blue-100";
      iconTextColor = "text-blue-600";
    } else if (label === "mentors") {
      icon = "tabler-users";
      iconBgColor = "bg-green-100";
      iconTextColor = "text-green-600";
    } else if (label === "pendingEvaluation") {
      icon = "tabler-presentation";
      iconBgColor = "bg-red-100";
      iconTextColor = "text-red-600";
    }

    return (
      <Box className={`flex items-center space-x-2 rounded-lg w-fit p-1 ${classes}`}>
        <Box
          className={`h-9 w-9 flex justify-center items-center rounded-md ${iconBgColor}`}
        >
          {typeof icon === "string" ? (
            <i className={`${icon} ${iconTextColor} text-xl`} />
          ) : (
            icon
          )}
        </Box>
        <Typography variant="body2" fontWeight="bold" textTransform="capitalize">
          {label}
        </Typography>
        <Box
          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${valueBgColor} ${valueTextColor}`}
        >
          {value}
        </Box>
      </Box>
    );
  }
);

// Add displayName for better debugging
StatItem.displayName = "StatItem";

export default StatItem;
