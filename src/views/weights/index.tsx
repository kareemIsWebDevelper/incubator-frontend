"use client";

import React, { useState, useEffect } from "react";
import WeightsTable from "./WeightsTable";
import { Button, Grid, Typography } from "@mui/material";
import WeightFormDialog from "./WeightFormDialog";
import WeightDetailsDialog from "./WeightDetailsDialog";
import { WeightType } from "@/types/weightTypes";
import { db as initialWeightsData } from "@/fake-db/pages/weights";

const Weights = ({
  data = initialWeightsData,
}: {
  data?: WeightType[];
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [weights, setWeights] = useState<Array<WeightType>>(data);
  const [selectedWeight, setSelectedWeight] = useState<WeightType | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");

  // Update local state when props change
  useEffect(() => {
    setWeights(data);
  }, [data]);

  const handleSubmit = (weightData: Partial<WeightType>) => {
    if (mode === "edit" && selectedWeight) {
      // Edit existing weight
      const updatedWeights = weights.map((w) =>
        w.id === selectedWeight.id
          ? { ...selectedWeight, ...weightData, updatedAt: new Date().toISOString() }
          : w
      );
      setWeights(updatedWeights);
    } else {
      // Add new weight
      const newWeight = {
        id: `weight-${Date.now()}`,
        ...weightData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as WeightType;

      setWeights((prevWeights) => [
        newWeight,
        ...prevWeights,
      ]);
    }
    setIsFormOpen(false);
    setSelectedWeight(null);
  };

  const handleEdit = (weight: WeightType) => {
    setSelectedWeight(weight);
    setMode("edit");
    setIsFormOpen(true);
  };

  const handleView = (weight: WeightType) => {
    setSelectedWeight(weight);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (weight: WeightType) => {
    setWeights((prevWeights) => prevWeights.filter((w) => w.id !== weight.id));
  };

  const handleCloseViewDialog = () => {
    setIsViewDialogOpen(false);
    setSelectedWeight(null);
  };

  const handleAddNew = () => {
    setSelectedWeight(null);
    setMode("add");
    setIsFormOpen(true);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={6} md={6} mb={2}>
        <Typography variant="h4" fontWeight="bold">Assessment Weights</Typography>
      </Grid>
      <Grid item xs={6} md={6} sx={{ textAlign: "right", mb: 2 }}>
        <Button
          variant="contained"
          onClick={handleAddNew}
          startIcon={<i className="tabler-plus" />}
        >
          New Weight
        </Button>
      </Grid>
      <Grid item xs={12}>
        <WeightsTable
          weightsData={weights}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
        />
      </Grid>

      <WeightFormDialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        weight={selectedWeight}
        mode={mode}
      />

      <WeightDetailsDialog
        open={isViewDialogOpen}
        onClose={handleCloseViewDialog}
        weight={selectedWeight}
      />
    </Grid>
  );
};

export default Weights;
