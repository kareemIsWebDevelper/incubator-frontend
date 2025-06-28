export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'startup_owner' | 'mentor';
  programIds: string[];
  bio?: string;
  skills?: string[];
  joinedAt: string;
  isActive: boolean;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  participantCount: number;
  mentorCount: number;
  isActive: boolean;
}

export interface MentorshipSession {
  id: string;
  mentorId: string;
  startupOwnerId: string;
  programId: string;
  title: string;
  description?: string;
  scheduledAt: string;
  duration: number; // in minutes
  status: 'scheduled' | 'completed' | 'cancelled' | 'in_progress';
  meetingLink?: string;
  notes?: string;
  createdAt: string;
  currentStep: string;
}

export interface DashboardStats {
  totalSessions: number;
  activeMentors: number;
  activeStartupOwners: number;
  completedSessions: number;
  upcomingSessions: number;
  activePrograms: number;
}