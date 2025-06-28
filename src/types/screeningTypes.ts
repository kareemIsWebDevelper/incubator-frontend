export type ScreeningType = {
  id: string;
  title: string;
  programName: string;
  stepTitle: string;
  status: "pending" | "in-progress" | "completed";
  type: "one-to-all" | "group-to-group" | "group-to-all";
  judgers: string[];
  startDate: string;
  endDate: string;
  totalStartups: number;
  evaluatedStartups: number;
}