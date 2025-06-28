// Next Imports
import type { Metadata } from "next";

// Components Imports
import TrainingDashboard from "@/views/training/TraningDashboard";

export const metadata: Metadata = {
  title: "Training Dashboard",
  description: "Training Dashboard",
};

const TrainingDashboardPage = () => {
  return <TrainingDashboard />;
};

export default TrainingDashboardPage;
