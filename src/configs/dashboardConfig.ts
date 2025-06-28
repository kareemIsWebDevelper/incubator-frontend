import React from 'react';

// Define dashboard configuration types
export interface DashboardSection {
  id: string;
  title: string;
  component: React.ComponentType<any>;
  span: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  } | number;
  priority: 'high' | 'medium' | 'low';
  refreshInterval?: number;
  dependencies?: string[];
}

export interface DashboardConfig {
  sections: DashboardSection[];
  spacing: {
    xs: number;
    sm: number;
    md?: number;
    lg?: number;
  };
  refreshInterval: number;
  layout: 'default' | 'compact' | 'expanded';
  enableRealTimeUpdates: boolean;
  enableLazyLoading: boolean;
}

// Default dashboard configuration
export const DEFAULT_DASHBOARD_CONFIG: DashboardConfig = {
  sections: [
    {
      id: 'statistics',
      title: 'Statistics Overview',
      component: React.lazy(() => import('../views/dashboard/admin-dashboard/AdminStatisticsCards')),
      span: 12,
      priority: 'high',
    },
    {
      id: 'userRoles',
      title: 'User Roles Distribution',
      component: React.lazy(() => import('../views/dashboard/admin-dashboard/UserRolesChart')),
      span: { xs: 12, lg: 6 },
      priority: 'high',
    },
    {
      id: 'radialBar',
      title: 'Radial Bar Chart',
      component: React.lazy(() => import('../views/dashboard/admin-dashboard/RadialBarChart')),
      span: { xs: 12, md: 6 },
      priority: 'medium',
    },
    {
      id: 'tasksTracker',
      title: 'Tasks Tracker',
      component: React.lazy(() => import('../views/dashboard/admin-dashboard/TasksTracker')),
      span: { xs: 12, md: 6 },
      priority: 'medium',
    },
    {
      id: 'userGenders',
      title: 'User Genders Distribution',
      component: React.lazy(() => import('../views/dashboard/admin-dashboard/UserGendersChart')),
      span: 12,
      priority: 'medium',
    },
    {
      id: 'programStartups',
      title: 'Program Startups',
      component: React.lazy(() => import('../views/dashboard/admin-dashboard/ProgramStartupsChart')),
      span: 12,
      priority: 'medium',
    },
    {
      id: 'sdg',
      title: 'SDG Distribution',
      component: React.lazy(() => import('../views/dashboard/admin-dashboard/SdgChart')),
      span: 12,
      priority: 'low',
    },
    {
      id: 'usersDemographics',
      title: 'Users Demographics',
      component: React.lazy(() => import('../views/dashboard/admin-dashboard/UsersDemographicsChart')),
      span: 12,
      priority: 'medium',
    },
    {
      id: 'programsProgress',
      title: 'Programs Progress Over Time',
      component: React.lazy(() => import('../views/dashboard/admin-dashboard/ProgramsProgressChart')),
      span: 12,
      priority: 'medium',
    },
    {
      id: 'topStartupSectors',
      title: 'Top Startup Sectors',
      component: React.lazy(() => import('../views/dashboard/admin-dashboard/TopStartupSectorsChart')),
      span: { xs: 12, lg: 6 },
      priority: 'low',
    },
    {
      id: 'sectorBreakdown',
      title: 'Sector Breakdown',
      component: React.lazy(() => import('../views/dashboard/admin-dashboard/SectorBreakdownChart')),
      span: { xs: 12, lg: 6 },
      priority: 'low',
    },
    {
      id: 'startupHQ',
      title: 'Startup Headquarters',
      component: React.lazy(() => import('../views/dashboard/admin-dashboard/StartupHQChart')),
      span: { xs: 12, lg: 6 },
      priority: 'low',
    },
    {
      id: 'startupTargetMarket',
      title: 'Startup Target Market',
      component: React.lazy(() => import('../views/dashboard/admin-dashboard/StartupTargetMarketChart')),
      span: { xs: 12, lg: 6 },
      priority: 'low',
    },
    {
      id: 'startupDevelopmentStages',
      title: 'Startup Development Stages',
      component: React.lazy(() => import('../views/dashboard/admin-dashboard/StartupDevelopmentStagesChart')),
      span: { xs: 12, lg: 6 },
      priority: 'low',
    },
    {
      id: 'startupBusinessModel',
      title: 'Startup Business Model',
      component: React.lazy(() => import('../views/dashboard/admin-dashboard/StartupBusinessModelChart')),
      span: { xs: 12, lg: 6 },
      priority: 'low',
    },
  ],
  spacing: { xs: 4, sm: 6 },
  refreshInterval: 30000, // 30 seconds
  layout: 'default',
  enableRealTimeUpdates: true,
  enableLazyLoading: true,
};

// Utility functions
export const getSectionsByPriority = (config: DashboardConfig, priority: 'high' | 'medium' | 'low') => {
  return config.sections.filter(section => section.priority === priority);
};

export const getVisibleSections = (config: DashboardConfig, visibleSectionIds?: string[]) => {
  if (!visibleSectionIds) return config.sections;
  return config.sections.filter(section => visibleSectionIds.includes(section.id));
};

export default DEFAULT_DASHBOARD_CONFIG;
