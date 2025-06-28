"use client";

import React, { useState, useEffect } from "react";
import QuestionsCategoriesTable from "./QuestionsCategoriesTable";
import { Button, Grid, Typography } from "@mui/material";
import CategoryFormDialog from "./CategoryFormDialog";
import CategoryDetailsDialog from "./CategoryDetailsDialog";
import { QuestionCategoryType } from "@/types/questionCategoryTypes";
import { db as initialCategoriesData } from "@/fake-db/pages/questionCategories";

const QuestionCategories = ({
  data = initialCategoriesData,
}: {
  data?: QuestionCategoryType[];
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [categories, setCategories] = useState<Array<QuestionCategoryType>>(data);
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategoryType | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");

  // Update local state when props change
  useEffect(() => {
    setCategories(data);
  }, [data]);

  const handleSubmit = (categoryData: Partial<QuestionCategoryType & { organizationId?: string }>) => {
    // Mock organizations data to map organizationId to organization object
    const mockOrganizations = [
      { name: "Tech Innovators Inc.", id: "org-1", description: "A leading company in technology innovation and solutions." },
      { name: "Venture Labs", id: "org-2", description: "Accelerating startups through proven methodologies and frameworks." },
      { name: "FinanceFirst Corp", id: "org-3", description: "Financial consulting and management services for emerging businesses." },
      { name: "Market Insights Ltd", id: "org-4", description: "Providing deep market analysis and customer research solutions." },
      { name: "Entrepreneur Academy", id: "org-5", description: "Empowering entrepreneurs with skills and mindset development." },
      { name: "TechForward Solutions", id: "org-6", description: "Leading the way in technology innovation and digital transformation." },
      { name: "Leadership Excellence", id: "org-7", description: "Developing leadership skills and team management capabilities." },
      { name: "ProductCraft Studio", id: "org-8", description: "Expert product development and user experience design services." },
      { name: "Growth Marketing Hub", id: "org-9", description: "Driving growth through strategic sales and marketing initiatives." },
      { name: "Legal Advisory Partners", id: "org-10", description: "Comprehensive legal services and compliance solutions for businesses." },
    ];

    if (mode === "edit" && selectedCategory) {
      // Edit existing category
      const updatedCategoryData = { ...categoryData };
      
      // Handle organization data
      if (categoryData.organizationId) {
        const selectedOrg = mockOrganizations.find(org => org.id === categoryData.organizationId);
        if (selectedOrg) {
          updatedCategoryData.organization = {
            id: selectedOrg.id,
            name: selectedOrg.name,
            description: selectedOrg.description,
          };
        }
      }
      
      // Remove organizationId from the final data as it's not part of the category type
      delete updatedCategoryData.organizationId;
      
      const updatedCategories = categories.map((c) =>
        c.id === selectedCategory.id
          ? { ...selectedCategory, ...updatedCategoryData }
          : c
      );
      setCategories(updatedCategories);
    } else {
      // Add new category
      const newCategoryData = { ...categoryData };
      
      // Handle organization data for new category
      if (categoryData.organizationId) {
        const selectedOrg = mockOrganizations.find(org => org.id === categoryData.organizationId);
        if (selectedOrg) {
          newCategoryData.organization = {
            id: selectedOrg.id,
            name: selectedOrg.name,
            description: selectedOrg.description,
          };
        }
      }
      
      // Remove organizationId from the final data
      delete newCategoryData.organizationId;
      
      const newCategory = {
        id: `cat-${Date.now()}`,
        numberOfQuestions: 0,
        category: "Business", // Default category
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...newCategoryData,
      } as QuestionCategoryType;

      setCategories((prevCategories) => [
        newCategory,
        ...prevCategories,
      ]);
    }
    setIsFormOpen(false);
    setSelectedCategory(null);
  };

  const handleEdit = (category: QuestionCategoryType) => {
    setSelectedCategory(category);
    setMode("edit");
    setIsFormOpen(true);
  };

  const handleView = (category: QuestionCategoryType) => {
    setSelectedCategory(category);
    setIsViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setIsViewDialogOpen(false);
    setSelectedCategory(null);
  };

  const handleAddNew = () => {
    setSelectedCategory(null);
    setMode("add");
    setIsFormOpen(true);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={6} md={6} mb={2}>
        <Typography variant="h4" fontWeight="bold">Question Categories</Typography>
      </Grid>
      <Grid item xs={6} md={6} sx={{ textAlign: "right", mb: 2 }}>
        <Button
          variant="contained"
          onClick={handleAddNew}
          startIcon={<i className="tabler-plus" />}
        >
          New Category
        </Button>
      </Grid>
      <Grid item xs={12}>
        <QuestionsCategoriesTable
          categoriesData={categories}
          onEdit={handleEdit}
          onView={handleView}
        />
      </Grid>

      <CategoryFormDialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        category={selectedCategory}
        mode={mode}
      />

      <CategoryDetailsDialog
        open={isViewDialogOpen}
        onClose={handleCloseViewDialog}
        category={selectedCategory}
      />
    </Grid>
  );
};

export default QuestionCategories;
