export type QuestionType = {
  id: number | string;
  title: string;
  type: string;
  questionGroup: string;
  questionCategory: string;
  difficultyLevel: string;
  tags: string[];
  explanation: string;
  assignedOrganizations: string[];
};