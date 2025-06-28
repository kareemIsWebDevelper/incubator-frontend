// Types for evaluation criteria management

export interface SubCriteriaType {
  id: string;
  name: string;
  weight: number; // Percentage weight (0-100)
  description?: string;
}

export interface EvaluationCriteriaType {
  id: string;
  name: string;
  description?: string;
  subCriteria: SubCriteriaType[];
  totalWeight: number; // Sum of all sub-criteria weights (should be <= 100)
  createdAt: string;
  updatedAt: string;
}

export interface EvaluationCriteriaFormData {
  name: string;
  description?: string;
  subCriteria: Omit<SubCriteriaType, 'id'>[];
}
