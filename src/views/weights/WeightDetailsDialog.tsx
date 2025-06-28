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
  Divider,
  Box,
  LinearProgress,
} from "@mui/material";
import { WeightType } from "@/types/weightTypes";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";

interface WeightDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  weight: WeightType | null;
}

const WeightDetailsDialog: React.FC<WeightDetailsDialogProps> = ({
  open,
  onClose,
  weight,
}) => {
  if (!weight) return null;

  // Helper function to get stage chip color
  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Pre-Seed":
        return "secondary";
      case "Seed":
        return "primary";
      case "Series A":
        return "info";
      case "Series B":
        return "success";
      case "Series C":
        return "warning";
      case "Growth":
        return "error";
      default:
        return "default";
    }
  };

  // Helper function to get category chip color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Business Model":
        return "primary";
      case "Financial":
        return "success";
      case "Technology":
        return "info";
      case "Team & Management":
        return "warning";
      case "Market & Competition":
        return "error";
      case "Legal & Compliance":
        return "secondary";
      default:
        return "default";
    }
  };

  // Helper function to get weight color based on value
  const getWeightColor = (weight: number) => {
    if (weight >= 75) return "success";
    if (weight >= 50) return "warning";
    if (weight >= 25) return "info";
    return "error";
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
    >
      <DialogCloseButton onClick={onClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      <DialogTitle className="flex items-center justify-between">
        <Typography variant="h5">Weight Details</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Typography variant="h6" color="text.primary">
                {weight.subcategory}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Weight configuration for assessment evaluation
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Stage Name
            </Typography>
            <Chip
              variant="tonal"
              label={weight.stageName}
              size="small"
              color={getStageColor(weight.stageName) as any}
              className="capitalize"
            />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Category
            </Typography>
            <Chip
              variant="tonal"
              label={weight.category}
              size="small"
              color={getCategoryColor(weight.category) as any}
              className="capitalize"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Subcategory
            </Typography>
            <Typography variant="body1" color="text.primary">
              {weight.subcategory}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Weight Value
            </Typography>
            <Box display="flex" alignItems="center" gap={2} mt={1}>
              <LinearProgress
                variant="determinate"
                value={weight.weight}
                sx={{
                  flexGrow: 1,
                  height: 8,
                  borderRadius: 4,
                  [`& .MuiLinearProgress-bar`]: {
                    borderRadius: 4,
                  }
                }}
                color={getWeightColor(weight.weight)}
              />
              <Chip
                label={`${weight.weight}%`}
                size="small"
                color={getWeightColor(weight.weight)}
                variant="tonal"
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Created Date
            </Typography>
            <Typography variant="body2" color="text.primary">
              {new Date(weight.createdAt).toLocaleDateString()} at{" "}
              {new Date(weight.createdAt).toLocaleTimeString()}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Last Updated
            </Typography>
            <Typography variant="body2" color="text.primary">
              {new Date(weight.updatedAt).toLocaleDateString()} at{" "}
              {new Date(weight.updatedAt).toLocaleTimeString()}
            </Typography>
          </Grid>
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

export default WeightDetailsDialog;
