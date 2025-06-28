// Next Imports
import type { Metadata } from "next";

// Components Imports
import TrainingSessions from "@/views/training/sessions";

export const metadata: Metadata = {
  title: "Training Sessions",
  description: "Training Sessions",
};

const TrainingSessionsPage = () => {
  return <TrainingSessions />;
};

export default TrainingSessionsPage;
