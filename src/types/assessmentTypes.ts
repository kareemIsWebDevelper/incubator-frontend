export type AssessmentItem = {
  category: string;
  totalQuestions: number;
  totalAnsweredQuestions: number;
  subCategories: {
    name: string;
    totalQuestions: number;
    totalAnsweredQuestions: number;
    questions: {
      question: string;
      options: string[];
    }[];
  }[];
};

export type Assessment = AssessmentItem[];

export type Question = {
  question: string;
  options: string[];
};
