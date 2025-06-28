import { Metadata } from 'next';
import Quizzes from '@/views/quizzes'
import React from 'react'

export const metadata: Metadata = {
  title: "Quizzes Management",
  description: "Create, manage, and track Quizzes across your organization. Add questions, manage responses, and analyze quiz data.",
  keywords: ["Quizzes", "questionnaires", "data collection", "feedback", "analytics", "questions", "responses"],
};

const QuizzesPage = () => {
  return (
    <Quizzes />
  )
}

export default QuizzesPage