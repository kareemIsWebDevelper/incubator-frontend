import MentorshipSessions from '@/views/mentorship-sessions';
import { Metadata } from 'next';

// Metadata
export const metadata: Metadata = {
  title: "Mentorship Sessions",
  description: "Mentorship Sessions Page",
  keywords: "mentorship, sessions, startup, mentor, program",
};

const MentorshipSessionsPage = () => {
  return (
    <MentorshipSessions />
  ) 
}

export default MentorshipSessionsPage