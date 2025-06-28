"use client";

import React from "react";
import { useAppSelector } from "@/store";
import dynamic from "next/dynamic";

const DashboardRouter = () => {
  const { user } = useAppSelector((state) => state.user);

  if (!user) {
    return null;
  }

  if (user.role === "Admin") {
    const AdminDashboard = dynamic(
      () => import("@/views/dashboard/admin-dashboard"),
      { ssr: false }
    );

    return <AdminDashboard />;
  }

  if (user.role === "Startup") {
    const StartupDashboard = dynamic(
      () => import("@/views/dashboard/starup-dashboard"),
      { ssr: false }
    );
    
    return <StartupDashboard />;
  }
  
  if (user.role === "Mentor") {
    const MentorDashboard = dynamic(
      () => import("@/views/dashboard/mentor-dashboard"),
      { ssr: false }
    );

    return <MentorDashboard />;
  }

  return <div>DashboardRouter</div>;
};

export default DashboardRouter;
