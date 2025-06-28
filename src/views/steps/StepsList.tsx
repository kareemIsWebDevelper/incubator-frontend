import React from "react";
import { Box } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import StepItem from "./StepItem";
import { StepsListProps } from "@/types/stepTypes";

const StepsList: React.FC<StepsListProps> = React.memo(({ 
  steps, 
  onDragStart,
  onDragEnd, 
  handleStepChange, 
  isDragDisabled = false,
  onEdit,
  onDelete,
  onViewDetails
}) => {
  return (
    <DragDropContext 
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="stepsList" isDropDisabled={isDragDisabled}>
        {(provided, snapshot) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{
              border: snapshot.isDraggingOver ? "2px dashed " : "2px dashed ",
              borderColor: snapshot.isDraggingOver
                ? "primary.main"
                : "transparent",
              borderRadius: 1,
              // minHeight: "100px", // So the drop zone is visible when empty
            }}
          >
            {steps.map((step, index) => (
              <Draggable 
                key={`step-${step.id}`} 
                draggableId={`step-${step.id}`} 
                index={index}
                isDragDisabled={isDragDisabled}
              >
                {(providedDraggable, snapshotDraggable) => (
                  <StepItem
                    step={step}
                    index={index}
                    onStepChange={handleStepChange}
                    provided={providedDraggable}
                    snapshot={snapshotDraggable}
                    isDragDisabled={isDragDisabled}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onViewDetails={onViewDetails}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
});

StepsList.displayName = 'StepsList';

export default StepsList;
