import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
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
import { ProjectType } from "@/types/projectTypes";

// Define the schema for the form validation
const projectSchema = object({
  name: pipe(
    string(),
    nonEmpty("Project name is required"),
    minLength(2, "Project name must be at least 2 characters"),
    maxLength(100, "Project name must not exceed 100 characters")
  ),
  description: optional(string()),
});

// Create a type based on the schema using InferInput
type ProjectFormInputs = InferInput<typeof projectSchema>;

// Default form values
const defaultValues: ProjectFormInputs = {
  name: "",
  description: "",
};

interface ProjectFormDialogProps {
  open: boolean;
  onClose: () => void;
  project?: ProjectType | null;
  onSubmit: (data: ProjectType) => void;
  mode?: "add" | "edit";
}

const ProjectFormDialog = ({
  open,
  onClose,
  project,
  onSubmit,
  mode = "add",
}: ProjectFormDialogProps) => {
  // Initialize form with valibot resolver
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormInputs>({
    defaultValues,
    resolver: valibotResolver(projectSchema),
  });

  // Reset form when dialog opens or project data changes
  useEffect(() => {
    if (open) {
      if (project) {
        // Transform project data to ProjectFormInputs
        reset({
          name: project.name,
          description: "", // Add this field to the Project type if needed
        });
      } else {
        reset(defaultValues);
      }
    }
  }, [open, project, reset]);

  // Form submission handler
  const onFormSubmit: SubmitHandler<ProjectFormInputs> = (formData) => {
    // Transform form data to Project type
    const projectData: ProjectType = {
      id: project?.id || crypto.randomUUID(),
      name: formData.name,
      programs: project?.programs || [],
      programsCount: project?.programsCount || 0, //@ts-ignore
      teamMembers: project?.teamMembers || 0,
      // Add description to the returned data, even though it's not in the Project type
      // This is temporary until the Project type is updated
      ...(formData.description && { description: formData.description }),
    };

    // Submit form data
    onSubmit(projectData);
    handleClose();
  };

  const handleClose = () => {
    onClose();
    reset(defaultValues);
  };

  const dialogTitle = mode === "edit" ? "Edit Project" : "Add Project";

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      maxWidth="sm"
      aria-labelledby="project-dialog-title"
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      <DialogTitle mb={-2}>{dialogTitle}</DialogTitle>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent>
          <Grid container spacing={5}>
            {/* Project Name */}
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Project Name"
                    placeholder="Enter project name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            {/* Project Description */}
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    placeholder="Enter project description"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="mt-6">
          <Button variant="text" color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            {project ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProjectFormDialog;
