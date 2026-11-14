
import express from "express";
import cors from "cors";
import { COURSES } from "./courseData.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "student-course-api",
    message: "Student Course API is running"
  });
});

app.get("/api/courses", (req, res) => {
  res.status(200).json({
    count: COURSES.length,
    courses: COURSES
  });
});

app.get("/api/courses/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      error: "Invalid course ID"
    });
  }

  const course = COURSES.find((item) => item.id === id);

  if (!course) {
    return res.status(404).json({
      error: "Course not found",
      code: "COURSE_NOT_FOUND"
    });
  }

  return res.status(200).json({ course });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Not found"
  });
});

app.listen(PORT, () => {
  console.log(`Student Course API listening on port ${PORT}`);
});
