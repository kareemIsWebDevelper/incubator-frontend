import { User, Program, MentorshipSession, DashboardStats } from '@/types/mentorshipTypes';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@techstartup.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'startup_owner',
    programIds: ['1', '2'],
    bio: 'Building the future of sustainable technology',
    skills: ['AI/ML', 'Sustainability', 'Product Strategy'],
    joinedAt: '2024-01-15',
    isActive: true,
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    email: 'marcus@mentor.pro',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'mentor',
    programIds: ['1', '3'],
    bio: 'Former startup founder, now helping others succeed',
    skills: ['Business Strategy', 'Fundraising', 'Leadership'],
    joinedAt: '2023-11-20',
    isActive: true,
  },
  {
    id: '3',
    name: 'Emma Thompson',
    email: 'emma@fintech.io',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'startup_owner',
    programIds: ['2'],
    bio: 'Revolutionizing personal finance for millennials',
    skills: ['FinTech', 'Mobile Development', 'UX Design'],
    joinedAt: '2024-02-03',
    isActive: true,
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    email: 'james.wilson@academic.edu',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'mentor',
    programIds: ['2', '3'],
    bio: 'PhD in Computer Science, 15 years in tech industry',
    skills: ['Technical Architecture', 'Team Building', 'Research'],
    joinedAt: '2023-09-12',
    isActive: true,
  },
  {
    id: '5',
    name: 'Alex Kim',
    email: 'alex@healthtech.com',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'startup_owner',
    programIds: ['3'],
    bio: 'Creating accessible healthcare solutions',
    skills: ['HealthTech', 'Regulatory Compliance', 'Data Science'],
    joinedAt: '2024-01-28',
    isActive: true,
  },
];

export const mockPrograms: Program[] = [
  {
    id: '1',
    name: 'Tech Accelerator 2024',
    description: 'A comprehensive program for early-stage tech startups',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    participantCount: 25,
    mentorCount: 15,
    isActive: true,
  },
  {
    id: '2',
    name: 'FinTech Innovation Hub',
    description: 'Specialized program for financial technology startups',
    startDate: '2024-02-01',
    endDate: '2024-11-30',
    participantCount: 18,
    mentorCount: 12,
    isActive: true,
  },
  {
    id: '3',
    name: 'HealthTech Incubator',
    description: 'Supporting healthcare and medical technology innovations',
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    participantCount: 20,
    mentorCount: 10,
    isActive: true,
  },
];

export const mockSessions: MentorshipSession[] = [
  {
    id: '1',
    mentorId: '2',
    startupOwnerId: '1',
    programId: '1',
    title: 'Business Strategy Deep Dive',
    description: 'Discussing go-to-market strategy and competitive positioning',
    scheduledAt: '2024-12-28T14:00:00Z',
    duration: 60,
    status: 'scheduled',
    meetingLink: 'https://meet.example.com/session-1',
    createdAt: '2024-12-20T10:00:00Z',
    currentStep: 'Monitoring perfomance'
  },
  {
    id: '2',
    mentorId: '4',
    startupOwnerId: '3',
    programId: '2',
    title: 'Technical Architecture Review',
    description: 'Reviewing system architecture and scalability plans',
    scheduledAt: '2024-12-27T10:30:00Z',
    duration: 90,
    status: 'completed',
    notes: 'Great session! Discussed microservices architecture and cloud deployment strategies.',
    createdAt: '2024-12-18T15:30:00Z',
    currentStep: 'Monitoring perfomance'
  },
  {
    id: '3',
    mentorId: '4',
    startupOwnerId: '5',
    programId: '3',
    title: 'Regulatory Compliance Workshop',
    description: 'Understanding healthcare regulations and compliance requirements',
    scheduledAt: '2024-12-29T16:00:00Z',
    duration: 120,
    status: 'scheduled',
    meetingLink: 'https://meet.example.com/session-3',
    createdAt: '2024-12-22T09:15:00Z',
    currentStep: 'Monitoring perfomance'
  },
];

export const mockStats: DashboardStats = {
  totalSessions: 156,
  activeMentors: 28,
  activeStartupOwners: 43,
  completedSessions: 142,
  upcomingSessions: 14,
  activePrograms: 3,
};