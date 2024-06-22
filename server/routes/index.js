const express = require("express");
const router = express.Router();
const User = require("./DB"); // Check if the path is correct and points to your User model

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Create a new user with type "admin" for demonstration purposes
    // Modify as per your registration logic
    const newUser = new User({ email, password, type: "admin" });

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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Return user object along with type
    res.status(200).json({ message: "Login successful", user });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed. Please try again later" });
  }
});

module.exports = router;
