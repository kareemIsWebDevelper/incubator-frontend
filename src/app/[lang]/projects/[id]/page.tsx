import { db } from "@/fake-db/pages/projects";
import { ProjectType } from "@/types/projectTypes";
import ManageProject from "@/views/projects/manage-project";
// import { notFound } from "next/navigation";
import React from "react";

const ManageProjectPage = async ({ params }: { params: { id: string } }) => {
  const projects: Array<ProjectType> = db;

  const project: ProjectType | undefined = projects.find(
    (project) => project.id === params.id
  );

  return <ManageProject project={project as ProjectType} />;
};

export default ManageProjectPage;
