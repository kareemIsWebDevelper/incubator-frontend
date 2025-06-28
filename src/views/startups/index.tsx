"use client";

import { Grid } from "@mui/material";
import React from "react";
import StartupList from "./StartupList";
import StartupListHeader from "./StartupListHeader";
import { db } from "@/fake-db/pages/startups";

const Startups = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [organizationValue, setOrganizationValue] = React.useState("");
  const [stateValue, setStateValue] = React.useState("");
  const [sectorValue, setSectorValue] = React.useState("");

  // Extract unique organization (startup names), states, and sectors from db
  const organizationOptions = React.useMemo(() => {
    const organizations = [...new Set(db.map((startup) => startup.name))];
    return organizations.map((org) => ({ value: org, label: org }));
  }, []);

  const stateOptions = React.useMemo(() => {
    const states = [...new Set(db.map((startup) => startup.state))];
    return states.map((state) => ({ value: state, label: state }));
  }, []);

  const sectorOptions = React.useMemo(() => {
    const sectors = [...new Set(db.map((startup) => startup.sector))];
    return sectors.map((sector) => ({ value: sector, label: sector }));
  }, []);

  const startupData = React.useMemo(() => {
    return db.filter((startup) => {
      const matchesSearch = startup.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesOrganization = organizationValue
        ? startup.name === organizationValue
        : true;
      const matchesState = stateValue ? startup.state === stateValue : true;
      const matchesSector = sectorValue ? startup.sector === sectorValue : true;

      return (
        matchesSearch && matchesOrganization && matchesState && matchesSector
      );
    });
  }, [searchTerm, organizationValue, stateValue, sectorValue]);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <StartupListHeader
          title="Startups"
          icon={<i className="tabler-building text-primary" />}
          count={db.length}
          onAddNewClick={() => {}}
          onSearch={(value) => setSearchTerm(value)}
          onFilterOrganization={(value) => setOrganizationValue(value)}
          onFilterState={(value) => setStateValue(value)}
          onFilterSector={(value) => setSectorValue(value)}
          organizationOptions={organizationOptions}
          stateOptions={stateOptions}
          sectorOptions={sectorOptions}
          searchPlaceholder="Search by name, organization, or sector"
        />
      </Grid>
      <Grid item xs={12}>
        <StartupList startups={startupData} />
      </Grid>
    </Grid>
  );
};

export default Startups;
