// Next Imports
import type { Metadata } from "next";

// Component Imports
import FormsList from "@/views/forms-list";

// Data Imports
import { db } from "@/fake-db/pages/mentors";
import Mentors from "@/views/mentors";

export const metadata: Metadata = {
  title: "Mentors",
  description: "Mentors",
};

const MentorsPage = () => {
  return <Mentors mentors={db} />;
};

export default MentorsPage;
