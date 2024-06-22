const mongoose = require("mongoose");

// Connect to MongoDB Atlas cluster
const connect = mongoose.connect(
  "mongodb+srv://adityasharma0431:anant99@cluster0.yahseam.mongodb.net/"
);

connect
  .then(() => {
    console.log("Database Connected Successfully!!");
  })
  .catch((error) => {
    console.error("Error Connecting Database!", error);
  });

// Define the User schema
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true, // Assuming "admin" is the default type
  },
  image: {
    type: String,
    required: true, // Assuming "admin" is the default type
  },
});

// Create a User model based on the schema

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
