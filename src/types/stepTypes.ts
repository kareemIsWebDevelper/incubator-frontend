import type { DraggableProvided, DraggableStateSnapshot, DropResult } from '@hello-pangea/dnd';
import { ProgramType } from './programTypes';

export type StepType = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  program: ProgramType;
  stepType?: string;
  selectedForm?: string;
  description?: string;
}

export type StepItemProps = {
  step: StepType;
  index: number;
  onStepChange: (stepId: string, updatedStep: StepType) => void;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  isDragDisabled?: boolean;
  onEdit?: (step: StepType) => void;
  onDelete?: (stepId: string) => void;
  onViewDetails?: (step: StepType) => void;
}

export type StepsListProps = {
  steps: StepType[];
  onDragStart?: () => void;
  onDragEnd: (result: DropResult) => void;
  handleStepChange: (stepId: string, updatedStep: StepType) => void;
  handleAddStep: () => void;
  isDragDisabled?: boolean;
  onEdit?: (step: StepType) => void;
  onDelete?: (stepId: string) => void;
  onViewDetails?: (step: StepType) => void;
}

export type StepsProps = {
  data: StepType[];
}
