import { Button, Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";
import RequestMentorshipDialog from "./RequestMentorshipDialog";

// Define the mentor type locally to match the data structure
interface MentorData {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  avatar: string;
  rating: number;
  sessionsCompleted: number;
  availability?: {
    timezone: string;
    weeklySchedule: Array<{
      day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
      available: boolean;
      timeSlots: Array<{
        start: string;
        end: string;
      }>;
    }>;
  };
}

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
    availability: {
      timezone: "America/New_York",
      weeklySchedule: [
        {
          day: 'monday' as const,
          available: true,
          timeSlots: [
            { start: "09:00", end: "12:00" },
            { start: "14:00", end: "17:00" }
          ]
        },
        {
          day: 'tuesday' as const,
          available: true,
          timeSlots: [
            { start: "10:00", end: "16:00" }
          ]
        },
        {
          day: 'wednesday' as const,
          available: true,
          timeSlots: [
            { start: "09:00", end: "11:00" },
            { start: "15:00", end: "18:00" }
          ]
        },
        {
          day: 'thursday' as const,
          available: true,
          timeSlots: [
            { start: "13:00", end: "17:00" }
          ]
        },
        {
          day: 'friday' as const,
          available: true,
          timeSlots: [
            { start: "09:00", end: "12:00" }
          ]
        },
        {
          day: 'saturday' as const,
          available: false,
          timeSlots: []
        },
        {
          day: 'sunday' as const,
          available: false,
          timeSlots: []
        }
      ]
    }
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
    availability: {
      timezone: "America/Los_Angeles",
      weeklySchedule: [
        {
          day: 'monday' as const,
          available: true,
          timeSlots: [
            { start: "08:00", end: "10:00" },
            { start: "16:00", end: "19:00" }
          ]
        },
        {
          day: 'tuesday' as const,
          available: false,
          timeSlots: []
        },
        {
          day: 'wednesday' as const,
          available: true,
          timeSlots: [
            { start: "14:00", end: "18:00" }
          ]
        },
        {
          day: 'thursday' as const,
          available: true,
          timeSlots: [
            { start: "09:00", end: "12:00" },
            { start: "15:00", end: "17:00" }
          ]
        },
        {
          day: 'friday' as const,
          available: true,
          timeSlots: [
            { start: "10:00", end: "14:00" }
          ]
        },
        {
          day: 'saturday' as const,
          available: true,
          timeSlots: [
            { start: "10:00", end: "13:00" }
          ]
        },
        {
          day: 'sunday' as const,
          available: false,
          timeSlots: []
        }
      ]
    }
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
    availability: {
      timezone: "Europe/London",
      weeklySchedule: [
        {
          day: 'monday' as const,
          available: true,
          timeSlots: [
            { start: "09:00", end: "17:00" }
          ]
        },
        {
          day: 'tuesday' as const,
          available: true,
          timeSlots: [
            { start: "10:00", end: "15:00" }
          ]
        },
        {
          day: 'wednesday' as const,
          available: true,
          timeSlots: [
            { start: "08:00", end: "12:00" }
          ]
        },
        {
          day: 'thursday' as const,
          available: true,
          timeSlots: [
            { start: "13:00", end: "18:00" }
          ]
        },
        {
          day: 'friday' as const,
          available: true,
          timeSlots: [
            { start: "09:00", end: "16:00" }
          ]
        },
        {
          day: 'saturday' as const,
          available: false,
          timeSlots: []
        },
        {
          day: 'sunday' as const,
          available: false,
          timeSlots: []
        }
      ]
    }
  },
];

const ProgramMentors = () => {
  const [selectedMentor, setSelectedMentor] = useState<MentorData | null>(null);
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);

  const handleScheduleSession = (mentor: MentorData) => {
    setSelectedMentor(mentor);
    setIsRequestDialogOpen(true);
  };

  const handleRequestSubmit = (requestData: any) => {
    // Here you would typically send the request to your backend API
    console.log("Mentorship request submitted:", requestData);
    
    // TODO: Add success notification/toast
    // You could show a success message here using a notification library
    // For example: toast.success("Mentorship request sent successfully!");
    
    // Close the dialog
    setIsRequestDialogOpen(false);
    setSelectedMentor(null);
    
    // TODO: You might want to refresh the mentor data or update UI state
    // to reflect the pending request status
  };

  const handleDialogClose = () => {
    setIsRequestDialogOpen(false);
    setSelectedMentor(null);
  };
  return (
    <Card className="h-full">
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <i className="tabler-users h-6 w-6 text-primary" />
            <Typography variant="h5" fontWeight="bold">
              Your Mentors
            </Typography>
          </div>
          <span className="text-sm text-gray-500">
            {mentors.length} mentors
          </span>
        </div>

        <div className="space-y-4">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-2xl">{mentor.avatar}</div>
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                <p className="text-sm text-gray-600">
                  {mentor.title} at {mentor.company}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`tabler-star h-3 w-3 ${
                        i < Math.floor(mentor.rating)
                          ? "text-yellow-400 tabler-star-filled"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">
                    {mentor.rating}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleScheduleSession(mentor)}
                >
                  <i className="tabler-calendar-plus h-4 w-4 mie-2" />
                  Schedule Session
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Mentorship Request Dialog */}
      <RequestMentorshipDialog
        open={isRequestDialogOpen}
        onClose={handleDialogClose}
        mentor={selectedMentor}
        onSubmit={handleRequestSubmit}
      />
    </Card>
  );
};

export default ProgramMentors;
