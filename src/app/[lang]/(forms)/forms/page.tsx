// Next Imports
import type { Metadata } from "next";

// Component Imports
import FormsList from "@/views/forms-list";

// Data Imports
import { db } from "@/fake-db/apps/formList";

export const metadata: Metadata = {
  title: "Forms",
  description: "Forms",
};

const FormsPage = () => {
  return <FormsList formsData={db} />;
};

export default FormsPage;
