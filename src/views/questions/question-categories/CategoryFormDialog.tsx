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
  IconButton,
} from "@mui/material";
import CustomTextField from "@/@core/components/mui/TextField";
import { useForm, Controller } from "react-hook-form";
import { QuestionCategoryType } from "@/types/questionCategoryTypes";
import { OrgType } from "@/types/OrgTypes";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";

// Mock organizations data - replace with actual data from API
const mockOrganizations: OrgType[] = [
  { name: "Tech Innovators Inc.", id: "org-1" },
  { name: "Venture Labs", id: "org-2" },
  { name: "FinanceFirst Corp", id: "org-3" },
  { name: "Market Insights Ltd", id: "org-4" },
  { name: "Entrepreneur Academy", id: "org-5" },
  { name: "TechForward Solutions", id: "org-6" },
  { name: "Leadership Excellence", id: "org-7" },
  { name: "ProductCraft Studio", id: "org-8" },
  { name: "Growth Marketing Hub", id: "org-9" },
  { name: "Legal Advisory Partners", id: "org-10" },
];

interface CategoryFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    data: Partial<QuestionCategoryType & { organizationId?: string }>
  ) => void;
  category?: QuestionCategoryType | null;
  mode: "add" | "edit";
}

const CategoryFormDialog: React.FC<CategoryFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  category,
  mode,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<QuestionCategoryType & { organizationId?: string }>>({
    defaultValues: {
      name: "",
      organizationId: "",
    },
  });

  React.useEffect(() => {
    if (category && mode === "edit") {
      reset({
        name: category.name,
        organizationId: category.organization?.id || "",
      });
    } else {
      reset({
        name: "",
        organizationId: "",
      });
    }
  }, [category, mode, reset]);

  const handleFormSubmit = (
    data: Partial<QuestionCategoryType & { organizationId?: string }>
  ) => {
    const submitData = {
      ...data,
      ...(mode === "edit" && category ? { id: category.id } : {}),
      createdAt:
        mode === "add" ? new Date().toISOString() : category?.createdAt,
      updatedAt: new Date().toISOString(),
    };
    onSubmit(submitData);
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

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
        {mode === "add" ? "Add New Category" : "Edit Category"}
      </DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Category name is required" }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Category Name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    placeholder="Enter category name"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="organizationId"
                control={control}
                rules={{ required: "Organization is required" }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Organization"
                    error={!!errors.organizationId}
                    helperText={errors.organizationId?.message}
                    placeholder="Select an organization"
                  >
                    <MenuItem value="">
                      <em>Select an organization</em>
                    </MenuItem>
                    {mockOrganizations.map((org) => (
                      <MenuItem key={org.id} value={org.id}>
                        {org.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="text">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {mode === "add" ? "Add Category" : "Update Category"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CategoryFormDialog;
