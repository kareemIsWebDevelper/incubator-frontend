"use client";

import React, { useMemo } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Typography,
} from "@mui/material";
import { ProgramType } from "@/types/programTypes";
import Image from "next/image";
import CustomChip from "@core/components/mui/Chip";
import { isMobile } from "@/utils";
import StatItem from "@/components/StatItem";
import OptionMenu from "@core/components/option-menu";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";

interface ProgramDetailsCardProps {
  program: ProgramType;
}

const ProgramDetailsCard: React.FC<ProgramDetailsCardProps> = ({ program }) => {
  const {
    title,
    stats,
    organization,
    responsiblePersons = [],
    description = "",
    progressPercent = 0,
    progressTasksDone = 0,
    progressTasksTotal = 0,
    duration,
    logoUrl = "",
  } = program;

  // Stats array of key-value pairs
  const statsList = stats ? Object.entries(stats) : [];

  const { push } = useRouter();
  const { lang: locale } = useParams();

  // Memoize the formatted dates to avoid recalculation on re-render
  const formattedDates = useMemo(() => {
    return {
      start: duration?.start
        ? moment(duration.start).format("MMM D, YYYY")
        : "Not set",
      end: duration?.end
        ? moment(duration.end).format("MMM D, YYYY")
        : "Not set",
    };
  }, [duration?.start, duration?.end]);

  // Memoize the responsible persons buttons to avoid recreating them on every render
  const responsiblePersonsButtons = useMemo(() => {
    if (!responsiblePersons?.length) {
      return (
        <Typography variant="body2" className="text-gray-500">
          No responsible persons assigned
        </Typography>
      );
    }

    return responsiblePersons.slice(0, isMobile ? 2 : 4).map((person, idx) => (
      <Button
        key={person.name || `person-${idx}`}
        variant="outlined"
        color="primary"
        size="small"
        className="rounded-4xl"
      >
        <Avatar
          alt={person.name || `Person ${idx + 1}`}
          src={`/images/avatars/${idx}.png`}
          className="w-5 h-5 mr-1"
        />
        <Typography variant="body2" color="primary" className="text-xs">
          {person.name || `Person ${idx + 1}`}
        </Typography>
      </Button>
    ));
  }, [responsiblePersons]);

  return (
    <Card>
      <CardContent className="space-y-4">
        <Box className="flex flex-col sm:flex-row justify-between items-start">
          <Box className="flex flex-col sm:flex-row gap-4 mb-4 sm:mb-0">
            <Box className="flex-shrink-0">
              <Image
                src={logoUrl || "/images/logos/aws.png"}
                alt="Program Logo"
                width={120}
                height={110}
                loading="lazy"
                className="border shadow rounded-lg object-contain"
              />
            </Box>
            <Box className="pt-1">
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {title || "Untitled Program"}
              </Typography>
              {organization?.name && (
                <Typography variant="h6" gutterBottom>
                  {organization?.name}
                </Typography>
              )}
              {duration?.start || duration?.end ? (
                <CustomChip
                  icon={<i className="tabler-calendar-event text-sm" />}
                  label={`${duration?.start} ${duration?.end ? `- ${duration?.end}` : ""}`}
                  color="default"
                  size="small"
                />
              ) : null}
            </Box>
          </Box>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<i className="tabler-report-analytics text-xl" />}
          >
            View Report
          </Button>
        </Box>
        {/* Stats Row */}
        <Box
          className="grid gap-4 border py-4 rounded-lg"
          sx={{
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)", // 2 columns for small screens
              sm: "repeat(4, 1fr)", // 4 columns for larger screens
            },
            justifyItems: "center", // Center items horizontally
          }}
        >
          {statsList.length > 0 &&
            statsList
              .slice(0, isMobile ? 2 : statsList.length)
              .map(([key, value]) => (
                <StatItem
                  key={key}
                  classes="sm:w-52"
                  label={key}
                  value={value || 0}
                  iconBgColor="bg-purple-100"
                  iconTextColor="text-purple-600"
                  valueBgColor="bg-gray-200"
                  valueTextColor="text-gray-700"
                />
              ))}
        </Box>
        {/* Main Content Area: Responsible, Description, and Duration */}
        <Box className="flex flex-col md:flex-row gap-4 sm:gap-6">
          {/* Left Column: Responsible & Description */}
          <Box className="flex-1 space-y-4 sm:space-y-6">
            {/* Responsible Section */}
            <Box>
              <Box className="flex items-center gap-1 mb-2">
                <i className="tabler-user-circle text-primary text-xl" />
                <Typography variant="h6">Responsible</Typography>
              </Box>
              <Box className="flex flex-wrap gap-2">
                {responsiblePersonsButtons}
              </Box>
            </Box>

            {/* Description Section */}
            <Box>
              <Box className="flex items-center gap-1 mb-2">
                <i className="tabler-message text-primary text-xl" />
                <Typography variant="h6">Description</Typography>
              </Box>
              <Typography
                variant="body2"
                color="gray"
                className="line-clamp-2 sm:line-clamp-4"
              >
                {description || "No description available"}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Progress Section */}
        <Box className="flex items-center space-x-2 sm:space-x-2 pt-2">
          <Typography variant="body2">
            {(progressPercent || 0).toFixed(2)}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progressPercent || 0}
            className="flex-grow"
            sx={{
              height: 8,
              borderRadius: 4,
              "& .MuiLinearProgress-bar": {
                backgroundColor: "primary.main",
              },
              backgroundColor: "grey.300",
            }}
          />
          <Typography
            variant="body2"
            className="text-gray-500 min-w-[35px] sm:min-w-[40px] text-right"
          >
            {progressTasksDone || 0}/{progressTasksTotal || 0}
          </Typography>
          <OptionMenu
            iconButtonProps={{ size: "medium" }}
            iconClassName="text-textSecondary"
            options={[
              {
                text: "Edit",
                icon: "tabler-edit",
                menuItemProps: {
                  onClick: () => push(`/${locale}/programs/${program.id}/edit`),
                  className: "flex items-center gap-2 text-textSecondary",
                },
              },
            ]}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProgramDetailsCard;
