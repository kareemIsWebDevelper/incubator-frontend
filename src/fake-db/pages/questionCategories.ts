
import { QuestionCategoryType } from "@/types/questionCategoryTypes";

export const db: QuestionCategoryType[] = [
  {
    id: 1,
    name: "Business Planning",
    category: "Business",
    organization: {
      id: "org-1",
      name: "Tech Innovators Inc.",
      logo: "https://example.com/logo.png",
      description: "A leading company in technology innovation and solutions."
    },
    numberOfQuestions: 45,
    description: "Questions related to business planning, strategy, and goal setting",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    name: "Startup Methodology",
    category: "Methodology",
    organization: {
      id: "org-2",
      name: "Venture Labs",
      logo: "https://example.com/venture-labs-logo.png",
      description: "Accelerating startups through proven methodologies and frameworks."
    },
    numberOfQuestions: 32,
    description: "Questions covering lean startup, agile development, and startup frameworks",
    createdAt: "2024-01-16T14:20:00Z",
    updatedAt: "2024-01-16T14:20:00Z"
  },
  {
    id: 3,
    name: "Financial Management",
    category: "Finance",
    organization: {
      id: "org-3",
      name: "FinanceFirst Corp",
      logo: "https://example.com/financefirst-logo.png",
      description: "Financial consulting and management services for emerging businesses."
    },
    numberOfQuestions: 38,
    description: "Questions about financial planning, metrics, and management for startups",
    createdAt: "2024-01-17T09:15:00Z",
    updatedAt: "2024-01-17T09:15:00Z"
  },
  {
    id: 4,
    name: "Market Research",
    category: "Marketing",
    organization: {
      id: "org-4",
      name: "Market Insights Ltd",
      logo: "https://example.com/market-insights-logo.png",
      description: "Providing deep market analysis and customer research solutions."
    },
    numberOfQuestions: 28,
    description: "Questions related to market analysis, customer research, and competition",
    createdAt: "2024-01-18T11:45:00Z",
    updatedAt: "2024-01-18T11:45:00Z"
  },
  {
    id: 5,
    name: "Entrepreneurship",
    category: "Personal",
    organization: {
      id: "org-5",
      name: "Entrepreneur Academy",
      logo: "https://example.com/entrepreneur-academy-logo.png",
      description: "Empowering entrepreneurs with skills and mindset development."
    },
    numberOfQuestions: 22,
    description: "Questions about entrepreneurial mindset, motivation, and personal development",
    createdAt: "2024-01-19T16:00:00Z",
    updatedAt: "2024-01-19T16:00:00Z"
  },
  {
    id: 6,
    name: "Technology & Innovation",
    category: "Technology",
    organization: {
      id: "org-6",
      name: "TechForward Solutions",
      logo: "https://example.com/techforward-logo.png",
      description: "Leading the way in technology innovation and digital transformation."
    },
    numberOfQuestions: 35,
    description: "Questions covering technology trends, innovation strategies, and digital transformation",
    createdAt: "2024-01-20T08:30:00Z",
    updatedAt: "2024-01-20T08:30:00Z"
  },
  {
    id: 7,
    name: "Team Management",
    category: "Management",
    organization: {
      id: "org-7",
      name: "Leadership Excellence",
      logo: "https://example.com/leadership-excellence-logo.png",
      description: "Developing leadership skills and team management capabilities."
    },
    numberOfQuestions: 26,
    description: "Questions about team building, leadership, and human resources",
    createdAt: "2024-01-21T13:10:00Z",
    updatedAt: "2024-01-21T13:10:00Z"
  },
  {
    id: 8,
    name: "Product Development",
    category: "Product",
    organization: {
      id: "org-8",
      name: "ProductCraft Studio",
      logo: "https://example.com/productcraft-logo.png",
      description: "Expert product development and user experience design services."
    },
    numberOfQuestions: 41,
    description: "Questions related to product design, development lifecycle, and user experience",
    createdAt: "2024-01-22T15:25:00Z",
    updatedAt: "2024-01-22T15:25:00Z"
  },
  {
    id: 9,
    name: "Sales & Marketing",
    category: "Marketing",
    organization: {
      id: "org-9",
      name: "Growth Marketing Hub",
      logo: "https://example.com/growth-marketing-logo.png",
      description: "Driving growth through strategic sales and marketing initiatives."
    },
    numberOfQuestions: 33,
    description: "Questions about sales strategies, marketing campaigns, and customer acquisition",
    createdAt: "2024-01-23T12:40:00Z",
    updatedAt: "2024-01-23T12:40:00Z"
  },
  {
    id: 10,
    name: "Legal & Compliance",
    category: "Legal",
    organization: {
      id: "org-10",
      name: "Legal Advisory Partners",
      logo: "https://example.com/legal-advisory-logo.png",
      description: "Comprehensive legal services and compliance solutions for businesses."
    },
    numberOfQuestions: 19,
    description: "Questions covering legal requirements, compliance, and intellectual property",
    createdAt: "2024-01-24T14:55:00Z",
    updatedAt: "2024-01-24T14:55:00Z"
  }
];
