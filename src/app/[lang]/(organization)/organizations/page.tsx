// Next Imports
import type { Metadata } from "next";

// Component Imports

// Data Imports
import { db } from "@/fake-db/apps/formList";
import Organizations from "@/views/organizations";

export const metadata: Metadata = {
  title: "Organizations",
  description: "Organizations",
};

const OrganizationsPage = () => {
  return <Organizations />;
};

export default OrganizationsPage;
