"use client";

// React Imports
import React, { useState, useEffect } from "react";

// MUI Imports
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogActions } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/material";
import { Chip } from "@mui/material";
import { Divider } from "@mui/material";
import { Alert } from "@mui/material";
import { Accordion } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import { AccordionDetails } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { styled } from "@mui/material";

// React Hook Form and Valibot Imports
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import * as Vilbot from "valibot";
import type { SubmitHandler } from "react-hook-form";
import type { InferInput } from "valibot";

// Component Imports
import CustomTextField from "@/@core/components/mui/TextField";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";
import WarningDialog from "@/components/dialogs/WarningDialog";

// Types Imports
import {
  EvaluationCriteriaType,
  EvaluationCriteriaFormData,
} from "@/types/evaluationTypes";

// Styled Components
const StyledTextField = styled(CustomTextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.spacing(2),
    fontSize: "1rem",
    transition: "all 0.2s ease",
    "&:hover": {
      "& > fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
    "&.Mui-focused": {
      "& > fieldset": {
        borderWidth: "2px",
      },
    },
  },
  "& .MuiInputLabel-root": {
    fontWeight: "600",
  },
}));

const WeightSummaryCard = styled(Card)<{ isValid: boolean }>(
  ({ theme, isValid }) => ({
    marginBottom: theme.spacing(2),
    background:
      "linear-gradient(135deg, rgba(156, 39, 176, 0.05) 0%, rgba(33, 150, 243, 0.05) 100%)",
    border: "1px solid",
    borderColor: isValid
      ? theme.palette.success.light
      : theme.palette.error.light,
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    },
  })
);

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: 6,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& .MuiLinearProgress-bar": {
    borderRadius: 6,
    transition: "transform 0.4s ease-in-out",
  },
}));

const SubCriteriaListBox = styled(Box)(({ theme }) => ({
  maxHeight: "400px",
  overflowY: "auto",
  paddingRight: theme.spacing(1),
  // Custom scrollbar for sub-criteria list
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: "3px",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.3)",
    },
  },
}));

const SubCriteriaCard = styled(Card)(({ theme }) => ({
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
    transform: "translateY(-2px)",
    borderColor: theme.palette.primary.light,
  },
  borderRadius: theme.spacing(3),
  overflow: "hidden",
}));

const IndexCircle = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontSize: "0.875rem",
  fontWeight: "600",
}));

const DeleteIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.error.light,
  color: theme.palette.error.main,
  "&:hover": {
    backgroundColor: theme.palette.error.main,
    color: "white",
    transform: "scale(1.1)",
  },
  transition: "all 0.2s ease",
  width: 32,
  height: 32,
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  border: "1px solid",
  borderColor: theme.palette.divider,
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: 0,
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: "1px solid",
  borderColor: theme.palette.divider,
  "&.Mui-expanded": {
    minHeight: "auto",
  },
  "& .MuiAccordionSummary-content": {
    margin: "16px 0",
    "&.Mui-expanded": {
      margin: "16px 0",
    },
  },
}));

const ScrollableDetailsBox = styled(Box)(({ theme }) => ({
  maxHeight: "300px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: "3px",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.3)",
    },
  },
}));

const ExistingCriteriaCard = styled(Card)(({ theme }) => ({
  transition: "all 0.2s ease",
  "&:hover": {
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
    transform: "translateY(-2px)",
    borderColor: theme.palette.primary.light,
  },
  borderRadius: theme.spacing(2),
}));

// Validation schema
const subCriteriaSchema = Vilbot.object({
  name: Vilbot.pipe(
    Vilbot.string(),
    Vilbot.nonEmpty("Sub-criteria name is required"),
    Vilbot.minLength(2, "Name must be at least 2 characters"),
    Vilbot.maxLength(100, "Name must not exceed 100 characters")
  ),
  weight: Vilbot.pipe(
    Vilbot.number(),
    Vilbot.minValue(0, "Weight must be at least 0"),
    Vilbot.maxValue(100, "Weight must not exceed 100")
  ),
  description: Vilbot.optional(Vilbot.string()),
});

const evaluationCriteriaSchema = Vilbot.pipe(
  Vilbot.object({
    name: Vilbot.pipe(
      Vilbot.string(),
      Vilbot.nonEmpty("Criteria name is required"),
      Vilbot.minLength(2, "Name must be at least 2 characters"),
      Vilbot.maxLength(100, "Name must not exceed 100 characters")
    ),
    description: Vilbot.optional(Vilbot.string()),
    subCriteria: Vilbot.pipe(
      Vilbot.array(subCriteriaSchema),
      Vilbot.minLength(1, "At least one sub-criteria is required")
    ),
  }),
  Vilbot.custom((input: any) => {
    const totalWeight = input.subCriteria.reduce(
      (sum: number, sub: any) => sum + sub.weight,
      0
    );
    return totalWeight <= 100;
  }, "Total weight of sub-criteria cannot exceed 100%")
);

type EvaluationFormInputs = InferInput<typeof evaluationCriteriaSchema>;

interface ManageEvaluationDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EvaluationCriteriaFormData) => void;
  criteria?: EvaluationCriteriaType | null;
  mode?: "add" | "edit";
  existingCriteria?: EvaluationCriteriaType[];
}

const defaultSubCriteria = {
  name: "",
  weight: 0,
  description: "",
};

const defaultValues: EvaluationFormInputs = {
  name: "",
  description: "",
  subCriteria: [defaultSubCriteria],
};

const ManageEvaluationDialog: React.FC<ManageEvaluationDialogProps> = ({
  open,
  onClose,
  onSubmit,
  criteria,
  mode = "add",
  existingCriteria = [],
}) => {
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [subCriteriaToDelete, setSubCriteriaToDelete] = useState<number | null>(
    null
  );
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [hasDraftLoaded, setHasDraftLoaded] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<EvaluationFormInputs>({
    defaultValues,
    resolver: valibotResolver(evaluationCriteriaSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subCriteria",
  });

  const watchedSubCriteria = watch("subCriteria");
  const totalWeight = watchedSubCriteria.reduce(
    (sum, sub) => sum + (sub.weight || 0),
    0
  );
  const isWeightValid = totalWeight <= 100;

  // Draft functionality
  const DRAFT_KEY = 'evaluation-criteria-draft';

  const saveDraft = () => {
    const currentFormData = watch();
    localStorage.setItem(DRAFT_KEY, JSON.stringify(currentFormData));
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 2000); // Reset notification after 2 seconds
  };

  const loadDraft = () => {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      try {
        const draftData = JSON.parse(draft);
        return draftData;
      } catch (error) {
        console.error('Error loading draft:', error);
        return null;
      }
    }
    return null;
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
  };

  // Reset form when dialog opens or criteria changes
  useEffect(() => {
    if (open) {
      if (criteria && mode === "edit") {
        reset({
          name: criteria.name,
          description: criteria.description || "",
          subCriteria: criteria.subCriteria.map((sub) => ({
            name: sub.name,
            weight: sub.weight,
            description: sub.description || "",
          })),
        });
      } else {
        // Try to load draft when adding new criteria
        const draft = loadDraft();
        if (draft && mode === "add") {
          reset(draft);
          setHasDraftLoaded(true);
        } else {
          reset(defaultValues);
          setHasDraftLoaded(false);
        }
      }
    }
  }, [open, criteria, mode, reset]);

  // Form submission handler
  const onFormSubmit: SubmitHandler<EvaluationFormInputs> = (formData) => {
    const submissionData: EvaluationCriteriaFormData = {
      name: formData.name,
      description: formData.description,
      subCriteria: formData.subCriteria,
    };

    onSubmit(submissionData);
    clearDraft(); // Clear draft after successful submission
    handleClose();
  };

  const handleClose = () => {
    onClose();
    reset(defaultValues);
    setShowDeleteWarning(false);
    setSubCriteriaToDelete(null);
    setIsDraftSaved(false);
    setHasDraftLoaded(false);
  };

  const handleAddSubCriteria = () => {
    append(defaultSubCriteria);
  };

  const handleDeleteSubCriteria = (index: number) => {
    if (fields.length > 1) {
      setSubCriteriaToDelete(index);
      setShowDeleteWarning(true);
    }
  };

  const confirmDeleteSubCriteria = () => {
    if (subCriteriaToDelete !== null) {
      remove(subCriteriaToDelete);
    }
    setShowDeleteWarning(false);
    setSubCriteriaToDelete(null);
  };

  const getWeightColor = (weight: number) => {
    if (weight === 0) return "default";
    if (weight <= 25) return "error";
    if (weight <= 50) return "warning";
    if (weight <= 75) return "info";
    return "success";
  };

  const dialogTitle =
    mode === "edit" ? "Edit Evaluation Criteria" : "Add Evaluation Criteria";

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        aria-labelledby="manage-evaluation-dialog-title"
        sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      >
        <DialogCloseButton onClick={handleClose} disableRipple>
          <i className="tabler-x" />
        </DialogCloseButton>

        <DialogTitle id="manage-evaluation-dialog-title">
          <Box display="flex" alignItems="center" gap={2}>
            <i
              className="tabler-presentation text-primary w-7 h-7"
              style={{ fontSize: "20px" }}
            />

            <Box>
              <Typography variant="h5" fontWeight="700" color="text.primary">
                {dialogTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                {mode === "edit"
                  ? "Modify the evaluation criteria and adjust sub-criteria weights"
                  : "Create new evaluation criteria with sub-criteria (total weight ≤ 100%)"}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>

        <form onSubmit={handleSubmit(onFormSubmit)}>
          <DialogContent className="h-[550px] overflow-y-auto overflow-x-hidden bg-gray-100">
            {/* Draft Loaded Alert */}
            {hasDraftLoaded && mode === "add" && (
              <Alert
                severity="info"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  "& .MuiAlert-message": {
                    fontSize: "0.875rem",
                  },
                }}
                onClose={() => setHasDraftLoaded(false)}
              >
                Draft loaded! Your previously saved data has been restored.
              </Alert>
            )}

            <Grid container spacing={{ xs: 4, sm: 5, md: 6 }}>
              {/* Criteria Name */}
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      fullWidth
                      label="Criteria Name"
                      placeholder="Enter criteria name (e.g., Business Model Assessment)"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>

              {/* Criteria Description */}
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      fullWidth
                      multiline
                      rows={3}
                      label="Description (Optional)"
                      placeholder="Enter criteria description..."
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </Grid>

              {/* Weight Summary */}
              <Grid item xs={12}>
                <WeightSummaryCard variant="outlined" isValid={isWeightValid}>
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="600"
                        color="text.primary"
                      >
                        Total Weight: {totalWeight}%
                      </Typography>
                      <Chip
                        icon={
                          isWeightValid ? (
                            <i className="tabler-check" />
                          ) : (
                            <i className="tabler-x" />
                          )
                        }
                        label={isWeightValid ? "Valid" : "Exceeds 100%"}
                        color={isWeightValid ? "success" : "error"}
                        variant="tonal"
                        size="medium"
                        sx={{
                          fontWeight: "medium",
                          px: 2,
                          "& .MuiChip-label": {
                            fontSize: "0.875rem",
                          },
                        }}
                      />
                    </Box>
                    <StyledLinearProgress
                      variant="determinate"
                      value={Math.min(totalWeight, 100)}
                      color={isWeightValid ? "primary" : "error"}
                    />
                    <Box display="flex" justifyContent="space-between" mt={1}>
                      <Typography variant="caption" color="text.secondary">
                        0%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        100%
                      </Typography>
                    </Box>
                    {!isWeightValid && (
                      <Alert
                        severity="error"
                        sx={{
                          mt: 2,
                          borderRadius: 2,
                          "& .MuiAlert-message": {
                            fontSize: "0.875rem",
                          },
                        }}
                      >
                        The total weight of all sub-criteria cannot exceed 100%.
                        Please adjust the weights below.
                      </Alert>
                    )}
                  </CardContent>
                </WeightSummaryCard>
              </Grid>

              {/* Sub-Criteria Section */}
              <Grid item xs={12}>
                <Card className="border">
                  <CardContent
                    sx={{ p: 4 }}
                    className="flex justify-between items-center bor"
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight="600"
                        color="text.primary"
                      >
                        Sub-Criteria
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {fields.length} item{fields.length !== 1 ? "s" : ""} •
                        Total: {totalWeight}%
                      </Typography>
                    </Box>
                    <Button
                      variant="tonal"
                      onClick={handleAddSubCriteria}
                      startIcon={<i className="tabler-plus" />}
                      size="small"
                    >
                      Add Sub-Criteria
                    </Button>
                  </CardContent>
                </Card>

                {/* Sub-Criteria List */}
                <SubCriteriaListBox>
                  <Grid container spacing={3} mt={2}>
                    {fields.map((field, index) => (
                      <Grid item xs={12} key={field.id}>
                        <SubCriteriaCard variant="outlined">
                          <CardContent>
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              mb={3}
                            >
                              <Box display="flex" alignItems="center" gap={2}>
                                <IndexCircle>{index + 1}</IndexCircle>
                                <Typography
                                  variant="subtitle1"
                                  fontWeight="600"
                                  color="text.primary"
                                >
                                  Sub-Criteria #{index + 1}
                                </Typography>
                              </Box>
                              <Box display="flex" alignItems="center" gap={1}>
                                <Chip
                                  label={`${watchedSubCriteria[index]?.weight || 0}%`}
                                  color={getWeightColor(
                                    watchedSubCriteria[index]?.weight || 0
                                  )}
                                  size="medium"
                                  sx={{
                                    fontWeight: "600",
                                    minWidth: "60px",
                                    "& .MuiChip-label": {
                                      fontSize: "0.875rem",
                                    },
                                  }}
                                />
                                {fields.length > 1 && (
                                  <DeleteIconButton
                                    onClick={() =>
                                      handleDeleteSubCriteria(index)
                                    }
                                    color="error"
                                    size="small"
                                  >
                                    <i
                                      className="tabler-trash"
                                      style={{ fontSize: "16px" }}
                                    />
                                  </DeleteIconButton>
                                )}
                              </Box>
                            </Box>

                            <Grid container spacing={3}>
                              {/* Sub-criteria Name */}
                              <Grid item xs={12} md={6}>
                                <Controller
                                  name={`subCriteria.${index}.name`}
                                  control={control}
                                  render={({ field }) => (
                                    <StyledTextField
                                      {...field}
                                      fullWidth
                                      label="Name"
                                      placeholder="Enter sub-criteria name"
                                      error={
                                        !!errors.subCriteria?.[index]?.name
                                      }
                                      helperText={
                                        errors.subCriteria?.[index]?.name
                                          ?.message
                                      }
                                    />
                                  )}
                                />
                              </Grid>

                              {/* Sub-criteria Weight */}
                              <Grid item xs={12} md={6}>
                                <Controller
                                  name={`subCriteria.${index}.weight`}
                                  control={control}
                                  render={({ field }) => (
                                    <StyledTextField
                                      {...field}
                                      type="number"
                                      fullWidth
                                      label="Weight (%)"
                                      placeholder="0"
                                      inputProps={{ min: 0, max: 100, step: 1 }}
                                      error={
                                        !!errors.subCriteria?.[index]?.weight
                                      }
                                      helperText={
                                        errors.subCriteria?.[index]?.weight
                                          ?.message
                                      }
                                      onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                      }
                                    />
                                  )}
                                />
                              </Grid>

                              {/* Sub-criteria Description */}
                              <Grid item xs={12}>
                                <Controller
                                  name={`subCriteria.${index}.description`}
                                  control={control}
                                  render={({ field }) => (
                                    <StyledTextField
                                      {...field}
                                      fullWidth
                                      multiline
                                      rows={2}
                                      label="Description (Optional)"
                                      placeholder="Enter sub-criteria description..."
                                      error={
                                        !!errors.subCriteria?.[index]
                                          ?.description
                                      }
                                      helperText={
                                        errors.subCriteria?.[index]?.description
                                          ?.message
                                      }
                                    />
                                  )}
                                />
                              </Grid>
                            </Grid>
                          </CardContent>
                        </SubCriteriaCard>
                      </Grid>
                    ))}
                  </Grid>
                </SubCriteriaListBox>
              </Grid>

              {/* Existing Criteria Summary */}
              {existingCriteria.length > 0 && (
                <Grid item xs={12}>
                  <Divider
                    sx={{ my: 3, borderColor: "divider", borderWidth: 1 }}
                  />
                  <StyledAccordion>
                    <StyledAccordionSummary
                      expandIcon={
                        <Box
                          sx={{
                            backgroundColor: "primary.main",
                            borderRadius: "50%",
                            width: 24,
                            height: 24,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                          }}
                        >
                          <i
                            className="tabler-chevron-down"
                            style={{ fontSize: "14px" }}
                          />
                        </Box>
                      }
                      aria-controls="existing-criteria-content"
                      id="existing-criteria-header"
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            backgroundColor: "info.light",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "info.main",
                          }}
                        >
                          <i className="tabler-list text-white text-lg" />
                        </Box>
                        <Box>
                          <Typography variant="h6" fontWeight="600">
                            Existing Criteria ({existingCriteria.length})
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            View previously created evaluation criteria
                          </Typography>
                        </Box>
                      </Box>
                    </StyledAccordionSummary>
                    <AccordionDetails sx={{ p: 3 }}>
                      <ScrollableDetailsBox>
                        <Grid container spacing={2} mt={2}>
                          {existingCriteria.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item.id}>
                              <ExistingCriteriaCard variant="outlined">
                                <CardContent sx={{ p: 2 }}>
                                  <Typography
                                    variant="subtitle2"
                                    fontWeight="600"
                                    gutterBottom
                                  >
                                    {item.name}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    display="block"
                                    mb={1}
                                  >
                                    {item.subCriteria.length} sub-criteria
                                  </Typography>
                                  <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                  >
                                    <Chip
                                      label={`${item.totalWeight}%`}
                                      color={
                                        item.totalWeight <= 100
                                          ? "success"
                                          : "error"
                                      }
                                      size="small"
                                      sx={{ fontWeight: "600" }}
                                    />
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      {new Date(
                                        item.createdAt
                                      ).toLocaleDateString()}
                                    </Typography>
                                  </Box>
                                </CardContent>
                              </ExistingCriteriaCard>
                            </Grid>
                          ))}
                        </Grid>
                      </ScrollableDetailsBox>
                    </AccordionDetails>
                  </StyledAccordion>
                </Grid>
              )}
            </Grid>
          </DialogContent>

          <DialogActions className="mt-6">
            <Button onClick={handleClose} color="secondary" variant="text">
              Close
            </Button>
            <Button 
              onClick={saveDraft} 
              color="primary" 
              variant="tonal"
              startIcon={isDraftSaved ? <i className="tabler-check" /> : <i className="tabler-device-floppy" />}
            >
              {isDraftSaved ? "Draft Saved!" : "Save as Draft"}
            </Button>
            <Button type="submit" variant="contained" disabled={!isWeightValid}>
              {mode === "edit" ? "Update Criteria" : "Publish"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <WarningDialog
        type="Delete"
        title="Delete Sub-Criteria"
        message="Are you sure you want to delete this sub-criteria? This action cannot be undone."
        open={showDeleteWarning}
        onClose={() => {
          setShowDeleteWarning(false);
          setSubCriteriaToDelete(null);
        }}
        onConfirm={confirmDeleteSubCriteria}
      />
    </>
  );
};

export default ManageEvaluationDialog;
