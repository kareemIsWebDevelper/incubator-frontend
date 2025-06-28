"use client";

import React from "react";
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
  Divider,
  Box,
} from "@mui/material";
import { QuestionCategoryType } from "@/types/questionCategoryTypes";

interface CategoryDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  category: QuestionCategoryType | null;
}

const CategoryDetailsDialog: React.FC<CategoryDetailsDialogProps> = ({
  open,
  onClose,
  category,
}) => {
  if (!category) return null;

  // Helper function to get category chip color
  const getCategoryColor = (categoryType: string) => {
    switch (categoryType) {
      case "Business":
        return "primary";
      case "Technology":
        return "info";
      case "Finance":
        return "success";
      case "Marketing":
        return "warning";
      case "Management":
        return "secondary";
      case "Legal":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="flex items-center justify-between">
        Category Details
        <IconButton onClick={onClose} size="small">
          <i className="tabler-x" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box className="mb-4">
              <Typography variant="h5" className="mb-2">
                {category.name}
              </Typography>
              <Chip
                variant="tonal"
                label={category.category}
                size="medium"
                color={getCategoryColor(category.category) as any}
              />
            </Box>
            <Divider />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary" className="mb-1">
              Number of Questions
            </Typography>
            <Typography variant="h6" color="primary">
              {category.numberOfQuestions}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary" className="mb-1">
              Category ID
            </Typography>
            <Typography variant="body1">
              {category.id}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary" className="mb-1">
              Created Date
            </Typography>
            <Typography variant="body1">
              {new Date(category.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary" className="mb-1">
              Last Updated
            </Typography>
            <Typography variant="body1">
              {new Date(category.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          </Grid>
          
          {category.description && (
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary" className="mb-1">
                Description
              </Typography>
              <Typography variant="body1" className="bg-gray-50 p-3 rounded">
                {category.description}
              </Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryDetailsDialog;
