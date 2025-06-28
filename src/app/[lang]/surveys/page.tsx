import { Metadata } from 'next';
import Surveys from '@/views/surveys'
import React from 'react'

export const metadata: Metadata = {
  title: "Surveys Management",
  description: "Create, manage, and track surveys across your organization. Add questions, manage responses, and analyze survey data.",
  keywords: ["surveys", "questionnaires", "data collection", "feedback", "analytics", "questions", "responses"],
};

const SurveysPage = () => {
  return (
    <Surveys />
  )
}

export default SurveysPage