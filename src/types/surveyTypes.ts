import { OrgType } from "./OrgTypes";
import { Program } from "./mentorshipTypes";
import { StartupType } from "./startupTypes";
import { Mentor } from "./MentorTypes";

export interface QuestionOption {
  id: string;
  text: string;
  value: string;
}

export interface QuestionType {
  id: string;
  text: string;
  type: "star-rating" | "yes-no" | "question-answer";
  options?: QuestionOption[];
  required?: boolean;
  maxRating?: number; // For star rating questions
}

export interface SurveyType {
  id: string;
  title: string;
  organization: OrgType;
  tags: string[];
  questions: QuestionType[];
  description?: string;
  status: "draft" | "active" | "inactive" | "archived";
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  totalResponses?: number;
  scope?: "mentorship" | "training";
  triggeredAfter?: "session" | "cycle completion";
  engagementRate?: number; // percentage 0-100
  program?: Program;
  startup?: StartupType;
  mentor?: Mentor;
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  respondentId: string;
  responses: Record<string, any>;
  submittedAt: string;
}

export interface SurveyFormInputs {
  title: string;
  description?: string;
  organizationId: string;
  tags: string[];
}
