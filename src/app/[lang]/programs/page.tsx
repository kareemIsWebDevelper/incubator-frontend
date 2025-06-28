import type { Metadata } from "next";
import Programs from "@/views/programs";

export const metadata: Metadata = {
  title: "Programs",
  description: "Programs",
};

const ProgramsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Programs />
    </div>
  );
};

export default ProgramsPage;
