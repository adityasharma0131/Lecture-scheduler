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

    // Create a new user with type "admin"
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

module.exports = router;
