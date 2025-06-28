import type { Metadata } from "next";
import ProgramForm from "@/views/programs/ProgramForm";

export const metadata: Metadata = {
  title: "New Program",
  description: "New Program",
};

const NewProgramPage = () => {
  return <ProgramForm mode="new" />;
};

export default NewProgramPage;
