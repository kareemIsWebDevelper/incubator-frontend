// Next Imports
import type { Metadata } from "next";

// Component Imports
import ServiceRequests from "@/views/services/services-requests";

export const metadata: Metadata = {
  title: "Services Requests",
  description: "Services Requests",
};

const ServicesRequestsPage = () => {
  return <ServiceRequests />;
};

export default ServicesRequestsPage;
