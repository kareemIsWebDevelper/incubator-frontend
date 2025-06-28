"use client";

import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";

// Component Imports
import QuizzesTable from "./QuizzesTable";
import QuizFormDialog from "./QuizFormDialog";

// Types
import { QuizType } from "@/types/quizTypes";

// Mock Data
import { mockQuizzes } from "@/fake-db/pages/quizzes";

const Quizzes = () => {
  // States
  const [quizzes, setQuizzes] = useState<QuizType[]>(mockQuizzes);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");

  // Handle add new quiz
  const handleAddNewQuiz = () => {
    setSelectedQuiz(null);
    setFormMode("add");
    setOpenFormDialog(true);
  };

  // Handle edit quiz
  const handleEditQuiz = (quiz: QuizType) => {
    if (!quiz || !quiz.id) {
      console.error("Invalid quiz data for editing");
      return;
    }
    setSelectedQuiz(quiz);
    setFormMode("edit");
    setOpenFormDialog(true);
  };

  // Handle delete quiz
  const handleDeleteQuiz = (quiz: QuizType) => {
    if (!quiz || !quiz.id) {
      console.error("Invalid quiz data for deletion", quiz);
      return;
    }
    console.log("Deleting quiz with ID:", quiz.id);
    setQuizzes((prevQuizzes) => {
      const filtered = prevQuizzes.filter((q) => q.id !== quiz.id);
      console.log("Quizzes after deletion:", filtered.length, "remaining");
      return filtered;
    });
  };

  // Handle form submit
  const handleFormSubmit = (quizData: Partial<QuizType>) => {
    if (formMode === "add") {
      // Add new quiz
      const newQuiz: QuizType = {
        ...quizData,
        id: `quiz-${Date.now()}`, // Generate a unique ID
        participants: 0,
        totalQuestions: 0,
        averageScore: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as QuizType;

      setQuizzes((prevQuizzes) => [newQuiz, ...prevQuizzes]);
    } else if (formMode === "edit" && selectedQuiz) {
      // Edit existing quiz
      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((quiz) =>
          quiz.id === selectedQuiz.id ? { ...quiz, ...quizData } : quiz
        )
      );
    }

    // Close the dialog and reset state
    setOpenFormDialog(false);
    setSelectedQuiz(null);
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h4"
            component="h1"
            className="mbe-1"
            fontWeight="bold"
          >
            Quizzes List
          </Typography>
          <Typography variant="h6" color="secondary.main" className="mbe-1">
            Monitor and manage all quizzes
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} className="flex justify-end items-center">
          <Button
            variant="contained"
            color="primary"
            className="h-fit"
            startIcon={<i className="tabler-plus" />}
            onClick={handleAddNewQuiz}
          >
            Add New
          </Button>
        </Grid>

        <Grid item xs={12}>
          <QuizzesTable
            quizzesData={quizzes}
            onEdit={handleEditQuiz}
            onDelete={handleDeleteQuiz}
          />
        </Grid>
      </Grid>

      {/* Quiz Form Dialog */}
      <QuizFormDialog
        open={openFormDialog}
        setOpen={(open) => {
          setOpenFormDialog(open);
          if (!open) {
            // Reset state when dialog closes
            setSelectedQuiz(null);
          }
        }}
        onSubmit={handleFormSubmit}
        quiz={selectedQuiz}
        mode={formMode}
      />
    </>
  );
};

export default Quizzes;
