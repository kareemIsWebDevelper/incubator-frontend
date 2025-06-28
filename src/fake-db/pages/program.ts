import { ProgramType } from "@/types/programTypes";

export const db: Array<ProgramType> = [
  {
    id: 1,
    logoUrl: null,
    title: "NBE - Shark Tank Season",
    organization: {
      id: 1,
      name: "Growth Labs",
      logoUrl: null,
    },
    stats: {
      startup: 8,
      steps: 10,
      mentors: 4,
      pendingEvaluation: 0,
      finalEvaluation: 3,
      accepted: 2,
      rejected: 1,
      waiting: 1,
      inProgress: 1,
      completed: 1,
      notStarted: 1,
      canceled: 1,
    },
    responsiblePersons: [
      { name: "Eslam Tarek", avatarUrl: "/images/avatars/1.png" },
      { name: "Mahmoud Ahmed", avatarUrl: "/images/avatars/2.png" },
      { name: "Moemen Mo", avatarUrl: "/images/avatars/3.png" },
      { name: "Mohamed Doaa", avatarUrl: "/images/avatars/4.png" },
    ],
    description:
      "A digital banking innovation program seeking fintech solutions to revolutionize the banking experience for customers. Focused on mobile banking solutions and digital payment systems. A digital banking innovation program seeking fintech solutions to revolutionize the banking experience for customers. Focused on mobile banking solutions and digital payment systems. A digital banking innovation program seeking fintech solutions to revolutionize the banking experience for customers. Focused on mobile banking solutions and digital payment systems. A digital banking innovation program seeking fintech solutions to revolutionize the banking experience for customers. Focused on mobile banking solutions and digital payment systems.",
    progressPercent: 10.0,
    progressTasksDone: 1,
    progressTasksTotal: 10,
    duration: {
      start: "2023-06-01",
      end: "2025-07-31",
    },
    createdAt: "2023-06-01",
    updatedAt: "2023-06-01",
    allowNonCompany: true,
    privateLink: false,
    guidelines:
      "<p>All participants must submit a business plan and a pitch deck. The business plan should include market analysis, financial projections, and a clear value proposition. The pitch deck should be no more than 15 slides and should cover the key aspects of the business.</p>",
    guidelinesFile: null,
    financialPolicy:
      "<p>All participants must agree to the financial policy, which includes a 5% equity stake for the program in exchange for mentorship and resources. Participants will also be required to provide regular financial updates during the program.</p>",
    financialPolicyFile: null,
    legalPolicy:
      "<p>All participants must agree to the legal policy, which includes a non-disclosure agreement (NDA) and a non-compete clause. Participants will also be required to sign a contract outlining the terms of the program.</p>",
    legalPolicyFile: null,
    autoApproveMentorship: true,
  },
  {
    id: 2,
    logoUrl: "https://i.imgur.com/R7eT5QW.png",
    title: "Tech Stars Accelerator",
    organization: null,
    stats: {
      startup: 12,
      steps: 8,
      mentors: 6,
      pendingEvaluation: 2,
    },
    responsiblePersons: [
      { name: "Sarah Johnson", avatarUrl: "/images/avatars/5.png" },
      { name: "Mark Williams", avatarUrl: "/images/avatars/6.png" },
      { name: "Lisa Chen", avatarUrl: "/images/avatars/7.png" },
    ],
    description:
      "An intensive 3-month accelerator program designed for early-stage technology startups. Provides funding, mentorship, and connections to help companies scale rapidly.",
    progressPercent: 37.5,
    progressTasksDone: 3,
    progressTasksTotal: 8,
    duration: {
      start: "2024-02-15",
      end: "2025-11-30",
    },
  },
  {
    id: 3,
    logoUrl: "https://i.imgur.com/6MzFKDP.png",
    title: "GreenTech Innovation Lab",
    organization: null,

    stats: {
      startup: 6,
      steps: 12,
      mentors: 8,
      pendingEvaluation: 4,
    },
    responsiblePersons: [
      { name: "David Greenfield", avatarUrl: "/images/avatars/8.png" },
      { name: "Emma Torres", avatarUrl: "/images/avatars/9.png" },
      { name: "Michael Chang", avatarUrl: "/images/avatars/10.png" },
      { name: "Olivia Garcia", avatarUrl: "/images/avatars/1.png" },
    ],
    description:
      "Supporting sustainable technology startups addressing climate change through innovative solutions. Focus areas include renewable energy, waste reduction, and sustainable agriculture.",
    progressPercent: 58.3,
    progressTasksDone: 7,
    progressTasksTotal: 12,
    duration: {
      start: "2023-09-10",
      end: "2024-12-15",
    },
  },
  {
    id: 4,
    logoUrl: "https://i.imgur.com/L5KVgnr.png",
    title: "Health-X Incubator",
    stats: {
      startup: 10,
      steps: 9,
      mentors: 7,
      pendingEvaluation: 1,
    },
    responsiblePersons: [
      { name: "Dr. James Wilson", avatarUrl: "/images/avatars/2.png" },
      { name: "Dr. Maria Rodriguez", avatarUrl: "/images/avatars/3.png" },
      { name: "Thomas Clark", avatarUrl: "/images/avatars/4.png" },
    ],
    description:
      "Healthcare innovation program focusing on digital health solutions, medical devices, and biotechnology. Connects entrepreneurs with healthcare professionals to validate and scale their solutions.",
    progressPercent: 77.8,
    progressTasksDone: 7,
    progressTasksTotal: 9,
    duration: {
      start: "2023-11-01",
      end: "2025-03-31",
    },
  },
  {
    id: 5,
    logoUrl: "https://i.imgur.com/8YtVb5m.png",
    title: "Women in Tech Fellowship",
    organization: null,

    stats: {
      startup: 15,
      steps: 6,
      mentors: 9,
      pendingEvaluation: 3,
    },
    responsiblePersons: [
      { name: "Alexandra Brown", avatarUrl: "/images/avatars/5.png" },
      { name: "Jessica Martinez", avatarUrl: "/images/avatars/6.png" },
      { name: "Tiffany Wong", avatarUrl: "/images/avatars/7.png" },
      { name: "Rachel Green", avatarUrl: "/images/avatars/8.png" },
    ],
    description:
      "Empowering female entrepreneurs in the technology sector through mentorship, funding, and networking opportunities. Aims to address gender disparity in the tech startup ecosystem.",
    progressPercent: 83.3,
    progressTasksDone: 5,
    progressTasksTotal: 6,
    duration: {
      start: "2024-01-15",
      end: "2025-01-15",
    },
  },
  {
    id: 6,
    logoUrl: "https://i.imgur.com/DvTMrO1.png",
    title: "AI & Robotics Ventures",
    organization: null,

    stats: {
      startup: 7,
      steps: 11,
      mentors: 5,
      pendingEvaluation: 2,
    },
    responsiblePersons: [
      { name: "Robert Zhang", avatarUrl: "/images/avatars/9.png" },
      { name: "Alan Turing", avatarUrl: "/images/avatars/10.png" },
      { name: "Sophia Lee", avatarUrl: "/images/avatars/1.png" },
    ],
    description:
      "Specialized program for startups working on artificial intelligence, machine learning, and robotics solutions. Provides access to computation resources, specialized mentors, and industry connections.",
    progressPercent: 27.3,
    progressTasksDone: 3,
    progressTasksTotal: 11,
    duration: {
      start: "2024-03-01",
      end: "2026-05-30",
    },
  },
  {
    id: 7,
    logoUrl: "https://i.imgur.com/P5ZVGrd.png",
    title: "EdTech Revolution",
    organization: null,
    stats: {
      startup: 9,
      steps: 7,
      mentors: 6,
      pendingEvaluation: 0,
    },
    responsiblePersons: [
      { name: "William Davis", avatarUrl: "/images/avatars/2.png" },
      { name: "Michelle Parker", avatarUrl: "/images/avatars/3.png" },
      { name: "Daniel Robinson", avatarUrl: "/images/avatars/4.png" },
    ],
    description:
      "Supporting educational technology startups transforming how people learn. Focuses on personalized learning, accessibility tools, and platforms that bridge the education gap globally.",
    progressPercent: 42.9,
    progressTasksDone: 3,
    progressTasksTotal: 7,
    duration: {
      start: "2023-08-15",
      end: "2025-02-28",
    },
  },
  {
    id: 8,
    logoUrl: "https://i.imgur.com/mK2cQTK.png",
    title: "Urban Mobility Challenge",
    organization: null,

    stats: {
      startup: 11,
      steps: 9,
      mentors: 7,
      pendingEvaluation: 5,
    },
    responsiblePersons: [
      { name: "Carlos Mendez", avatarUrl: "/images/avatars/5.png" },
      { name: "Jennifer Wu", avatarUrl: "/images/avatars/6.png" },
      { name: "Ahmed Hassan", avatarUrl: "/images/avatars/7.png" },
      { name: "Priya Patel", avatarUrl: "/images/avatars/8.png" },
    ],
    description:
      "Program dedicated to solving urban transportation challenges through innovative mobility solutions. Focuses on electric vehicles, ride-sharing platforms, and traffic management systems.",
    progressPercent: 22.2,
    progressTasksDone: 2,
    progressTasksTotal: 9,
    duration: {
      start: "2024-05-01",
      end: "2026-08-31",
    },
  },
  {
    id: 9,
    logoUrl: "https://i.imgur.com/Vn7s5BL.png",
    title: "Social Impact Accelerator",
    organization: null,

    stats: {
      startup: 14,
      steps: 8,
      mentors: 10,
      pendingEvaluation: 2,
    },
    responsiblePersons: [
      { name: "Grace Okafor", avatarUrl: "/images/avatars/9.png" },
      { name: "Luis Hernandez", avatarUrl: "/images/avatars/10.png" },
      { name: "Fatima Al-Zahra", avatarUrl: "/images/avatars/1.png" },
      { name: "Benjamin Cross", avatarUrl: "/images/avatars/2.png" },
    ],
    description:
      "Accelerating startups with a mission to create positive social change. Supports ventures addressing critical social issues like poverty, education access, healthcare availability, and community development.",
    progressPercent: 62.5,
    progressTasksDone: 5,
    progressTasksTotal: 8,
    duration: {
      start: "2023-10-15",
      end: "2025-09-30",
    },
  },
  {
    id: 10,
    logoUrl: "https://i.imgur.com/GcZTeT1.png",
    title: "Agritech Solutions",
    organization: null,
    stats: {
      startup: 8,
      steps: 10,
      mentors: 6,
      pendingEvaluation: 3,
    },
    responsiblePersons: [
      { name: "Samuel Njoroge", avatarUrl: "/images/avatars/3.png" },
      { name: "Emily Watson", avatarUrl: "/images/avatars/4.png" },
      { name: "Raj Kumar", avatarUrl: "/images/avatars/5.png" },
    ],
    description:
      "Supporting technological innovation in agriculture to improve food production, distribution, and sustainability. Focuses on precision farming, supply chain optimization, and sustainable agricultural practices.",
    progressPercent: 50.0,
    progressTasksDone: 5,
    progressTasksTotal: 10,
    duration: {
      start: "2024-02-01",
      end: "2025-12-15",
    },
  },
];
