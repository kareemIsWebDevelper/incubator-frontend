"use client";

// React Imports
import React from "react";

// MUI Imports
import { Button, Grid, Typography } from "@mui/material";

// Components Imports
import ScreeningsTable from "./ScreeningsTable";
import ManageEvaluationDialog from "./ManageEvaluationDialog";

// Types Imports
import { ScreeningType } from "@/types/screeningTypes";
import { EvaluationCriteriaType, EvaluationCriteriaFormData } from "@/types/evaluationTypes";

// Mock data - replace with actual API calls
const screenings: ScreeningType[] = [
  {
    id: "1",
    title: "Initial Pitch Evaluation",
    programName: "TechStars Accelerator 2024",
    stepTitle: "Pitch Presentation",
    status: "in-progress",
    type: "one-to-all",
    judgers: ["John Smith", "Sarah Wilson", "Mike Johnson"],
    startDate: "2024-01-15",
    endDate: "2024-01-30",
    totalStartups: 25,
    evaluatedStartups: 12,
  },
  {
    id: "2",
    title: "Business Model Assessment",
    programName: "Innovation Hub Program",
    stepTitle: "Business Model Canvas",
    status: "pending",
    type: "group-to-group",
    judgers: ["Emily Davis", "Robert Chen"],
    startDate: "2024-02-01",
    endDate: "2024-02-15",
    totalStartups: 18,
    evaluatedStartups: 0,
  },
  {
    id: "3",
    title: "Final Demo Day",
    programName: "Startup Bootcamp",
    stepTitle: "Demo Presentation",
    status: "completed",
    type: "group-to-all",
    judgers: ["Alex Thompson", "Maria Garcia", "David Lee", "Lisa Brown"],
    startDate: "2023-12-10",
    endDate: "2023-12-20",
    totalStartups: 30,
    evaluatedStartups: 30,
  },
];

// Mock evaluation criteria data
const mockEvaluationCriteria: EvaluationCriteriaType[] = [
  {
    id: "1",
    name: "Business Model Assessment",
    description: "Evaluate the viability and scalability of the business model",
    subCriteria: [
      { id: "1a", name: "Market Opportunity", weight: 30, description: "Size and growth potential of target market" },
      { id: "1b", name: "Revenue Model", weight: 25, description: "Clarity and sustainability of revenue streams" },
      { id: "1c", name: "Competitive Advantage", weight: 25, description: "Unique value proposition and differentiation" },
      { id: "1d", name: "Scalability", weight: 20, description: "Potential for growth and expansion" },
    ],
    totalWeight: 100,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Technical Evaluation",
    description: "Assess technical feasibility and innovation",
    subCriteria: [
      { id: "2a", name: "Technology Innovation", weight: 40, description: "Novelty and advancement of technology" },
      { id: "2b", name: "Technical Feasibility", weight: 35, description: "Likelihood of successful implementation" },
      { id: "2c", name: "IP & Patents", weight: 25, description: "Intellectual property protection" },
    ],
    totalWeight: 100,
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
  },
];

const ManageScreenings = () => {
  const [screeningsData, setScreeningsData] = React.useState(screenings);
  const [isEvaluationDialogOpen, setIsEvaluationDialogOpen] = React.useState(false);
  const [evaluationCriteria, setEvaluationCriteria] = React.useState<EvaluationCriteriaType[]>(mockEvaluationCriteria);
  const [selectedCriteria, setSelectedCriteria] = React.useState<EvaluationCriteriaType | null>(null);
  const [evaluationMode, setEvaluationMode] = React.useState<"add" | "edit">("add");

  const handleUpdate = (updatedScreening: ScreeningType) => {
    setScreeningsData((prev) =>
      prev.map((screening) =>
        screening.id === updatedScreening.id ? updatedScreening : screening
      )
    );
    console.log("Updated screening:", updatedScreening);
  };

  const handleDelete = (screeningId: string) => {
    setScreeningsData((prev) =>
      prev.filter((screening) => screening.id !== screeningId)
    );
    console.log("Deleted screening with ID:", screeningId);
  };

  const handleManageEvaluation = () => {
    setSelectedCriteria(null);
    setEvaluationMode("add");
    setIsEvaluationDialogOpen(true);
  };

  const handleEvaluationSubmit = (data: EvaluationCriteriaFormData) => {
    if (evaluationMode === "edit" && selectedCriteria) {
      // Update existing criteria
      const updatedCriteria: EvaluationCriteriaType = {
        ...selectedCriteria,
        name: data.name,
        description: data.description,
        subCriteria: data.subCriteria.map((sub, index) => ({
          id: selectedCriteria.subCriteria[index]?.id || `${selectedCriteria.id}-${index}`,
          name: sub.name,
          weight: sub.weight,
          description: sub.description,
        })),
        totalWeight: data.subCriteria.reduce((sum, sub) => sum + sub.weight, 0),
        updatedAt: new Date().toISOString(),
      };
      
      setEvaluationCriteria((prev) =>
        prev.map((criteria) =>
          criteria.id === selectedCriteria.id ? updatedCriteria : criteria
        )
      );
    } else {
      // Add new criteria
      const newCriteria: EvaluationCriteriaType = {
        id: `criteria-${Date.now()}`,
        name: data.name,
        description: data.description,
        subCriteria: data.subCriteria.map((sub, index) => ({
          id: `criteria-${Date.now()}-${index}`,
          name: sub.name,
          weight: sub.weight,
          description: sub.description,
        })),
        totalWeight: data.subCriteria.reduce((sum, sub) => sum + sub.weight, 0),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setEvaluationCriteria((prev) => [newCriteria, ...prev]);
    }
    
    setIsEvaluationDialogOpen(false);
    setSelectedCriteria(null);
    console.log("Evaluation criteria submitted:", data);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h4" component="h1" className="mbe-1" fontWeight="bold">
          Manage Screening List
        </Typography>
        <Typography variant="h6" color="secondary.main" className="mbe-1">
          Monitor and manage all screening activities across programs
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6} className="flex justify-end items-center">
        <Button
          variant="contained"
          color="primary"
          className="h-fit"
          startIcon={<i className="tabler-presentation" />}
          onClick={handleManageEvaluation}
        >
          Manage Evaluation
        </Button>
      </Grid>
      <Grid item xs={12}>
        <ScreeningsTable
          data={screeningsData}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </Grid>

      {/* Manage Evaluation Dialog */}
      <ManageEvaluationDialog
        open={isEvaluationDialogOpen}
        onClose={() => setIsEvaluationDialogOpen(false)}
        onSubmit={handleEvaluationSubmit}
        criteria={selectedCriteria}
        mode={evaluationMode}
        existingCriteria={evaluationCriteria}
      />
    </Grid>
  );
};

export default ManageScreenings;
