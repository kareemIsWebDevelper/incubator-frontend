import { ServiceType } from "@/types/ServiceTypes";

export const db: Array<ServiceType> = [
  {
    name: "Cloud Storage",
    description: "<p>Secure and scalable cloud storage solution.</p>",
    assignedOrganizations: [
      { name: "TechCorp", id: "tech-001" },
      { name: "DataSolutions", id: "data-002" }
    ],
    price: 199.99,
    vendor: {
      name: "CloudTech Inc.",
      email: "info@cloudtech.com",
      phone: "+1-555-123-4567"
    },
    serviceCategory: { name: "Technology Service", id: "tech-service" },
    createdAt: new Date("2023-01-15").toISOString()
  },
  {
    name: "Security Audit",
    description: "<p>Comprehensive security audit and assessment.</p>",
    assignedOrganizations: [
      { name: "FinanceGroup", id: "finance-003" },
      { name: "HealthcareServices", id: "health-004" }
    ],
    price: 0,
    vendor: {
      name: "SecureShield",
      email: "contact@secureshield.com",
      phone: "+1-555-987-6543"
    },
    serviceCategory: { name: "IT Service", id: "it-service" },
    createdAt: new Date("2023-02-22").toISOString()
  },
  {
    name: "Email Marketing",
    description: "<p>Comprehensive email marketing platform.</p>",
    assignedOrganizations: [
      { name: "RetailSolutions", id: "retail-005" },
      { name: "MarketingAgency", id: "market-006" }
    ],
    price: 99.99,
    vendor: {
      name: "EmailPro",
      email: "sales@emailpro.com",
      phone: "+1-555-456-7890"
    },
    serviceCategory: { name: "Managerial Service", id: "managerial-service" },
    createdAt: new Date("2023-03-10").toISOString()
  },
  {
    name: "Data Analysis",
    description: "<p>Advanced data analysis and visualization tools.</p>",
    assignedOrganizations: [
      { name: "ResearchLab", id: "research-007" },
      { name: "AnalyticsInc", id: "analytics-008" }
    ],
    price: 299.99,
    vendor: {
      name: "DataInsights",
      email: "support@datainsights.com",
      phone: "+1-555-222-3333"
    },
    serviceCategory: { name: "Financial Service", id: "financial-service" },
    createdAt: new Date("2023-04-05").toISOString()
  },
  {
    name: "API Integration",
    description: "<p>Seamless API integration for your applications.</p>",
    assignedOrganizations: [
      { name: "TechStartup", id: "startup-009" },
      { name: "SoftwareInc", id: "software-010" }
    ],
    price: 149.99,
    vendor: {
      name: "APIConnect",
      email: "dev@apiconnect.com",
      phone: "+1-555-888-9999"
    },
    serviceCategory: { name: "Technology Service", id: "tech-service" },
    createdAt: new Date("2023-05-18").toISOString()
  },
  {
    name: "Website Hosting",
    description: "<p>Reliable and fast website hosting services.</p>",
    assignedOrganizations: [
      { name: "SmallBusiness", id: "small-011" },
      { name: "CreativeAgency", id: "creative-012" }
    ],
    price: 79.99,
    vendor: {
      name: "HostPro",
      email: "help@hostpro.com",
      phone: "+1-555-444-5555"
    },
    serviceCategory: { name: "Technology Service", id: "tech-service" },
    createdAt: new Date("2023-06-30").toISOString()
  },
  {
    name: "Community Support",
    description: "<p>Support for community-driven projects.</p>",
    assignedOrganizations: [
      { name: "NonProfit", id: "nonprofit-013" },
      { name: "Education", id: "edu-014" }
    ],
    price: 0, // Free
    vendor: {
      name: "CommunityTech",
      email: "community@techhelp.org",
      phone: "+1-555-777-0000"
    },
    serviceCategory: { name: "Managerial Service", id: "managerial-service" },
    createdAt: new Date("2023-07-12").toISOString()
  },
  {
    name: "Mobile App Development",
    description: "<p>Custom mobile app development services.</p>",
    assignedOrganizations: [
      { name: "StartupX", id: "startupx-015" },
      { name: "EnterpriseY", id: "enterprise-016" }
    ],
    price: 799.99,
    vendor: {
      name: "AppDevs",
      email: "projects@appdevs.com",
      phone: "+1-555-333-2222"
    },
    serviceCategory: { name: "IT Service", id: "it-service" },
    createdAt: new Date("2023-08-05").toISOString()
  },
  {
    name: "Training Sessions",
    description: "<p>Professional training sessions for teams.</p>",
    assignedOrganizations: [
      { name: "CorporateTraining", id: "corp-017" },
      { name: "SkillDevelopment", id: "skill-018" }
    ],
    price: 199.99,
    vendor: {
      name: "LearnPro",
      email: "training@learnpro.com",
      phone: "+1-555-111-2222"
    },
    serviceCategory: { name: "Managerial Service", id: "managerial-service" },
    createdAt: new Date("2023-09-20").toISOString()
  },
  {
    name: "Open Source Tools",
    description: "<p>Tools and resources for open source projects.</p>",
    assignedOrganizations: [
      { name: "DeveloperCommunity", id: "dev-019" },
      { name: "TechCollaborative", id: "collab-020" }
    ],
    price: 0, // Free
    vendor: {
      name: "OpenTech Foundation",
      email: "open@techfoundation.org",
      phone: "+1-555-000-1111"
    },
    serviceCategory: { name: "Technology Service", id: "tech-service" },
    createdAt: new Date("2023-10-10").toISOString()
  }
];