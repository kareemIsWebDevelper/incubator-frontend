// Availability types
export type TimeSlot = {
  start: string; // "HH:mm" format, e.g., "09:00"
  end: string;   // "HH:mm" format, e.g., "17:00"
};

export type DayAvailability = {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  available: boolean;
  timeSlots: TimeSlot[];
};

export type MentorAvailability = {
  timezone: string; // e.g., "America/New_York"
  weeklySchedule: DayAvailability[];
};

// Types
export type Mentor = {
  id: number;
  name: string;
  title: string;
  image_url: string;
  bio?: string;
  linkedin?: string;
  mentorExpertises: Array<{
    title: string;
  }>;
  programCount?: number;
  rating?: number;
  availability?: MentorAvailability;
  role?: string;
  email?: string;
  programIds?: string[];

  joinedAt?: string; // ISO date string
};

// Add rating form type
export type MentorRating = {
  id: string;
  mentorId: number;
  rating: number;
  attendance: boolean;
  notes?: string;
  createdAt?: string;
};