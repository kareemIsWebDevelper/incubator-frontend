import Badge from "@/@core/components/mui/Badge";
import { TrainingType } from "@/types/TrainingTypes";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";

const getTrainingTypeIcon = (type: TrainingType["type"]) => {
  switch (type) {
    case "online-training":
      return <i className="tabler-book w-4 h-4" />;
    case "online-session":
      return <i className="tabler-video w-4 h-4" />;
    case "traditional-session":
      return <i className="tabler-users w-4 h-4" />;
  }
};

const getTrainingTypeLabel = (type: TrainingType["type"]) => {
  switch (type) {
    case "online-training":
      return "Online Training";
    case "online-session":
      return "Online Session";
    case "traditional-session":
      return "Traditional Session";
  }
};

const getTrainingTypeColor = (type: TrainingType["type"]) => {
  switch (type) {
    case "online-training":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "online-session":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "traditional-session":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200";
  }
};

const getLevelColor = (level: TrainingType["level"]) => {
  switch (level) {
    case "Beginner":
      return "bg-emerald-100 text-emerald-800";
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800";
    case "Advanced":
      return "bg-red-100 text-red-800";
  }
};

interface TrainingCardProps {
  training: TrainingType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const TrainingCard = ({ training, onEdit, onDelete }: TrainingCardProps) => {
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
        onEdit?.(training.id);
        break;
      case "delete":
        onDelete?.(training.id);
        break;
      default:
        console.log("Unknown action");
    }
  };
  return (
    <Card
      key={training.id}
      className="hover:shadow-lg transition-shadow duration-200"
    >
      <CardContent className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-start justify-between mb-2">
            <Badge
              className={`p-1 px-3 rounded-full flex items-center ${getTrainingTypeColor(training.type)}`}
            >
              {getTrainingTypeIcon(training.type)}
              <span className="ms-2">
                {getTrainingTypeLabel(training.type)}
              </span>
            </Badge>
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
              </MenuItem>{" "}
              <MenuItem
                onClick={() => handleAction("delete")}
                sx={{ color: "error.main" }}
              >
                <i className="tabler-trash text-lg" />
                Delete
              </MenuItem>
            </Menu>
          </div>
          <Typography variant="h6" className="leading-tight">
            {training.title}
          </Typography>
          <Typography variant="body2">{training.description}</Typography>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-600 line-clamp-1">
            <span className="font-medium">Step:</span>
            <span>{training.stepName}</span>
          </div>

          {training.type === "online-training" && (
            <>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="font-medium">Start Date:</span>
                <span>{training.startDate}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="font-medium">End Date:</span>
                <span>{training.endDate}</span>
              </div>
            </>
          )}

          {/* Combine time fields */}
          {training.type !== "online-training" && (
            <>
              {training.date && (
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="font-medium">Date:</span>
                  <span>{training.date}</span>
                </div>
              )}
              {training.duration && (
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="font-medium">Duration:</span>
                  <span>{training.duration}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="font-medium">Time:</span>
                <span>
                  {training.startTime && training.endTime
                    ? `${training.startTime} - ${training.endTime}`
                    : training.startTime || training.endTime}
                </span>
              </div>
            </>
          )}

          {/* Combine trainer info */}
          {training.trainerName && (
            <div className="flex items-center justify-between text-sm text-gray-600 line-clamp-1">
              <span className="font-medium">Trainer:</span>
              <span>
                {training.trainerName}
                {training.trainerEmail && ` (${training.trainerEmail})`}
              </span>
            </div>
          )}

          {/* Rest of the conditional fields... */}
        </div>
        <Button variant="contained" className="w-full mt-4">
          {training.type === "traditional-session"
            ? "Reserve Spot"
            : "Join Training"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrainingCard;
