"use client";

import CustomTextField from "@/@core/components/mui/TextField";
import { Button, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React, { useState, useMemo } from "react";
import AddTrainingDialog from "./AddTrainingDialog";
import TrainingCard from "./TrainingCard";
import { TrainingType } from "@/types/TrainingTypes";
import { db } from "@/fake-db/apps/trainings";

const TrainingSessions = () => {
  // State for dialog
  const [dialogOpen, setDialogOpen] = useState(false);

  // State for trainings
  const [trainings, setTrainings] = useState<TrainingType[]>(db);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStep, setSelectedStep] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedRecency, setSelectedRecency] = useState<string>("all");

  // Handle adding new training
  const handleAddTraining = (newTraining: TrainingType) => {
    setTrainings([...trainings, newTraining]);
  };

  const steps = useMemo(() => {
    const uniqueSteps = Array.from(new Set(trainings.map((t) => t.stepName)));
    return uniqueSteps.sort();
  }, [trainings]);

  const filteredTrainings = useMemo(() => {
    return trainings.filter((training) => {
      // Search in title, description, and trainer info if available
      const matchesSearch =
        training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        training.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (training.trainerName &&
          training.trainerName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));

      const matchesStep =
        selectedStep === "all" || training.stepName === selectedStep;
      const matchesType =
        selectedType === "all" || training.type === selectedType;

      // Filter by recency
      let matchesRecency = true;
      if (selectedRecency === "recent") {
        const today = new Date();
        const trainingDate = new Date(training.date);
        matchesRecency = trainingDate >= today;
      } else if (selectedRecency === "old") {
        const today = new Date();
        const trainingDate = new Date(training.date);
        matchesRecency = trainingDate < today;
      }

      return matchesSearch && matchesStep && matchesType;
    });
  }, [searchTerm, selectedStep, selectedType, trainings, selectedRecency]);

  // Handle edit and delete actions
  const onEdit = (id: string) => {
    // Logic to handle editing a training session
    console.log("Edit training with ID:", id);
  };
  const onDelete = (id: string) => {
    // Logic to handle deleting a training session
    console.log("Delete training with ID:", id);
    setTrainings(trainings.filter((training) => training.id !== id));
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">All Trainings</h1>
            <p className="text-gray-600">
              Discover and join training sessions to enhance your skills
            </p>
          </div>
          <Button
            variant="contained"
            onClick={() => setDialogOpen(true)}
            startIcon={<i className="tabler-plus" />}
          >
            Add New Training
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-4">
          <CardContent className="p-5">
            <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
              {/* Search */}
              <div className="flex-1 lg:flex-none lg:w-1/3">
                <CustomTextField
                  placeholder="Search trainings, instructors, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                  InputProps={{
                    startAdornment: (
                      <i className="tabler-search w-4 h-4 text-gray-400 mr-2" />
                    ),
                  }}
                />
                {/* <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search trainings, instructors, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div> */}
              </div>

              <div className="flex flex-col lg:flex-row gap-2 items-center">
                {/* Step Filter */}
                <CustomTextField
                  select
                  placeholder="Filter by step"
                  value={selectedStep}
                  onChange={(e) => setSelectedStep(e.target.value)}
                  className="w-full lg:w-44"
                >
                  <MenuItem value="all">All Steps</MenuItem>
                  {steps.map((step) => (
                    <MenuItem key={step} value={step}>
                      {step}
                    </MenuItem>
                  ))}
                </CustomTextField>

                {/* Type Filter */}
                <CustomTextField
                  select
                  placeholder="Filter by type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full lg:w-44"
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="online-training">Online Training</MenuItem>
                  <MenuItem value="online-session">Online Session</MenuItem>
                  <MenuItem value="traditional-session">
                    Traditional Session
                  </MenuItem>
                </CustomTextField>

                {/* Recent/ Old */}
                <CustomTextField
                  select
                  placeholder="Filter by recency"
                  value={selectedRecency}
                  onChange={(e) => setSelectedRecency(e.target.value)}
                  className="w-full lg:w-44"
                >
                  <MenuItem value="all">All Dates</MenuItem>
                  <MenuItem value="recent">Recent</MenuItem>
                  <MenuItem value="old">Old</MenuItem>
                </CustomTextField>

                {/* Clear Filters */}
                {(searchTerm ||
                  selectedStep !== "all" ||
                  selectedType !== "all") && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedStep("all");
                      setSelectedType("all");
                    }}
                    className="lg:w-auto"
                    startIcon={
                      <i className="tabler-wash-dryclean-off w-4 h-4" />
                    }
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredTrainings.length} of {db.length}{" "}
            training sessions
          </p>
        </div>

        {/* Training Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainings.map((training) => (
            <TrainingCard training={training} key={training.id} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>

        {/* Empty State */}
        {filteredTrainings.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              {/* <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" /> */}
              <i className="tabler-filter w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No training sessions found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search terms to find more training
                sessions.
              </p>
              <Button
                variant="outlined"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedStep("all");
                  setSelectedType("all");
                }}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Training Dialog */}
      <AddTrainingDialog
        open={dialogOpen}
        setOpen={() => setDialogOpen(false)}
        onAddTraining={handleAddTraining}
      />
    </div>
  );
};

export default TrainingSessions;
