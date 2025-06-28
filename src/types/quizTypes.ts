import { OrgType } from "./OrgTypes";
import { Program } from "./mentorshipTypes";

export interface QuizType {
  id: string;
  title: string;
  organization: OrgType;
  program: Program;
  status: "published" | "draft";
  startDate: string;
  endDate: string;
  participants: number;
  passPercentage: number;
  description?: string;
  questions?: string[]; // Array of question IDs
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  duration?: number; // Duration in minutes
  totalQuestions?: number;
  averageScore?: number;
  attempts?: number; // Number of attempts allowed
  shuffleQuestions?: boolean; // Whether to shuffle questions
}
