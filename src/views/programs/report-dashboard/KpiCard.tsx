import React from "react";
import { Paper, Typography, Box, Card, CardContent } from "@mui/material";

interface KpiCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  iconColor?: string;
  size?: "default" | "small";
}

const KpiCard = ({
  icon,
  value,
  label,
  iconColor = "text-primary",
  size = "default",
}: KpiCardProps) => {
  const isSmall = size === "small";
  return (
    <Card className="border">
      <Box className="text-center py-4">
        <Box className={`text-3xl  ${iconColor}`}>
          {icon}
        </Box>
        <Typography
          variant={isSmall ? "h6" : "h4"}
          component="div"
          className="font-bold"
        >
          {value}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className={`${isSmall ? "text-xs" : "text-sm"} mt-1`}
        >
          {label}
        </Typography>
      </Box>
    </Card>
  );
};

export default KpiCard;
