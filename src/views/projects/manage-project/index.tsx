import ProjectTabs from "./ProjectTabs";
import ProjectDetailsTab from "./ProjectDetailsTab";
import ProjectProgramsTab from "./ProjectProgramsTab";
import ProjectTeamTab from "./ProjectTeamsTab";
import moment from "moment";
import CustomChip from "@/@core/components/mui/Chip";
import { ProjectType } from "@/types/projectTypes";

const getBadgeColor = (status: string) => {
  switch (status) {
    case "active":
      return "primary";
    case "inactive":
      return "error";
    case "pending":
      return "warning";
    default:
      return "default";
  }
};

const ManageProject = ({ project }: { project: ProjectType }) => {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {project.title}
            </h1>
            <p className="text-muted-foreground mt-1">{project.description}</p>
          </div>
          <CustomChip
            color={getBadgeColor(project.status)}
            variant="tonal"
            label={
              project.status.charAt(0).toUpperCase() + project.status.slice(1)
            }
          />
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <i className="tabler-calendar h-4 w-4" />
            <span>
              From {moment(project.startDate).format("MMM D, YYYY")} To{" "}
              {moment(project.endDate).format("MMM D, YYYY")}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <i className="tabler-users h-4 w-4" />
            <span>{project?.teamMembers?.length} Team Members</span>
          </div>
          <div className="flex items-center gap-1">
            <i className="tabler-briefcase h-4 w-4" />
            <span>{project.programsCount} Programs</span>
          </div>
        </div>
      </div>

      <ProjectTabs>
        <ProjectDetailsTab project={project} />
        <ProjectProgramsTab project={project} />
        <ProjectTeamTab project={project} />
      </ProjectTabs>
    </div>
  );
};

export default ManageProject;
