"use client";

import React, { useState } from "react";
import {
  Chip,
  Avatar,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Collapse,
  Grid,
  Divider,
  alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { StartupType } from "@/types/startupTypes";

const StyledChip = styled(Chip)<{ chiptype?: "sector" | "role" | "goal" }>(({
  theme,
  chiptype = "sector",
}) => {
  let bgColor, textColor;

  switch (chiptype) {
    case "sector":
      bgColor = alpha(theme.palette.primary.main, 0.1);
      textColor = theme.palette.primary.main;
      break;
    case "role":
      bgColor = alpha(theme.palette.grey[500], 0.1);
      textColor = theme.palette.grey[700];
      break;
    case "goal":
      bgColor = alpha(theme.palette.success.main, 0.1);
      textColor = theme.palette.success.main;
      break;
    default:
      bgColor = alpha(theme.palette.primary.main, 0.1);
      textColor = theme.palette.primary.main;
  }

  return {
    fontWeight: 500,
    fontSize: "0.75rem",
    height: 24,
    backgroundColor: bgColor,
    color: textColor,
    "& .MuiChip-label": {
      padding: "0 8px",
    },
  };
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 56,
  height: 56,
  border: `2px solid ${theme.palette.background.paper}`,
  boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
}));

export default function StartupCard({ startup }: { startup: StartupType }) {
  const router = useRouter();
  const { lang: locale } = useParams();

  const [expanded, setExpanded] = useState(true);

  // Function to navigate to startup profile
  const navigateToProfile = () => {
    router.push(`/${locale}/startups/profile/${startup.id}`);
  };

  // Function to toggle the expanded state
  const toggleExpanded = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent the card click from triggering
    setExpanded(!expanded);
  };

  return (
    <Box
      className="hover:shadow-lg transition-shadow duration-300"
      sx={{ height: expanded ? "100%" : "fit-content" }}
    >
      <Card
        onClick={navigateToProfile}
        className="h-full hover:bg-gray-100"
        sx={{ cursor: "pointer" }}
      >
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <StyledAvatar
                  alt={`${startup.name} logo`}
                  src={startup.logo}
                  variant="rounded"
                />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {startup.name}
                  </Typography>
                  <StyledChip label={startup.sector} chiptype="sector" />
                </Box>
              </Box>
              <IconButton
                onClick={toggleExpanded}
                sx={{
                  color: "text.secondary",
                  transition: "all 0.2s",
                  "&:hover": {
                    color: "primary.main",
                    transform: "scale(1.1)",
                  },
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <i className="text-xl tabler tabler-chevron-down"></i>
              </IconButton>
            </Box>
          </Box>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid
              item
              xs={12}
              sm={5}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <i className="text-xl me-1 tabler tabler-calendar" />
              <Typography variant="body2" color="text.secondary">
                <Box
                  component="span"
                  sx={{ color: "text.primary", fontWeight: 500 }}
                >
                  {moment(startup.establishmentDate).format("MMM D, YYYY")}
                </Box>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={7}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <i className="text-2xl me-1 tabler tabler-map-pin" />
              <Typography
                variant="body2"
                className="text-secondary line-clamp-1"
              >
                <Box
                  component="span"
                  sx={{ color: "text.primary", fontWeight: 500 }}
                >
                  {startup.city}, {startup.state}, {startup.country}
                </Box>
              </Typography>
            </Grid>
          </Grid>

          <Collapse in={expanded} sx={{ mt: 2 }}>
            <Divider sx={{ my: 2 }} />

            <Box sx={{ my: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <i className="text-xl me-1 tabler tabler-users" />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Founders
                </Typography>
              </Box>

              <Box sx={{ ml: 4 }}>
                {startup.founders.slice(0, 3).map((founder, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                      pb: 1,
                      borderBottom:
                        index !== startup.founders.length - 1
                          ? "1px dashed"
                          : "none",
                      borderColor: "divider",
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {founder.name}
                    </Typography>
                    <StyledChip label={founder.role} chiptype="role" />
                  </Box>
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ my: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <i className="text-xl me-1 tabler tabler-leaf" />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Sustainability Goals
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, ml: 4 }}>
                {startup.sustainabilityGoals.slice(0, 4).map((goal, index) => (
                  <StyledChip
                    key={index}
                    label={goal}
                    // label={goal.length > 20 ? `${goal.substring(0, 20)}...` : goal}
                    chiptype="goal"
                  />
                ))}
              </Box>
            </Box>
          </Collapse>
        </CardContent>
      </Card>
    </Box>
  );
}
