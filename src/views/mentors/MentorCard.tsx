import { Card, CardContent, IconButton, Tooltip } from "@mui/material";
import Image from "next/image";
import { Mentor } from "@/types/MentorTypes";

interface MentorCardProps {
  mentor: Mentor;
  hasCompany: boolean;
  companyCycle: number;
  isRegistered: boolean;
  isMentor: boolean;
  isAdmin: boolean;
  handleRequest: (mentor: Mentor) => void;
}

const mockPrograms = [
  {
    id: "1",
    name: "Startup Accelerator Program",
    description: "A program to accelerate startup growth.",
  },
  {
    id: "2",
    name: "Mentorship Program",
    description: "A program connecting mentors with mentees.",
  },
  {
    id: "3",
    name: "Innovation Lab",
    description: "A program focused on innovation and product development.",
  },
];

const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => {
  const getUserPrograms = (user: Mentor) => {
    return mockPrograms.filter((program) =>
      mentor?.programIds?.includes(program.id)
    );
  };

  const userPrograms = getUserPrograms(mentor);

  return (
    <Card className="rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow h-full">
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={mentor.image_url}
            alt={mentor.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {mentor.name}
            </h3>
            <p className="text-sm text-gray-600 truncate">{mentor.email}</p>
            {/* <span
              className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                mentor.role === "mentor"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-indigo-100 text-indigo-800"
              }`}
            >
              {mentor.role === "mentor" ? "Mentor" : "Startup Owner"}
            </span> */}
          </div>
        </div>

        {mentor.bio && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {mentor.bio}
          </p>
        )}

        {mentor.mentorExpertises && mentor.mentorExpertises.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-1 mb-2">
              <i className="tabler-award w-4 h-4" />
              <span className="text-sm font-medium text-gray-700">
                Expertise
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {mentor.mentorExpertises
                .slice(0, 3)
                .map((skill: any, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                  >
                    {skill?.title || skill.name}
                  </span>
                ))}
              {mentor.mentorExpertises.length > 3 && (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded-full">
                  +{mentor.mentorExpertises.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="space-y-2 text-sm">
          {/* <div className="flex items-center space-x-2 text-gray-600">
            <i className="tabler-calendar-event w-4 h-4" />
            <span>
              Joined {new Date(mentor?.joinedAt).toLocaleDateString()}
            </span>
          </div> */}

          {userPrograms.length > 0 && (
            <div>
              <p className="font-medium text-gray-700 mb-1">Programs:</p>
              <div className="space-y-1">
                {userPrograms.map((program: any) => (
                  <span
                    key={program.id}
                    className="block text-xs bg-violet-50 text-violet-700 px-2 py-1 rounded"
                  >
                    {program.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
          <div className="flex items-center justify-center space-x-2">
            <Tooltip title="LinkedIn Profile">
              <IconButton
                component="a"
                href={mentor?.linkedin || "#"}
                target="_blank"
                size="small"
                className="w-7 h-7"
              >
                <Image
                  className="-mt-0.5"
                  src="/images/logos/linkedin.png"
                  alt="LinkedIn"
                  width={15}
                  height={15}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Email">
              <IconButton
                component="a"
                href={`mailto:${mentor.email}`}
                target="_blank"
                size="small"
                className="w-7 h-7"
              >
                <i className="tabler-mail text-red-400 w-5.5 h-5.5" />
              </IconButton>
            </Tooltip>
          </div>
          {/* <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center space-x-1">
            
            <span>Contact</span>
          </button> */}
          {/* <div
            className={`w-3 h-3 rounded-full ${mentor.isActive ? "bg-green-500" : "bg-gray-300"}`}
          ></div> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorCard;

// import { Box } from "@mui/material";
// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   IconButton,
//   Tooltip,
//   Typography,
//   Chip,
//   Button,
//   CardContent,
// } from "@mui/material";

// // Types
// import { Mentor } from "@/types/MentorTypes";

// const MentorCard = ({
//   mentor,
//   ...rest
// }: {
//   mentor: Mentor;
//   hasCompany: boolean;
//   companyCycle: number;
//   isRegistered: boolean;
//   isMentor: boolean;
//   isAdmin: boolean;
//   handleRequest: (mentor: Mentor) => void;
// }) => {
//   const { hasCompany, companyCycle, isRegistered, isMentor, isAdmin } = rest;
//   return (
//     <div className="relative flex flex-col h-full rounded-[15px]">
//       {/* Mentor Image */}
//       <Box sx={{ position: "relative", height: 293, overflow: "hidden" }}>
//         <Image
//           // src={mentor.image_url}
//           src={"/images/Hossam-aban.png"}
//           alt={`${mentor.name}'s profile picture`}
//           fill
//           style={{ objectFit: "cover" }}
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//           className="rounded-[15px]"
//         />
//       </Box>

//       {/* Mentor Info Card */}
//       <CardContent
//         className="relative mx-2 -mt-6 bg-white rounded-[15px] shadow-sm border flex flex-col flex-grow"
//         sx={{ minHeight: 350 }}
//       >
//         {/* Name and LinkedIn */}
//         <Box className="flex justify-between items-center mb-2 px-4 py-2 bg-white rounded-[15px] shadow-sm border">
//           <Link
//             href={`/mentors/profile/${mentor.id}`}
//             target="_blank"
//             className="flex flex-col"
//           >
//             <Typography variant="h6" className="font-bold">
//               {mentor.name}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {mentor.title}
//             </Typography>
//           </Link>
//           <Tooltip title="LinkedIn Profile">
//             <IconButton
//               component="a"
//               href={mentor?.linkedin || "#"}
//               target="_blank"
//               size="small"
//             >
//               <Image
//                 src="/images/logos/linkedin.png"
//                 alt="LinkedIn"
//                 width={26}
//                 height={26}
//               />
//             </IconButton>
//           </Tooltip>
//         </Box>

//         {/* Expertises */}
//         <Box className="mb-3 max-h-[100px] overflow-auto">
//           <Typography variant="subtitle1" className="font-bold mb-2">
//             Expertises
//           </Typography>
//           <Box className="flex flex-wrap gap-1">
//             {mentor.mentorExpertises.length > 0 &&
//               mentor.mentorExpertises.slice(0, 2).map((expert, index) => (
//                 <Chip
//                   key={index}
//                   label={expert.title}
//                   size="small"
//                   className="bg-warning/10 text-warning"
//                 />
//               ))}
//           </Box>
//         </Box>

//         {/* Programs & Rating */}
//         <Box className="flex justify-between items-center mb-3">
//           <Box className="bg-white shadow-sm rounded px-2 py-1">
//             <Box className="flex items-center gap-1 px-2">
//               <Typography
//                 variant="caption"
//                 color="info.main"
//                 className="font-semibold tracking-wide"
//               >
//                 Programs
//               </Typography>
//               <Typography
//                 variant="h6"
//                 className="font-bold text-info"
//               >
//                 {mentor.programCount}
//               </Typography>
//             </Box>
//           </Box>
//           <Box className="bg-gray-50 rounded-full px-2 py-1">
//             <Box className="flex items-center">
//               <Typography
//                 variant="body2"
//                 className="font-bold text-yellow-500 mr-1"
//               >
//                 {mentor.rating.toFixed(2)}
//               </Typography>
//               <i className="tabler-star-filled text-yellow-400 text-lg" />
//             </Box>
//           </Box>
//         </Box>

//         {/* Bio */}
//         <Box className="mb-2 flex-grow">
//           <Typography variant="subtitle1" className="font-bold mb-1">
//             Bio
//           </Typography>
//           <Typography
//             variant="body2"
//             color="text.secondary"
//             className="line-clamp-4"
//           >
//             {mentor.bio}
//           </Typography>
//         </Box>

//         {/* Request Button */}
//         <Box className="mt-auto">
//           {hasCompany && companyCycle !== 0 && isRegistered ? (
//             <Button
//               variant="contained"
//               color="success"
//               size="small"
//               className="rounded-full shadow-sm w-full"
//               // onClick={() => handleRequest(mentor)}
//             >
//               Request
//               <i className="ti ti-square-plus ml-3" />
//             </Button>
//           ) : !isRegistered && !isMentor && !isAdmin ? (
//             <Button
//               variant="contained"
//               color="success"
//               size="small"
//               className="rounded-full shadow-sm w-full"
//               // onClick={() => handleRequest(mentor)}
//             >
//               Request
//               <i className="ti ti-square-plus ml-3" />
//             </Button>
//           ) : (
//             <Button
//               variant="contained"
//               color="success"
//               size="small"
//               className="rounded-full shadow-sm w-full"
//               disabled
//             >
//               No Subscription
//             </Button>
//           )}
//         </Box>
//       </CardContent>
//     </div>
//   );
// };

// export default MentorCard;
