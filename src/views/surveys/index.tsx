"use client";

import React, { useState } from "react";
import { Typography, Button, Grid } from "@mui/material";
import { useParams, useRouter } from "next/navigation";

// Component Imports
import SurveysTable from "./SurveysTable";
import SurveyFormDialog from "./SurveyFormDialog";
import ManageQuestionsDialog from "./ManageQuestionsDialog";
import QuestionFormDialog from "./QuestionFormDialog";
import SurveyDetailsDialog from "./SurveyDetailsDialog";

// Types
import { SurveyType, QuestionType } from "@/types/surveyTypes";

// Mock data
import { mockSurveys } from "@/fake-db/pages/surveys";
import { getLocalizedUrl } from "@/utils/i18n";
import { Locale } from "@/configs/i18n";

const Surveys = () => {
  const { lang: locale } = useParams();

  const router = useRouter();
  const [surveys, setSurveys] = useState<SurveyType[]>(mockSurveys);
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyType | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType | null>(
    null
  );

  // Dialog states
  const [surveyFormOpen, setSurveyFormOpen] = useState(false);
  const [manageQuestionsOpen, setManageQuestionsOpen] = useState(false);
  const [questionFormOpen, setQuestionFormOpen] = useState(false);
  const [surveyDetailsOpen, setSurveyDetailsOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");

  // Survey handlers
  const handleAddSurvey = () => {
    setSelectedSurvey(null);
    setFormMode("add");
    setSurveyFormOpen(true);
  };

  const handleEditSurvey = (survey: SurveyType) => {
    setSelectedSurvey(survey);
    setFormMode("edit");
    setSurveyFormOpen(true);
  };

  const handleDeleteSurvey = (survey: SurveyType) => {
    setSurveys((prev) => prev.filter((s) => s.id !== survey.id));
  };

  const handleViewSurvey = (survey: SurveyType) => {
    setSelectedSurvey(survey);
    setManageQuestionsOpen(true);
  };

  const handleManageQuestions = (survey: SurveyType) => {
    setSelectedSurvey(survey);
    setManageQuestionsOpen(true);
  };

  const handleViewDetails = (survey: SurveyType) => {
    setSelectedSurvey(survey);
    setSurveyDetailsOpen(true);
  };

  const handleViewResults = (survey: SurveyType) => {
    // Navigate to survey results page with survey ID
    router.push(`/en/surveys/results?id=${survey.id}`);
  };

  const handleSurveySubmit = (surveyData: Partial<SurveyType>) => {
    if (formMode === "edit" && selectedSurvey) {
      setSurveys((prev) =>
        prev.map((s) =>
          s.id === selectedSurvey.id ? { ...s, ...surveyData } : s
        )
      );
    } else {
      setSurveys((prev) => [...prev, surveyData as SurveyType]);
    }
    setSurveyFormOpen(false);
  };

  // Question handlers
  const handleAddQuestion = () => {
    setSelectedQuestion(null);
    setFormMode("add");
    setQuestionFormOpen(true);
  };

  const handleEditQuestion = (question: QuestionType) => {
    setSelectedQuestion(question);
    setFormMode("edit");
    setQuestionFormOpen(true);
  };

  const handleDeleteQuestion = (question: QuestionType) => {
    if (selectedSurvey) {
      const updatedSurvey = {
        ...selectedSurvey,
        questions: selectedSurvey.questions.filter((q) => q.id !== question.id),
      };
      setSelectedSurvey(updatedSurvey);
      setSurveys((prev) =>
        prev.map((s) => (s.id === selectedSurvey.id ? updatedSurvey : s))
      );
    }
  };

  const handleQuestionSubmit = (questionData: Partial<QuestionType>) => {
    if (selectedSurvey) {
      let updatedQuestions;
      if (formMode === "edit" && selectedQuestion) {
        updatedQuestions = selectedSurvey.questions.map((q) =>
          q.id === selectedQuestion.id ? { ...q, ...questionData } : q
        );
      } else {
        updatedQuestions = [
          ...selectedSurvey.questions,
          questionData as QuestionType,
        ];
      }

      const updatedSurvey = {
        ...selectedSurvey,
        questions: updatedQuestions,
      };

      setSelectedSurvey(updatedSurvey);
      setSurveys((prev) =>
        prev.map((s) => (s.id === selectedSurvey.id ? updatedSurvey : s))
      );
    }
    setQuestionFormOpen(false);
  };

  const handleSaveQuestions = (questions: QuestionType[]) => {
    if (selectedSurvey) {
      const updatedSurvey = {
        ...selectedSurvey,
        questions,
      };
      setSurveys((prev) =>
        prev.map((s) => (s.id === selectedSurvey.id ? updatedSurvey : s))
      );
      setSelectedSurvey(updatedSurvey);
    }
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Typography variant="h4" className="mb-1" fontWeight="bold">
              Surveys Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Create, manage, and track surveys across your organization
            </Typography>
          </div>
          <div className="flex items-center gap-3">
            <Button
              href={getLocalizedUrl("/surveys/results", locale as Locale)}
              variant="tonal"
              startIcon={<i className="tabler-chart-bar" />}
            >
              See Results
            </Button>
            <Button
              variant="contained"
              startIcon={<i className="tabler-plus" />}
              onClick={handleAddSurvey}
            >
              Add Survey
            </Button>
          </div>
        </div>
      </Grid>

      <Grid item xs={12}>
        <SurveysTable
          surveysData={surveys}
          onEdit={handleEditSurvey}
          onView={handleViewSurvey}
          onDelete={handleDeleteSurvey}
          onManageQuestions={handleManageQuestions}
          onViewDetails={handleViewDetails}
          onViewResults={handleViewResults}
        />
      </Grid>

      {/* Survey Form Dialog */}
      <SurveyFormDialog
        open={surveyFormOpen}
        setOpen={setSurveyFormOpen}
        onSubmit={handleSurveySubmit}
        survey={selectedSurvey}
        mode={formMode}
      />

      {/* Manage Questions Dialog */}
      <ManageQuestionsDialog
        open={manageQuestionsOpen}
        onClose={() => setManageQuestionsOpen(false)}
        survey={selectedSurvey}
        onSave={handleSaveQuestions}
        onEditQuestion={handleEditQuestion}
        onDeleteQuestion={handleDeleteQuestion}
      />

      {/* Question Form Dialog */}
      <QuestionFormDialog
        open={questionFormOpen}
        onClose={() => setQuestionFormOpen(false)}
        onSubmit={handleQuestionSubmit}
        question={selectedQuestion}
        mode={formMode}
      />

      {/* Survey Details Dialog */}
      <SurveyDetailsDialog
        open={surveyDetailsOpen}
        onClose={() => setSurveyDetailsOpen(false)}
        survey={selectedSurvey}
        onViewResults={handleViewResults}
      />
    </Grid>
  );
};

export default Surveys;
