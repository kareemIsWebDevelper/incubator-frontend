"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  MenuItem,
  Chip,
  Typography,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
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
import type { SelectChangeEvent } from "@mui/material/Select";
import { QuestionType } from "@/types/questionTypes";

// Component Imports
import CustomTextField from "@/@core/components/mui/TextField";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";
import TextEditor from "@/components/TextEditor";

// Define the form schema
const questionSchema = object({
  title: pipe(
    string(),
    nonEmpty("Title is required"),
    minLength(5, "Title must be at least 5 characters"),
    maxLength(200, "Title must not exceed 200 characters")
  ),
  type: pipe(
    string(),
    nonEmpty("Question type is required")
  ),
  questionGroup: pipe(
    string(),
    nonEmpty("Question group is required")
  ),
  questionCategory: pipe(
    string(),
    nonEmpty("Question category is required")
  ),
  difficultyLevel: pipe(
    string(),
    nonEmpty("Difficulty level is required")
  ),
  tags: array(string()),
  explanation: pipe(
    string(),
    nonEmpty("Explanation is required"),
    minLength(10, "Explanation must be at least 10 characters")
  ),
  assignedOrganizations: array(string()),
});

// Create a type based on the schema
type QuestionFormInputs = {
  title: string;
  type: string;
  questionGroup: string;
  questionCategory: string;
  difficultyLevel: string;
  tags: string[];
  explanation: string;
  assignedOrganizations: string[];
};

interface QuestionFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (question: Partial<QuestionType>) => void;
  question?: QuestionType | null;
}

const QuestionForm = ({ open, setOpen, onSubmit, question }: QuestionFormProps) => {
  // Form options
  const questionTypes = [
    { value: "Multiple choice question", label: "Multiple Choice Question" },
    { value: "True/false question", label: "True/False Question" },
    { value: "Essay question", label: "Essay Question" },
    { value: "Short answer question", label: "Short Answer Question" },
  ];

  const questionGroups = [
    { value: "assessment", label: "Assessment" },
    { value: "quiz", label: "Quiz" },
    { value: "survey", label: "Survey" },
    { value: "interview", label: "Interview" },
  ];

  const questionCategories = [
    { value: "Business Planning", label: "Business Planning" },
    { value: "Startup Methodology", label: "Startup Methodology" },
    { value: "Financial Management", label: "Financial Management" },
    { value: "Marketing & Sales", label: "Marketing & Sales" },
    { value: "Product Development", label: "Product Development" },
    { value: "Legal & IP", label: "Legal & IP" },
    { value: "Market Research", label: "Market Research" },
    { value: "Entrepreneurship", label: "Entrepreneurship" },
    { value: "Program Evaluation", label: "Program Evaluation" },
    { value: "Funding & Investment", label: "Funding & Investment" },
    { value: "Business Growth", label: "Business Growth" },
    { value: "Performance Metrics", label: "Performance Metrics" },
    { value: "Product Strategy", label: "Product Strategy" },
    { value: "Development Methodology", label: "Development Methodology" },
  ];

  const difficultyLevels = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  const organizationOptions = [
    "Tech Incubator",
    "Business Academy", 
    "Innovation Hub",
    "Startup Accelerator",
    "Finance Institute",
    "Venture Capital Academy",
    "Entrepreneur Network",
    "Mentorship Program",
    "Research Institute",
    "Market Analysis Center",
    "Product Development Lab",
    "Innovation Center",
    "Quality Assurance",
    "Legal Advisory",
    "IP Protection Office",
    "Marketing Academy",
    "Sales Training Center",
    "Investment Network",
    "Funding Advisory",
    "Growth Advisory",
    "Scale-up Program",
    "Analytics Center",
    "Customer Success Team",
    "Product Strategy Lab",
    "Development Center",
  ];

  const tagOptions = [
    "business", "planning", "strategy", "fundamentals", "lean startup", 
    "methodology", "prototyping", "customer feedback", "finance", "metrics", 
    "startup", "early-stage", "motivation", "entrepreneurship", "personal", 
    "survey", "market research", "B2C", "B2B", "product development", 
    "customer interaction", "lifecycle", "validation", "satisfaction", 
    "mentorship", "program", "feedback", "intellectual property", "software", 
    "legal", "protection", "customer acquisition", "marketing", "sales", 
    "growth", "funding", "venture capital", "investment", "financing", 
    "scaling", "challenges", "business development", "KPI", "customer satisfaction", 
    "performance", "MVP", "product strategy", "features", "development"
  ];

  // Initialize form with valibot resolver
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuestionFormInputs>({
    defaultValues: {
      title: "",
      type: "",
      questionGroup: "",
      questionCategory: "",
      difficultyLevel: "",
      tags: [],
      explanation: "",
      assignedOrganizations: [],
    },
    resolver: valibotResolver(questionSchema),
  });

  const watchedTags = watch("tags");
  const watchedOrganizations = watch("assignedOrganizations");

  // Reset form when dialog opens or question data changes
  useEffect(() => {
    if (open) {
      if (question) {
        reset({
          title: question.title,
          type: question.type,
          questionGroup: question.questionGroup,
          questionCategory: question.questionCategory,
          difficultyLevel: question.difficultyLevel,
          tags: question.tags || [],
          explanation: question.explanation,
          assignedOrganizations: question.assignedOrganizations || [],
        });
      } else {
        reset({
          title: "",
          type: "",
          questionGroup: "",
          questionCategory: "",
          difficultyLevel: "",
          tags: [],
          explanation: "",
          assignedOrganizations: [],
        });
      }
    }
  }, [open, question, reset]);

  // Handle tags change
  const handleTagsChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setValue("tags", value);
  };

  // Handle organizations change
  const handleOrganizationsChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setValue("assignedOrganizations", value);
  };

  // Form submission handler
  const onFormSubmit: SubmitHandler<QuestionFormInputs> = (data) => {
    const currentDate = new Date().toISOString();
    
    const newQuestion: Partial<QuestionType> = {
      ...data,
      ...(question ? {} : { id: `q-${Date.now()}` }),
    };
    
    onSubmit(newQuestion);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const dialogTitle = question ? "Edit Question" : "Create New Question";

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      aria-labelledby="question-dialog-title"
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      
      <DialogTitle id="question-dialog-title">{dialogTitle}</DialogTitle>
      
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent sx={{ overflowY: "auto", flex: "1 1 auto", pb: 2 }}>
          <Grid container spacing={5}>
            {/* Title */}
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Question Title"
                    placeholder="Enter question title"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>

            {/* Question Type */}
            <Grid item xs={12} md={6}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Question Type"
                    error={!!errors.type}
                    helperText={errors.type?.message}
                  >
                    {questionTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            {/* Question Group */}
            <Grid item xs={12} md={6}>
              <Controller
                name="questionGroup"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Question Group"
                    error={!!errors.questionGroup}
                    helperText={errors.questionGroup?.message}
                  >
                    {questionGroups.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            {/* Question Category */}
            <Grid item xs={12} md={6}>
              <Controller
                name="questionCategory"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Question Category"
                    error={!!errors.questionCategory}
                    helperText={errors.questionCategory?.message}
                  >
                    {questionCategories.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            {/* Difficulty Level */}
            <Grid item xs={12} md={6}>
              <Controller
                name="difficultyLevel"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Difficulty Level"
                    error={!!errors.difficultyLevel}
                    helperText={errors.difficultyLevel?.message}
                  >
                    {difficultyLevels.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            {/* Tags */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Tags</InputLabel>
                <Select
                  multiple
                  value={watchedTags}
                  onChange={handleTagsChange}
                  input={<OutlinedInput label="Tags" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {tagOptions.map((tag) => (
                    <MenuItem key={tag} value={tag}>
                      {tag}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Assigned Organizations */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Assigned Organizations</InputLabel>
                <Select
                  multiple
                  value={watchedOrganizations}
                  onChange={handleOrganizationsChange}
                  input={<OutlinedInput label="Assigned Organizations" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" color="primary" />
                      ))}
                    </Box>
                  )}
                >
                  {organizationOptions.map((org) => (
                    <MenuItem key={org} value={org}>
                      {org}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Explanation */}
            <Grid item xs={12}>
              <Controller
                name="explanation"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Explanation *
                    </label>
                    <TextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Enter question explanation..."
                    />
                    {errors.explanation && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.explanation.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions className="mt-8">
          <Button variant="text" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {question ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default QuestionForm;
