"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  CardActions,
  Avatar,
  AvatarGroup,
  LinearProgress,
  Tooltip,
  MenuItem,
  Menu,
} from "@mui/material";
import { ProjectType } from "@/types/projectTypes";
import moment from "moment";
import { getLocalizedUrl } from "@/utils/i18n";
import { Locale } from "@/configs/i18n";
import { useParams, useRouter } from "next/navigation";

interface ProjectCardProps {
  project: ProjectType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  // Hooks
  const router = useRouter();
  const { lang: locale } = useParams();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: string) => {
    switch (action) {
      case "edit":
        onEdit?.(project.id);
        break;
      case "manage":
        // onManage?.(project.id);
        break;
      case "delete":
        onDelete?.(project.id);
        break;
      default:
        console.log("Unknown action");
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        width: "100%",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 20px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1,
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            {project?.title}
          </Typography>
          <IconButton
            aria-label="more"
            aria-controls={open ? "project-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMenuClick}
          >
            <i className="tabler-dots-vertical text-lg" />
          </IconButton>
          <Menu
            id="project-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={() => handleAction("edit")}>
              <i className="tabler-edit text-lg" />
              Edit
            </MenuItem>
            <MenuItem
              onClick={() =>
                router.push(
                  getLocalizedUrl(`/projects/${project?.id}`, locale as Locale)
                )
              }
            >
              <i className="tabler-settings text-lg" />
              Manage
            </MenuItem>
            <MenuItem
              onClick={() => handleAction("delete")}
              sx={{ color: "error.main" }}
            >
              <i className="tabler-trash text-lg" />
              Delete
            </MenuItem>
          </Menu>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          className="line-clamp-2 mb-2"
        >
          {project?.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 0.5,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Progress
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {project?.progress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={project?.progress}
            sx={{
              height: 6,
              borderRadius: 3,
              marginBottom: 4,
              backgroundColor: "rgba(0,0,0,0.08)",
              "& .MuiLinearProgress-bar": {
                backgroundColor:
                  project?.progress < 30
                    ? "#f44336"
                    : project?.progress < 70
                      ? "#ff9800"
                      : "#4caf50",
                borderRadius: 3,
              },
            }}
          />
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6, mb: 4 }}>
          {project?.programs.map((program, index) => (
            <Chip
              key={index}
              label={program.title}
              size="small"
              sx={{
                backgroundColor: "rgba(0,0,0,0.05)",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.1)" },
              }}
            />
          ))}
        </Box>

        <Box>
          <AvatarGroup max={4}>
            {project?.teamMembers.map((member, index) => (
              <Tooltip key={index} title={member.userName}>
                <Avatar
                  alt={member.userName}
                  // src={member.imageUrl}
                  sx={{ width: 32, height: 32 }}
                >
                  {member.userName ? member.userName.charAt(0).toUpperCase() : null}
                </Avatar>
              </Tooltip>
            ))}
          </AvatarGroup>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <i
            className="tabler-calender text-lg"
            style={{ fontSize: 16, color: "text.secondary", marginRight: 4 }}
          />
          <Typography variant="caption" color="text.secondary" fontSize={12}>
            From {moment(project?.startDate).format("MMM D, YYYY")} to{" "}
            {moment(project?.endDate).format("MMM D, YYYY")}
          </Typography>
        </Box>
        <Chip
          label={project?.status}
          size="small"
          sx={{
            backgroundColor:
              project?.progress < 30
                ? "#ffebee"
                : project?.progress < 70
                  ? "#fff3e0"
                  : "#e8f5e9",
            color:
              project?.progress < 30
                ? "#c62828"
                : project?.progress < 70
                  ? "#e65100"
                  : "#2e7d32",
            fontWeight: 500,
          }}
        />
      </CardActions>
    </Card>
  );
}
