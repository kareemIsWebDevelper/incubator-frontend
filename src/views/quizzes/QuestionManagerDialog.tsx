"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  MenuItem,
  Typography,
  IconButton,
  Card,
  CardContent,
  Chip,
  Box,
  Checkbox,
  ListItemText,
  Divider,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  object,
  string,
  pipe,
  nonEmpty,
  minLength,
  maxLength,
  array,
} from "valibot";
import type { SubmitHandler } from "react-hook-form";
import type { InferInput } from "valibot";

// Component Imports
import CustomTextField from "@/@core/components/mui/TextField";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";
import WarningDialog from "@/components/dialogs/WarningDialog";

// Types
import { QuizType } from "@/types/quizTypes";
import { QuestionType } from "@/types/questionTypes";

// Define the question form schema
const questionSchema = object({
  title: pipe(
    string(),
    nonEmpty("Question title is required"),
    minLength(10, "Question must be at least 10 characters"),
    maxLength(500, "Question must not exceed 500 characters")
  ),
  type: pipe(string(), nonEmpty("Question type is required")),
  questionGroup: pipe(string(), nonEmpty("Question group is required")),
  questionCategory: pipe(string(), nonEmpty("Question category is required")),
  difficultyLevel: pipe(string(), nonEmpty("Difficulty level is required")),
  tags: array(string()),
  explanation: pipe(
    string(),
    nonEmpty("Explanation is required"),
    minLength(10, "Explanation must be at least 10 characters")
  ),
});

type QuestionFormInputs = InferInput<typeof questionSchema>;

const defaultQuestionValues: QuestionFormInputs = {
  title: "",
  type: "",
  questionGroup: "",
  questionCategory: "",
  difficultyLevel: "",
  tags: [],
  explanation: "",
};

// Mock data for dropdowns
const questionTypes = [
  { value: "true_false", label: "True/False" },
  { value: "multiple_choice", label: "Multiple Choice" },
  { value: "single_choice", label: "Single Choice" },
];

const questionGroups = [
  { value: "technical", label: "Technical" },
  { value: "behavioral", label: "Behavioral" },
  { value: "general", label: "General Knowledge" },
  { value: "domain_specific", label: "Domain Specific" },
];

const questionCategories = [
  { value: "programming", label: "Programming" },
  { value: "algorithms", label: "Algorithms" },
  { value: "database", label: "Database" },
  { value: "system_design", label: "System Design" },
  { value: "soft_skills", label: "Soft Skills" },
  { value: "leadership", label: "Leadership" },
];

const difficultyLevels = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const availableTags = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "SQL",
  "NoSQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "Git",
  "Agile",
  "Scrum",
  "Leadership",
  "Communication",
  "Problem Solving",
];

interface QuestionManagerDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  quiz: QuizType | null;
}

const QuestionManagerDialog = ({
  open,
  setOpen,
  quiz,
}: QuestionManagerDialogProps) => {
  // States
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuestionType | null>(
    null
  );
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<QuestionType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  // Initialize form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuestionFormInputs>({
    resolver: valibotResolver(questionSchema),
    defaultValues: defaultQuestionValues,
  });

  // Mock questions data - in real app, this would come from API
  useEffect(() => {
    if (open && quiz) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setQuestions([
          {
            id: "q1",
            title: "What is the difference between let and var in JavaScript?",
            type: "multiple_choice",
            questionGroup: "technical",
            questionCategory: "programming",
            difficultyLevel: "medium",
            tags: ["JavaScript", "Programming"],
            explanation: "let has block scope while var has function scope",
            assignedOrganizations: [quiz.organization.id],
          },
          {
            id: "q2",
            title:
              "React is a JavaScript library for building user interfaces?",
            type: "true_false",
            questionGroup: "technical",
            questionCategory: "programming",
            difficultyLevel: "easy",
            tags: ["React", "JavaScript"],
            explanation:
              "Yes, React is indeed a JavaScript library for building UIs",
            assignedOrganizations: [quiz.organization.id],
          },
          {
            id: "q3",
            title: "Which of the following is NOT a valid HTTP method?",
            type: "multiple_choice",
            questionGroup: "technical",
            questionCategory: "programming",
            difficultyLevel: "hard",
            tags: ["HTTP", "Web Development"],
            explanation:
              "Common HTTP methods include GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS",
            assignedOrganizations: [quiz.organization.id],
          },
        ]);
        setIsLoading(false);
      }, 800);
    }
  }, [open, quiz]);

  // Handle question form submission
  const handleQuestionSubmit: SubmitHandler<QuestionFormInputs> = (data) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const questionData: QuestionType = {
        id: editingQuestion?.id || `q${Date.now()}`,
        title: data.title,
        type: data.type,
        questionGroup: data.questionGroup,
        questionCategory: data.questionCategory,
        difficultyLevel: data.difficultyLevel,
        tags: data.tags,
        explanation: data.explanation,
        assignedOrganizations: quiz ? [quiz.organization.id] : [],
      };

      if (editingQuestion) {
        // Update existing question
        setQuestions((prev) =>
          prev.map((q) => (q.id === editingQuestion.id ? questionData : q))
        );
      } else {
        // Add new question
        setQuestions((prev) => [...prev, questionData]);
      }

      setShowQuestionForm(false);
      setEditingQuestion(null);
      reset(defaultQuestionValues);
      setIsLoading(false);
    }, 500);
  };

  // Handle edit question
  const handleEditQuestion = (question: QuestionType) => {
    setEditingQuestion(question);
    reset({
      title: question.title,
      type: question.type,
      questionGroup: question.questionGroup,
      questionCategory: question.questionCategory,
      difficultyLevel: question.difficultyLevel,
      tags: question.tags,
      explanation: question.explanation,
    });
    setShowQuestionForm(true);
  };

  // Handle delete question
  const handleDeleteQuestion = (question: QuestionType) => {
    setQuestionToDelete(question);
    setDeleteConfirmOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (questionToDelete) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setQuestions((prev) =>
          prev.filter((q) => q.id !== questionToDelete.id)
        );
        setIsLoading(false);
      }, 300);
    }
    setDeleteConfirmOpen(false);
    setQuestionToDelete(null);
  };

  // Handle dialog close
  const handleClose = () => {
    setOpen(false);
    setShowQuestionForm(false);
    setEditingQuestion(null);
    setSearchQuery("");
    setSelectedTags([]);
    setSelectedDifficulty("");
    setSelectedType("");
    reset(defaultQuestionValues);
  };

  // Handle add new question
  const handleAddQuestion = () => {
    setEditingQuestion(null);
    reset(defaultQuestionValues);
    setShowQuestionForm(true);
  };

  // Get difficulty color
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "easy":
        return "success";
      case "medium":
        return "warning";
      case "hard":
        return "error";
      default:
        return "default";
    }
  };

  // Get type color
  const getTypeColor = (type: string) => {
    switch (type) {
      case "true_false":
        return "info";
      case "multiple_choice":
        return "primary";
      case "single_choice":
        return "secondary";
      default:
        return "default";
    }
  };

  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "true_false":
        return "tabler-check-x";
      case "multiple_choice":
        return "tabler-list-check";
      case "single_choice":
        return "tabler-circle-dot";
      default:
        return "tabler-help";
    }
  };

  // Filter questions based on search and filters
  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => question.tags.includes(tag));

    const matchesDifficulty =
      !selectedDifficulty || question.difficultyLevel === selectedDifficulty;

    const matchesType = !selectedType || question.type === selectedType;

    return matchesSearch && matchesTags && matchesDifficulty && matchesType;
  });

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSelectedDifficulty("");
    setSelectedType("");
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      >
        <DialogCloseButton onClick={handleClose} disableRipple>
          <i className="tabler-x" />
        </DialogCloseButton>

        <DialogTitle>
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="h5">Manage Questions</Typography>
              <Typography variant="body2" color="text.secondary">
                {quiz?.title} • {filteredQuestions.length} of {questions.length}{" "}
                questions
              </Typography>
            </div>
            <Button
              variant="tonal"
              startIcon={<i className="tabler-plus" />}
              onClick={handleAddQuestion}
              disabled={isLoading}
            >
              New Question
            </Button>
          </div>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          {showQuestionForm && (
            <form onSubmit={handleSubmit(handleQuestionSubmit)}>
              <Card className="border" sx={{ mb: 3 }}>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <Typography variant="h6">
                      {editingQuestion ? "Edit Question" : "Add New Question"}
                    </Typography>
                    <IconButton
                      onClick={() => {
                        setShowQuestionForm(false);
                        setEditingQuestion(null);
                        reset(defaultQuestionValues);
                      }}
                    >
                      <i className="tabler-x" />
                    </IconButton>
                  </div>

                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                          <CustomTextField
                            {...field}
                            fullWidth
                            multiline
                            rows={3}
                            label="Question Title"
                            placeholder="Write your question here..."
                            error={Boolean(errors.title)}
                            helperText={errors.title?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                          <CustomTextField
                            {...field}
                            select
                            fullWidth
                            label="Question Type"
                            error={Boolean(errors.type)}
                            helperText={errors.type?.message}
                          >
                            {questionTypes.map((type) => (
                              <MenuItem key={type.value} value={type.value}>
                                {type.label}
                              </MenuItem>
                            ))}
                          </CustomTextField>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="difficultyLevel"
                        control={control}
                        render={({ field }) => (
                          <CustomTextField
                            {...field}
                            select
                            fullWidth
                            label="Difficulty Level"
                            error={Boolean(errors.difficultyLevel)}
                            helperText={errors.difficultyLevel?.message}
                          >
                            {difficultyLevels.map((level) => (
                              <MenuItem key={level.value} value={level.value}>
                                {level.label}
                              </MenuItem>
                            ))}
                          </CustomTextField>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="questionGroup"
                        control={control}
                        render={({ field }) => (
                          <CustomTextField
                            {...field}
                            select
                            fullWidth
                            label="Question Group"
                            error={Boolean(errors.questionGroup)}
                            helperText={errors.questionGroup?.message}
                          >
                            {questionGroups.map((group) => (
                              <MenuItem key={group.value} value={group.value}>
                                {group.label}
                              </MenuItem>
                            ))}
                          </CustomTextField>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="questionCategory"
                        control={control}
                        render={({ field }) => (
                          <CustomTextField
                            {...field}
                            select
                            fullWidth
                            label="Question Category"
                            error={Boolean(errors.questionCategory)}
                            helperText={errors.questionCategory?.message}
                          >
                            {questionCategories.map((category) => (
                              <MenuItem
                                key={category.value}
                                value={category.value}
                              >
                                {category.label}
                              </MenuItem>
                            ))}
                          </CustomTextField>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Controller
                        name="tags"
                        control={control}
                        render={({ field }) => (
                          <CustomTextField
                            {...field}
                            select
                            fullWidth
                            label="Tags"
                            error={Boolean(errors.tags)}
                            helperText={errors.tags?.message}
                            placeholder="Select tags..."
                            SelectProps={{
                              multiple: true,
                              renderValue: (selected) => (
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                  }}
                                >
                                  {(selected as string[]).map((value) => (
                                    <Chip
                                      variant="tonal"
                                      key={value}
                                      label={value}
                                      size="small"
                                    />
                                  ))}
                                </Box>
                              ),
                            }}
                          >
                            {availableTags.map((tag) => (
                              <MenuItem key={tag} value={tag}>
                                <Checkbox
                                  checked={
                                    (field.value || []).indexOf(tag) > -1
                                  }
                                />
                                <ListItemText primary={tag} />
                              </MenuItem>
                            ))}
                          </CustomTextField>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Controller
                        name="explanation"
                        control={control}
                        render={({ field }) => (
                          <CustomTextField
                            {...field}
                            fullWidth
                            multiline
                            rows={3}
                            label="Answer Explanation"
                            placeholder="Explain the correct answer and provide context..."
                            error={Boolean(errors.explanation)}
                            helperText={errors.explanation?.message}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>

                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setShowQuestionForm(false);
                        setEditingQuestion(null);
                        reset(defaultQuestionValues);
                      }}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isLoading}
                    >
                      {isLoading
                        ? "Saving..."
                        : editingQuestion
                          ? "Update Question"
                          : "Add Question"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          )}

          {!showQuestionForm && (
            <div>
              {/* Search and Filter Controls */}
              <Card
                sx={{
                  mb: 3,
                  background:
                    "linear-gradient(135deg, rgba(var(--mui-palette-primary-mainChannel) / 0.02) 0%, rgba(var(--mui-palette-secondary-mainChannel) / 0.02) 100%)",
                  border: "1px solid var(--mui-palette-divider)",
                  boxShadow: "var(--mui-customShadows-xs)",
                }}
              >
                <CardContent sx={{ pb: 2 }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <i className="tabler-filter text-xl text-primary" />
                      <Typography variant="h6" className="font-semibold">
                        Filter Questions
                      </Typography>
                    </div>
                    {(searchQuery ||
                      selectedTags.length > 0 ||
                      selectedDifficulty ||
                      selectedType) && (
                      <Chip
                        label={`${filteredQuestions.length} results`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                  </div>

                  <Grid container spacing={2} alignItems="end">
                    <Grid item xs={12} md={5}>
                      <CustomTextField
                        fullWidth
                        placeholder="Search by title, explanation, or tags..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <Box
                              sx={{
                                mr: 1,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <i className="tabler-search text-xl opacity-60" />
                            </Box>
                          ),
                          endAdornment: searchQuery && (
                            <IconButton
                              size="small"
                              onClick={() => setSearchQuery("")}
                              sx={{ mr: -0.5 }}
                            >
                              <i className="tabler-x text-base opacity-60" />
                            </IconButton>
                          ),
                        }}
                        sx={{
                          "& .MuiInputBase-root": {
                            backgroundColor:
                              "var(--mui-palette-background-paper)",
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={6} sm={3} md={2}>
                      <CustomTextField
                        select
                        fullWidth
                        label="Type"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        placeholder="All Types"
                        InputProps={{
                          startAdornment: selectedType && (
                            <Box
                              sx={{
                                mr: 1,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <i
                                className={`${getTypeIcon(selectedType)} text-sm`}
                              />
                            </Box>
                          ),
                        }}
                      >
                        <MenuItem value="">
                          <div className="flex items-center gap-2">
                            <i className="tabler-list text-sm opacity-60" />
                            All Types
                          </div>
                        </MenuItem>
                        {questionTypes.map((type) => (
                          <MenuItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <i
                                className={`${getTypeIcon(type.value)} text-sm`}
                              />
                              {type.label}
                            </div>
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    </Grid>

                    <Grid item xs={6} sm={3} md={2}>
                      <CustomTextField
                        select
                        fullWidth
                        label="Difficulty"
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        placeholder="All Levels"
                      >
                        <MenuItem value="">
                          <div className="flex items-center gap-2">
                            <i className="tabler-adjustments text-sm opacity-60" />
                            All Levels
                          </div>
                        </MenuItem>
                        {difficultyLevels.map((level) => (
                          <MenuItem key={level.value} value={level.value}>
                            <div className="flex items-center gap-2">
                              <Box
                                sx={{
                                  width: 12,
                                  height: 12,
                                  borderRadius: "50%",
                                  backgroundColor:
                                    level.value === "easy"
                                      ? "var(--mui-palette-success-main)"
                                      : level.value === "medium"
                                        ? "var(--mui-palette-warning-main)"
                                        : "var(--mui-palette-error-main)",
                                }}
                              />
                              {level.label}
                            </div>
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    </Grid>

                    <Grid item xs={8} sm={4} md={2}>
                      <CustomTextField
                        select
                        fullWidth
                        label="Tags"
                        value={selectedTags}
                        onChange={(e) =>
                          setSelectedTags(e.target.value as unknown as string[])
                        }
                        placeholder="All Tags"
                        SelectProps={{
                          multiple: true,
                          renderValue: (selected) => {
                            const selectedArray = selected as string[];
                            if (selectedArray.length === 0) return "All Tags";
                            if (selectedArray.length === 1)
                              return selectedArray[0];
                            return `${selectedArray.length} tags selected`;
                          },
                        }}
                      >
                        {availableTags.map((tag) => (
                          <MenuItem key={tag} value={tag}>
                            <Checkbox
                              checked={selectedTags.indexOf(tag) > -1}
                              size="small"
                            />
                            <ListItemText primary={tag} />
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    </Grid>

                    {(searchQuery ||
                      selectedTags.length > 0 ||
                      selectedDifficulty ||
                      selectedType) && (
                      <Grid item xs={4} sm={2} md={1}>
                        <Button
                          variant="outlined"
                          onClick={clearFilters}
                          fullWidth
                          startIcon={<i className="tabler-refresh text-base" />}
                          sx={{
                            minWidth: "auto",
                            px: { xs: 1, sm: 2 },
                            "& .MuiButton-startIcon": {
                              marginRight: { xs: 0, sm: 1 },
                              marginLeft: 0,
                            },
                          }}
                        >
                          <span className="hidden sm:inline">Clear</span>
                        </Button>
                      </Grid>
                    )}
                  </Grid>

                  {/* Active Filters Display */}
                  {(searchQuery ||
                    selectedTags.length > 0 ||
                    selectedDifficulty ||
                    selectedType) && (
                    <Box
                      sx={{
                        mt: 2,
                        pt: 2,
                        borderTop: "1px solid var(--mui-palette-divider)",
                      }}
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        <Typography
                          variant="caption"
                          className="text-text-secondary font-medium"
                        >
                          Active filters:
                        </Typography>

                        {searchQuery && (
                          <Chip
                            variant="tonal"
                            label={`Search: "${searchQuery}"`}
                            size="small"
                            onDelete={() => setSearchQuery("")}
                            deleteIcon={<i className="tabler-x text-xs" />}
                            sx={{
                              backgroundColor:
                                "var(--mui-palette-primary-light)",
                              opacity: 0.8,
                            }}
                          />
                        )}

                        {selectedType && (
                          <Chip
                            variant="tonal"
                            label={`Type: ${questionTypes.find((t) => t.value === selectedType)?.label}`}
                            size="small"
                            onDelete={() => setSelectedType("")}
                            deleteIcon={<i className="tabler-x text-xs" />}
                            sx={{
                              backgroundColor: "var(--mui-palette-info-light)",
                              opacity: 0.8,
                            }}
                          />
                        )}

                        {selectedDifficulty && (
                          <Chip
                            variant="tonal"
                            label={`Difficulty: ${difficultyLevels.find((d) => d.value === selectedDifficulty)?.label}`}
                            size="small"
                            onDelete={() => setSelectedDifficulty("")}
                            deleteIcon={<i className="tabler-x text-xs" />}
                            sx={{
                              backgroundColor:
                                "var(--mui-palette-warning-light)",
                              opacity: 0.8,
                            }}
                          />
                        )}

                        {selectedTags.map((tag) => (
                          <Chip
                            variant="tonal"
                            key={tag}
                            label={tag}
                            size="small"
                            onDelete={() =>
                              setSelectedTags((prev) =>
                                prev.filter((t) => t !== tag)
                              )
                            }
                            deleteIcon={<i className="tabler-x text-xs" />}
                            sx={{
                              backgroundColor:
                                "var(--mui-palette-secondary-light)",
                              opacity: 0.8,
                            }}
                          />
                        ))}
                      </div>
                    </Box>
                  )}
                </CardContent>
              </Card>

              {/* Questions Display */}
              <div className="space-y-3">
                {filteredQuestions.length === 0 ? (
                  questions.length === 0 ? (
                    <Card>
                      <CardContent className="text-center py-8">
                        <i className="tabler-help text-6xl mb-4" />
                        <Typography variant="h6" className="mb-2">
                          No Questions Yet
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          className="mb-4"
                        >
                          Start building your quiz by adding questions
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<i className="tabler-plus" />}
                          onClick={handleAddQuestion}
                        >
                          Create First Question
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="text-center py-8">
                        <i className="tabler-search-off text-4xl mb-2" />
                        <Typography variant="h6" className="mb-1">
                          No questions match your filters
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          className="mb-3"
                        >
                          Try adjusting your search criteria
                        </Typography>
                        <Button
                          variant="outlined"
                          onClick={clearFilters}
                          size="small"
                        >
                          Clear Filters
                        </Button>
                      </CardContent>
                    </Card>
                  )
                ) : (
                  filteredQuestions.map((question, index) => (
                    <Card key={question.id}>
                      <CardContent>
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <Typography
                                variant="body2"
                                className="font-medium"
                              >
                                Q{index + 1}
                              </Typography>
                              <Chip
                                variant="tonal"
                                label={
                                  questionTypes.find(
                                    (t) => t.value === question.type
                                  )?.label
                                }
                                size="small"
                                color={getTypeColor(question.type) as any}
                              />
                              <Chip
                                variant="tonal"
                                label={question.difficultyLevel}
                                size="small"
                                color={
                                  getDifficultyColor(
                                    question.difficultyLevel
                                  ) as any
                                }
                              />
                            </div>

                            <Typography variant="body1" className="mb-2">
                              {question.title}
                            </Typography>

                            <div className="flex items-center gap-2 mb-2">
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {
                                  questionGroups.find(
                                    (g) => g.value === question.questionGroup
                                  )?.label
                                }{" "}
                                •
                                {
                                  questionCategories.find(
                                    (c) => c.value === question.questionCategory
                                  )?.label
                                }
                              </Typography>
                            </div>

                            {question.tags && question.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-2">
                                {question.tags.map((tag) => (
                                  <Chip
                                    key={tag}
                                    label={tag}
                                    size="small"
                                    variant="outlined"
                                  />
                                ))}
                              </div>
                            )}

                            <Typography variant="body2" color="text.secondary">
                              <strong>Explanation:</strong>{" "}
                              {question.explanation}
                            </Typography>
                          </div>

                          <div className="flex items-center gap-1 ml-2">
                            <IconButton
                              size="small"
                              onClick={() => handleEditQuestion(question)}
                              disabled={isLoading}
                            >
                              <i className="tabler-edit text-xl" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteQuestion(question)}
                              disabled={isLoading}
                            >
                              <i className="tabler-trash text-xl" />
                            </IconButton>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}
        </DialogContent>

        <DialogActions>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
            {filteredQuestions.length} of {questions.length} questions shown
          </Typography>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <WarningDialog
        type="Delete"
        title="Delete Question"
        message={`Are you sure you want to delete this question? This action cannot be undone.`}
        open={deleteConfirmOpen}
        onClose={() => {
          setDeleteConfirmOpen(false);
          setQuestionToDelete(null);
        }}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default QuestionManagerDialog;
