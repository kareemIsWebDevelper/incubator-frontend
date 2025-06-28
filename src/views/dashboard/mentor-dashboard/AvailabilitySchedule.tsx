// React Imports
import { useState } from "react";

// MUI Imports
import { Button, Card, CardContent, Chip, Typography } from "@mui/material";

// Component Imports
import AvailabilitySlotsDialog from "./AvailabilitySlotsDialog";

// Type Imports
import type { DayAvailability, TimeSlot as MentorTimeSlot } from "@/types/MentorTypes";
import moment from "moment";

// Types
interface ScheduleTimeSlot {
  time: string;
  status: "available" | "booked";
  mentee?: string;
}

interface WeeklySchedule {
  [key: string]: ScheduleTimeSlot[];
}

// Vars
const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const initialSchedule: WeeklySchedule = {
  Monday: [
    { time: "9:00 AM - 10:00 AM", status: "available" },
    { time: "10:30 AM - 11:30 AM", status: "booked", mentee: "Sarah Chen" },
    { time: "2:00 PM - 3:00 PM", status: "available" },
    { time: "4:00 PM - 5:00 PM", status: "booked", mentee: "Mike Rodriguez" },
  ],
  Tuesday: [
    { time: "9:00 AM - 10:00 AM", status: "available" },
    { time: "11:00 AM - 12:00 PM", status: "available" },
    { time: "2:00 PM - 3:00 PM", status: "booked", mentee: "Emily Watson" },
  ],
  Wednesday: [
    { time: "10:00 AM - 11:00 AM", status: "available" },
    { time: "1:00 PM - 2:00 PM", status: "available" },
    { time: "3:30 PM - 4:30 PM", status: "booked", mentee: "David Kim" },
  ],
  Thursday: [
    { time: "9:30 AM - 10:30 AM", status: "booked", mentee: "Lisa Park" },
    { time: "2:00 PM - 3:00 PM", status: "available" },
    { time: "4:00 PM - 5:00 PM", status: "available" },
  ],
  Friday: [
    { time: "9:00 AM - 10:00 AM", status: "available" },
    { time: "11:00 AM - 12:00 PM", status: "booked", mentee: "Tom Wilson" },
    { time: "2:30 PM - 3:30 PM", status: "available" },
  ],
  Saturday: [],
  Sunday: [],
};

const AvailabilitySchedule = () => {
  // State for schedule data
  const [schedule, setSchedule] = useState<WeeklySchedule>(initialSchedule);
  
  // State for dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DayAvailability | null>(null);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  
  // Handler for adding/editing availability slots
  const handleAddSlot = (dayAvailability: DayAvailability) => {
    setSchedule(prevSchedule => {
      const newSchedule = { ...prevSchedule };
      
      // Convert day availability to time slots
      const newSlots: ScheduleTimeSlot[] = dayAvailability.timeSlots.map(slot => ({
        time: `${slot.start} - ${slot.end}`,
        status: "available" as const
      }));
      
      // Convert day to proper case
      const dayKey = dayAvailability.day.charAt(0).toUpperCase() + dayAvailability.day.slice(1);
      
      if (dialogMode === "edit") {
        // In edit mode, replace only the available slots, keep booked ones
        const existingBookedSlots = (newSchedule[dayKey] || []).filter(slot => slot.status === "booked");
        newSchedule[dayKey] = [...existingBookedSlots, ...newSlots];
      } else {
        // In add mode, append to existing slots
        if (newSchedule[dayKey]) {
          newSchedule[dayKey] = [...newSchedule[dayKey], ...newSlots];
        } else {
          newSchedule[dayKey] = newSlots;
        }
      }
      
      // Sort slots by time (basic sorting - you might want to improve this)
      newSchedule[dayKey].sort((a, b) => {
        const timeA = a.time.split(' - ')[0];
        const timeB = b.time.split(' - ')[0];
        return timeA.localeCompare(timeB);
      });
      
      return newSchedule;
    });
    
    setDialogOpen(false);
  };

  // Handler for opening add dialog
  const handleOpenAddDialog = (preselectedDay?: string) => {
    if (preselectedDay) {
      // Pre-select the day if provided (when clicking "Add Slot" on empty day card)
      const dayAvailability: DayAvailability = {
        day: preselectedDay.toLowerCase() as DayAvailability['day'],
        available: true,
        timeSlots: [{ start: "09:00", end: "10:00" }]
      };
      setSelectedDay(dayAvailability);
    } else {
      // No pre-selection - let user choose day and time freely (main "Add Slot" button)
      setSelectedDay(null);
    }
    setDialogMode("add");
    setDialogOpen(true);
  };

  // Handler for editing existing availability
  const handleEditDay = (day: string) => {
    // Get existing availability for the day
    const daySlots = schedule[day] || [];
    const availableSlots = daySlots.filter(slot => slot.status === "available");
    
    // Always create a DayAvailability object for the specific day
    const existingAvailability: DayAvailability = {
      day: day.toLowerCase() as DayAvailability['day'],
      available: availableSlots.length > 0, // Set to true if there are available slots, false otherwise
      timeSlots: availableSlots.length > 0 
        ? availableSlots.map(slot => {
            const [startTime, endTime] = slot.time.split(' - ');
            return { start: startTime, end: endTime };
          })
        : [{ start: "09:00", end: "10:00" }] // Default slot if no existing slots
    };
    
    setSelectedDay(existingAvailability);
    setDialogMode("edit");
    setDialogOpen(true);
  };

  // Handler for deleting a specific time slot
  const handleDeleteSlot = (day: string, slotIndex: number) => {
    setSchedule(prevSchedule => {
      const newSchedule = { ...prevSchedule };
      newSchedule[day] = newSchedule[day].filter((_, index) => index !== slotIndex);
      return newSchedule;
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col">
              <div className="flex items-center space-x-3">
                <i className="tabler-calendar-plus h-5.5 w-5.5 text-primary" />
                <Typography variant="h5" fontWeight="bold">
                  Weekly Schedule
                </Typography>
              </div>
              <Typography variant="body2" color="text.secondary">
                Your availability and booked sessions
              </Typography>
            </div>
            <Button
              variant="contained"
              size="medium"
              startIcon={<i className="tabler-plus h-4 w-4" />}
              onClick={() => handleOpenAddDialog()}
            >
              Add Availability
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {weekDays.map((day) => (
              <div key={day} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-sm text-foreground">{day}</h3>
                    {schedule[day as keyof typeof schedule].length > 0 && (
                      <Chip
                        label={`${schedule[day as keyof typeof schedule].length} slot${schedule[day as keyof typeof schedule].length !== 1 ? 's' : ''}`}
                        size="small"
                        variant="tonal"
                        color="primary"
                        sx={{ fontSize: '0.6rem', height: '16px' }}
                      />
                    )}
                  </div>
                  <Button
                    size="small"
                    variant="text"
                    color="primary"
                    onClick={() => handleEditDay(day)}
                    sx={{ minWidth: 'auto', p: 0.5 }}
                    title={`Edit ${day} availability`}
                  >
                    <i className="tabler-edit h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {schedule[day as keyof typeof schedule].length > 0 ? (
                    schedule[day as keyof typeof schedule].map(
                      (slot: ScheduleTimeSlot, index: number) => {
                        const startTime = moment(slot.time.split(' - ')[0], "h:mm A");
                        const endTime = moment(slot.time.split(' - ')[1], "h:mm A");
                        return(
                        <div
                          key={index}
                          className={`p-3 rounded-lg border text-xs hover:shadow relative group ${
                            slot.status === "available"
                              ? "bg-green-50 border-green-200"
                              : "bg-indigo-50 border-indigo-200"
                          }`}
                        >
                          {/* Delete button - only show for available slots */}
                          {slot.status === "available" && (
                            <Button
                              size="small"
                              variant="text"
                              color="error"
                              onClick={() => handleDeleteSlot(day, index)}
                              sx={{ 
                                minWidth: 'auto', 
                                p: 0.5, 
                                position: 'absolute',
                                top: 4,
                                right: 4,
                                opacity: 0,
                                transition: 'opacity 0.2s'
                              }}
                              className="group-hover:opacity-100"
                            >
                              <i className="tabler-x h-3 w-3" />
                            </Button>
                          )}
                          
                          <div className="flex items-center gap-1 mb-1">
                            <i className="tabler-clock h-4 w-4" />
                            <span className="font-medium">
                              {startTime.format("h:mm A")} - {endTime.format("h:mm A")}
                            </span>
                          </div>
                          <Chip
                            label={
                              slot.status === "available"
                                ? "Available"
                                : "Booked"
                            }
                            color={
                              slot.status === "available"
                                ? "success"
                                : "primary"
                            }
                            variant="tonal"
                            size="small"
                            className="rounded-full font-semibold"
                          />
                          {slot.mentee && (
                            <p className="text-xs text-muted-foreground mt-1">
                              with{" "}
                              <span className="font-semibold">
                                {slot.mentee}
                              </span>
                            </p>
                          )}
                        </div>
                      )
                      }
                    )
                  ) : (
                    <div className="p-3 rounded-lg border border-dashed border-gray-300 text-center bg-gray-50">
                      <p className="text-xs text-muted-foreground mb-2">
                        No sessions
                      </p>
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => handleOpenAddDialog(day.toLowerCase())}
                        sx={{ fontSize: '0.75rem', py: 0.5, px: 1 }}
                      >
                        Add Slot
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Availability Slots Dialog */}
      <AvailabilitySlotsDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        onSubmit={handleAddSlot}
        existingAvailability={selectedDay}
        mode={dialogMode}
      />
    </div>
  );
};

export default AvailabilitySchedule;
