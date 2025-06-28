// Training session type definitions

export interface Training {
  id: string;
  title: string;
  description: string;
  stepName: string;
  type: "online-training" | "online-session" | "traditional-session";
  duration: string;
  date: string;
  participants?: number;
  maxParticipants?: number;
  level?: "Beginner" | "Intermediate" | "Advanced";
  // Fields for online-training
  startDate?: string;
  endDate?: string;
  onlineCourse?: string;
  // Fields for online-session and traditional-session
  startTime?: string;
  endTime?: string;
  trainerName?: string;
  trainerEmail?: string;
  // Fields for traditional-session only
  locationAddress?: string;
  locationMapLink?: string;
}
