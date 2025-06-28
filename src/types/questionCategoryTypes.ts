export type QuestionCategoryType = {
  id: number | string;
  name: string;
  category: string;
  organization?: {
    id: string;
    name: string;
    logo?: string;
    description?: string;
  };
  numberOfQuestions: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
};
