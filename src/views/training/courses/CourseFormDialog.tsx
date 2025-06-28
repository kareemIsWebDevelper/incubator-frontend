"use client";

import React, { useEffect, useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Chip,
  Box,
  Grid,
  Typography,
  Divider,
  SelectChangeEvent,
  IconButton,
  Card,
  CardMedia
} from '@mui/material';
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
  optional,
  literal,
  union,
  number
} from "valibot";
import type { SubmitHandler } from "react-hook-form";

import CustomTextField from "@/@core/components/mui/TextField";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";
import FileUploader from "@/components/FileUploader";
import { CourseType } from '@/types/CourseTypes';

interface CourseFormDialogProps {
  open: boolean;
  onClose: () => void;
  course?: CourseType | null;
  onSubmit: (course: Omit<CourseType, 'id'>) => void;
}

// Define the validation schema
const courseSchema = object({
  title: pipe(
    string(),
    nonEmpty("Title is required"),
    minLength(3, "Title must be at least 3 characters"),
    maxLength(100, "Title must not exceed 100 characters")
  ),
  description: pipe(
    string(),
    nonEmpty("Description is required"),
    minLength(10, "Description must be at least 10 characters"),
    maxLength(500, "Description must not exceed 500 characters")
  ),
  courseCode: pipe(
    string(), 
    nonEmpty("Course code is required")
  ),
  tags: pipe(
    array(string()),
    minLength(1, "At least one tag is required")
  ),
  categories: pipe(
    array(string()),
    minLength(1, "At least one category is required")
  ),
  level: union([
    literal("Beginner"),
    literal("Intermediate"),
    literal("Advanced"),
  ]),
  visibilityStatus: union([
    literal("Public"),
    literal("Private"),
    literal("Draft"),
  ]),
  image: pipe(string(), nonEmpty("Image URL is required")),
  relatedQuizzes: number(),
  enrolledStudents: optional(number()),
  duration: optional(string()),
});

const defaultCourse: Omit<CourseType, 'id'> = {
  image: '/images/cards/course-default.jpg',
  title: '',
  description: '',
  tags: [],
  categories: [],
  level: 'Beginner',
  relatedQuizzes: 0,
  visibilityStatus: 'Draft',
  courseCode: '',
  enrolledStudents: 0,
  duration: ''
};

const CourseFormDialog: React.FC<CourseFormDialogProps> = ({
  open,
  onClose,
  course,
  onSubmit
}) => {
  const [tagInput, setTagInput] = useState<string>('');
  const [categoryInput, setCategoryInput] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('/images/cards/course-default.jpg');
  const [availableTags, setAvailableTags] = useState<string[]>([
    'React', 'Frontend', 'Backend', 'JavaScript', 'TypeScript', 'Node.js', 
    'Express', 'NextJS', 'UI/UX', 'Design', 'Testing', 'DevOps', 'Cloud',
    'API', 'Database', 'SQL', 'NoSQL', 'Mobile', 'Web', 'Security'
  ]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([
    'Web Development', 'Mobile Development', 'Data Science', 'UI/UX Design', 
    'Cloud Computing', 'DevOps', 'Cyber Security', 'Machine Learning',
    'Blockchain', 'Artificial Intelligence', 'IoT', 'Game Development'
  ]);
  
  // Predefined course images
  const courseImages = [
    '/images/cards/course-default.jpg',
    '/images/cards/course-react.jpg',
    '/images/cards/course-node-backend.jpg',
    '/images/cards/course-next-fullstack.jpg',
    '/images/cards/course-typescript.jpg',
    '/images/cards/course-data-structures.jpg',
    '/images/cards/course-devops.jpg',
    '/images/cards/course-testing.jpg',
    '/images/cards/course-graphql.jpg',
    '/images/cards/course-mobile-react-native.jpg'
  ];

  // Use react-hook-form with valibot resolver
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: valibotResolver(courseSchema),
    defaultValues: defaultCourse
  });
  
  // Reset form when dialog opens/closes or course changes
  useEffect(() => {
    if (open) {
      if (course) {
        // Reset form with course data
        reset({ ...course });
        setImagePreview(course.image);
      } else {
        // Generate a unique course code for new courses
        const newCourseCode = `COURSE-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}-${new Date().getFullYear()}`;
        reset({ ...defaultCourse, courseCode: newCourseCode });
        setImagePreview('/images/cards/course-default.jpg');
      }
    }
  }, [open, course, reset]);
  
  // Handle file upload
  const handleImageUpload = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setValue('image', result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle predefined image selection
  const handleImageSelect = (imagePath: string) => {
    setImagePreview(imagePath);
    setValue('image', imagePath);
  };

  const addTag = () => {
    if (tagInput.trim()) {
      const currentTags = watch('tags');
      if (!currentTags.includes(tagInput.trim())) {
        setValue('tags', [...currentTags, tagInput.trim()]);
        // Add to available tags if it's a new tag
        if (!availableTags.includes(tagInput.trim())) {
          setAvailableTags(prev => [...prev, tagInput.trim()]);
        }
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = watch('tags');
    setValue('tags', currentTags.filter(tag => tag !== tagToRemove));
  };

  const handleTagsChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setValue('tags', value);
  };

  const addCategory = () => {
    if (categoryInput.trim()) {
      const currentCategories = watch('categories');
      if (!currentCategories.includes(categoryInput.trim())) {
        setValue('categories', [...currentCategories, categoryInput.trim()]);
        // Add to available categories if it's a new category
        if (!availableCategories.includes(categoryInput.trim())) {
          setAvailableCategories(prev => [...prev, categoryInput.trim()]);
        }
        setCategoryInput('');
      }
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    const currentCategories = watch('categories');
    setValue('categories', currentCategories.filter(category => category !== categoryToRemove));
  };

  const handleCategoriesChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setValue('categories', value);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const onFormSubmit: SubmitHandler<Omit<CourseType, 'id'>> = (data) => {
    onSubmit(data);
    handleClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
      aria-labelledby="course-form-dialog-title"
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      PaperProps={{
        sx: {
          maxHeight: "96vh",
          padding: 2,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>

      <DialogTitle id="course-form-dialog-title">
        {course ? 'Edit Course' : 'Add New Course'}
      </DialogTitle>
      
      <form onSubmit={handleSubmit(onFormSubmit)} 
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <DialogContent sx={{ overflowY: "auto", flex: "1 1 auto", pb: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" className="font-medium mb-2">
                Basic Information
              </Typography>
              <Divider className="mb-3" />
            </Grid>
            
            {/* Title */}
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Course Title"
                    placeholder="Enter course title"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Description"
                    placeholder="Enter course description"
                    multiline
                    rows={4}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            {/* Level and Duration row */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="level"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Level"
                    error={!!errors.level}
                    helperText={errors.level?.message}
                  >
                    <MenuItem value="Beginner">Beginner</MenuItem>
                    <MenuItem value="Intermediate">Intermediate</MenuItem>
                    <MenuItem value="Advanced">Advanced</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Duration (e.g., 8 weeks)"
                    placeholder="Enter course duration"
                    error={!!errors.duration}
                    helperText={errors.duration?.message}
                  />
                )}
              />
            </Grid>

            {/* Course Code and Visibility Status */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="courseCode"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Course Code"
                    placeholder="Enter course code"
                    error={!!errors.courseCode}
                    helperText={errors.courseCode?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="visibilityStatus"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Visibility Status"
                    error={!!errors.visibilityStatus}
                    helperText={errors.visibilityStatus?.message}
                  >
                    <MenuItem value="Public">Public</MenuItem>
                    <MenuItem value="Private">Private</MenuItem>
                    <MenuItem value="Draft">Draft</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="relatedQuizzes"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type="number"
                    label="Related Quizzes"
                    placeholder="Enter number of quizzes"
                    error={!!errors.relatedQuizzes}
                    helperText={errors.relatedQuizzes?.message}
                    InputProps={{
                      inputProps: { min: 0 }
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="enrolledStudents"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type="number"
                    label="Enrolled Students"
                    placeholder="Enter number of students"
                    error={!!errors.enrolledStudents}
                    helperText={errors.enrolledStudents?.message}
                    InputProps={{
                      inputProps: { min: 0 }
                    }}
                  />
                )}
              />
            </Grid>

            {/* Image URL */}
            {/* <Grid item xs={12}>
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Image URL"
                    placeholder="/images/cards/course-image.jpg"
                    error={!!errors.image}
                    helperText={errors.image?.message || "Path to the course image"}
                  />
                )}
              />
            </Grid> */}

            <Grid item xs={12}>
              <Typography variant="subtitle1" className="font-medium mb-2 mt-2">
                Categories and Tags
              </Typography>
              <Divider className="mb-3" />
            </Grid>

            {/* Categories - Multiple Select */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" className="mb-2">Categories</Typography>
              <Controller
                name="categories"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label="Select Categories"
                    value={field.value || []}
                    SelectProps={{
                      multiple: true,
                      onChange: (e) => {
                        const selectedValues = e.target.value as string[];
                        field.onChange(selectedValues);
                      },
                      renderValue: (selected) => (
                        <div className="flex flex-wrap gap-2">
                          {(selected as string[]).map((value) => (
                            <Chip
                              key={value}
                              clickable
                              onMouseDown={(event) => event.stopPropagation()}
                              size="small"
                              label={value}
                              onDelete={() => removeCategory(value)}
                            />
                          ))}
                        </div>
                      ),
                    }}
                    error={!!errors.categories}
                    helperText={errors.categories?.message}
                  >
                    {availableCategories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
              
              {/* Add new category */}
              {/* <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <CustomTextField
                  fullWidth
                  label="Add Custom Category"
                  value={categoryInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategoryInput(e.target.value)}
                  onKeyPress={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCategory();
                    }
                  }}
                />
                <Button variant="outlined" onClick={addCategory}>
                  Add
                </Button>
              </Box> */}
            </Grid>

            {/* Tags - Multiple Select */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" className="mb-2">Tags</Typography>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label="Select Tags"
                    value={field.value || []}
                    SelectProps={{
                      multiple: true,
                      onChange: (e) => {
                        const selectedValues = e.target.value as string[];
                        field.onChange(selectedValues);
                      },
                      renderValue: (selected) => (
                        <div className="flex flex-wrap gap-2">
                          {(selected as string[]).map((value) => (
                            <Chip
                              key={value}
                              clickable
                              onMouseDown={(event) => event.stopPropagation()}
                              size="small"
                              label={value}
                              onDelete={() => removeTag(value)}
                            />
                          ))}
                        </div>
                      ),
                    }}
                    error={!!errors.tags}
                    helperText={errors.tags?.message}
                  >
                    {availableTags.map((tag) => (
                      <MenuItem key={tag} value={tag}>
                        {tag}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
              
              {/* Add new tag */}
              <Box className="flex items-center gap-2 mt-2">
                <CustomTextField
                  fullWidth
                  label="Add Custom Tag"
                  value={tagInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTagInput(e.target.value)}
                  onKeyPress={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <IconButton onClick={addTag} color='primary' className="w-10 h-10 mt-4">
                  <i className="tabler-plus" />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions className="mt-6">
          <Button onClick={handleClose} variant="text" color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {course ? 'Update Course' : 'Create Course'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CourseFormDialog;
