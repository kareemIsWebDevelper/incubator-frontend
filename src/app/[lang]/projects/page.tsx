// Next Imports
import type { Metadata } from "next";

// Components Imports
import Projects from "@/views/projects";

// Data Imports
import { db } from "@/fake-db/pages/projects";

// Types Imports
import { ProjectType } from "@/types/projectTypes";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects",
};

const ProjectsPage = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Projects projects={db as ProjectType[]} />
    </Suspense>
  );
};

export default ProjectsPage;
