export type CourseType = {
  id: string
  image: string
  title: string
  description: string
  tags: string[]
  categories: string[]
  level: "Beginner" | "Intermediate" | "Advanced"
  relatedQuizzes: number
  visibilityStatus: "Public" | "Private" | "Draft"
  courseCode: string
  enrolledStudents?: number
  duration?: string
}