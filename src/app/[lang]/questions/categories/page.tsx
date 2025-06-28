
import React from "react";
import { db } from "@/fake-db/pages/questionCategories";
import QuestionCategories from "@/views/questions/question-categories";

const QuestionsCategoriesPage = () => {
  return (
    <QuestionCategories data={db} />
  )
}

export default QuestionsCategoriesPage