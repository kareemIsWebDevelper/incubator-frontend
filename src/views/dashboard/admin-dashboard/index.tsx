// React Imports
import React, { Suspense, useState, useEffect } from "react";

// MUI Imports
import { Grid, CircularProgress, Box, Typography, Alert } from "@mui/material";

// Types
import type { DashboardProps } from "@/types/dashboardTypes";

// Components
import DashboardErrorBoundary from "@/components/DashboardErrorBoundary";

// Styles
import "./dashboard.css";

// Component Imports - Lazy loaded for better performance
const AdminStatisticsCards = React.lazy(() => import("./AdminStatisticsCards"));
const UserRolesChart = React.lazy(() => import("./UserRolesChart"));
const UserGendersChart = React.lazy(() => import("./UserGendersChart"));
const RadialBarChart = React.lazy(() => import("./RadialBarChart"));
const TasksTracker = React.lazy(() => import("./TasksTracker"));
const ProgramStartupsChart = React.lazy(() => import("./ProgramStartupsChart"));
const SdgChart = React.lazy(() => import("./SdgChart"));
const UsersDemographicsChart = React.lazy(
  () => import("./UsersDemographicsChart")
);
const TopStartupSectorsChart = React.lazy(
  () => import("./TopStartupSectorsChart")
);
const SectorBreakdownChart = React.lazy(() => import("./SectorBreakdownChart"));
const StartupHQChart = React.lazy(() => import("./StartupHQChart"));
const StartupTargetMarketChart = React.lazy(
  () => import("./StartupTargetMarketChart")
);
const StartupDevelopmentStagesChart = React.lazy(
  () => import("./StartupDevelopmentStagesChart")
);
const StartupBusinessModelChart = React.lazy(
  () => import("./StartupBusinessModelChart")
);
const ProgramsProgressChart = React.lazy(
  () => import("./ProgramsProgressChart")
);

// Dashboard Loading Component
const DashboardSkeleton = () => (
  <Grid container spacing={{ xs: 4, sm: 6 }}>
    {[...Array(15)].map((_, index) => (
      <Grid item xs={12} lg={index === 0 ? 12 : 6} key={index}>
        <Box
          className="dashboard-skeleton-item"
          sx={{
            height: index === 0 ? 120 : 300,
            bgcolor: "grey.100",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </Grid>
    ))}
  </Grid>
);

// Error Boundary Component
const ErrorBoundary = ({
  error,
  retry,
}: {
  error: string;
  retry: () => void;
}) => (
  <Alert
    severity="error"
    action={
      <Box>
        <Typography
          variant="button"
          onClick={retry}
          sx={{ cursor: "pointer", textDecoration: "underline" }}
        >
          Retry
        </Typography>
      </Box>
    }
  >
    {error}
  </Alert>
);

// Section Components for better organization
const StatisticsSection = React.memo(() => (
  <Grid item xs={12} role="region" aria-labelledby="statistics-heading">
    <Typography id="statistics-heading" variant="h3" className="sr-only">
      Statistics Overview
    </Typography>
    <AdminStatisticsCards />
  </Grid>
));

const UserAnalyticsSection = React.memo(() => (
  <>
    {/* User Roles Chart - Responsive sizing */}
    <Grid
      item
      xs={12}
      lg={6}
      role="region"
      aria-labelledby="user-roles-heading"
    >
      <Typography id="user-roles-heading" variant="h3" className="sr-only">
        User Roles Distribution
      </Typography>
      <UserRolesChart />
    </Grid>

    {/* Right column with multiple charts */}
    <Grid
      item
      xs={12}
      lg={6}
      role="region"
      aria-labelledby="user-analytics-heading"
    >
      <Typography id="user-analytics-heading" variant="h3" className="sr-only">
        User Analytics
      </Typography>
      <Grid container spacing={{ xs: 4, sm: 6 }}>
        {/* Small charts - Stack on mobile, side by side on tablet+ */}
        <Grid item xs={12} md={6}>
          <RadialBarChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <TasksTracker />
        </Grid>
        {/* Gender chart - Full width in this column */}
        <Grid item xs={12}>
          <UserGendersChart />
        </Grid>
      </Grid>
    </Grid>
  </>
));

const ProgramAnalyticsSection = React.memo(() => (
  <>
    <Grid item xs={12} role="region" aria-labelledby="program-startups-heading">
      <Typography
        id="program-startups-heading"
        variant="h3"
        className="sr-only"
      >
        Program Startups Overview
      </Typography>
      <ProgramStartupsChart />
    </Grid>
    <Grid item xs={12} role="region" aria-labelledby="sdg-heading">
      <Typography id="sdg-heading" variant="h3" className="sr-only">
        SDG Distribution
      </Typography>
      <SdgChart />
    </Grid>
    <Grid item xs={12} role="region" aria-labelledby="demographics-heading">
      <Typography id="demographics-heading" variant="h3" className="sr-only">
        User Demographics
      </Typography>
      <UsersDemographicsChart />
    </Grid>

    {/* Programs Progress Over Time Chart - Full width */}
    <Grid
      item
      xs={12}
      role="region"
      aria-labelledby="programs-progress-heading"
    >
      <Typography
        id="programs-progress-heading"
        variant="h3"
        className="sr-only"
      >
        Programs Progress Over Time
      </Typography>
      <ProgramsProgressChart />
    </Grid>
  </>
));

const StartupAnalyticsSection = React.memo(() => (
  <>
    {/* Startup Sectors Row - Two chart columns */}
    <Grid
      item
      xs={12}
      lg={6}
      role="region"
      aria-labelledby="startup-sectors-heading"
    >
      <Typography id="startup-sectors-heading" variant="h3" className="sr-only">
        Top Startup Sectors
      </Typography>
      <TopStartupSectorsChart />
    </Grid>
    <Grid item xs={12} lg={6}>
      <SectorBreakdownChart />
    </Grid>

    {/* Startup HQ and Target Market Row - Two chart columns */}
    <Grid
      item
      xs={12}
      lg={6}
      role="region"
      aria-labelledby="startup-hq-heading"
    >
      <Typography id="startup-hq-heading" variant="h3" className="sr-only">
        Startup Headquarters Distribution
      </Typography>
      <StartupHQChart />
    </Grid>
    <Grid item xs={12} lg={6}>
      <StartupTargetMarketChart />
    </Grid>

    {/* Startup Development Stages and Business Model Row - Two chart columns */}
    <Grid
      item
      xs={12}
      lg={6}
      role="region"
      aria-labelledby="development-stages-heading"
    >
      <Typography
        id="development-stages-heading"
        variant="h3"
        className="sr-only"
      >
        Startup Development Stages
      </Typography>
      <StartupDevelopmentStagesChart />
    </Grid>
    <Grid item xs={12} lg={6}>
      <StartupBusinessModelChart />
    </Grid>
  </>
));

const AdminDashboard: React.FC<DashboardProps> = React.memo(
  ({
    refreshInterval = 30000,
    layout = "default",
    visibleSections,
    enableRealTimeUpdates = true,
    onError,
  }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    // Handle errors and report them
    const handleError = (err: Error) => {
      const errorMessage =
        err.message || "Failed to load dashboard data. Please try again.";
      setError(errorMessage);

      if (onError) {
        onError(err);
      }

      console.error("Dashboard Error:", err);
    };

    // Simulate data loading and setup refresh interval
    useEffect(() => {
      const loadDashboard = async () => {
        try {
          setLoading(true);
          setError(null);

          // Simulate API call delay
          await new Promise((resolve) => setTimeout(resolve, 1500));

          setLoading(false);
          setLastUpdated(new Date());
        } catch (err) {
          handleError(err as Error);
          setLoading(false);
        }
      };

      loadDashboard();

      // Set up refresh interval only if real-time updates are enabled
      if (enableRealTimeUpdates && refreshInterval > 0) {
        const interval = setInterval(() => {
          setLastUpdated(new Date());
          // Here you would refresh dashboard data
        }, refreshInterval);

        return () => clearInterval(interval);
      }
    }, [refreshInterval, enableRealTimeUpdates]);

    const retryLoad = () => {
      setError(null);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setLastUpdated(new Date());
      }, 1500);
    };

    if (loading) {
      return <DashboardSkeleton />;
    }

    if (error) {
      return <ErrorBoundary error={error} retry={retryLoad} />;
    }

    return (
      <DashboardErrorBoundary onError={handleError}>
        <Suspense fallback={<DashboardSkeleton />}>
          <Box
            role="main"
            aria-label="Admin Dashboard"
            className="dashboard-container"
          >
            {/* Dashboard Header with Last Updated */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
              className="dashboard-header"
            >
              <div className="flex items-center gap-2">
                <i className="tabler-dashboard h-6 w-6 text-primary" />
                <Typography variant="h4" component="h1" fontWeight="bold">
                  Admin Dashboard
                </Typography>
              </div>
              {enableRealTimeUpdates && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  className="dashboard-last-updated"
                >
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </Typography>
              )}
            </Box>

            <Grid container spacing={{ xs: 4, sm: 6 }}>
              <StatisticsSection />
              <UserAnalyticsSection />
              <ProgramAnalyticsSection />
              <StartupAnalyticsSection />
            </Grid>
          </Box>
        </Suspense>
      </DashboardErrorBoundary>
    );
  }
);

// Add display names for better debugging
AdminDashboard.displayName = "AdminDashboard";
StatisticsSection.displayName = "StatisticsSection";
UserAnalyticsSection.displayName = "UserAnalyticsSection";
ProgramAnalyticsSection.displayName = "ProgramAnalyticsSection";
StartupAnalyticsSection.displayName = "StartupAnalyticsSection";

export default AdminDashboard;
