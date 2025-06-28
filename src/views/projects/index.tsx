"use client";

import React, { useState } from "react";
import { Grid } from "@mui/material";
import ListHeaderComponent from "@/components/ListHeaderComponent";
import ProjectFormDialog from "./ProjectFormDialog";
import ProjectCard from "./ProjectCard";
import { ProjectType } from "@/types/projectTypes";
import { useRouter } from "next/navigation";

type ProjectsProps = {
  projects: ProjectType[];
};

const Projects = ({ projects: initialProjects }: ProjectsProps) => {
  const router = useRouter();
  
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  );
  const [projects, setProjects] = useState<ProjectType[]>(initialProjects);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");

  const handleAddProject = () => {
    setSelectedProject(null);
    setDialogMode("add");
    setShowProjectDialog(true);
  };

  const handleEditProject = (id: string) => {
    const project = projects.find((project) => project.id === id);
    setSelectedProject(project || null);
    setDialogMode("edit");
    setShowProjectDialog(true);
  };

  const handleProjectSubmit = (projectData: ProjectType) => {
    if (dialogMode === "edit") {
      // Update existing project
      setProjects((prev) =>
        prev.map((project) =>
          project.id === projectData.id ? projectData : project
        )
      );
    } else {
      // Add new project
      setProjects((prev) => [...prev, projectData]);
    }
    setShowProjectDialog(false);
  };

  const handleDeleteProject = (projectId: string) => {
    // Remove the project from the projects state
    setProjects((prev) => prev.filter((project) => project.id !== projectId));
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ListHeaderComponent
          title="Projects"
          icon={
            <i className="tabler-brand-codesandbox text-primary text-3xl" />
          }
          count={projects.length}
          onAddNewClick={handleAddProject}
        />
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={3}>
          {projects.length > 0 &&
            projects.map((project) => (
              <Grid item xs={12} sm={6} md={3} lg={3} key={project.id}>
                <ProjectCard
                  project={project}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                  // onManage={() => router.push(`/projects/${project.id}`)}
                />
              </Grid>
            ))}
        </Grid>
      </Grid>

      {/* Project Form Dialog */}
      <ProjectFormDialog
        open={showProjectDialog}
        onClose={() => setShowProjectDialog(false)}
        project={selectedProject}
        onSubmit={handleProjectSubmit}
        mode={dialogMode}
      />
    </Grid>
  );
};

export default Projects;
