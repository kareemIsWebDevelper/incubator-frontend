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
} from "valibot";
import type { SubmitHandler } from "react-hook-form";
import { DocumentationType } from "@/types/DocumentationTypes";

// Component Imports
import CustomTextField from "@/@core/components/mui/TextField";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";
import TextEditor from "@/components/TextEditor";

// Define the form schema
const documentationSchema = object({
  title: pipe(
    string(),
    nonEmpty("Title is required"),
    minLength(3, "Title must be at least 3 characters"),
    maxLength(100, "Title must not exceed 100 characters")
  ),
  content: pipe(
    string(),
    nonEmpty("Content is required"),
    minLength(10, "Content must be at least 10 characters")
  ),
  showContentFor: pipe(
    string(),
    nonEmpty("Content visibility is required")
  ),
  arrange: pipe(
    string(),
    nonEmpty("Order is required")
  ),
});

// Create a type based on the schema
type DocumentationFormInputs = {
  title: string;
  content: string;
  showContentFor: string;
  arrange: string;
};

interface DocumentationFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (documentation: Partial<DocumentationType>) => void;
  documentation?: DocumentationType | null;
}

const DocumentationForm = ({ open, setOpen, onSubmit, documentation }: DocumentationFormProps) => {
  // Content visibility options
  const contentForOptions = [
    { value: "mentors", label: "Mentors" },
    { value: "judgers", label: "Judgers" },
    { value: "users", label: "Users" },
    { value: "managers", label: "Managers" },
    { value: "all", label: "All Users" },
  ];

  // Initialize form with valibot resolver
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DocumentationFormInputs>({
    defaultValues: {
      title: "",
      content: "",
      showContentFor: "",
      arrange: "",
    },
    resolver: valibotResolver(documentationSchema),
  });

  // Reset form when dialog opens or documentation data changes
  useEffect(() => {
    if (open) {
      if (documentation) {
        reset({
          title: documentation.title,
          content: documentation.content,
          showContentFor: documentation.showContentFor,
          arrange: documentation.arrange,
        });
      } else {
        reset({
          title: "",
          content: "",
          showContentFor: "",
          arrange: "",
        });
      }
    }
  }, [open, documentation, reset]);

  // Form submission handler
  const onFormSubmit: SubmitHandler<DocumentationFormInputs> = (data) => {
    const currentDate = new Date().toISOString();
    
    const newDocumentation: Partial<DocumentationType> = {
      ...data,
      updatedAt: currentDate,
      ...(documentation ? {} : { createdAt: currentDate }),
    };
    
    onSubmit(newDocumentation);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const dialogTitle = documentation ? "Edit Documentation" : "Create New Documentation";

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      aria-labelledby="documentation-dialog-title"
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      
      <DialogTitle id="documentation-dialog-title">{dialogTitle}</DialogTitle>
      
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
                    label="Title"
                    placeholder="Enter documentation title"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>

            {/* Content For */}
            <Grid item xs={12} md={6}>
              <Controller
                name="showContentFor"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Show Content For"
                    error={!!errors.showContentFor}
                    helperText={errors.showContentFor?.message}
                  >
                    {contentForOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            {/* Order */}
            <Grid item xs={12} md={6}>
              <Controller
                name="arrange"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type="number"
                    label="Display Order"
                    placeholder="Enter display order (1, 2, 3...)"
                    error={!!errors.arrange}
                    helperText={errors.arrange?.message}
                  />
                )}
              />
            </Grid>

            {/* Content */}
            <Grid item xs={12}>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content *
                    </label>
                    <TextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Enter documentation content..."
                    />
                    {errors.content && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.content.message}
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
            {documentation ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DocumentationForm;
