

"use client";

import Link from "@/components/Link";
import { ProgramType } from "@/types/programTypes";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import { useParams } from "next/navigation";

export default function ProgramCard({ program }: { program?: ProgramType }) {
  const { lang: locale } = useParams();

  const programDescription =
    "A comprehensive 6-month startup acceleration program designed to help early-stage startups refine their business models, build MVP products, and prepare for investment rounds through mentorship and structured learning.";

  const teamMembers = [
    {
      name: "Eslam Tarek",
      avatar: "/placeholder.svg?height=24&width=24",
      initials: "ET",
    },
    {
      name: "Mahmoud Ahmed",
      avatar: "/placeholder.svg?height=24&width=24",
      initials: "MA",
    },
    {
      name: "Moemen Mo",
      avatar: "/placeholder.svg?height=24&width=24",
      initials: "MM",
    },
    {
      name: "Mohamed Doaa",
      avatar: "/placeholder.svg?height=24&width=24",
      initials: "MD",
    },
  ];

  const StartupIcon = ({ className }: { className?: string }) => (
    <i className={`tabler-building-skyscraper ${className}`} />
  );
  const StepsIcon = ({ className }: { className?: string }) => (
    <i className={`tabler-stack-2 ${className}`} />
  );
  const Users = ({ className }: { className?: string }) => (
    <i className={`tabler-users ${className}`} />
  );
  const AlertTriangle = ({ className }: { className?: string }) => (
    <i className={`tabler-alert-triangle ${className}`} />
  );

  const metrics = [
    {
      label: "Startups",
      value: 8,
      icon: StartupIcon,
      color: "text-purple-700",
    },
    { label: "Steps", value: 10, icon: StepsIcon, color: "text-blue-700" },
    { label: "Mentors", value: 4, icon: Users, color: "text-green-700" },
    { label: "Pending", value: 0, icon: AlertTriangle, color: "text-red-700" },
  ];

  return (
    <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="space-y-4 border">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">
                <div className="w-6 h-4 bg-gradient-to-r from-orange-400 to-orange-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-[8px]">AWS</span>
                </div>
              </div>
              <div>
                <Link href={`/${locale}/programs/1`} className="font-semibold text-base leading-tight">
                  <h3 className="font-semibold text-base leading-tight">
                    NBE - Shark Tank Season
                  </h3>
                </Link>
                <Chip
                  variant="tonal"
                  color="success"
                  size="small"
                  className="text-xs mt-1 rounded-full h-5"
                  label="In Progress"
                />
              </div>
            </div>
          </div>

          {/* Program Description */}
          <div className="mt-2">
            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
              {programDescription}
            </p>
          </div>
        </div>
        {/* Progress */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-600">
            <span>Progress</span>
            <span>10%</span>
          </div>
          <LinearProgress
            variant="determinate"
            value={10}
            className="h-1.5 bg-slate-200"
            sx={{
              "& .MuiLinearProgress-bar": {
                backgroundColor: "var(--mui-palette-primary-main)",
              },
            }}
          />
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-2">
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex items-center justify-center">
                <metric.icon className={`w-3.5 h-3.5 ${metric.color}`} />
                <span className="text-sm font-medium ml-1">{metric.value}</span>
              </div>
              <span className="text-[10px] text-slate-500">{metric.label}</span>
            </div>
          ))}
        </div>

        {/* Duration */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-slate-600">
            <i className="tabler-calendar-event text-slate-500 w-3.5 h-3.5" />
            <span>Jun 1, 2023</span>
          </div>
          <span className="text-slate-400 text-xl">→</span>
          <div className="flex items-center gap-1 text-slate-600">
            <i className="tabler-calendar-event text-slate-500 w-3.5 h-3.5" />
            <span>Jul 31, 2025</span>
          </div>
        </div>

        {/* Team */}
        <div className="space-y-1">
          <span className="text-xs text-slate-600">Responsible</span>
          <div className="flex -space-x-2">
            {teamMembers.slice(0, 3).map((member, index) => (
              <Tooltip key={index} title={member.name}>
                <Avatar
                  key={index}
                  src={member.avatar || "/placeholder.svg"}
                  alt={member.name}
                  className="w-8 h-8 border-2 border-white text-xs font-medium"
                >
                  {member.initials}
                </Avatar>
              </Tooltip>
            ))}
            {teamMembers.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium">
                +{teamMembers.length - 3}
              </div>
            )}
          </div>
        </div>
        <div className="w-full">
          <Button variant="tonal" color="secondary" size="small" className="w-full">
            <i className="tabler-external-link text-xl me-3" />
            <span className="text-xs font-semibold">View Report</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
// import React, { useMemo } from "react";
// import {
//   Card,
//   Box,
//   Typography,
//   Button,
//   LinearProgress,
//   Avatar,
//   Chip,
//   CardContent,
// } from "@mui/material";
// import moment from "moment";
// import { ProgramType } from "@/types/programTypes";
// import OptionMenu from "@/@core/components/option-menu";
// import { useParams, useRouter } from "next/navigation";
// import StatItem from "@/components/StatItem";
// import { isMobile } from "@/utils";

// interface ProgramCardProps {
//   program: ProgramType;
// }

// const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
//   const {
//     title,
//     stats,
//     responsiblePersons = [],
//     description = "",
//     progressPercent = 0,
//     progressTasksDone = 0,
//     progressTasksTotal = 0,
//     duration,
//     logoUrl = "",
//   } = program;

//   // Stats array of key-value pairs
//   const statsList = stats ? Object.entries(stats) : [];

//   const { push } = useRouter();
//   const { lang: locale } = useParams();

//   // Memoize the formatted dates to avoid recalculation on re-render
//   const formattedDates = useMemo(() => {
//     return {
//       start: duration?.start
//         ? moment(duration.start).format("MMM D, YYYY")
//         : "Not set",
//       end: duration?.end
//         ? moment(duration.end).format("MMM D, YYYY")
//         : "Not set",
//     };
//   }, [duration?.start, duration?.end]);

//   // Memoize the responsible persons buttons to avoid recreating them on every render
//   const responsiblePersonsButtons = useMemo(() => {
//     if (!responsiblePersons?.length) {
//       return (
//         <Typography variant="body2" className="text-gray-500">
//           No responsible persons assigned
//         </Typography>
//       );
//     }

//     return responsiblePersons.slice(0, isMobile ? 2 : 4).map((person, idx) => (
//       <Button
//         key={person.name || `person-${idx}`}
//         variant="outlined"
//         color="primary"
//         size="small"
//         className="rounded-4xl"
//       >
//         <Avatar
//           alt={person.name || `Person ${idx + 1}`}
//           src={`/images/avatars/${idx}.png`}
//           className="w-5 h-5 mr-1"
//         />
//         <Typography variant="body2" color="primary" className="text-xs">
//           {person.name || `Person ${idx + 1}`}
//         </Typography>
//       </Button>
//     ));
//   }, [responsiblePersons]);

//   return (
//     <Card>
//       <CardContent className="flex flex-col gap-4 sm:flex-row p-4 sm:p-6">
//         {/* Logo Section */}
//         <Box className="lg:w-1/6 xl:w-1/4 p-4 sm:p-6 flex items-center justify-center border border-light rounded-lg">
//           <img
//             src={logoUrl || "/images/logos/aws.png"}
//             alt={`${title || "Program"} Logo`}
//             className="max-w-[120px] sm:max-w-[150px] h-auto object-contain"
//             loading="lazy" // Add lazy loading for images
//           />
//         </Box>

//         {/* Content Section */}
//         <Box className="flex-1 space-y-2">
//           {/* Header: Title and View Report Button */}
//           <Box className="flex flex-row justify-between items-start sm:items-center">
//             <Button
//               variant="text"
//               size="small"
//               href={`/${locale}/programs/${program.id}`}
//             >
//               <Typography variant="h5" fontWeight="bold">
//                 {title || "Untitled Program"}
//               </Typography>
//             </Button>
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="contained"
//                 color="inherit"
//                 size="small"
//                 href={`/${locale}/programs/${program.id}/report`}
//               >
//                 <i className="tabler-report-analytics text-lg" />
//                 <span className="hidden sm:flex mis-2">View Report</span>
//               </Button>
//               <Button
//                 variant="contained"
//                 color="inherit"
//                 size="small"
//                 href={`/${locale}/programs/steps?programId=${program.id}`}
//               >
//                 <i className="tabler-stack text-lg" />
//                 <span className="hidden sm:flex mis-2">View Steps</span>
//               </Button>
//             </div>
//           </Box>

//           {/* Stats Row */}
//           <Box
//             className="grid gap-4 sm:w-4/5"
//             sx={{
//               gridTemplateColumns: {
//                 xs: "repeat(2, 1fr)", // 2 columns for small screens
//                 sm: "repeat(4, 1fr)", // 4 columns for larger screens
//               },
//             }}
//           >
//             {statsList.length > 0 &&
//               statsList
//                 ?.slice(0, 4)
//                 .map(([key, value]) => (
//                   <StatItem
//                     key={key}
//                     label={key}
//                     value={value || 0}
//                     iconBgColor="bg-purple-100"
//                     iconTextColor="text-purple-600"
//                     valueBgColor="bg-gray-200"
//                     valueTextColor="text-gray-700"
//                   />
//                 ))}
//           </Box>

//           {/* Main Content Area: Responsible, Description, and Duration */}
//           <Box className="flex flex-col md:flex-row gap-4 sm:gap-6">
//             {/* Left Column: Responsible & Description */}
//             <Box className="flex-1 space-y-4 sm:space-y-6">
//               {/* Responsible Section */}
//               <Box>
//                 <Box className="flex items-center gap-1 mb-2">
//                   <i className="tabler-user-circle text-primary text-xl" />
//                   <Typography variant="h6">Responsible</Typography>
//                 </Box>
//                 <Box className="flex flex-wrap gap-2">
//                   {responsiblePersonsButtons}
//                 </Box>
//               </Box>

//               {/* Description Section */}
//               <Box>
//                 <Box className="flex items-center gap-1 mb-2">
//                   <i className="tabler-message text-primary text-xl" />
//                   <Typography variant="h6">Description</Typography>
//                 </Box>
//                 <Typography
//                   variant="body2"
//                   color="gray"
//                   className="line-clamp-2 sm:line-clamp-4 w-full sm:w-4/5"
//                 >
//                   {description || "No description available"}
//                 </Typography>
//               </Box>
//             </Box>

//             {/* Right Column: Duration */}
//             <Box className="w-full md:w-auto">
//               <Typography variant="h6" gutterBottom>
//                 Duration
//               </Typography>
//               {duration ? (
//                 <Box className="flex flex-row sm:flex-col w-fit max-sm:space-x-2 sm:space-y-2">
//                   <Chip
//                     label={formattedDates.start}
//                     icon={<i className="tabler-calendar" />}
//                     variant="tonal"
//                     size="small"
//                     color="primary"
//                   />
//                   <Chip
//                     label={formattedDates.end}
//                     icon={<i className="tabler-calendar" />}
//                     variant="tonal"
//                     size="small"
//                     color="error"
//                   />
//                 </Box>
//               ) : (
//                 <Typography variant="body2" className="text-gray-500">
//                   Duration not specified
//                 </Typography>
//               )}
//             </Box>
//           </Box>

//           {/* Progress Section */}
//           <Box className="flex items-center space-x-2 sm:space-x-2 pt-2">
//             <Typography variant="body2">
//               {(progressPercent || 0).toFixed(2)}%
//             </Typography>
//             <LinearProgress
//               variant="determinate"
//               value={progressPercent || 0}
//               className="flex-grow"
//               sx={{
//                 height: 8,
//                 borderRadius: 4,
//                 "& .MuiLinearProgress-bar": {
//                   backgroundColor: "primary.main",
//                 },
//                 backgroundColor: "grey.300",
//               }}
//             />
//             <Typography
//               variant="body2"
//               className="text-gray-500 min-w-[35px] sm:min-w-[40px] text-right"
//             >
//               {progressTasksDone || 0}/{progressTasksTotal || 0}
//             </Typography>
//             <OptionMenu
//               iconButtonProps={{ size: "medium" }}
//               iconClassName="text-textSecondary"
//               options={[
//                 {
//                   text: "Edit",
//                   icon: "tabler-edit",
//                   menuItemProps: {
//                     onClick: () =>
//                       push(`/${locale}/programs/${program.id}/edit`),
//                     className: "flex items-center gap-2 text-textSecondary",
//                   },
//                 },
//               ]}
//             />
//           </Box>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// // Memoize the entire component to prevent unnecessary re-renders
// export default React.memo(ProgramCard);
