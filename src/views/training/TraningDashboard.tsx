"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "next/link";
import { Typography, Box, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { getLocalizedUrl } from "@/utils/i18n";
import { useParams } from "next/navigation";
import { Locale } from "@/configs/i18n";

const TrainingDashboard = () => {
  const { lang: locale } = useParams();

  return (
    <div className="space-y-8 p-6">
      <Typography variant="h4" fontWeight="bold" className="mb-6">
        Training Dashboard
      </Typography>

      {/* Stat Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300"
          elevation={2}
        >
          <Box className="h-1 bg-primary" />
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Typography variant="h6" fontWeight="bold" color="primary">
                Total Trainings
              </Typography>
              <i className="tabler-school h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold mt-2">24</div>
            <div className="flex items-center gap-1 mt-1">
              <i className="tabler-arrow-up-right h-4 w-4 text-green-500" />
              <p className="text-sm text-green-500">+2 from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300"
          elevation={2}
        >
          <Box className="h-1 bg-blue-500" />
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Typography variant="h6" fontWeight="bold" color="info.main">
                Active Courses
              </Typography>
              <i className="tabler-book h-8 w-8 text-blue-500" />
            </div>
            <div className="text-3xl font-bold mt-2">12</div>
            <div className="flex items-center gap-1 mt-1">
              <i className="tabler-arrow-up-right h-4 w-4 text-green-500" />
              <p className="text-sm text-green-500">+3 from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300"
          elevation={2}
        >
          <Box className="h-1 bg-purple-500" />
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Typography variant="h6" fontWeight="bold" color="secondary.main">
                Participants
              </Typography>
              <i className="tabler-users h-8 w-8 text-purple-500" />
            </div>
            <div className="text-3xl font-bold mt-2">142</div>
            <div className="flex items-center gap-1 mt-1">
              <i className="tabler-arrow-up-right h-4 w-4 text-green-500" />
              <p className="text-sm text-green-500">+18 from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300"
          elevation={2}
        >
          <Box className="h-1 bg-amber-500" />
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Typography variant="h6" fontWeight="bold" color="warning.main">
                Completion Rate
              </Typography>
              <i className="tabler-chart-line h-8 w-8 text-amber-500" />
            </div>
            <div className="text-3xl font-bold mt-2">87%</div>
            <div className="flex items-center gap-1 mt-1">
              <i className="tabler-arrow-up-right h-4 w-4 text-green-500" />
              <p className="text-sm text-green-500">+2% from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Divider className="my-8" />

      {/* Navigation Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href={getLocalizedUrl("/training/sessions", locale as Locale)}
          className="group no-underline"
        >
          <Card className="border-none transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 h-full">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <Typography variant="h6" fontWeight="bold" color="primary">
                  Trainings Sessions
                </Typography>
                <Typography
                  variant="body2"
                  className="mt-2 text-muted-foreground"
                >
                  Manage all training programs
                </Typography>
              </div>
              <div className="flex items-center justify-center h-40 bg-indigo-500/5 rounded-lg mt-4 group-hover:bg-primary/10 transition-colors duration-300">
                <i className="tabler-school h-16 w-16 text-indigo-500/70" />
              </div>
              <div className="flex items-center justify-end mt-4 text-primary opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <Typography variant="body2" fontWeight="medium">
                  View all trainings
                </Typography>
                <i className="tabler-arrow-right ml-1 h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href={getLocalizedUrl("/training/courses", locale as Locale)} className="group no-underline">
          <Card className="border-none transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 h-full">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <Typography variant="h6" fontWeight="bold" color="info.main">
                  Training Courses
                </Typography>
                <Typography
                  variant="body2"
                  className="mt-2 text-muted-foreground"
                >
                  Manage course catalog and content
                </Typography>
              </div>
              <div className="flex items-center justify-center h-40 bg-blue-500/5 rounded-lg mt-4 group-hover:bg-blue-500/10 transition-colors duration-300">
                <i className="tabler-book h-16 w-16 text-blue-500/70" />
              </div>
              <div className="flex items-center justify-end mt-4 text-blue-500 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <Typography variant="body2" fontWeight="medium">
                  Browse courses
                </Typography>
                <i className="tabler-arrow-right ml-1 h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/results" className="group no-underline">
          <Card className="border-none transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 h-full">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <Typography variant="h6" fontWeight="bold" color="violet">
                  Training Results
                </Typography>
                <Typography
                  variant="body2"
                  className="mt-2 text-muted-foreground"
                >
                  View and analyze training outcomes
                </Typography>
              </div>
              <div className="flex items-center justify-center h-40 bg-purple-500/5 rounded-lg mt-4 group-hover:bg-purple-500/10 transition-colors duration-300">
                <i className="tabler-chart-line h-16 w-16 text-purple-500/70" />
              </div>
              <div className="flex items-center justify-end mt-4 text-purple-500 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <Typography variant="body2" fontWeight="medium">
                  View results
                </Typography>
                <i className="tabler-arrow-right ml-1 h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default TrainingDashboard;
