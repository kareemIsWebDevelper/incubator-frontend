export type ResponsiblePersonType = {
  name?: string;
  avatarUrl?: string;
};

export type ProgramType<TStats = any> = {
  id?: number | string | any;
  title?: string;
  name?: string;
  logoUrl?: string | null;
  description?: string;
  organization?: null | {
    id?: number;
    name?: string;
    logoUrl?: string | null;
  };
  stats?: TStats;
  responsiblePersons?: ResponsiblePersonType[];
  progressPercent?: number;
  progressTasksDone?: number;
  progressTasksTotal?: number;
  duration?: {
    start?: string;
    end?: string;
  };
  createdAt?: string;
  updatedAt?: string;
  
  // Program settings
  allowNonCompany?: boolean;
  privateLink?: boolean;
  
  // Guidelines
  guidelines?: string;
  guidelinesFile?: File | string | null;
  
  // Financial Policy
  financialPolicy?: string;
  financialPolicyFile?: File | string | null;
  
  // Legal Policy
  legalPolicy?: string;
  legalPolicyFile?: File | string | null;
  
  // Mentorship Request settings
  autoApproveMentorship?: boolean;
  status?: "not-started" | "in-progress" | "completed" | "archived" | "planning"; 
};
