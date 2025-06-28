// MUI Imports
import { Card, CardContent, Chip, Button, Avatar } from "@mui/material";

import { Typography } from "@mui/material";

const upcomingSessions = [
  {
    id: 1,
    startup: "TechFlow",
    mentee: "Sarah Chen",
    time: "Today, 2:00 PM",
    duration: "1 hour",
    type: "Strategy Session",
    avatar: "/placeholder.svg",
    initials: "SC",
  },
  {
    id: 2,
    startup: "DataSync",
    mentee: "Michael Rodriguez",
    time: "Today, 4:30 PM",
    duration: "45 min",
    type: "Technical Review",
    avatar: "/placeholder.svg",
    initials: "MR",
  },
  {
    id: 3,
    startup: "GreenTech",
    mentee: "Emily Watson",
    time: "Tomorrow, 10:00 AM",
    duration: "1 hour",
    type: "Pitch Practice",
    avatar: "/placeholder.svg",
    initials: "EW",
  },
  {
    id: 4,
    startup: "FinanceAI",
    mentee: "David Kim",
    time: "Tomorrow, 3:00 PM",
    duration: "30 min",
    type: "Follow-up",
    avatar: "/placeholder.svg",
    initials: "DK",
  },
];

const MentorUpcomingSessions = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center space-x-3 mb-4">
          <i className="tabler-calendar h-5.5 w-5.5 text-primary" />
          <Typography variant="h5" fontWeight="bold">
            Upcoming Sessions
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Next 7 days schedule
          </Typography>
        </div>
        <div className="space-y-2">
          {upcomingSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-3 rounded-lg border hover:shadow transition-colors"
            >
              <div className="flex gap-3">
                <Avatar
                  src={session.avatar}
                  alt={session.mentee}
                  sx={{ width: 40, height: 40 }}
                >
                  {session.initials}
                </Avatar>
                <div>
                  <div className="font-medium text-sm">{session.mentee}</div>
                  <div className="text-xs text-muted-foreground">
                    {session.startup}
                  </div>
                  <div className="flex items-center mt-1">
                    <i className="tabler-clock h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {session.time}
                    </span>
                    <Chip
                      label={session.duration}
                      size="small"
                      variant="tonal"
                      className="rounded-full mis-2"
                      sx={{ fontSize: "0.75rem" }}
                    />
                  </div>
                </div>
              </div>
              <div className="text-right flex items-center space-x-2">
                <Chip
                  label={session.type}
                  size="small"
                  variant="tonal"
                  className="rounded-full text-xs"
                />
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<i className="tabler-brand-zoom" />}
                >
                  Join
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorUpcomingSessions;
