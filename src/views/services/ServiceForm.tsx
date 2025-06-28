import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Chip,
  Typography,
  Divider,
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
  email as emailValidator,
  regex,
  number,
  minValue,
  array,
  optional,
} from "valibot";
import type { SubmitHandler } from "react-hook-form";
import type { InferInput } from "valibot";
import CustomTextField from "@core/components/mui/TextField";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";
import { OrgType } from "@/types/OrgTypes";
import { ServiceType } from "@/types/ServiceTypes";
import TextEditor from "@/components/TextEditor";

// Sample organizations for multiselect dropdown
// In a real project, these would likely be fetched from an API
const SAMPLE_ORGANIZATIONS: OrgType[] = [
  { name: "TechCorp", id: "tech-001" },
  { name: "DataSolutions", id: "data-002" },
  { name: "FinanceGroup", id: "finance-003" },
  { name: "HealthcareServices", id: "health-004" },
  { name: "RetailSolutions", id: "retail-005" },
  { name: "MarketingAgency", id: "market-006" },
  { name: "ResearchLab", id: "research-007" },
  { name: "AnalyticsInc", id: "analytics-008" },
  { name: "TechStartup", id: "startup-009" },
  { name: "SoftwareInc", id: "software-010" },
];

// Sample service categories for dropdown
const SERVICE_CATEGORIES = [
  { name: "Technology Service", id: "tech-service" },
  { name: "Financial Service", id: "financial-service" },
  { name: "Managerial Service", id: "managerial-service" },
  { name: "Logistics Service", id: "logistics-service" },
  { name: "IT Service", id: "it-service" },
];

// Define the schema for the form validation
const serviceSchema = object({
  name: pipe(
    string(),
    nonEmpty("Service name is required"),
    minLength(2, "Service name must be at least 2 characters"),
    maxLength(100, "Service name must not exceed 100 characters")
  ),
  description: pipe(
    string(),
    nonEmpty("Service description is required"),
    minLength(10, "Description must be at least 10 characters"),
    maxLength(2000, "Description must not exceed 2000 characters")
  ),
  price: pipe(
    number("Price must be a number"),
    minValue(0, "Price cannot be negative")
  ),
  // For assigned organizations, we'll handle it separately since it's an array
  assignedOrganizationIds: optional(array(string())),
  serviceCategoryId: pipe(string(), nonEmpty("Service category is required")),
  vendor: object({
    name: pipe(
      string(),
      nonEmpty("Vendor name is required"),
      minLength(2, "Vendor name must be at least 2 characters"),
      maxLength(100, "Vendor name must not exceed 100 characters")
    ),
    email: pipe(
      string(),
      nonEmpty("Vendor email is required"),
      emailValidator("Please enter a valid email address")
    ),
    phone: pipe(
      string(),
      nonEmpty("Vendor phone number is required"),
      regex(
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        "Please enter a valid phone number"
      )
    ),
  }),
});

// Create a type based on the schema using InferInput
type ServiceFormInputs = InferInput<typeof serviceSchema>;

// Default form values
const defaultValues: ServiceFormInputs = {
  name: "",
  description: "",
  price: 0,
  assignedOrganizationIds: [],
  serviceCategoryId: "",
  vendor: {
    name: "",
    email: "",
    phone: "",
  },
};

interface ServiceFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: ServiceType | null;
  onSubmit: (data: ServiceType) => void;
  onClose?: () => void;
  mode?: "add" | "edit";
}

const ServiceForm = ({
  open,
  setOpen,
  data,
  onSubmit,
  onClose,
  mode,
}: ServiceFormProps) => {  
  // Initialize form with valibot resolver
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormInputs>({
    defaultValues,
    resolver: valibotResolver(serviceSchema),
  });

  // Watch for changes to price and other values for UI enhancements
  const price = watch("price");
  const assignedOrganizationIds = watch("assignedOrganizationIds") || [];
  const serviceCategoryId = watch("serviceCategoryId") || "";
  const isPriceZero = price === 0;

  // Reset form when dialog opens or service data changes
  useEffect(() => {
    if (open) {
      if (data) {
        // Transform ServiceType to ServiceFormInputs
        reset({
          name: data.name,
          description: data.description || "",
          price: data.price,
          assignedOrganizationIds: data.assignedOrganizations.map(
            (org) => org.id
          ),
          serviceCategoryId: data.serviceCategory?.id || "",
          vendor: {
            name: data.vendor.name,
            email: data.vendor.email,
            phone: data.vendor.phone,
          },
        });
      } else {
        reset(defaultValues);
      }
    }
  }, [open, data, reset]);

  // No additional handlers needed as they're now integrated in the Controller component

  // Form submission handler
  const onFormSubmit: SubmitHandler<ServiceFormInputs> = (formData) => {
    // Find the selected service category
    const selectedServiceCategory = SERVICE_CATEGORIES.find(
      (category) => category.id === formData.serviceCategoryId
    );

    // Get the selected organizations based on their IDs
    const selectedOrganizations = (formData.assignedOrganizationIds || [])
      .map((id) => SAMPLE_ORGANIZATIONS.find((org) => org.id === id))
      .filter((org): org is OrgType => org !== undefined);

    // Transform form data to ServiceType
    const serviceData: ServiceType = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      assignedOrganizations: selectedOrganizations,
      serviceCategory: selectedServiceCategory,
      vendor: {
        name: formData.vendor.name,
        email: formData.vendor.email,
        phone: formData.vendor.phone,
      },
      createdAt: data?.createdAt || new Date().toISOString(),
    };

    // Submit form data
    onSubmit(serviceData);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
    reset(defaultValues);
  };

  const dialogTitle = data && mode === 'edit' ? "Edit Service" : "Add Service";

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      maxWidth="md"
      fullWidth
      TransitionProps={{
        onExited: () => {
          reset(defaultValues);
        },
      }}
      PaperProps={{
        sx: {
          maxHeight: "96vh",
          padding: 2,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
        },
      }}
      // Make the dialog full screen on mobile devices
      aria-labelledby="user-dialog-title"
      fullScreen={typeof window !== undefined ? window.innerWidth < 600 : false}
      scroll="paper"
    >
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      <DialogTitle mb={-5}>{dialogTitle}</DialogTitle>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <DialogContent sx={{ overflowY: "auto", flex: "1 1 auto", pb: 2 }}>
          <Grid container spacing={5}>
            {/* Service Name */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Service Name"
                    placeholder="Enter service name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            {/* Price */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Price"
                    placeholder="Enter price"
                    type="number"
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                    }}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    onChange={(e) => {
                      const value =
                        e.target.value === "" ? 0 : Number(e.target.value);
                      field.onChange(value);
                    }}
                  />
                )}
              />
              {isPriceZero && (
                <Typography
                  variant="caption"
                  color="success.main"
                  sx={{ mt: 1, display: "block" }}
                >
                  This service will be offered for free
                </Typography>
              )}
            </Grid>

            {/* Service Category */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="serviceCategoryId"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label="Service Category"
                    placeholder="Select a service category"
                    error={!!errors.serviceCategoryId}
                    helperText={errors.serviceCategoryId?.message}
                  >
                    {SERVICE_CATEGORIES.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextEditor
                    label="Description"
                    placeholder="Enter service description"
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            {/* Assigned Organizations */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Assigned Organizations
              </Typography>
              <Divider className="mb-4" />

              <Controller
                name="assignedOrganizationIds"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label="Select Organizations"
                    value={field.value || []}
                    SelectProps={{
                      multiple: true,
                      onChange: (e) => {
                        const selectedIds = e.target.value as string[];
                        field.onChange(selectedIds);
                      },
                      renderValue: (selected) => (
                        <div className="flex flex-wrap gap-2">
                          {(selected as string[]).map((value) => {
                            const org = SAMPLE_ORGANIZATIONS.find(
                              (org: OrgType) => org.id === value
                            );
                            return (
                              <Chip
                                key={value}
                                clickable
                                onMouseDown={(event) => event.stopPropagation()}
                                size="small"
                                label={org?.name || value}
                                onDelete={() => {
                                  const updatedIds = (field.value || []).filter(
                                    (id: string) => id !== value
                                  );
                                  field.onChange(updatedIds);
                                }}
                              />
                            );
                          })}
                        </div>
                      ),
                    }}
                    error={!!errors.assignedOrganizationIds}
                    helperText={errors.assignedOrganizationIds?.message}
                  >
                    {SAMPLE_ORGANIZATIONS.map((org) => (
                      <MenuItem key={org.id} value={org.id}>
                        {org.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            {/* Vendor Information Header */}
            <Grid item xs={12}>
              <Typography variant="h6">Vendor Information</Typography>
              <Divider className="mt-2" />
            </Grid>

            {/* Vendor Name */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="vendor.name"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Vendor Name"
                    placeholder="Enter vendor name"
                    error={!!errors.vendor?.name}
                    helperText={errors.vendor?.name?.message}
                  />
                )}
              />
            </Grid>

            {/* Vendor Email */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="vendor.email"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Vendor Email"
                    placeholder="vendor@example.com"
                    error={!!errors.vendor?.email}
                    helperText={errors.vendor?.email?.message}
                  />
                )}
              />
            </Grid>

            {/* Vendor Phone */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="vendor.phone"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Vendor Phone"
                    placeholder="(123) 456-7890"
                    error={!!errors.vendor?.phone}
                    helperText={errors.vendor?.phone?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            py: 2,
            px: 3,
            justifyContent: "flex-end",
            borderTop: "1px solid",
            borderColor: "divider",
            position: "sticky",
            bottom: 0,
            bgcolor: "background.paper",
          }}
        >
          <Button
            variant="text"
            color="primary"
            onClick={handleClose}
            sx={{ mt: 5 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={
              isSubmitting
              //  ||
              // assignedOrganizationIds.length === 0 ||
              // !serviceCategoryId
            }
            sx={{ mt: 5 }}
          >
            {data ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ServiceForm;
