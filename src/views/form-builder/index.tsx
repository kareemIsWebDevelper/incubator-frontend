"use client";

import { useState } from "react";

// Component Imports
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  Radio,
  RadioGroup,
} from "@mui/material";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
} from "@hello-pangea/dnd";

// Form element types
type FormElement = {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  value?: string | string[];
};

// Initial form elements palette
const formElements: FormElement[] = [
  { id: "text", type: "text", label: "Text Input", placeholder: "Enter text" },
  { id: "textarea", type: "textarea", label: "Text Area", placeholder: "Enter text" },
  { id: "number", type: "number", label: "Number Input", placeholder: "Enter number" },
  { id: "email", type: "email", label: "Email Input", placeholder: "Enter email" },
  { id: "select", type: "select", label: "Select Dropdown", options: ["Option 1", "Option 2", "Option 3"] },
  { id: "checkbox", type: "checkbox", label: "Checkbox", options: ["Option 1", "Option 2", "Option 3"] },
  { id: "radio", type: "radio", label: "Radio Buttons", options: ["Option 1", "Option 2", "Option 3"] },
  { id: "date", type: "date", label: "Date Picker" },
];

const FormBuilder = () => {
  const [builderElements, setBuilderElements] = useState<FormElement[]>([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<FormElement | null>(null);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // If dragging from palette to builder
    if (source.droppableId === "palette" && destination.droppableId === "builder") {
      const element = formElements[source.index];
      const newElement = {
        ...element,
        id: `${element.type}-${Date.now()}`,
        value: element.type === "checkbox" ? [] : "",
      };

      const newBuilderElements = Array.from(builderElements);
      newBuilderElements.splice(destination.index, 0, newElement);
      setBuilderElements(newBuilderElements);
    }
    // If reordering within builder
    else if (source.droppableId === "builder" && destination.droppableId === "builder") {
      const newBuilderElements = Array.from(builderElements);
      const [removed] = newBuilderElements.splice(source.index, 1);
      newBuilderElements.splice(destination.index, 0, removed);
      setBuilderElements(newBuilderElements);
    }
  };

  const handleSave = () => {
    console.log("Form elements:", builderElements);
    // TODO: Implement save functionality
  };

  const handleElementEdit = (element: FormElement) => {
    setSelectedElement(element);
  };

  const handleElementUpdate = (updatedElement: FormElement) => {
    setBuilderElements(prev =>
      prev.map(el => (el.id === updatedElement.id ? updatedElement : el))
    );
    setSelectedElement(null);
  };

  const renderFormElement = (element: FormElement) => {
    switch (element.type) {
      case "text":
      case "email":
      case "number":
        return (
          <TextField
            fullWidth
            type={element.type}
            label={element.label}
            placeholder={element.placeholder}
            required={element.required}
            value={element.value || ""}
            onChange={(e) => handleElementUpdate({ ...element, value: e.target.value })}
          />
        );
      case "textarea":
        return (
          <TextField
            fullWidth
            multiline
            rows={4}
            label={element.label}
            placeholder={element.placeholder}
            required={element.required}
            value={element.value || ""}
            onChange={(e) => handleElementUpdate({ ...element, value: e.target.value })}
          />
        );
      case "select":
        return (
          <FormControl fullWidth>
            <InputLabel>{element.label}</InputLabel>
            <Select
              label={element.label}
              value={element.value || ""}
              onChange={(e) => handleElementUpdate({ ...element, value: e.target.value })}
            >
              {element.options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "checkbox":
        return (
          <div className="space-y-2">
            <Typography>{element.label}</Typography>
            {element.options?.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={(element.value as string[] || []).includes(option)}
                    onChange={(e) => {
                      const newValue = e.target.checked
                        ? [...(element.value as string[] || []), option]
                        : (element.value as string[] || []).filter((v) => v !== option);
                      handleElementUpdate({ ...element, value: newValue });
                    }}
                  />
                }
                label={option}
              />
            ))}
          </div>
        );
      case "radio":
        return (
          <FormControl component="fieldset">
            <Typography>{element.label}</Typography>
            <RadioGroup
              value={element.value || ""}
              onChange={(e) => handleElementUpdate({ ...element, value: e.target.value })}
            >
              {element.options?.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case "date":
        return (
          <TextField
            fullWidth
            type="date"
            label={element.label}
            required={element.required}
            value={element.value || ""}
            onChange={(e) => handleElementUpdate({ ...element, value: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        );
      default:
        return null;
    }
  };

  const renderElementEditor = (element: FormElement) => {
    return (
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
        <TextField
          fullWidth
          label="Label"
          value={element.label}
          onChange={(e) => handleElementUpdate({ ...element, label: e.target.value })}
        />
        <FormControlLabel
          control={
            <Switch
              checked={element.required}
              onChange={(e) => handleElementUpdate({ ...element, required: e.target.checked })}
            />
          }
          label="Required"
        />
        {element.type === "select" || element.type === "checkbox" || element.type === "radio" ? (
          <TextField
            fullWidth
            label="Options (comma-separated)"
            value={element.options?.join(", ")}
            onChange={(e) =>
              handleElementUpdate({
                ...element,
                options: e.target.value.split(",").map((opt) => opt.trim()),
              })
            }
          />
        ) : (
          <TextField
            fullWidth
            label="Placeholder"
            value={element.placeholder}
            onChange={(e) => handleElementUpdate({ ...element, placeholder: e.target.value })}
          />
        )}
      </div>
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container spacing={6}>
        {/* Form Elements Palette */}
        {!isPreviewMode && (
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" className="mb-4">
                  Form Elements
                </Typography>
                <Droppable droppableId="palette">
                  {(provided: DroppableProvided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {formElements.map((element, index) => (
                        <Draggable
                          key={element.id}
                          draggableId={element.id}
                          index={index}
                        >
                          {(provided: DraggableProvided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
                            >
                              <Typography>{element.label}</Typography>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Form Builder Board */}
        <Grid item xs={12} md={isPreviewMode ? 12 : 9}>
          <Card>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6">
                  {isPreviewMode ? "Form Preview" : "Form Builder"}
                </Typography>
                <div className="flex items-center gap-4">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isPreviewMode}
                        onChange={(e) => setIsPreviewMode(e.target.checked)}
                      />
                    }
                    label="Preview Mode"
                  />
                  {!isPreviewMode && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                      disabled={builderElements.length === 0}
                    >
                      Save Form
                    </Button>
                  )}
                </div>
              </div>
              <Droppable droppableId="builder">
                {(provided: DroppableProvided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[400px] p-4 bg-gray-50 rounded-lg"
                  >
                    {builderElements.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-gray-400">
                        Drag and drop form elements here
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {builderElements.map((element, index) => (
                          <Draggable
                            key={element.id}
                            draggableId={element.id}
                            index={index}
                            isDragDisabled={isPreviewMode}
                          >
                            {(provided: DraggableProvided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
                              >
                                {isPreviewMode ? (
                                  renderFormElement(element)
                                ) : (
                                  <div>
                                    {selectedElement?.id === element.id ? (
                                      renderElementEditor(element)
                                    ) : (
                                      <div className="flex justify-between items-center">
                                        <Typography>{element.label}</Typography>
                                        <div className="flex gap-2">
                                          <Tooltip title="Edit">
                                            <IconButton
                                              size="small"
                                              onClick={() => handleElementEdit(element)}
                                            >
                                              <i className="tabler-edit" />
                                            </IconButton>
                                          </Tooltip>
                                          <Tooltip title="Delete">
                                            <IconButton
                                              size="small"
                                              color="error"
                                              onClick={() => {
                                                const newElements = [...builderElements];
                                                newElements.splice(index, 1);
                                                setBuilderElements(newElements);
                                              }}
                                            >
                                              <i className="tabler-trash" />
                                            </IconButton>
                                          </Tooltip>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DragDropContext>
  );
};

export default FormBuilder;
