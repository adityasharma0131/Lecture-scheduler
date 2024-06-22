const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("./DB"); // Ensure this path is correct and points to your User model

// Register admin
router.post("/register-admin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with type "admin"
    const newUser = new User({ email, password: hashedPassword, type: "admin" });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    // Handle any errors
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Registration failed. Please try again later." });
  }
});

// Register instructor
router.post("/register-instructor", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with type "instructor"
    const newUser = new User({ email, password: hashedPassword, type: "instructor" });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    // Handle any errors
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Registration failed. Please try again later." });
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
    res.status(500).json({ message: "Failed to fetch instructors. Please try again later." });
  }
});

module.exports = router;
