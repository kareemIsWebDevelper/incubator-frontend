"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Grid,
  Slider,
  Typography,
  Box,
} from "@mui/material";
import CustomTextField from "@/@core/components/mui/TextField";
import { useForm, Controller } from "react-hook-form";
import { WeightType } from "@/types/weightTypes";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";

// Predefined options for the form
const stageNames = [
  "Pre-Seed",
  "Seed", 
  "Series A",
  "Series B",
  "Series C",
  "Growth",
];

const categories = [
  "Business Model",
  "Financial", 
  "Technology",
  "Team & Management",
  "Market & Competition",
  "Legal & Compliance",
];

const subcategories = [
  "Value Proposition",
  "Market Analysis",
  "Revenue Model",
  "Funding Requirements",
  "Product Development",
  "Leadership",
  "Competitive Advantage",
  "Regulatory Compliance",
  "IP & Patents",
  "Customer Acquisition",
];

interface WeightFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<WeightType>) => void;
  weight?: WeightType | null;
  mode: "add" | "edit";
}

const WeightFormDialog: React.FC<WeightFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  weight,
  mode,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Partial<WeightType>>({
    defaultValues: {
      stageName: "",
      category: "",
      subcategory: "",
      weight: 50,
    },
  });

  React.useEffect(() => {
    if (weight && mode === "edit") {
      reset({
        stageName: weight.stageName,
        category: weight.category,
        subcategory: weight.subcategory,
        weight: weight.weight,
      });
    } else {
      reset({
        stageName: "",
        category: "",
        subcategory: "",
        weight: 50,
      });
    }
  }, [weight, mode, reset]);

  const handleFormSubmit = (data: Partial<WeightType>) => {
    onSubmit(data);
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const currentWeight = watch("weight");

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      fullWidth
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      <DialogTitle className="flex items-center justify-between">
        {mode === "add" ? "Add New Weight" : "Edit Weight"}
      </DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="stageName"
                control={control}
                rules={{ required: "Stage name is required" }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Stage Name"
                    error={!!errors.stageName}
                    helperText={errors.stageName?.message}
                    placeholder="Select a stage"
                  >
                    <MenuItem value="">
                      <em>Select a stage</em>
                    </MenuItem>
                    {stageNames.map((stage) => (
                      <MenuItem key={stage} value={stage}>
                        {stage}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Category"
                    error={!!errors.category}
                    helperText={errors.category?.message}
                    placeholder="Select a category"
                  >
                    <MenuItem value="">
                      <em>Select a category</em>
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="subcategory"
                control={control}
                rules={{ required: "Subcategory is required" }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Subcategory"
                    error={!!errors.subcategory}
                    helperText={errors.subcategory?.message}
                    placeholder="Select a subcategory"
                  >
                    <MenuItem value="">
                      <em>Select a subcategory</em>
                    </MenuItem>
                    {subcategories.map((subcategory) => (
                      <MenuItem key={subcategory} value={subcategory}>
                        {subcategory}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ px: 1 }}>
                <Typography gutterBottom>
                  Weight: {currentWeight}%
                </Typography>
                <Controller
                  name="weight"
                  control={control}
                  rules={{ 
                    required: "Weight is required",
                    min: { value: 0, message: "Weight must be at least 0" },
                    max: { value: 100, message: "Weight must be at most 100" }
                  }}
                  render={({ field }) => (
                    <Slider
                      {...field}
                      value={field.value || 50}
                      onChange={(_, value) => field.onChange(value)}
                      aria-labelledby="weight-slider"
                      valueLabelDisplay="auto"
                      step={5}
                      marks
                      min={0}
                      max={100}
                      sx={{
                        color: errors.weight ? 'error.main' : 'primary.main',
                      }}
                    />
                  )}
                />
                {errors.weight && (
                  <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                    {errors.weight.message}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="text">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {mode === "add" ? "Add Weight" : "Update Weight"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default WeightFormDialog;
