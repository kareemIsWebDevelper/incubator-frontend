// Next Imports
import type { Metadata } from "next";

// Component Imports

// Component Imports
import FormBuilder from "@/views/form-builder";

export const metadata: Metadata = {
  title: "Form Builder",
  description: "Form Builder",
};

const FormBuilderPage = () => {
  return <FormBuilder />;
};

export default FormBuilderPage;
