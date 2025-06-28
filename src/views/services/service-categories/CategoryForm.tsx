import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Typography,
  Grid,
  FormControl,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  object,
  string,
  pipe,
  nonEmpty,
  minLength,
  maxLength,
  optional,
} from "valibot";
import type { SubmitHandler } from "react-hook-form";
import type { InferInput } from "valibot";
import CustomTextField from "@core/components/mui/TextField";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";
import { OrgType } from "@/types/OrgTypes";
import { ServiceCategoryType } from "@/types/ServiceTypes";

// Define the schema for the form validation
const categorySchema = object({
  name: pipe(
    string(),
    nonEmpty("Category name is required"),
    minLength(2, "Category name must be at least 2 characters"),
    maxLength(100, "Category name must not exceed 100 characters")
  ),
  organizationId: optional(string()),
  startupName: optional(string()),
});

// Create a type based on the schema using InferInput
type CategoryFormInputs = InferInput<typeof categorySchema>;

// Default form values
const defaultValues: CategoryFormInputs = {
  name: "",
  organizationId: "",
  startupName: "",
};

interface CategoryFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: (ServiceCategoryType & { 
    organization?: OrgType;
    startupName?: string;
    createdAt: string;
  }) | null;
  onSubmit: (data: ServiceCategoryType & { 
    organization?: OrgType;
    startupName?: string;
    createdAt: string;
  }) => void;
  onClose?: () => void;
  mode?: "add" | "edit";
  organizations: OrgType[];
}

const CategoryForm = ({
  open,
  setOpen,
  data,
  onSubmit,
  onClose,
  mode,
  organizations,
}: CategoryFormProps) => {
  // Initialize form with valibot resolver
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormInputs>({
    defaultValues,
    resolver: valibotResolver(categorySchema),
  });

  // Reset form when dialog opens or category data changes
  useEffect(() => {
    if (open) {
      if (data) {
        // Transform data to CategoryFormInputs
        reset({
          name: data.name,
          organizationId: data.organization?.id || "",
          startupName: data.startupName || "",
        });
      } else {
        reset(defaultValues);
      }
    }
  }, [open, data, reset]);

  // Form submission handler
  const onFormSubmit: SubmitHandler<CategoryFormInputs> = (formData) => {
    // Find the selected organization based on ID
    const selectedOrg = formData.organizationId 
      ? organizations.find(org => org.id === formData.organizationId)
      : undefined;

    // Transform form data to ServiceCategoryType with extended properties
    const categoryData = {
      id: data?.id || crypto.randomUUID(),
      name: formData.name,
      organization: selectedOrg,
      startupName: formData.startupName || "",
      createdAt: data?.createdAt || new Date().toISOString(),
    };

    // Submit form data
    onSubmit(categoryData);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
    reset(defaultValues);
  };

  const dialogTitle = mode === "edit" ? "Edit Category" : "Add Category";

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      maxWidth="sm"
      aria-labelledby="category-dialog-title"
    >
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      <DialogTitle mb={-2}>{dialogTitle}</DialogTitle>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <DialogContent>
          <Grid container spacing={5}>
            {/* Category Name */}
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Category Name"
                    placeholder="Enter category name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            {/* Organization */}
            <Grid item xs={12}>
              <Controller
                name="organizationId"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Organization"
                    placeholder="Select an organization"
                    error={!!errors.organizationId}
                    helperText={errors.organizationId?.message}
                  >
                    <MenuItem value="">None</MenuItem>
                    {organizations.map((org) => (
                      <MenuItem key={org.id} value={org.id}>
                        {org.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            {/* Startup Name */}
            <Grid item xs={12}>
              <Controller
                name="startupName"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Startup Name"
                    placeholder="Enter startup name"
                    error={!!errors.startupName}
                    helperText={errors.startupName?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="mt-6">
          <Button
            variant="text"
            color="primary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={isSubmitting}
          >
            {data ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CategoryForm;
