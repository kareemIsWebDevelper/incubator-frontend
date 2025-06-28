// MUI Imports
import { Card, CardContent, Chip, Typography } from "@mui/material";

const program = {
  id: "1",
  name: "Accelerator Program 2024",
  description:
    "Intensive 12-week program designed to accelerate early-stage startups",
  duration: "12 weeks",
  startDate: "2024-01-15",
  endDate: "2024-04-15",
  currentStep: 6,
  totalSteps: 10,
  progress: 60,
};

const programSteps = [
  {
    id: "1",
    name: "Program Orientation",
    description: "Introduction to the program and team building",
    status: "completed",
    dueDate: "2024-01-20",
    completedDate: "2024-01-18",
  },
  {
    id: "2",
    name: "Market Research & Validation",
    description:
      "Conduct thorough market analysis and validate your business idea",
    status: "completed",
    dueDate: "2024-02-01",
    completedDate: "2024-01-30",
  },
  {
    id: "3",
    name: "Business Model Development",
    description: "Create and refine your business model canvas",
    status: "completed",
    dueDate: "2024-02-10",
    completedDate: "2024-02-08",
  },
  {
    id: "4",
    name: "MVP Development",
    description: "Build your minimum viable product",
    status: "completed",
    dueDate: "2024-02-25",
    completedDate: "2024-02-23",
  },
  {
    id: "5",
    name: "User Testing & Feedback",
    description: "Test your MVP with real users and gather feedback",
    status: "completed",
    dueDate: "2024-03-05",
    completedDate: "2024-03-03",
  },
  {
    id: "6",
    name: "Financial Planning",
    description: "Develop financial projections and funding strategy",
    status: "in-progress",
    dueDate: "2024-03-15",
  },
  {
    id: "7",
    name: "Marketing Strategy",
    description: "Create comprehensive marketing and go-to-market strategy",
    status: "upcoming",
    dueDate: "2024-03-25",
  },
  {
    id: "8",
    name: "Legal & Compliance",
    description: "Handle legal requirements and compliance issues",
    status: "upcoming",
    dueDate: "2024-04-01",
  },
  {
    id: "9",
    name: "Pitch Preparation",
    description: "Prepare for final pitch presentation",
    status: "upcoming",
    dueDate: "2024-04-10",
  },
  {
    id: "10",
    name: "Demo Day",
    description: "Present your startup to investors and stakeholders",
    status: "upcoming",
    dueDate: "2024-04-15",
  },
];

const ProgramSteps = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <i className="tabler-circle-check h-5 w-5 text-emerald-500" />;
      case "in-progress":
        return <i className="tabler-clock h-5 w-5 text-amber-500" />;
      case "cancelled":
        return <i className="tabler-circle-x h-5 w-5 text-red-500" />;
      default:
        return <i className="tabler-circle h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="flex items-center space-x-3 mb-6">
          <i className="tabler-target h-6 w-6 text-primary" />
          <Typography variant="h5" fontWeight="bold">Program Progress</Typography>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {program.name}
            </h3>
            <p className="text-gray-600">{program.description}</p>
          </div>
          <div className="text-right min-w-24 mis-20">
            <div className="text-2xl font-bold text-indigo-600">
              {program.progress}%
            </div>
            <div className="text-sm text-gray-500">
              Step {program.currentStep} of {program.totalSteps}
            </div>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div
            className="bg-gradient-to-r from-primary to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${program.progress}%` }}
          ></div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Recent Steps</h4>
          {programSteps.slice(0, 4).map((step, index) => (
            <div key={step.id} className="flex items-center space-x-3">
              {getStatusIcon(step.status)}
              <div className="flex-grow">
                <p className="text-sm font-medium text-gray-900">{step.name}</p>
                <p className="text-xs text-gray-500">
                  Due: {new Date(step.dueDate).toLocaleDateString()}
                </p>
              </div>
              <Chip
                label={step.status.replace("-", " ")}
                variant="tonal"
                className="rounded-full capitalize"
                size="small"
                color={
                  step.status === "completed"
                    ? "success"
                    : step.status === "in-progress"
                      ? "warning"
                      : "secondary"
                }
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramSteps;
