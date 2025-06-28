"use client";

import React from "react";
import { Typography, Button, Grid } from "@mui/material";
import ServiceCategoriesTable from "./ServiceCategoriesTable";
import CategoryForm from "./CategoryForm";
import { ServiceCategoryType } from "@/types/ServiceTypes";
import { OrgType } from "@/types/OrgTypes";
import OpenDialogOnElementClick from "@/components/OpenDialogOnElementClick";

// Define an extended service category type for the table
type ExtendedServiceCategoryType = ServiceCategoryType & {
  organization?: OrgType;
  startupName?: string;
  createdAt: string;
};

// Mock organizations for the dropdown in the edit dialog
const mockOrganizations: OrgType[] = [
  { name: "Microsoft", id: "1" },
  { name: "Amazon", id: "2" },
  { name: "Google", id: "3" },
  { name: "IBM", id: "4" },
  { name: "Cisco", id: "5" },
];

// Mock data for service categories
const mockCategories: ExtendedServiceCategoryType[] = [
  {
    id: "1",
    name: "Cloud Services",
    organization: { name: "Microsoft", id: "1" },
    startupName: "CloudTech",
    createdAt: "2023-01-15T12:00:00Z"
  },
  {
    id: "2",
    name: "Database Solutions",
    organization: { name: "Amazon", id: "2" },
    startupName: "DataFlow",
    createdAt: "2023-02-20T14:30:00Z"
  },
  {
    id: "3",
    name: "AI Services",
    organization: { name: "Google", id: "3" },
    startupName: "BrainWave",
    createdAt: "2023-03-10T09:15:00Z"
  },
  {
    id: "4",
    name: "IoT Platforms",
    organization: { name: "IBM", id: "4" },
    startupName: "ConnectAll",
    createdAt: "2023-04-05T16:45:00Z"
  },
  {
    id: "5",
    name: "Cybersecurity",
    organization: { name: "Cisco", id: "5" },
    startupName: "SecureNet",
    createdAt: "2023-05-12T11:20:00Z"
  }
];

const ServiceCategories = ({ data = mockCategories }: { data?: Array<ExtendedServiceCategoryType> }) => {
  const [mode, setMode] = React.useState("add");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const [categories, setCategories] = React.useState<Array<ExtendedServiceCategoryType>>(data);
  const [category, setCategory] = React.useState<ExtendedServiceCategoryType | null>(null);

  const onSubmit = (data: ExtendedServiceCategoryType) => {
    if (mode === "edit") {
      setCategories((prevCategories) =>
        prevCategories.map((c) => (c.id === data.id ? data : c))
      );
    } else {
      setCategories((prevCategories) => [data, ...prevCategories]);
    }
    setIsDialogOpen(false);
  };

  const onEditClick = (category: ExtendedServiceCategoryType) => {
    setCategory(category);
    setIsDialogOpen(true);
    setMode("edit");
  };

  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={6} md={6} mb={4}>
        <Typography variant="h4" fontWeight="bold">Service Categories</Typography>
      </Grid>
      <Grid item xs={6} md={6} sx={{ textAlign: "right", mb: 4 }}>
        <OpenDialogOnElementClick
          element={Button}
          elementProps={{
            variant: "contained",
            children: "New Category",
            startIcon: <i className="tabler-plus" />,
            onClick: () => {
              setCategory(null);
              setMode("add");
              setIsDialogOpen(true);
            },
          }}
          dialog={CategoryForm}
          dialogProps={{
            onSubmit: onSubmit,
            onClose: () => setIsDialogOpen(false),
            open: isDialogOpen,
            setOpen: setIsDialogOpen,
            data: category,
            mode: mode,
            organizations: mockOrganizations,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <ServiceCategoriesTable data={categories} onEdit={onEditClick} />
      </Grid>
    </Grid>
  );
};

export default ServiceCategories;