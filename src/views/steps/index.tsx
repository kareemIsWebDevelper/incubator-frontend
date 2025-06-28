"use client";

import React, { useMemo, useState, useCallback, useEffect } from "react";
import { StepsProps, StepType } from "@/types/stepTypes";
import StepsList from "./StepsList";
import StepFormDialog from "./StepFormDialog";
import StepDetailsDialog from "./StepDetailsDialog";
import WarningDialog from "@/components/dialogs/WarningDialog";
import type { DropResult } from "@hello-pangea/dnd";
import { Button, Card, CardContent, MenuItem } from "@mui/material";
import CustomTextField from "@/@core/components/mui/TextField";
import { ProgramType } from "@/types/programTypes";

const Steps: React.FC<StepsProps> = ({ data }) => {
  const [steps, setSteps] = useState<StepType[]>(data);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [editingStep, setEditingStep] = useState<StepType | null>(null);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");

  // Warning dialog state for deletion
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [stepToDelete, setStepToDelete] = useState<string | null>(null);

  // Details dialog state
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState<StepType | null>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState<string>("all");

  // Cleanup dragging state on unmount
  useEffect(() => {
    return () => {
      setIsDragging(false);
    };
  }, []);

  const filteredSteps = useMemo(() => {
    // Don't update filtered steps while dragging to prevent conflicts
    if (isDragging) {
      return steps;
    }

    const filtered = steps.filter((step) => {
      const matchesSearch = step.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesProgram =
        selectedProgram === "all" ||
        String(step.program.id) === String(selectedProgram);

      return matchesSearch && matchesProgram;
    });

    return filtered;
  }, [steps, searchTerm, selectedProgram, isDragging]);

  const handleAddStep = (): void => {
    setDialogMode("add");
    setEditingStep(null);
    setIsDialogOpen(true);
  };

  const handleEditStep = (step: StepType): void => {
    setDialogMode("edit");
    setEditingStep(step);
    setIsDialogOpen(true);
  };

  const handleDeleteStep = (stepId: string): void => {
    setStepToDelete(stepId);
    setIsDeleteDialogOpen(true);
  };

  const handleViewDetails = (step: StepType): void => {
    setSelectedStep(step);
    setIsDetailsDialogOpen(true);
  };

  const confirmDeleteStep = (): void => {
    if (stepToDelete) {
      setSteps(steps.filter((step) => step.id !== stepToDelete));
      setStepToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const cancelDeleteStep = (): void => {
    setStepToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const handleStepFormSubmit = (formData: any): void => {
    if (dialogMode === "edit" && editingStep) {
      // Update existing step
      const updatedStep: StepType = {
        ...editingStep,
        title: formData.stepTitle,
        stepType: formData.stepType,
        selectedForm: formData.selectedForm,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        description: formData.description,
      };
      setSteps(
        steps.map((step) => (step.id === editingStep.id ? updatedStep : step))
      );
    } else {
      // Add new step
      const newStep: StepType = {
        id: (steps.length + 1).toString(),
        title: formData.stepTitle,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        program: programsList[0] || {
          id: "1",
          title: "Default Program",
          description: "Default program description.",
        },
        stepType: formData.stepType,
        selectedForm: formData.selectedForm,
        description: formData.description,
      };
      setSteps([...steps, newStep]);
    }
  };

  const handleStepChange = (stepId: string, updatedStep: StepType): void => {
    setSteps(steps.map((step) => (step.id === stepId ? updatedStep : step)));
  };

  const onDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const onDragEnd = useCallback(
    (result: DropResult): void => {
      setIsDragging(false);

      const { source, destination } = result;
      if (!destination) return; // Dropped outside the list
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      )
        return; // Dropped in the same place

      // Prevent drag operations when filters are active to avoid confusion
      const hasActiveFilters = searchTerm !== "" || selectedProgram !== "all";
      if (hasActiveFilters) {
        console.warn("Drag and drop is disabled when filters are active");
        return;
      }

      const items = Array.from(steps);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      setSteps(items);
    },
    [searchTerm, selectedProgram, steps]
  );

  const programsList: ProgramType[] = [
    {
      id: "1",
      title: "first program",
      description: "This is the first program.",
    },
    {
      id: "2",
      title: "second program",
      description: "This is the second program.",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">All Steps</h1>
          <p className="text-gray-600">
            Manage your steps efficiently by adding, editing and
            <br /> reordering them. Drag and drop to rearrange the steps as
            needed.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="tonal"
            href="/programs"
            startIcon={<i className="tabler-components" />}
          >
            Browse Programs
          </Button>
          <Button
            variant="contained"
            onClick={handleAddStep}
            startIcon={<i className="tabler-plus" />}
          >
            Add New Step
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-4">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
            {/* Search */}
            <div className="flex-1 lg:flex-none lg:w-1/3">
              <CustomTextField
                placeholder="Search steps..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                InputProps={{
                  startAdornment: (
                    <i className="tabler-search text-lg text-gray-400 mr-2" />
                  ),
                }}
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-2 items-center">
              {/* Step Filter */}
              <CustomTextField
                select
                placeholder="Filter by program"
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="w-full lg:w-44"
              >
                <MenuItem value="all">All programs</MenuItem>
                {programsList.map((program) => (
                  <MenuItem key={program.id} value={program.id}>
                    {program.title}
                  </MenuItem>
                ))}
              </CustomTextField>

              {/* Clear Filters */}
              {(searchTerm || selectedProgram !== "all") && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedProgram("all");
                  }}
                  className="lg:w-auto"
                  startIcon={<i className="tabler-wash-dryclean-off w-4 h-4" />}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
          {/* Info message when filters are active */}
          {(searchTerm || selectedProgram !== "all") && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700">
                <i className="tabler-info-circle text-sm" />
                <span className="text-sm">
                  Drag and drop is disabled when filters are active. Clear
                  filters to reorder steps.
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Steps List */}
      <StepsList
        steps={filteredSteps}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        handleStepChange={handleStepChange}
        handleAddStep={handleAddStep}
        isDragDisabled={searchTerm !== "" || selectedProgram !== "all"}
        onEdit={handleEditStep}
        onDelete={handleDeleteStep}
        onViewDetails={handleViewDetails}
      />

      {/* Step Form Dialog */}
      <StepFormDialog
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        onSubmit={handleStepFormSubmit}
        step={editingStep}
        mode={dialogMode}
      />

      {/* Step Details Dialog */}
      <StepDetailsDialog
        open={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        step={selectedStep}
      />

      {/* Delete Confirmation Dialog */}
      <WarningDialog
        type="Delete"
        title="Delete Step"
        message="Are you sure you want to delete this step? This action cannot be undone."
        open={isDeleteDialogOpen}
        onClose={cancelDeleteStep}
        onConfirm={confirmDeleteStep}
      />
    </div>
  );
};

export default Steps;
