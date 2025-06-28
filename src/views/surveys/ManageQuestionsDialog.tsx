"use client";

import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Checkbox,
  Box,
  Divider,
  Card,
  CardContent,
  FormControlLabel,
  Tabs,
  Tab,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Component Imports
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";
import WarningDialog from "@/components/dialogs/WarningDialog";

// Types
import { SurveyType, QuestionType } from "@/types/surveyTypes";

// Mock data
import { sampleQuestions } from "@/fake-db/pages/surveys";

// Styled Components
// const StyledDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialog-paper": {
//     minWidth: "90vw",
//     minHeight: "80vh",
//     maxWidth: "95vw",
//     maxHeight: "95vh",
//   },
// }));

interface ManageQuestionsDialogProps {
  open: boolean;
  onClose: () => void;
  survey: SurveyType | null;
  onSave: (questions: QuestionType[]) => void;
  onEditQuestion: (question: QuestionType) => void;
  onDeleteQuestion: (question: QuestionType) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ManageQuestionsDialog = ({
  open,
  onClose,
  survey,
  onSave,
  onEditQuestion,
  onDeleteQuestion,
}: ManageQuestionsDialogProps) => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [surveyQuestions, setSurveyQuestions] = useState<QuestionType[]>(
    survey?.questions || []
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<QuestionType | null>(null);

  // Update survey questions when survey changes
  React.useEffect(() => {
    if (survey && survey.questions) {
      console.log('ManageQuestionsDialog: Survey questions updated', survey.questions);
      setSurveyQuestions(prevQuestions => {
        console.log('ManageQuestionsDialog: Previous questions', prevQuestions);
        // Get IDs of questions that exist in the parent survey
        const parentQuestionIds = survey.questions.map(q => q.id);
        
        // Keep locally added questions (questions not in parent survey)
        const locallyAddedQuestions = prevQuestions.filter(q => !parentQuestionIds.includes(q.id));
        console.log('ManageQuestionsDialog: Locally added questions', locallyAddedQuestions);
        
        // Merge parent questions with locally added ones
        const mergedQuestions = [...survey.questions, ...locallyAddedQuestions];
        console.log('ManageQuestionsDialog: Merged questions', mergedQuestions);
        return mergedQuestions;
      });
    }
  }, [survey?.questions]); // Watch specifically for changes in the questions array

  // Reset state when dialog opens/closes
  React.useEffect(() => {
    if (open) {
      setSelectedQuestions([]);
      setTabValue(0);
    } else {
      // Also reset when closing to ensure clean state for next open
      setSelectedQuestions([]);
    }
  }, [open]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleQuestionToggle = (questionId: string) => {
    setSelectedQuestions((prev) => {
      const newSelection = prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId];
      return newSelection;
    });
  };

  const handleAddSelectedQuestions = () => {
    const questionsToAdd = sampleQuestions.filter((q: QuestionType) =>
      selectedQuestions.includes(q.id)
    );
    
    const updatedQuestions = [...surveyQuestions];
    questionsToAdd.forEach((question: QuestionType) => {
      if (!updatedQuestions.find((q) => q.id === question.id)) {
        updatedQuestions.push(question);
      }
    });
    
    setSurveyQuestions(updatedQuestions);
    setSelectedQuestions([]);
  };

  const handleRemoveQuestion = (questionId: string) => {
    setSurveyQuestions((prev) => prev.filter((q) => q.id !== questionId));
  };

  const handleDeleteClick = (question: QuestionType) => {
    setQuestionToDelete(question);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (questionToDelete) {
      handleRemoveQuestion(questionToDelete.id);
      onDeleteQuestion(questionToDelete);
      setDeleteDialogOpen(false);
      setQuestionToDelete(null);
    }
  };

  const handleSave = () => {
    onSave(surveyQuestions);
    onClose();
  };

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case "star-rating":
        return "tabler-star";
      case "yes-no":
        return "tabler-check-x";
      case "question-answer":
        return "tabler-message-question";
      default:
        return "tabler-help";
    }
  };

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case "star-rating":
        return "warning";
      case "yes-no":
        return "success";
      case "question-answer":
        return "info";
      default:
        return "default";
    }
  };

  // Filter available questions (not already in survey)
  const availableQuestions = useMemo(() => {
    return sampleQuestions.filter(
      (q: QuestionType) => !surveyQuestions.find((sq) => sq.id === q.id)
    );
  }, [surveyQuestions]);

  if (!survey) return null;

  return (
    <>
      <Dialog
        maxWidth="md"
        // maxWidth="lg"
        fullWidth
        open={open}
        onClose={onClose}
        sx={{ 
          "& .MuiDialog-paper": { 
            overflow: "visible",
            minHeight: "70vh",
            maxHeight: "90vh"
          } 
        }}
        aria-labelledby="manage-questions-dialog-title"
      >
        <DialogCloseButton onClick={onClose} disableRipple>
          <i className="tabler-x" />
        </DialogCloseButton>

        <DialogTitle id="manage-questions-dialog-title">
          Manage Questions - {survey.title}
        </DialogTitle>

        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab
                label={`Survey Questions (${surveyQuestions.length})`}
                icon={<i className="tabler-list" />}
                iconPosition="start"
              />
              <Tab
                label={`Available Questions (${availableQuestions.length})`}
                icon={<i className="tabler-plus" />}
                iconPosition="start"
                sx={{
                  ...(selectedQuestions.length > 0 && {
                    color: "primary.main",
                    fontWeight: "bold",
                  }),
                }}
              />
            </Tabs>
          </Box>

          {/* Current Survey Questions Tab */}
          <TabPanel value={tabValue} index={0}>
            {surveyQuestions.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  px: 4,
                }}
              >
                <i className="tabler-inbox text-6xl text-gray-400 mb-4" />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No Questions Added
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add questions from the available questions tab to get started.
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {surveyQuestions.map((question, index) => (
                  <Grid item xs={12} key={question.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                          <Typography variant="h6" gutterBottom>
                            Question {index + 1}
                          </Typography>
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <Tooltip title="Edit Question">
                              <IconButton
                                size="small"
                                onClick={() => onEditQuestion(question)}
                              >
                                <i className="tabler-edit" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Question">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDeleteClick(question)}
                              >
                                <i className="tabler-trash" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                        
                        <Typography variant="body1" gutterBottom>
                          {question.text}
                        </Typography>
                        
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                          <Chip
                            icon={<i className={getQuestionTypeIcon(question.type)} />}
                            label={question.type.replace("-", " ").toUpperCase()}
                            size="small"
                            color={getQuestionTypeColor(question.type) as any}
                            variant="outlined"
                          />
                          {question.required && (
                            <Chip
                              label="Required"
                              size="small"
                              color="error"
                              variant="outlined"
                            />
                          )}
                          {question.type === "star-rating" && (
                            <Chip
                              label={`Max: ${question.maxRating} stars`}
                              size="small"
                              variant="outlined"
                            />
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </TabPanel>

          {/* Available Questions Tab */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Select questions to add to your survey
                {selectedQuestions.length > 0 && (
                  <Chip
                    label={`${selectedQuestions.length} selected`}
                    size="small"
                    color="primary"
                    variant="filled"
                    sx={{ ml: 2 }}
                  />
                )}
              </Typography>
              {selectedQuestions.length > 0 && (
                <Button
                  variant="contained"
                  startIcon={<i className="tabler-plus" />}
                  onClick={handleAddSelectedQuestions}
                >
                  Add Selected ({selectedQuestions.length})
                </Button>
              )}
            </Box>

            {availableQuestions.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  px: 4,
                }}
              >
                <i className="tabler-check text-6xl text-green-400 mb-4" />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  All Questions Added
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  You have added all available questions to your survey.
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {availableQuestions.map((question: QuestionType) => (
                  <Grid item xs={12} key={question.id}>
                    <Card
                      variant="outlined"
                      sx={{
                        cursor: "pointer",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          boxShadow: 3,
                          transform: "translateY(-1px)",
                        },
                        ...(selectedQuestions.includes(question.id) && {
                          borderColor: "primary.main",
                          backgroundColor: "primary.50",
                          borderWidth: 2,
                        }),
                      }}
                      onClick={() => handleQuestionToggle(question.id)}
                    >
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedQuestions.includes(question.id)}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  handleQuestionToggle(question.id);
                                }}
                                color="primary"
                                size="medium"
                              />
                            }
                            label=""
                            sx={{ margin: 0 }}
                            onClick={(e) => e.stopPropagation()}
                          />
                          
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body1" gutterBottom>
                              {question.text}
                            </Typography>
                            
                            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                              <Chip
                                icon={<i className={getQuestionTypeIcon(question.type)} />}
                                label={question.type.replace("-", " ").toUpperCase()}
                                size="small"
                                color={getQuestionTypeColor(question.type) as any}
                                variant="outlined"
                              />
                              {question.required && (
                                <Chip
                                  label="Required"
                                  size="small"
                                  color="error"
                                  variant="outlined"
                                />
                              )}
                              {question.type === "star-rating" && (
                                <Chip
                                  label={`Max: ${question.maxRating} stars`}
                                  size="small"
                                  variant="outlined"
                                />
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </TabPanel>
        </DialogContent>

        <Divider />

        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save Questions ({surveyQuestions.length})
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <WarningDialog
        type="Delete"
        title="Delete Question"
        message={`Are you sure you want to delete this question? This action cannot be undone.`}
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default ManageQuestionsDialog;
