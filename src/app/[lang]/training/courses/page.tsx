// Next Imports
import type { Metadata } from "next";

// Components Imports
import TrainingCourses from "@/views/training/courses";

export const metadata: Metadata = {
  title: "Training Courses",
  description: "Training Courses",
};

const TrainingCoursesPage = () => {
  return <TrainingCourses />;
};

export default TrainingCoursesPage;
