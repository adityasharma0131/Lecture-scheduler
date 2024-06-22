const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("./DB"); // Ensure this path is correct and points to your User model
const Course = require("./Course"); // Ensure this path is correct and points to your Course model
const Lecture = require("./Lecture"); // Ensure this path is correct and points to your Lecture model

// Register admin
router.post("/register-admin", async (req, res) => {
  const {name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with type "admin"
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      type: "admin",
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    // Handle any errors
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: "Registration failed. Please try again later." });
  }
});

// Register instructor
router.post("/register-instructor", async (req, res) => {
  const { name, email, password } = req.body;
  console.log({ name, email, password });

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with type "instructor"
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      type: "instructor",
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    // Handle any errors
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: "Registration failed. Please try again later." });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Return user object along with type
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed. Please try again later" });
  }
});

// Fetch all instructors
router.get("/instructors", async (req, res) => {
  try {
    const instructors = await User.find({ type: "instructor" });
    res.status(200).json(instructors);
  } catch (error) {
    console.error("Error fetching instructors:", error);
    res.status(500).json({
      message: "Failed to fetch instructors. Please try again later.",
    });
  }
});

// Register course
router.post("/register-course", async (req, res) => {
  const { name, level, description, image } = req.body;
  console.log({ name, level, description, image });
  try {
    // Validate incoming data
    if (!name || !level || !description || !image) {
      throw new Error("All fields are required");
    }

    // Create a new course instance
    const newCourse = new Course({
      name,
      level,
      description,
      image,
    });

    // Save the course to the database
    await newCourse.save();

    // Respond with a success message
    res.status(201).json({ message: "Course registration successful!" });
  } catch (error) {
    // Handle any errors
    console.error("Error registering course:", error);
    res
      .status(500)
      .json({ message: error.message || "Course registration failed" });
  }
});

// Fetch all courses
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch courses. Please try again later." });
  }
});
router.get("/lectures", async (req, res) => {
  try {
    const courses = await Lecture.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching Lectures:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch Lectures. Please try again later." });
  }
});

// Register lecture
router.post("/register-lecture", async (req, res) => {
  const { courseId, instructorId, date } = req.body;

  try {
    // Validate incoming data
    if (!courseId || !instructorId || !date) {
      throw new Error("All fields are required");
    }

    // Check if the instructor is already assigned to a course on the same date
    const existingLecture = await Lecture.findOne({
      instructor: instructorId,
      date,
    });
    if (existingLecture) {
      return res
        .status(400)
        .json({
          message: "Instructor is already assigned to a course on this date",
        });
    }

    // Create a new lecture instance
    const newLecture = new Lecture({
      course: courseId,
      instructor: instructorId,
      date,
    });

    // Save the lecture to the database
    await newLecture.save();

    // Respond with a success message
    res.status(201).json({ message: "Lecture registration successful!" });
  } catch (error) {
    // Handle any errors
    console.error("Error registering lecture:", error);
    res
      .status(500)
      .json({ message: error.message || "Lecture registration failed" });
  }
});

module.exports = router;
