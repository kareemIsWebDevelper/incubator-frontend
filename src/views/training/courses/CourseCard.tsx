"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { CourseType } from "@/types/CourseTypes";

interface CourseCardProps {
  course: CourseType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function CourseCard({
  course,
  onEdit,
  onDelete
}: CourseCardProps) {
  const {
    id,
    image,
    title,
    description,
    tags,
    categories,
    level,
    relatedQuizzes,
    visibilityStatus,
    courseCode,
    enrolledStudents,
    duration,
  } = course;
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
    "success"
  );

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(courseCode);
      setCopied(true);
      setToastMessage(`${courseCode} has been copied to your clipboard.`);
      setToastSeverity("success");
      setShowToast(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setToastMessage("Failed to copy. Please try again.");
      setToastSeverity("error");
      setShowToast(true);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "Advanced":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getVisibilityIcon = (status: string) => {
    switch (status) {
      case "Public":
        return <i className="tabler-eye text-base"></i>;
      case "Private":
        return <i className="tabler-lock text-base"></i>;
      case "Draft":
        return <i className="tabler-alert-circle text-base"></i>;
      default:
        return <i className="tabler-eye text-base"></i>;
    }
  };

  const getVisibilityColor = (status: string) => {
    switch (status) {
      case "Public":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Private":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "Draft":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <Box className="relative">
            <img
              // src={image ||"/images/image-placeholder.jpg"}
              src={"/images/image-placeholder.jpg"}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/images/image-placeholder.jpg";
              }}
              alt={title}
              className="w-full h-48 object-cover"
            />
            <Box className="absolute top-3 right-3 flex gap-2">
              <Chip
                icon={getVisibilityIcon(visibilityStatus)}
                label={visibilityStatus}
                size="small"
                className={`${getVisibilityColor(visibilityStatus)} flex items-center gap-1`}
              />
            </Box>
            <Box className="absolute bottom-3 left-3">
              <Chip
                label={level}
                size="small"
                className={getLevelColor(level)}
              />
            </Box>
          </Box>
          <Box className="space-y-4 p-4">
            <Box>
              <Typography
                variant="h6"
                className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1"
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                className="text-gray-600 text-sm line-clamp-2"
              >
                {description}
              </Typography>
            </Box>

            <Box className="space-y-3">
              <Box>
                <Typography
                  variant="subtitle2"
                  className="text-sm font-medium text-gray-700 mb-2"
                >
                  Categories
                </Typography>
                <Box className="flex flex-wrap gap-1">
                  {categories.map((category, index) => (
                    <Chip
                      key={index}
                      label={category}
                      variant="outlined"
                      size="small"
                      className="text-xs"
                    />
                  ))}
                </Box>
              </Box>

              <Box>
                <Typography
                  variant="subtitle2"
                  className="text-sm font-medium text-gray-700 mb-2"
                >
                  Tags
                </Typography>
                <Box className="flex flex-wrap gap-1">
                  {tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      className="text-xs bg-gray-100"
                    />
                  ))}
                </Box>
              </Box>
            </Box>

            {/* <Grid container spacing={2} className="pt-2">
              <Grid item xs={6}>
                <Box className="flex items-center gap-2 text-sm text-gray-600">
                  <i className="tabler-book text-base"></i>
                  <Typography variant="body2">
                    {relatedQuizzes} Quizzes
                  </Typography>
                </Box>
              </Grid>
              {duration && (
                <Grid item xs={6}>
                  <Box className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="tabler-clock text-base"></i>
                    <Typography variant="body2">{duration}</Typography>
                  </Box>
                </Grid>
              )}
              {enrolledStudents && (
                <Grid item xs={12}>
                  <Box className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="tabler-users text-base"></i>
                    <Typography variant="body2">
                      {enrolledStudents.toLocaleString()} students
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid> */}
          </Box>
        </CardContent>

        <CardActions className="p-6 pt-0">
          <Box className="w-full space-y-3">
            <Box className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <Box>
                <Typography
                  variant="caption"
                  className="text-xs text-gray-500 mb-1"
                >
                  Course Code
                </Typography>
                <Typography
                  variant="body2"
                  className="font-mono text-sm font-medium"
                >
                  {courseCode}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                size="small"
                onClick={copyToClipboard}
                startIcon={
                  copied ? (
                    <i className="tabler-check text-base text-green-600"></i>
                  ) : (
                    <i className="tabler-copy text-base"></i>
                  )
                }
                className="flex items-center gap-2"
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </Box>

            <Box className="flex items-center mb-2">
              <Button 
                variant="contained" 
                  fullWidth
                  className="text-nowrap"
                startIcon={<i className="tabler-eye text-base"></i>}
              >
                View Course
              </Button>
              <Button 
                variant="tonal" 
                className="w-8 h-8 flex items-center justify-center"
                onClick={() => onEdit && onEdit(id)}
              >
                <i className="tabler-edit text-base"></i>
              </Button>
            <Button 
              variant="tonal" 
              className="w-8 h-8 flex items-center justify-center"
              color="error"
              onClick={() => {
                if (onDelete && window.confirm(`Are you sure you want to delete "${title}"?`)) {
                  onDelete(id);
                  setToastMessage("Course deleted successfully.");
                  setToastSeverity("success");
                  setShowToast(true);
                }
              }}
            >
              <i className="tabler-trash text-base"></i>
            </Button>
            </Box>
          </Box>
        </CardActions>
      </Card>

      <Snackbar
        open={showToast}
        autoHideDuration={3000}
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setShowToast(false)} severity={toastSeverity}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
