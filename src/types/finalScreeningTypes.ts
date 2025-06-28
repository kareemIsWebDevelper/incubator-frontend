export type FinalScreeningType = {
  id: string;
  title: string;
  programName: string;
  stepTitle: string;
  status: "pending" | "in-progress" | "completed";
  type: "one-to-all" | "group-to-group" | "group-to-all";
  judgers: string[];
  startDate: string;
  endDate: string;
  startups: FinalScreeningStartupType[];
};

export type FinalScreeningStartupType = {
  id: string;
  name: string;
  logo?: string;
  sector: string;
  founders: string[];
  assignedJudgers: string[];
  evaluationStatus: "not-started" | "in-progress" | "completed";
  finalScore?: number;
  rank?: number;
  currentProgram?: string;
  currentStep?: string;
};

export type JudgerAssignmentType = {
  startupId: string;
  judgerIds: string[];
};
