"use client";

import React, { useState, useEffect } from "react";
import AssessmentsTable, { AssessmentType } from "./AssessmentsTable";
import { Button, Grid, Typography } from "@mui/material";
import AssessmentForm from "./AssessmentForm";
import { assessmentsData as initialAssessmentsData } from "@/fake-db/apps/assessments";

const Assessments = ({
  assessmentsData = initialAssessmentsData,
}: {
  assessmentsData?: AssessmentType[];
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [assessments, setAssessments] = useState<Array<AssessmentType>>(assessmentsData);
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentType | null>(null);

  // Update local state when props change
  useEffect(() => {
    setAssessments(assessmentsData);
  }, [assessmentsData]);

  const handleSubmit = (assessment: Partial<AssessmentType>) => {
    if (selectedAssessment) {
      // Edit existing assessment
      const updatedAssessments = assessments.map((a) =>
        a.id === selectedAssessment.id 
          ? { ...selectedAssessment, ...assessment } 
          : a
      );
      setAssessments(updatedAssessments);
    } else {
      // Add new assessment
      const newAssessment = {
        id: `a-${Date.now()}`,
        ...assessment
      } as AssessmentType;
      
      setAssessments(prevAssessments => [newAssessment, ...prevAssessments]);
    }
  };

  const handleEdit = (assessment: AssessmentType) => {
    setSelectedAssessment(assessment);
    setIsFormOpen(true);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={6} md={6} mb={2}>
        <Typography variant="h4" fontWeight="bold">Assessments List</Typography>
      </Grid>
      <Grid item xs={6} md={6} sx={{ textAlign: "right", mb: 2 }}>
        <Button 
          variant="contained"
          onClick={() => {
            setSelectedAssessment(null);
            setIsFormOpen(true);
          }}
          startIcon={<i className="tabler-plus" />}
        >
          New Assessment
        </Button>
      </Grid>
      <Grid item xs={12}>
        <AssessmentsTable assessmentsData={assessments} onEdit={handleEdit} />
      </Grid>

      <AssessmentForm
        open={isFormOpen}
        setOpen={setIsFormOpen}
        onSubmit={handleSubmit}
        assessment={selectedAssessment}
      />
    </Grid>
  );
};

export default Assessments;