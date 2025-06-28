import { ProgramType } from "./programTypes";

export type TeamMemberType = {
  id: string;
  userName?: string;
  name?: string;
  email?: string;
  role: string;
  imageUrl?: string;
}

export type ProjectType = {
  id: string;
  title?: string;
  name?: string;
  description: string;
  progress: number;
  programs: ProgramType[];
  programsCount: number;
  teamMembers: TeamMemberType[];
  startDate: string;
  endDate: string;
  status: string;
  budget: string;
}