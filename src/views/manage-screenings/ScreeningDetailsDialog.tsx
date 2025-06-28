"use client";

// Moment Import
import moment from "moment";

// MUI Imports
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogActions } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Chip } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { Divider } from "@mui/material";
import { Avatar } from "@mui/material";

// Components Imports
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";

// Types Import
import { ScreeningType } from "@/types/screeningTypes";

interface ScreeningDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  screening: ScreeningType | null;
  onEdit?: (screening: ScreeningType) => void;
}

const ScreeningDetailsDialog: React.FC<ScreeningDetailsDialogProps> = ({
  open,
  onClose,
  screening,
  onEdit,
}) => {
  if (!screening) return null;

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "one-to-all":
        return "One to All";
      case "group-to-group":
        return "Group to Group";
      case "group-to-all":
        return "Group to All";
      default:
        return type;
    }
  };

  const formatDate = (dateString: string) => {
    return moment(dateString).format("MMM DD, YYYY");
  };

  const getDurationText = (startDate: string, endDate: string) => {
    const start = moment(startDate);
    const end = moment(endDate);
    const duration = moment.duration(end.diff(start));
    const days = Math.ceil(duration.asDays());
    return `${days} day${days !== 1 ? "s" : ""}`;
  };

  const progress =
    (screening.evaluatedStartups / screening.totalStartups) * 100;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
    >
      <DialogCloseButton onClick={onClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>

      <DialogTitle id="assessment-dialog-title" mb={2}>
        Screening Details
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-3">
          {/* Basic Information */}
          <div>
            <div className="flex items-center gap-1 mb-2">
              <i className="tabler-info-circle text-xl text-secondary" />
              <Typography variant="h6" gutterBottom className="mb-0">
                Basic Information
              </Typography>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <Typography variant="body2" color="textSecondary">
                  Title
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {screening.title}
                </Typography>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Typography variant="body2" color="textSecondary">
                    Program
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {screening.programName}
                  </Typography>
                </div>
                <div className="flex-1">
                  <Typography variant="body2" color="textSecondary">
                    Current Step
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {screening.stepTitle}
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* Screening Details */}
          <div>
            <div className="flex items-center gap-1 mb-2">
              <i className="tabler-settings text-xl text-secondary" />
              <Typography variant="h6" gutterBottom className="mb-0">
                Screening Specifics
              </Typography>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <i className="tabler-category text-lg text-secondary" />
                    <Typography variant="body2" color="textSecondary">
                      Type
                    </Typography>
                  </div>
                  <Chip
                    label={getTypeLabel(screening.type)}
                    variant="outlined"
                    size="small"
                    className="mt-1"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <i className="tabler-layout-bottombar-inactive text-lg text-secondary" />
                    <Typography variant="body2" color="textSecondary">
                      Status
                    </Typography>
                  </div>
                  <Chip
                    label={screening.status}
                    variant="tonal"
                    size="small"
                    className="mt-1"
                  />
                </div>
                <div className="flex-2">
                  <div className="flex items-center gap-1 mb-1">
                    <i className="tabler-calendar text-lg text-secondary" />
                    <Typography variant="body2" color="textSecondary">
                      Duration
                    </Typography>
                  </div>
                  <Typography variant="body1" fontWeight="medium">
                    {formatDate(screening.startDate)} -{" "}
                    {formatDate(screening.endDate)}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {getDurationText(screening.startDate, screening.endDate)}
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* Progress */}
          <div>
            <div className="flex items-center gap-1 mb-2">
              <i className="tabler-progress text-xl text-secondary" />
              <Typography variant="h6" gutterBottom className="mb-0">
                Progress
              </Typography>
            </div>
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <Typography variant="body2" color="textSecondary">
                  Evaluated Startups
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {screening.evaluatedStartups} / {screening.totalStartups}
                </Typography>
              </div>
              <LinearProgress
                variant="determinate"
                value={progress}
                color={
                  screening.status === "completed"
                    ? "success"
                    : progress > 50
                      ? "primary"
                      : "warning"
                }
                className="h-2 rounded"
              />
              <Typography
                variant="caption"
                color="textSecondary"
                className="mt-1 block"
              >
                {progress.toFixed(1)}% Complete
              </Typography>
            </div>
          </div>

          <Divider />

          {/* Judgers */}
          <div>
            <div className="flex items-center gap-1 mb-2">
              <i className="tabler-users text-xl text-secondary" />
              <Typography variant="h6" gutterBottom className="mb-0">
                Judgers ({screening.judgers.length})
              </Typography>
            </div>
            <div className="flex flex-wrap gap-1">
              {screening.judgers.map((judger, index) => (
                <Chip
                  key={index}
                  avatar={
                    <Avatar className="w-6 h-6">
                      {judger.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  label={judger}
                  variant="outlined"
                  size="medium"
                />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>

      {/* <DialogActions className="mt-6">
        <Button onClick={onClose} variant="text" color="secondary">
          Close
        </Button>
        {onEdit && (
          <Button
            variant="contained"
            startIcon={<i className="tabler-edit" />}
            onClick={() => {
              onEdit(screening);
              onClose();
            }}
          >
            Edit Screening
          </Button>
        )}
      </DialogActions> */}
    </Dialog>
  );
};

export default ScreeningDetailsDialog;
