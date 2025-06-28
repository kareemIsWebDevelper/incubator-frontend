// Next Imports
import type { Metadata } from "next";
import Startups from "@/views/startups";

export const metadata: Metadata = {
  title: "Startups",
  description: "Startups",
};

const StartupsPage = () => {
  return <Startups />;
};

export default StartupsPage;
