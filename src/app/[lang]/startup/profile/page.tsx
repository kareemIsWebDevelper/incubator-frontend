// Next Imports
import type { Metadata } from 'next'

// Component Imports

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'
import StartupProfile from '@/views/startup-profile'

export const metadata: Metadata = {
  title: 'Startup Profile',
  description: 'Startup Profile'
}

const StartupProfilePage = () => {
  // Vars
  const mode = getServerMode()

  // return <Login mode={mode} />

  // Sample data based on the provided fields
const startupData = {
  id: 1,
  name_en: "Innovatech Solutions",
  name_ar: "حلول إينوفاتك",
  logo: "https://via.placeholder.com/150/007bff/ffffff?text=Logo", // Placeholder logo
  sector: "Technology",
  business_categories: ["SaaS", "AI", "Cloud Computing"],
  country: { name_en: "United Arab Emirates" }, // Assuming nested object structure
  state: { name_en: "Dubai" },
  city: { name_en: "Dubai" },
  est_date: "2022-01-15",
  years_of_operations: 2,
  info_company: "Pioneering AI-driven solutions for optimizing logistics and supply chain management, Our SaaS platform provides real-time insights, predictive demand forecasting, and automated route optimization, reducing costs by up to 20%. Our SaaS platform provides real-time insights, predictive demand forecasting, and automated route optimization, reducing costs by up to 20%.Our SaaS platform provides real-time insights, predictive demand forecasting, and automated route optimization, reducing costs by up to 20%.Our SaaS platform provides real-time insights, predictive demand forecasting, and automated route optimization, reducing costs by up to 20%.",
  idea: "Develop a predictive analytics platform using AI to forecast demand and streamline logistics.",
  problem: "Inefficiencies in traditional supply chains lead to high costs, delays, and waste.",
  solution: "Our SaaS platform provides real-time insights, predictive demand forecasting, and automated route optimization, reducing costs by up to 20%.",
  team_num: 15,
  working_team_summary: "Diverse team of AI experts, software engineers, and logistics professionals.",
  stage: "Growth Stage",
  funding_stage: "Series A",
  revenue_generating: true,
  currently_fundraising: true,
  desired_funding_amount: 5000000,
  raised_fund: 1500000,
  equity_offered: 15,
  Currency: "USD",
  Pre_money_Valuation: 10000000,
  targeted_market: "MENA Region Logistics Companies",
  Industries: ["Logistics", "Supply Chain", "Technology", "Artificial Intelligence"],
  founder: { /* name: 'Jane Doe', bio: '...' */ }, // Simplified
  website: "https://innovatech.example.com",
  linkedin: "https://linkedin.com/company/innovatech-solutions",
  twitter: "https://twitter.com/innovatech",
  email: "info@innovatech.example.com",
  phone: "+971 4 123 4567",
  address_en: "Floor 10, Tech Tower, Dubai Internet City, Dubai, UAE",
  product_photo: "https://via.placeholder.com/600x400/28a745/ffffff?text=Product+Screenshot", // Placeholder image
  pitch_deck_summary: "Our pitch deck outlines our market opportunity, traction, team, and financial projections.",
  business_model_description: "Subscription-based model (SaaS) with tiered pricing based on usage and features. Additional revenue from premium support and customization.",
  Sustainable_development: ["Industry, Innovation and Infrastructure", "Responsible Consumption and Production"],
  // ... add other relevant fields as needed
};

  return <StartupProfile startupData={startupData} />;
}

export default StartupProfilePage