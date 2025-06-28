// Dashboard Types
export interface DashboardProps {
  refreshInterval?: number;
  layout?: 'default' | 'compact' | 'expanded';
  visibleSections?: string[];
  enableRealTimeUpdates?: boolean;
  onError?: (error: Error) => void;
}

export interface StatisticsData {
  totalUsers: number;
  totalStartups: number;
  totalMentors: number;
  totalPrograms: number;
  growthRate: number;
  lastUpdated: string;
}

export interface UserRoleData {
  role: string;
  count: number;
  percentage: number;
  color: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

export interface DemographicsData {
  ageGroups: {
    range: string;
    count: number;
    percentage: number;
  }[];
  genderDistribution: {
    male: number;
    female: number;
    other: number;
  };
  locationDistribution: {
    country: string;
    count: number;
    percentage: number;
  }[];
}

export interface StartupData {
  sectors: {
    name: string;
    count: number;
    percentage: number;
    growth: number;
  }[];
  developmentStages: {
    stage: string;
    count: number;
    percentage: number;
  }[];
  businessModels: {
    model: string;
    count: number;
    percentage: number;
  }[];
  headquarters: {
    location: string;
    count: number;
    percentage: number;
  }[];
  targetMarkets: {
    market: string;
    count: number;
    percentage: number;
  }[];
}

export interface ProgramData {
  id: string;
  name: string;
  startupCount: number;
  progress: number;
  status: 'active' | 'completed' | 'upcoming';
  startDate: string;
  endDate: string;
}

export interface TaskData {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
}

export interface SDGData {
  goal: number;
  title: string;
  count: number;
  percentage: number;
  color: string;
}

// API Response Types
export interface DashboardApiResponse {
  success: boolean;
  data: {
    statistics: StatisticsData;
    userRoles: UserRoleData[];
    demographics: DemographicsData;
    startups: StartupData;
    programs: ProgramData[];
    tasks: TaskData[];
    sdgs: SDGData[];
  };
  message?: string;
  timestamp: string;
}

// Error Types
export interface DashboardError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// Loading States
export interface LoadingState {
  statistics: boolean;
  charts: boolean;
  analytics: boolean;
  overall: boolean;
}

// Filter Types
export interface DashboardFilters {
  dateRange?: {
    start: Date;
    end: Date;
  };
  userTypes?: string[];
  regions?: string[];
  programs?: string[];
}

export default {};
