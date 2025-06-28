import ProgramReportDashboard from "@/views/programs/report-dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Program Report",
  description: "Detailed report of the program's performance and outcomes",
};

export default function ProgramReportPage() {
  return (
    <div>
      <ProgramReportDashboard />
    </div>
  );
}