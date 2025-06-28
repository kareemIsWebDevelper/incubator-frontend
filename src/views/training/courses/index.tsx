"use client";

import React, { useState, useMemo } from 'react'
import CustomTextField from "@/@core/components/mui/TextField";
import { Button, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CourseCard from './CourseCard'
import CourseFormDialog from './CourseFormDialog'
import { db } from '@/fake-db/apps/courses'
import { CourseType } from '@/types/CourseTypes'

const TrainingCourses = () => {
  // State for courses
  const [courses, setCourses] = useState<CourseType[]>(db);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<CourseType | null>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedVisibility, setSelectedVisibility] = useState<string>("all");

  // Extract unique categories from courses
  const categories = useMemo(() => {
    const allCategories = courses.flatMap(course => course.categories);
    const uniqueCategories = Array.from(new Set(allCategories));
    return uniqueCategories.sort();
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Search in title, description, and tags
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      // Filter by level
      const matchesLevel =
        selectedLevel === "all" || course.level === selectedLevel;
      
      // Filter by category
      const matchesCategory =
        selectedCategory === "all" || course.categories.includes(selectedCategory);
      
      // Filter by visibility
      const matchesVisibility =
        selectedVisibility === "all" || course.visibilityStatus === selectedVisibility;

      return matchesSearch && matchesLevel && matchesCategory && matchesVisibility;
    });
  }, [searchTerm, selectedLevel, selectedCategory, selectedVisibility, courses]);

  // Handle edit and delete actions
  const onEdit = (id: string) => {
    const courseToEdit = courses.find(course => course.id === id);
    if (courseToEdit) {
      setCurrentCourse(courseToEdit);
      setIsDialogOpen(true);
    }
  };

  const onDelete = (id: string) => {
    // Logic to handle deleting a course
    console.log("Delete course with ID:", id);
    setCourses(courses.filter((course) => course.id !== id));
  };
  
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentCourse(null);
  };
  
  const handleCourseSubmit = (courseData: Omit<CourseType, 'id'>) => {
    if (currentCourse) {
      // Update existing course
      setCourses(courses.map(course => 
        course.id === currentCourse.id 
          ? { ...courseData, id: currentCourse.id } 
          : course
      ));
    } else {
      // Add new course
      const newCourse = {
        ...courseData,
        id: `course-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
      };
      setCourses([newCourse, ...courses]);
    }
    handleDialogClose();
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Training Courses</h1>
            <p className="text-gray-600">
              Browse our catalog of training courses to enhance your skills
            </p>
          </div>
          <Button
            variant="contained"
            onClick={() => {
              setCurrentCourse(null);
              setIsDialogOpen(true);
            }}
            startIcon={<i className="tabler-plus" />}
          >
            Add New Course
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
              {/* Search */}
              <div className="flex-1 lg:flex-none lg:w-1/3">
                <CustomTextField
                  placeholder="Search courses, topics, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                  InputProps={{
                    startAdornment: (
                      <i className="tabler-search w-4 h-4 text-gray-400 mr-2" />
                    ),
                  }}
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-2 items-center">
                {/* Level Filter */}
                <CustomTextField
                  select
                  placeholder="Filter by level"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full lg:w-44"
                >
                  <MenuItem value="all">All Levels</MenuItem>
                  <MenuItem value="Beginner">Beginner</MenuItem>
                  <MenuItem value="Intermediate">Intermediate</MenuItem>
                  <MenuItem value="Advanced">Advanced</MenuItem>
                </CustomTextField>

                {/* Category Filter */}
                <CustomTextField
                  select
                  placeholder="Filter by category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full lg:w-44"
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </CustomTextField>

                {/* Visibility Filter */}
                <CustomTextField
                  select
                  placeholder="Filter by visibility"
                  value={selectedVisibility}
                  onChange={(e) => setSelectedVisibility(e.target.value)}
                  className="w-full lg:w-44"
                >
                  <MenuItem value="all">All Visibility</MenuItem>
                  <MenuItem value="Public">Public</MenuItem>
                  <MenuItem value="Private">Private</MenuItem>
                  <MenuItem value="Draft">Draft</MenuItem>
                </CustomTextField>

                {/* Clear Filters */}
                {(searchTerm ||
                  selectedLevel !== "all" ||
                  selectedCategory !== "all" ||
                  selectedVisibility !== "all") && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedLevel("all");
                      setSelectedCategory("all");
                      setSelectedVisibility("all");
                    }}
                    className="lg:w-auto"
                    startIcon={
                      <i className="tabler-wash-dryclean-off w-4 h-4" />
                    }
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCourses.length} of {db.length} courses
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <i className="tabler-filter w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No courses found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search terms to find more courses.
              </p>
              <Button
                variant="outlined"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedLevel("all");
                  setSelectedCategory("all");
                  setSelectedVisibility("all");
                }}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Course Form Dialog */}
      <CourseFormDialog 
        open={isDialogOpen}
        onClose={handleDialogClose}
        course={currentCourse}
        onSubmit={handleCourseSubmit}
      />
    </div>
  );
};

export default TrainingCourses;