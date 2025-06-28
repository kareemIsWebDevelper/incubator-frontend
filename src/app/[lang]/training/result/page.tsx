// Next Imports
import type { Metadata } from "next";

// Components Imports
import TrainingResult from "@/views/training/result";

export const metadata: Metadata = {
  title: "Training Result",
  description: "Training Result",
};

const TrainingResultPage = () => {
  return <TrainingResult />;
};

export default TrainingResultPage;
