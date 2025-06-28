import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Tooltip,
  IconButton,
  Chip,
  alpha,
  useTheme,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import { StepItemProps } from "@/types/stepTypes";

const StepItem: React.FC<StepItemProps> = ({
  step,
  provided,
  snapshot,
  isDragDisabled = false,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  // Enhanced visual states based on drag state
  const isDragging = snapshot.isDragging;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    onEdit && onEdit(step);
  };

  const handleDelete = () => {
    handleMenuClose();
    onDelete && onDelete(step.id);
  };

  const handleDuplicate = () => {
    handleMenuClose();
    // Add your duplicate logic here
    console.log("Duplicate step:", step.id);
  };

  const handleViewDetails = () => {
    handleMenuClose();
    onViewDetails && onViewDetails(step);
  };

  return (
    <Box
      ref={provided.innerRef}
      {...provided.draggableProps}
      style={{
        ...provided.draggableProps.style,
        userSelect: "none",
        margin: "0 0 16px 0",
        transform: isDragging
          ? `${provided.draggableProps.style?.transform} rotate(2deg)`
          : provided.draggableProps.style?.transform,
      }}
    >
      <Card
        elevation={isDragging ? 8 : 1}
        sx={{
          borderLeft: `4px solid`,
          borderColor:
            step.stepType === "Assessment"
              ? "warning.main"
              : step.stepType === "Training"
                ? "info.main"
                : step.stepType === "Milestone"
                  ? "success.main"
                  : "primary.main",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isDragging ? "scale(1.02)" : "scale(1)",
          opacity: isDragging ? 0.9 : 1,
          background: isDragging
            ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.primary.main, 0.02)})`
            : theme.palette.background.paper,
          "&:hover": {
            boxShadow: theme.shadows[4],
            borderColor:
              step.stepType === "Assessment"
                ? "warning.dark"
                : step.stepType === "Training"
                  ? "info.dark"
                  : step.stepType === "Milestone"
                    ? "success.dark"
                    : "primary.dark",
            transform: "translateY(-2px)",
          },
          "&:active": {
            transform: "translateY(0px)",
          },
        }}
      >
        <CardContent
          sx={{
            padding: "20px",
            "&:last-child": { paddingBottom: "20px" },
            position: "relative",
            overflow: "hidden",
            "&::before": isDragging
              ? {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, transparent)`,
                  pointerEvents: "none",
                }
              : {},
          }}
        >
          <Box className="flex flex-row justify-between items-start gap-4">
            <Box className="flex flex-row gap-3 flex-1">
              {/* Enhanced Drag Handle */}
              <Box
                {...provided.dragHandleProps}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: isDragDisabled ? "not-allowed" : "grab",
                  width: 40,
                  height: 40,
                  borderRadius: "10px",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  opacity: isDragDisabled ? 0.5 : 1,
                  background: isDragDisabled
                    ? "transparent"
                    : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.05)})`,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  "&:hover": {
                    backgroundColor: isDragDisabled
                      ? "transparent"
                      : alpha(theme.palette.primary.main, 0.15),
                    transform: isDragDisabled ? "none" : "scale(1.05)",
                    borderColor: isDragDisabled
                      ? alpha(theme.palette.primary.main, 0.2)
                      : "primary.main",
                  },
                  "&:active": {
                    cursor: isDragDisabled ? "not-allowed" : "grabbing",
                    transform: isDragDisabled ? "none" : "scale(0.95)",
                  },
                }}
              >
                <Tooltip
                  title={
                    isDragDisabled
                      ? "Clear filters to enable drag & drop"
                      : "Drag to reorder"
                  }
                  placement="top"
                >
                  <i
                    className="tabler-drag-drop"
                    style={{
                      fontSize: "20px",
                      color: isDragDisabled
                        ? alpha(theme.palette.text.primary, 0.3)
                        : theme.palette.primary.main,
                      transition: "color 0.2s ease",
                    }}
                  />
                </Tooltip>
              </Box>
              {/* Enhanced Content Section */}
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                {/* Title with improved typography */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    marginBottom: "8px",
                    fontSize: "1.1rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    color: "text.primary",
                    lineHeight: 1.3,
                  }}
                >
                  {step.title}
                </Typography>

                {/* Enhanced Step Type and Form badges */}
                {(step.stepType || step.selectedForm) && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mb: 1.5,
                    }}
                  >
                    {step.stepType && (
                      <Chip
                        icon={
                          <i
                            className="tabler-category"
                            style={{ fontSize: "14px" }}
                          />
                        }
                        label={step.stepType}
                        size="small"
                        variant="tonal"
                        color={
                          step.stepType === "Assessment"
                            ? "warning"
                            : step.stepType === "Training"
                              ? "info"
                              : step.stepType === "Milestone"
                                ? "success"
                                : "primary"
                        }
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.75rem",
                          height: 28,
                          "& .MuiChip-icon": {
                            fontSize: "14px",
                          },
                          boxShadow: `0 2px 4px ${alpha(theme.palette.primary.main, 0.2)}`,
                        }}
                      />
                    )}
                    {step.selectedForm && (
                      <Chip
                        icon={
                          <i
                            className="tabler-file-text"
                            style={{ fontSize: "14px" }}
                          />
                        }
                        label={step.selectedForm}
                        size="small"
                        variant="outlined"
                        color="secondary"
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.75rem",
                          height: 28,
                          "& .MuiChip-icon": {
                            fontSize: "14px",
                          },
                          backgroundColor: alpha(
                            theme.palette.secondary.main,
                            0.05
                          ),
                        }}
                      />
                    )}
                  </Box>
                )}

                {/* Enhanced Description */}
                {step.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: "0.875rem",
                      mb: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      lineHeight: 1.5,
                      fontWeight: 400,
                    }}
                  >
                    {step.description}
                  </Typography>
                )}

                {/* Enhanced Date Section */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    p: 1.5,
                    borderRadius: "8px",
                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32,
                      height: 32,
                      borderRadius: "6px",
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    }}
                  >
                    <i
                      className="tabler-calendar"
                      style={{
                        fontSize: "16px",
                        color: theme.palette.primary.main,
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        lineHeight: 1.2,
                      }}
                    >
                      {`${step.startDate.toLocaleDateString()} - ${step.endDate.toLocaleDateString()}`}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontSize: "0.75rem",
                        lineHeight: 1,
                      }}
                    >
                      Duration:{" "}
                      {Math.ceil(
                        (step.endDate.getTime() - step.startDate.getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      days
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Enhanced Action Buttons */}
            <Box className="flex items-center gap-6">
              <Tooltip title="More actions" placement="left" arrow>
                <IconButton
                  size="medium"
                  onClick={handleMenuOpen}
                  sx={{
                    color: "text.secondary",
                    backgroundColor: alpha(theme.palette.grey[500], 0.08),
                    border: `1px solid ${alpha(theme.palette.grey[500], 0.2)}`,
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.grey[500], 0.15),
                      color: "text.primary",
                      transform: "scale(1.05)",
                      borderColor: "grey.500",
                      boxShadow: `0 4px 8px ${alpha(theme.palette.grey[500], 0.3)}`,
                    },
                    "&:active": {
                      transform: "scale(0.95)",
                    },
                  }}
                >
                  <i
                    className="tabler-dots-vertical"
                    style={{ fontSize: "18px" }}
                  />
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{
                  "& .MuiPaper-root": {
                    borderRadius: "12px",
                    minWidth: 200,
                    boxShadow: theme.shadows[8],
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  },
                }}
              >
                <MenuItem onClick={handleViewDetails}>
                  <ListItemIcon>
                    <i
                      className="tabler-eye"
                      style={{
                        fontSize: "18px",
                        color: theme.palette.info.main,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="View Details" />
                </MenuItem>

                <MenuItem onClick={handleEdit}>
                  <ListItemIcon>
                    <i
                      className="tabler-edit"
                      style={{
                        fontSize: "18px",
                        color: theme.palette.primary.main,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Edit Step" />
                </MenuItem>

                <MenuItem onClick={handleDuplicate}>
                  <ListItemIcon>
                    <i
                      className="tabler-copy"
                      style={{
                        fontSize: "18px",
                        color: theme.palette.secondary.main,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Duplicate" />
                </MenuItem>

                <Divider sx={{ my: 1 }} />

                <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
                  <ListItemIcon>
                    <i
                      className="tabler-trash"
                      style={{
                        fontSize: "18px",
                        color: theme.palette.error.main,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Delete Step" />
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StepItem;
