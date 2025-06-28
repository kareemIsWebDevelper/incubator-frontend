"use client";

import React, { useState, useEffect } from "react";
import QuestionsTable from "./QuestionsTable";
import { Button, Grid, Typography } from "@mui/material";
import QuestionForm from "./QuestionForm";
import QuestionDetailsDialog from "./QuestionDetailsDialog";
import { QuestionType } from "@/types/questionTypes";
import { db as initialQuestionsData } from "@/fake-db/pages/questions";

const Questions = ({
  data = initialQuestionsData,
}: {
  data?: QuestionType[];
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [questions, setQuestions] = useState<Array<QuestionType>>(data);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Update local state when props change
  useEffect(() => {
    setQuestions(data);
  }, [data]);

  const handleSubmit = (question: Partial<QuestionType>) => {
    if (selectedQuestion) {
      // Edit existing question
      const updatedQuestions = questions.map((q) =>
        q.id === selectedQuestion.id
          ? { ...selectedQuestion, ...question }
          : q
      );
      setQuestions(updatedQuestions);
    } else {
      // Add new question
      const newQuestion = {
        id: `q-${Date.now()}`,
        ...question,
      } as QuestionType;

      setQuestions((prevQuestions) => [
        newQuestion,
        ...prevQuestions,
      ]);
    }
    setIsFormOpen(false);
    setSelectedQuestion(null);
  };

  const handleEdit = (question: QuestionType) => {
    setSelectedQuestion(question);
    setIsFormOpen(true);
  };

  const handleView = (question: QuestionType) => {
    setSelectedQuestion(question);
    setIsViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setIsViewDialogOpen(false);
    setSelectedQuestion(null);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={6} md={6} mb={2}>
        <Typography variant="h4" fontWeight="bold">Questions List</Typography>
      </Grid>
      <Grid item xs={6} md={6} sx={{ textAlign: "right", mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => {
            setSelectedQuestion(null);
            setIsFormOpen(true);
          }}
          startIcon={<i className="tabler-plus" />}
        >
          New Question
        </Button>
      </Grid>
      <Grid item xs={12}>
        <QuestionsTable
          questionsData={questions}
          onEdit={handleEdit}
          onView={handleView}
        />
      </Grid>

      <QuestionForm
        open={isFormOpen}
        setOpen={setIsFormOpen}
        onSubmit={handleSubmit}
        question={selectedQuestion}
      />

      <QuestionDetailsDialog
        open={isViewDialogOpen}
        onClose={handleCloseViewDialog}
        question={selectedQuestion}
      />
    </Grid>
  );
};

export default Questions;
