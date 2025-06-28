import { db } from "@/fake-db/pages/program";
import { ProgramType } from "@/types/programTypes";
import NotFound from "@/views/NotFound";
import ProgramDetailsCard from "@/views/programs/ProgramDetailsCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Program Details",
  description: "Program Details",
};

const ProgramDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const program = db.find((program: ProgramType) => program.id === +id);

  if (!program) {
    return <NotFound mode={"light"} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ProgramDetailsCard program={program} />
    </div>
  );
};

export default ProgramDetailsPage;
