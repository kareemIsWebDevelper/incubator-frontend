// Next Imports
import type { Metadata } from "next";

// Component Imports
import FormsList from "@/views/forms-list";

// Data Imports
import { db } from "@/fake-db/apps/submissionList";
import Submissions from "@/views/submissions";

export const metadata: Metadata = {
  title: "Forms",
  description: "Forms",
};

const SubmissionsPage = () => {
  return <Submissions submissions={db} />;
};

export default SubmissionsPage;
