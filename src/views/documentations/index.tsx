"use client";

import React, { useState, useEffect } from "react";
import DocumentationsTable from "./DocumentationsTable";
import { Button, Grid, Typography } from "@mui/material";
import DocumentationForm from "./DocumentationForm";
import DocumentationDetailsDialog from "@/views/documentations/DocumentationDetailsDialog";
import { DocumentationType } from "@/types/DocumentationTypes";
import { db as initialDocumentationsData } from "@/fake-db/pages/documentations";

const Documentations = ({
  data = initialDocumentationsData,
}: {
  data?: DocumentationType[];
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [documentations, setDocumentations] =
    useState<Array<DocumentationType>>(data);
  const [selectedDocumentation, setSelectedDocumentation] =
    useState<DocumentationType | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Update local state when props change
  useEffect(() => {
    setDocumentations(data);
  }, [data]);

  const handleSubmit = (documentation: Partial<DocumentationType>) => {
    if (selectedDocumentation) {
      // Edit existing documentation
      const updatedDocumentations = documentations.map((d) =>
        d.id === selectedDocumentation.id
          ? { ...selectedDocumentation, ...documentation }
          : d
      );
      setDocumentations(updatedDocumentations);
    } else {
      // Add new documentation
      const newDocumentation = {
        id: `doc-${Date.now()}`,
        ...documentation,
      } as DocumentationType;

      setDocumentations((prevDocumentations) => [
        newDocumentation,
        ...prevDocumentations,
      ]);
    }
  };

  const handleEdit = (documentation: DocumentationType) => {
    setSelectedDocumentation(documentation);
    setIsFormOpen(true);
  };

  const handleView = (documentation: DocumentationType) => {
    setSelectedDocumentation(documentation);
    setIsViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setIsViewDialogOpen(false);
    setSelectedDocumentation(null);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={6} md={6} mb={2}>
        <Typography variant="h4" fontWeight="bold">Documentations List</Typography>
      </Grid>
      <Grid item xs={6} md={6} sx={{ textAlign: "right", mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => {
            setSelectedDocumentation(null);
            setIsFormOpen(true);
          }}
          startIcon={<i className="tabler-plus" />}
        >
          New Documentation
        </Button>
      </Grid>
      <Grid item xs={12}>
        <DocumentationsTable
          documentationsData={documentations}
          onEdit={handleEdit}
          onView={handleView}
        />
      </Grid>

      <DocumentationForm
        open={isFormOpen}
        setOpen={setIsFormOpen}
        onSubmit={handleSubmit}
        documentation={selectedDocumentation}
      />

      <DocumentationDetailsDialog
        open={isViewDialogOpen}
        onClose={handleCloseViewDialog}
        documentation={selectedDocumentation}
      />
    </Grid>
  );
};

export default Documentations;
