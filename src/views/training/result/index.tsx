import Badge from "@/@core/components/mui/Badge";
import CustomChip from "@/@core/components/mui/Chip";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
} from "@mui/material";

interface Startup {
  id: string;
  name: string;
  owner: {
    name: string;
    email: string;
    avatar?: string;
  };
  progress: number;
  completedAt?: string;
}

interface Training {
  id: string;
  title: string;
  description: string;
  step: {
    id: string;
    name: string;
    order: number;
  };
  program: {
    id: string;
    name: string;
    description: string;
  };
  assignedStartups: Startup[];
}

// Mock data
const trainingData: Training = {
  id: "training-001",
  title: "Market Research & Validation",
  description:
    "Learn how to conduct comprehensive market research and validate your business idea through customer interviews and data analysis.",
  step: {
    id: "step-002",
    name: "Market Analysis",
    order: 2,
  },
  program: {
    id: "program-001",
    name: "Startup Accelerator Program 2024",
    description: "12-week intensive program for early-stage startups",
  },
  assignedStartups: [
    {
      id: "startup-001",
      name: "TechFlow Solutions",
      owner: {
        name: "Sarah Chen",
        email: "sarah@techflow.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      progress: 100,
      completedAt: "2024-01-15",
    },
    {
      id: "startup-002",
      name: "EcoGreen Innovations",
      owner: {
        name: "Marcus Rodriguez",
        email: "marcus@ecogreen.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      progress: 100,
      completedAt: "2024-01-18",
    },
    {
      id: "startup-003",
      name: "HealthTech Pro",
      owner: {
        name: "Dr. Emily Watson",
        email: "emily@healthtech.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      progress: 75,
    },
    {
      id: "startup-004",
      name: "FinanceAI",
      owner: {
        name: "Alex Thompson",
        email: "alex@financeai.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      progress: 0,
    },
    {
      id: "startup-005",
      name: "EdTech Pioneers",
      owner: {
        name: "Lisa Park",
        email: "lisa@edtechpioneers.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      progress: 100,
      completedAt: "2024-01-20",
    },
    {
      id: "startup-006",
      name: "Smart Logistics",
      owner: {
        name: "David Kumar",
        email: "david@smartlogistics.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      progress: 45,
    },
  ],
};

function getStatusBadge(progress: number) {
  if (progress === 100) {
    return (
      <CustomChip
        label={"Completed"}
        variant="tonal"
        color="success"
        icon={<i className="tabler-clock w-3 h-3" />}
        size="small"
      />
    );
  } else if (progress > 0) {
    return (
      <CustomChip
        label={"In Progress"}
        variant="tonal"
        color="info"
        icon={<i className="tabler-clock w-3 h-3" />}
        size="small"
      />
    );
  } else {
    return (
      <CustomChip
        label={"Not Started"}
        variant="tonal"
        color="default"
        icon={<i className="tabler-clock w-3 h-3" />}
        size="small"
      />
    );
  }
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const TrainingResultPage = () => {
  const completedCount = trainingData.assignedStartups.filter(
    (s) => s.progress === 100
  ).length;
  const inProgressCount = trainingData.assignedStartups.filter(
    (s) => s.progress > 0 && s.progress < 100
  ).length;
  const notStartedCount = trainingData.assignedStartups.filter(
    (s) => s.progress === 0
  ).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {trainingData.title}
              </h1>
              <p className="text-gray-600 mt-2">{trainingData.description}</p>
            </div>

            <div className="mt-3 flex flex-col lg:flex-row lg:items-center max-sm:space-y-2 lg:space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <i className="tabler-book w-4 h-4 text-primary"></i>
                <span>Program: {trainingData.program.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="tabler-target w-4 h-4 text-primary"></i>

                <span>
                  Step {trainingData.step.order}: {trainingData.step.name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="tabler-users w-4 h-4 text-primary"></i>
                <span>
                  {trainingData.assignedStartups.length} Startups Assigned
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <Card>
          <CardHeader title="Completed" className="pb-3" />
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {completedCount}
            </div>
            <p className="text-xs text-gray-500">
              {(
                (completedCount / trainingData.assignedStartups.length) *
                100
              ).toFixed(0)}
              % of startups
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="In Progress" className="pb-3" />
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {inProgressCount}
            </div>
            <p className="text-xs text-gray-500">
              {(
                (inProgressCount / trainingData.assignedStartups.length) *
                100
              ).toFixed(0)}
              % of startups
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Not Started" className="pb-3"></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-400">
              {notStartedCount}
            </div>
            <p className="text-xs text-gray-500">
              {(
                (notStartedCount / trainingData.assignedStartups.length) *
                100
              ).toFixed(0)}
              % of startups
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Startup Progress List */}
      <Card>
        <CardHeader
          title="Startup Progress"
          subheader="Training completion status for all assigned startups"
        />
        <CardContent>
          <div className="space-y-4">
            {trainingData.assignedStartups.map((startup) => (
              <div
                key={startup.id}
                className="flex flex-wrap max-sm:space-y-4 items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex lg:items-center space-x-4 flex-1">
                  <Avatar
                    src={startup.owner.avatar || "/placeholder.svg"}
                    alt={startup.owner.name}
                    sx={{ width: 40, height: 40 }}
                  >
                    {getInitials(startup.owner.name)}
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col lg:flex-row lg:items-center max-sm:space-y-2 lg:space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {startup.name}
                      </h3>
                      {getStatusBadge(startup.progress)}
                    </div>
                    <p className="text-sm text-gray-600">
                      Owner: {startup.owner.name} • {startup.owner.email}
                    </p>
                    {startup.completedAt && (
                      <p className="text-xs text-gray-500">
                        Completed on{" "}
                        {new Date(startup.completedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4 min-w-0 w-full lg:w-48">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        Progress
                      </span>
                      <span className="text-sm text-gray-600">
                        {startup.progress}%
                      </span>
                    </div>
                    <LinearProgress
                      variant="determinate"
                      value={startup.progress}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingResultPage;
