import { ProjectType } from "@/types/projectTypes";
import { Card, CardContent, LinearProgress, Typography } from "@mui/material";
import moment from "moment";

interface ProjectDetailsTabProps {
  project: ProjectType;
}

export default function ProjectDetailsTab({ project }: ProjectDetailsTabProps) {
  // Calculate project progress (mock calculation)
  const today = new Date();
  const startDate = new Date(project.startDate);
  const endDate = new Date(project.endDate);
  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsedDuration = today.getTime() - startDate.getTime();
  const progress = Math.min(
    Math.max(Math.round((elapsedDuration / totalDuration) * 100), 0),
    100
  );

  // Determine progress color based on the completion percentage
  const getProgressColor = () => {
    if (progress < 30) return "bg-red-500";
    if (progress < 70) return "bg-amber-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="space-y-6">
          <div className="flex items-center gap-2">
            <i className="tabler tabler-clipboard-list text-primary text-xl"></i>
            <Typography variant="h6" fontWeight="bold">
              Project Overview
            </Typography>
          </div>
          <Typography variant="body2" color="text.secondary">
            Key information about this project
          </Typography>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                <i className="tabler tabler-chart-bar text-primary"></i>
                Progress
              </span>
              <span className="font-medium">{progress}%</span>
            </div>
            <LinearProgress
              variant="determinate"
              value={progress}
              className={`h-2 rounded-full ${getProgressColor()}`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <i className="tabler tabler-calendar text-primary mt-0.5" />
                From {moment(project.startDate).format("MMMM D, YYYY")} To{" "}
                {moment(project.endDate).format("MMMM D, YYYY")}
              </div>

              <div className="flex items-start gap-3">
                <i className="tabler tabler-cash text-primary mt-0.5"></i>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Budget
                  </h4>
                  <p className="font-medium">{project.budget}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <i className="tabler tabler-chart-circles text-primary mt-0.5"></i>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Status
                  </h4>
                  <p className="font-medium capitalize">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${
                        project.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : project.status === "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : project.status === "on-hold"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {project.status}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <i className="tabler tabler-id text-primary mt-0.5"></i>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Project ID
                  </h4>
                  <p className="font-medium">{project.id}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <i className="tabler tabler-file-description text-primary text-xl"></i>
            <Typography variant="h6" fontWeight="bold">
              Project Description
            </Typography>
          </div>
          <p className="text-gray-700 leading-relaxed">{project.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
