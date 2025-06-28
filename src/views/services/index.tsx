"use client";

import React from "react";
import { ServiceType } from "@/types/ServiceTypes";
import { Button, Grid, Typography } from "@mui/material";
import ServicesTable from "./ServicesTable";
import OpenDialogOnElementClick from "@/components/OpenDialogOnElementClick";
import ServiceForm from "./ServiceForm";

const Services = ({ data }: { data: Array<ServiceType> }) => {
  const [mode, setMode] = React.useState("add");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const [services, setServices] = React.useState<Array<ServiceType>>(data);
  const [service, setService] = React.useState<ServiceType | null>(null);

  const onSubmit = (data: ServiceType) => {
    if (mode === "edit") {
      setServices((prevServices) =>
        prevServices.map((s) => (s.id === data.id ? data : s))
      );
    }

    setServices((prevServices) => [data, ...prevServices]);
    setIsDialogOpen(true);
  };

  const onEditClick = (service: ServiceType) => {
    setService(service);
    setIsDialogOpen(true);
    setMode("edit");
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={6} mb={2}>
        <Typography variant="h4" fontWeight="bold">Services List</Typography>
      </Grid>
      <Grid item xs={6} md={6} sx={{ textAlign: "right", mb: 2 }}>
        <OpenDialogOnElementClick
          element={Button}
          elementProps={{
            variant: "contained",
            children: "New Service",
            startIcon: <i className="tabler-plus" />,
            onClick: () => {
              setService(null);
              setIsDialogOpen(true);
            },
          }}
          dialog={ServiceForm}
          dialogProps={{
            onSubmit: onSubmit,
            onClose: () => setIsDialogOpen(false),
            open: isDialogOpen,
            setOpen: setIsDialogOpen,
            data: service,
            mode: mode,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <ServicesTable data={services} onEdit={onEditClick} />
      </Grid>
    </Grid>
  );
};

export default Services;
