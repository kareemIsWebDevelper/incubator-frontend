"use client";

import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  CardActionArea,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Button,
} from "@mui/material";
import { Assessment, AssessmentItem } from "@/types/assessmentTypes";

const Questionnaire = ({ assessmentData }: { assessmentData: Assessment }) => {
  const [selectedCategory, setSelectedCategory] = useState(assessmentData[0]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    assessmentData[0].subCategories[0]
  );
  interface Answers {
    [key: string]: string;
  }

  const [answers, setAnswers] = useState<Answers>({});

  const handleCategoryChange = (category: AssessmentItem): void => {
    setSelectedCategory(category);
    setSelectedSubCategory(category.subCategories[0]);
  };

  const handleAnswerChange = (qIndex: number, answer: string): void => {
    setAnswers((prev: Answers) => ({
      ...prev,
      [`${selectedCategory.category}-${selectedSubCategory.name}-${qIndex}`]:
        answer,
    }));
  };

  const handlePrevSubCategory = () => {
    const currentIndex = selectedCategory.subCategories.findIndex(
      (sub) => sub.name === selectedSubCategory.name
    );
    
    if (currentIndex > 0) {
      // Move to previous subcategory in same category
      setSelectedSubCategory(selectedCategory.subCategories[currentIndex - 1]);
    } else {
      // Move to previous category's last subcategory
      const categoryIndex = assessmentData.findIndex(
        (cat) => cat.category === selectedCategory.category
      );
      
      if (categoryIndex > 0) {
        const prevCategory = assessmentData[categoryIndex - 1];
        setSelectedCategory(prevCategory);
        setSelectedSubCategory(
          prevCategory.subCategories[prevCategory.subCategories.length - 1]
        );
      }
    }
  };

  const handleNextSubCategory = () => {
    const currentIndex = selectedCategory.subCategories.findIndex(
      (sub) => sub.name === selectedSubCategory.name
    );
    
    if (currentIndex < selectedCategory.subCategories.length - 1) {
      // Move to next subcategory in same category
      setSelectedSubCategory(selectedCategory.subCategories[currentIndex + 1]);
    } else {
      // Move to next category's first subcategory
      const categoryIndex = assessmentData.findIndex(
        (cat) => cat.category === selectedCategory.category
      );
      
      if (categoryIndex < assessmentData.length - 1) {
        const nextCategory = assessmentData[categoryIndex + 1];
        setSelectedCategory(nextCategory);
        setSelectedSubCategory(nextCategory.subCategories[0]);
      }
    }
  };

  // Check if we're at the first subcategory of the first category
  const isFirstSubCategory = () => {
    const categoryIndex = assessmentData.findIndex(
      (cat) => cat.category === selectedCategory.category
    );
    const subCategoryIndex = selectedCategory.subCategories.findIndex(
      (sub) => sub.name === selectedSubCategory.name
    );
    
    return categoryIndex === 0 && subCategoryIndex === 0;
  };

  // Check if we're at the last subcategory of the last category
  const isLastSubCategory = () => {
    const categoryIndex = assessmentData.findIndex(
      (cat) => cat.category === selectedCategory.category
    );
    const subCategoryIndex = selectedCategory.subCategories.findIndex(
      (sub) => sub.name === selectedSubCategory.name
    );
    
    return (
      categoryIndex === assessmentData.length - 1 &&
      subCategoryIndex === selectedCategory.subCategories.length - 1
    );
  };

  return (
    <Box p={2}>
      <Grid container spacing={6}>
        {/* Sidebar - Subcategories */}
        <Grid item xs={12} md={3}>
          {selectedCategory.subCategories.map((sub, idx) => (
            <CardActionArea
              key={idx}
              onClick={() => setSelectedSubCategory(sub)}
              className="mb-3"
            >
              <Card 
                sx={{
                  borderLeft: sub.name === selectedSubCategory.name ? '3px solid' : 'none',
                  borderColor: 'primary.main',
                  boxShadow: sub.name === selectedSubCategory.name ? '0 0 10px rgba(0,0,0,0.2)' : 'inherit',
                }}
              >
                <CardContent className="flex items-center justify-between">
                  <Box>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      color={sub.name === selectedSubCategory.name ? "primary" : "textPrimary"}
                      fontWeight={sub.name === selectedSubCategory.name ? "bold" : "normal"}
                    >
                      {sub.name}
                    </Typography>
                    <Typography variant="subtitle2">
                      Answered {sub.totalAnsweredQuestions} of{" "}
                      {sub.totalQuestions}
                    </Typography>
                  </Box>
                  <Box position="relative" display="inline-flex">
                    <CircularProgress
                      variant="determinate"
                      value={100}
                      size={50}
                      thickness={5}
                      sx={{ color: "lightgray" }}
                    />
                    <CircularProgress
                      variant="determinate"
                      color={sub.totalAnsweredQuestions === sub.totalQuestions ? "success" : "primary"}
                      value={
                        (sub.totalAnsweredQuestions / sub.totalQuestions) * 100
                      }
                      size={50}
                      thickness={5}
                      sx={{ position: "absolute", left: 0 }}
                    />
                    <Box
                      className="absolute inset-0 flex items-center justify-center"
                    > 
                      <Typography
                      variant="h6"
                      color="dark" className="text-xs"
                      >
                      {`${Math.round(
                        (sub.totalAnsweredQuestions / sub.totalQuestions) *
                        100
                      )}%`}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </CardActionArea>
          ))}
        </Grid>

        {/* Main content */}
        <Grid item xs={12} md={9}>
          {/* Category Cards */}
          <Box className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {assessmentData.map((cat, idx) => (
              <CardActionArea key={idx} onClick={() => handleCategoryChange(cat)}>
                <Card
                  sx={{
                    minWidth: '140px',
                    borderBottom: cat.category === selectedCategory.category ? '3px solid' : 'none',
                    borderColor: cat.category === selectedCategory.category ? 'primary.main' : 'background.paper',
                  }}
                >
                  <CardContent className="text-center">
                    <Typography
                      variant="h6"
                      className="text-nowrap"
                    >
                      {cat.category}
                    </Typography>
                    {cat.totalAnsweredQuestions === cat.totalQuestions ? (
                      <Typography
                        fontWeight="bold"
                        variant="h6"
                        className="text-success"
                      >
                        Done All
                      </Typography>
                    ) : (
                      <Typography 
                        variant="subtitle2" 
                        
                      >
                        Answered {cat.totalAnsweredQuestions} of{" "}
                        {cat.totalQuestions}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </CardActionArea>
            ))}
          </Box>

          {/* Questions */}
          {selectedSubCategory.questions.map((q, index) => (
            <Card key={index} className="mb-3">
              <CardContent>
                <div className="flex items-center mb-2 gap-2 border-b pb-2">
                  <Chip
                    color="primary"
                    size="small"
                    label={index + 1}
                    className="rounded-full"
                  />
                  <Typography variant="subtitle1">{q.question}</Typography>
                </div>

                <RadioGroup
                  value={
                    answers[
                      `${selectedCategory.category}-${selectedSubCategory.name}-${index}`
                    ] || ""
                  }
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                >
                  {q.options.map((opt, optIdx) => (
                    <FormControlLabel
                      key={optIdx}
                      value={opt}
                      control={<Radio />}
                      label={opt}
                    />
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}

          {/* Navigation Buttons */}
          <Box className="flex justify-between mt-6">
            <Button 
              variant="contained" 
              color="primary"
              onClick={handlePrevSubCategory}
              disabled={isFirstSubCategory()}
            >
              <i className="tabler tabler-arrow-left text-xl mie-1" />
              Previous
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleNextSubCategory}
              disabled={isLastSubCategory()}
            >
              Next
              <i className="tabler tabler-arrow-right text-xl mis-1" />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Questionnaire;
