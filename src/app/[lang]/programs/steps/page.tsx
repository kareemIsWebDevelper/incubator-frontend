import Steps from "@/views/steps";
import React from "react";
import { StepType } from "@/types/stepTypes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Steps",
  description: "Steps",
};

const initialSteps: StepType[] = [
  {
    id: "1",
    title: "Initial Planning",
    description: "This is the initial planning phase.",
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    program: {
      id: "1",
      title: "first Program",
      description: "This is the first program.",
    },
    stepType: "custom-form",
    selectedForm: "form1",
  },
  {
    id: "2",
    title: "Development Phase 1",
    description: "This is the first development phase.",
    startDate: new Date(new Date().setDate(new Date().getDate() + 8)),
    endDate: new Date(new Date().setDate(new Date().getDate() + 20)),
    program: {
      id: "2",
      title: "second Program",
      description: "This is the second program.",
    },
    stepType: "screening",
    selectedForm: "form2",
  },
  {
    id: "3",
    title: "Testing Phase",
    description: "This is the testing phase.",
    startDate: new Date(new Date().setDate(new Date().getDate() + 21)),
    endDate: new Date(new Date().setDate(new Date().getDate() + 28)),
    program: {
      id: "1",
      title: "first Program",
      description: "This is the first program.",
    },
    stepType: "mentorship",
    selectedForm: "form3",
  },
  {
    id: "4",
    title: "Deployment",
    description: "This is the deployment phase.",
    startDate: new Date(new Date().setDate(new Date().getDate() + 29)),
    endDate: new Date(new Date().setDate(new Date().getDate() + 35)),
    program: {
      id: "2",
      title: "second Program",
      description: "This is the second program.",
    },
    stepType: "training",
    selectedForm: "form1",
  },
  {
    id: "5",
    title: "Evaluation Phase",
    description: "This is the evaluation phase.",
    startDate: new Date(new Date().setDate(new Date().getDate() + 29)),
    endDate: new Date(new Date().setDate(new Date().getDate() + 35)),
    program: {
      id: "3",
      title: "third Program",
      description: "This is the third program.",
    },
    stepType: "final-evaluation",
    selectedForm: "form5",
  },
];

const StepsManagementPage: React.FC = () => {
  return <Steps data={initialSteps} />;
};

export default StepsManagementPage;
