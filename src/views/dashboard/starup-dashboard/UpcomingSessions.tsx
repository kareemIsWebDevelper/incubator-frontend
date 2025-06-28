import { Button, Card, CardContent, Chip, Typography } from "@mui/material";
import React from "react";

const mentors = [
  {
    id: "1",
    name: "Sarah Chen",
    title: "VP of Product",
    company: "TechCorp",
    expertise: ["Product Strategy", "User Experience", "Market Research"],
    avatar: "👩‍💼",
    rating: 4.9,
    sessionsCompleted: 12,
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    title: "Serial Entrepreneur",
    company: "StartupVentures",
    expertise: ["Business Development", "Fundraising", "Strategy"],
    avatar: "👨‍💼",
    rating: 4.8,
    sessionsCompleted: 8,
  },
  {
    id: "3",
    name: "Emily Watson",
    title: "Head of Engineering",
    company: "CloudTech",
    expertise: ["Technical Architecture", "Team Building", "Scaling"],
    avatar: "👩‍💻",
    rating: 4.9,
    sessionsCompleted: 6,
  },
];

const mentorshipSessions = [
  {
    id: "1",
    mentorId: "1",
    date: "2024-03-20",
    time: "14:00",
    duration: 60,
    topic: "Product Roadmap Review",
    status: "scheduled",
  },
  {
    id: "2",
    mentorId: "2",
    date: "2024-03-18",
    time: "10:00",
    duration: 45,
    topic: "Fundraising Strategy",
    status: "completed",
    notes: "Discussed term sheets and investor outreach strategies",
  },
  {
    id: "3",
    mentorId: "3",
    date: "2024-03-25",
    time: "16:00",
    duration: 60,
    topic: "Architecture Planning",
    status: "scheduled",
  },
];

const UpcomingSessions = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <i className="tabler-circle-check h-5 w-5 text-emerald-500" />;
      case "in-progress":
        return <i className="tabler-clock h-5 w-5 text-amber-500" />;
      case "cancelled":
        return <i className="tabler-circle-x h-5 w-5 text-red-500" />;
      default:
        return <i className="tabler-circle h-5 w-5 text-gray-400" />;
    }
  };

  const getMentor = (mentorId: string) => {
    return mentors.find((m) => m.id === mentorId);
  };

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <i className="tabler-calendar h-6 w-6 text-primary" />
            <Typography variant="h5" fontWeight="bold">Mentorship Sessions</Typography>
          </div>
          <Button
            variant="tonal"
            size="small"
            startIcon={<i className="tabler-plus h-4 w-4" />}
            sx={{ textTransform: "none" }}
          >
            Schedule New
          </Button>
        </div>

        <div className="space-y-4">
          {mentorshipSessions.map((session) => {
            const mentor = getMentor(session.mentorId);
            if (!mentor) return null;

            return (
              <div
                key={session.id}
                className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="text-xl">{mentor.avatar}</div>
                    <div className="flex-grow">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {session.topic}
                        </h3>
                        <Chip
                          className="capitalize rounded-full"
                          label={session.status.replace("-", " ")}
                          variant="tonal"
                          size="small"
                          color={
                            session.status === "completed"
                              ? "success"
                              : session.status === "cancelled"
                                ? "error"
                                : "warning"
                          }
                          sx={{
                            fontSize: "0.75rem",
                            fontWeight: 500,
                          }}
                        />
                      </div>
                      <p className="text-sm text-gray-600">
                        with {mentor.name}
                      </p>
                      <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                        <span>
                          {new Date(session.date).toLocaleDateString()}
                        </span>
                        <span>
                          {session.time} ({session.duration} min)
                        </span>
                      </div>
                    </div>
                  </div>
                  {getStatusIcon(session.status)}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingSessions;
