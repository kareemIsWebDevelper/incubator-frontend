// MUI Imports
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";

// Types Import
import { MentorshipSession } from "@/types/mentorshipTypes";

interface Props {
  session: MentorshipSession;
  mentor?: any;
  startup?: any;
  program?: any;
}

const MentorshipSessionCard = ({
  session,
  mentor,
  startup,
  program,
}: Props) => {
  const theme = useTheme();
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "scheduled":
        return "primary";
      case "in_progress":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "tabler-check";
      case "scheduled":
        return "tabler-calendar";
      case "in_progress":
        return "tabler-clock";
      case "cancelled":
        return "tabler-x";
      default:
        return "tabler-circle";
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isTomorrow =
      date.toDateString() ===
      new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString();

    let dateLabel = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });

    if (isToday) dateLabel = "Today";
    else if (isTomorrow) dateLabel = "Tomorrow";

    const timeLabel = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return { dateLabel, timeLabel };
  };

  const { dateLabel, timeLabel } = formatDateTime(session.scheduledAt);

  return (
    <Card className="border hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <CardContent sx={{px: 5}} className="flex-1 flex flex-col">
        {/* Header with Status */}
        <div className="flex justify-between items-start mb-2">
          <Typography
            variant="h6"
            component="h3"
            className="text-lg font-bold leading-tight line-clamp-1 overflow-hidden flex-1 mr-4"
          >
            {session.title}
          </Typography>
          <Chip
            variant="tonal"
            icon={
              <i
                className={getStatusIcon(session.status)}
                style={{ fontSize: "14px" }}
              />
            }
            label={session.status.replace("_", " ")}
            color={getStatusColor(session.status)}
            size="small"
            className="capitalize text-xs fw-semibold"
          />
        </div>

        {/* Description */}
        {session.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            className="mb-2 line-clamp-2 overflow-hidden leading-6"
          >
            {session.description}
          </Typography>
        )}

        {/* Date & Time - Highlighted */}
        <div
          className="mb-3 p-2 rounded-xl border"
          style={{
            backgroundColor: theme.palette.primary.main + "08",
            borderColor: theme.palette.primary.main + "20",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
              style={{
                backgroundColor: theme.palette.primary.main + "20",
                color: theme.palette.primary.main,
              }}
            >
              <i className="tabler-calendar text-lg" />
            </div>
            <div className="flex-1">
              <Typography
                variant="body2"
                className="font-semibold"
                style={{ color: theme.palette.primary.main }}
              >
                {dateLabel}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {timeLabel} • {session.duration} minutes
              </Typography>
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="mb-2">
          {/* Mentor */}
          <div className="flex items-center mb-4">
            <Avatar
              src={mentor?.avatar}
              className="w-8 h-8 mr-4 text-sm"
              style={{ backgroundColor: theme.palette.primary.light }}
            >
              {mentor?.name?.charAt(0)}
            </Avatar>
            <div className="flex-1 min-w-0">
              <Typography
                variant="h6"
                fontWeight="bold"
                className="block"
              >
                Mentor
              </Typography>
              <Typography
                variant="body2"
                className="font-medium text-sm overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {mentor?.name || "Not assigned"}
              </Typography>
            </div>
          </div>

          {/* Startup Owner */}
          <div className="flex items-center">
            <Avatar
              src={startup?.avatar}
              className="w-8 h-8 mr-4 text-sm"
              style={{ backgroundColor: theme.palette.secondary.light }}
            >
              {startup?.name?.charAt(0)}
            </Avatar>
            <div className="flex-1 min-w-0">
              <Typography
                variant="h6"
                fontWeight="bold"
                className="block"
              >
                Startup
              </Typography>
              <Typography
                variant="body2"
                className="font-medium text-sm overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {startup?.name || "Not assigned"}
              </Typography>
            </div>
          </div>
        </div>

        <Divider className="mb-4" />

        {/* Program Info */}
        <div
          className="px-3 py-2 rounded-xl"
          style={{
            backgroundColor: theme.palette.background.default,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: theme.palette.success.main + "15",
                  color: theme.palette.success.main,
                }}
              >
                <i className="tabler-school text-lg" />
              </div>
              <div>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  className="block text-xs font-medium"
                >
                  Program
                </Typography>
                <Typography
                  variant="body2"
                  className="font-semibold text-sm"
                  style={{ color: theme.palette.text.primary }}
                >
                  {program?.name || "No program"}
                </Typography>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: theme.palette.info.main + "15",
                  color: theme.palette.info.main,
                }}
              >
                <i className="tabler-list-check text-lg" />
              </div>
              <div>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  className="block text-xs font-medium"
                >
                  Current Step
                </Typography>
                <Typography
                  variant="body2"
                  className="font-semibold text-sm"
                  style={{ color: theme.palette.text.primary }}
                >
                  {session?.currentStep || "No step"}
                </Typography>
              </div>
            </div>
              
            </div>


            {session.meetingLink && (
              <IconButton
                size="small"
                href={session.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3"
                style={{
                  backgroundColor: theme.palette.primary.main + "10",
                  color: theme.palette.primary.main,
                }}
              >
                <i className="tabler-external-link text-lg" />
              </IconButton>
            )}
          </div>
        </div>

        {/* Notes - This will push content up and button down */}
        <div className="flex-1 mt-4">
          {session.notes && (
            <div
              className="p-4 rounded-xl border"
              style={{
                backgroundColor: theme.palette.background.default,
                borderColor: theme.palette.divider,
              }}
            >
              <Typography
                variant="body2"
                className="text-xs line-clamp-3 overflow-hidden"
              >
                <span
                  className="font-semibold"
                  style={{ color: theme.palette.text.primary }}
                >
                  Notes:
                </span>{" "}
                {session.notes}
              </Typography>
            </div>
          )}
        </div>

        {/* Meeting Link Button - Sticks to bottom */}
        {session.meetingLink && (
          <div className="mt-4">
            <Button
              href={session.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<i className="tabler-video" />}
              fullWidth
            >
              Join Meeting
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MentorshipSessionCard;
