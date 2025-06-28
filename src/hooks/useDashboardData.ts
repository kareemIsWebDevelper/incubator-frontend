import { useState, useEffect, useCallback } from 'react';

export interface DashboardData {
  statistics: any;
  userRoles: any[];
  charts: any;
  loading: boolean;
  error: string | null;
  lastUpdated: Date;
}

export const useDashboardData = (refreshInterval: number = 30000) => {
  const [data, setData] = useState<DashboardData>({
    statistics: null,
    userRoles: [],
    charts: null,
    loading: true,
    error: null,
    lastUpdated: new Date(),
  });

  const fetchDashboardData = useCallback(async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));
      
      // Simulate API calls - replace with actual API endpoints
      const [statisticsResponse, userRolesResponse, chartsResponse] = await Promise.all([
        // fetch('/api/dashboard/statistics'),
        // fetch('/api/dashboard/user-roles'),
        // fetch('/api/dashboard/charts'),
        
        // Simulated responses
        new Promise(resolve => setTimeout(() => resolve({ data: 'statistics' }), 500)),
        new Promise(resolve => setTimeout(() => resolve({ data: ['roles'] }), 700)),
        new Promise(resolve => setTimeout(() => resolve({ data: 'charts' }), 600)),
      ]);

      setData(prev => ({
        ...prev,
        statistics: statisticsResponse,
        userRoles: userRolesResponse as any[],
        charts: chartsResponse,
        loading: false,
        lastUpdated: new Date(),
      }));
    } catch (error) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load dashboard data',
      }));
    }
  }, []);

  const refreshData = useCallback(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    fetchDashboardData();

    if (refreshInterval > 0) {
      const interval = setInterval(fetchDashboardData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchDashboardData, refreshInterval]);

  return {
    ...data,
    refreshData,
  };
};

export default useDashboardData;
