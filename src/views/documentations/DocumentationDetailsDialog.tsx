"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Box,
  Chip,
  Card,
  CardContent,
  alpha,
} from "@mui/material";
import { DocumentationType } from "@/types/DocumentationTypes";
import DialogCloseButton from "../../components/dialogs/DialogCloseButton";

interface DocumentationDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  documentation: DocumentationType | null;
}

const DocumentationDetailsDialog = ({
  open,
  onClose,
  documentation,
}: DocumentationDetailsDialogProps) => {
  if (!documentation) return null;

  // Helper function to get content type chip color
  const getContentTypeColor = (showContentFor: string) => {
    switch (showContentFor) {
      case "mentors":
        return "primary";
      case "judgers":
        return "secondary";
      case "users":
        return "info";
      case "managers":
        return "warning";
      case "all":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      aria-labelledby="documentation-details-dialog-title"
    >
      <DialogCloseButton onClick={onClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>

      <DialogTitle id="documentation-details-dialog-title">
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontWeight: 600,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            pr: 6, // Account for close button
          }}
        >
          {documentation.title}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          {/* Documentation Metadata */}
          <Grid item xs={12}>
            <Card elevation={0} className="border">
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    color: "text.primary",
                    fontWeight: 600,
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "primary.main",
                    }}
                  />
                  Documentation Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: (theme) =>
                          alpha(theme.palette.primary.main, 0.05),
                        border: (theme) =>
                          `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        Target Audience
                      </Typography>
                      <Chip
                        variant="tonal"
                        className="capitalize"
                        label={documentation.showContentFor}
                        size="small"
                        color={
                          getContentTypeColor(
                            documentation.showContentFor
                          ) as any
                        }
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          height: 28,
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: (theme) =>
                          alpha(theme.palette.info.main, 0.05),
                        border: (theme) =>
                          `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        Display Order
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{
                          color: "info.main",
                          fontSize: "1.25rem",
                        }}
                      >
                        #{documentation.arrange}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Timestamps */}
          <Grid item xs={12}>
            <Card elevation={0} className="border">
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    color: "text.primary",
                    fontWeight: 600,
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "secondary.main",
                    }}
                  />
                  Timeline
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        backgroundColor: (theme) =>
                          alpha(theme.palette.success.main, 0.05),
                        border: (theme) =>
                          `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: 3,
                          backgroundColor: "success.main",
                          borderRadius: "2px 2px 0 0",
                        },
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        📅 Created At
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight="medium"
                        sx={{ color: "text.primary" }}
                      >
                        {new Date(documentation.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        {new Date(documentation.createdAt).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        backgroundColor: (theme) =>
                          alpha(theme.palette.warning.main, 0.05),
                        border: (theme) =>
                          `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: 3,
                          backgroundColor: "warning.main",
                          borderRadius: "2px 2px 0 0",
                        },
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        🔄 Last Updated
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight="medium"
                        sx={{ color: "text.primary" }}
                      >
                        {new Date(documentation.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        {new Date(documentation.updatedAt).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Documentation Content */}
          <Grid item xs={12}>
            <Card elevation={0} className="border">
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 3, pb: 2 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      color: "text.primary",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: "info.main",
                      }}
                    />
                    📄 Content
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 3,
                    mx: 3,
                    mb: 3,
                    border: (theme) =>
                      `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                    borderRadius: 2,
                    backgroundColor: (theme) =>
                      alpha(theme.palette.background.default, 0.5),
                    position: "relative",
                    maxHeight: 400,
                    overflowY: "auto",
                    "&::-webkit-scrollbar": {
                      width: 8,
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: (theme) =>
                        alpha(theme.palette.grey[300], 0.3),
                      borderRadius: 4,
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: (theme) =>
                        alpha(theme.palette.grey[500], 0.5),
                      borderRadius: 4,
                      "&:hover": {
                        backgroundColor: (theme) =>
                          alpha(theme.palette.grey[600], 0.7),
                      },
                    },
                    "& h1, & h2, & h3, & h4, & h5, & h6": {
                      marginTop: 2,
                      marginBottom: 1,
                      color: "text.primary",
                      fontWeight: 600,
                    },
                    "& h1": { fontSize: "1.875rem" },
                    "& h2": { fontSize: "1.5rem" },
                    "& h3": { fontSize: "1.25rem" },
                    "& p": {
                      marginBottom: 1.5,
                      lineHeight: 1.7,
                      color: "text.primary",
                    },
                    "& ul, & ol": {
                      paddingLeft: 3,
                      marginBottom: 1.5,
                    },
                    "& li": {
                      marginBottom: 0.5,
                      lineHeight: 1.6,
                    },
                    "& a": {
                      color: "primary.main",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    },
                    "& code": {
                      backgroundColor: (theme) =>
                        alpha(theme.palette.grey[100], 0.8),
                      padding: "2px 6px",
                      borderRadius: 1,
                      fontSize: "0.875rem",
                      fontFamily: "monospace",
                    },
                    "& pre": {
                      backgroundColor: (theme) =>
                        alpha(theme.palette.grey[100], 0.8),
                      padding: 2,
                      borderRadius: 1,
                      overflow: "auto",
                      marginBottom: 1.5,
                    },
                    "& blockquote": {
                      borderLeft: (theme) =>
                        `4px solid ${theme.palette.primary.main}`,
                      paddingLeft: 2,
                      marginLeft: 0,
                      marginBottom: 1.5,
                      fontStyle: "italic",
                      backgroundColor: (theme) =>
                        alpha(theme.palette.primary.main, 0.05),
                      borderRadius: "0 4px 4px 0",
                      padding: 2,
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: documentation.content }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentationDetailsDialog;
