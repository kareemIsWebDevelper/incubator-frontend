// Next Imports
import type { Metadata } from "next";

// Component Imports
import ServiceCategories from "@/views/services/service-categories";

export const metadata: Metadata = {
  title: "Service Categories",
  description: "Services Categories",
};

const ServicesCategoriesPage = () => {
  return <ServiceCategories />;
};

export default ServicesCategoriesPage;
