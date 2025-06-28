// Types
import { SurveyType } from ".//surveyTypes";
import { UserType } from ".//UserTypes";
import { StartupType } from ".//startupTypes";
import { Program } from ".//mentorshipTypes";
import { Mentor } from ".//MentorTypes";

// Survey Result Response Type
export type SurveyResultType = {
  id: string;
  surveyId: string;
  user: UserType;
  startup?: StartupType;
  program: Program;
  scope: "mentorship" | "training";
  status: "answered" | "not-answered";
  submittedAt?: string;
  survey: SurveyType;
  mentor?: Mentor;
};
