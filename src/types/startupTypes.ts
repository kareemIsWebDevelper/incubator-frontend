export type FounderType = {
  name: string;
  role: string;
};

export type StartupType = {
  id: string;
  logo: string;
  name: string;
  sector: string;
  establishmentDate: string;
  state: string;
  country: string;
  city: string;
  founders: FounderType[];
  sustainabilityGoals: string[];
};
