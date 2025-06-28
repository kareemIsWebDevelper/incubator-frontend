import React from "react";
import { db } from "@/fake-db/pages/questions";
import Questions from "@/views/questions";

const QuestionsListPage = () => {
  return <Questions data={db} />;
};

export default QuestionsListPage;
