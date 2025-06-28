import type { Metadata } from "next";
import ProgramForm from "@/views/programs/ProgramForm";
import { db } from "@/fake-db/pages/program";
import { ProgramType } from "@/types/programTypes";

export const metadata: Metadata = {
  title: "Edit Program",
  description: "Edit Program",
};

const EditProgramPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  
  const program = db.find((program: ProgramType) => program.id === +id);

  return <ProgramForm mode="edit" program={program} />;
};

export default EditProgramPage;
