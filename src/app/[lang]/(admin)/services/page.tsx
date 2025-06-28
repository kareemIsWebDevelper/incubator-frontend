// Next Imports
import type { Metadata } from "next";

// Component Imports
import Services from "@/views/services";

// Data Imports
import { db } from "@/fake-db/pages/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Services",
};

const ServicesPage = () => {
  return <Services data={db} />;
};

export default ServicesPage;
