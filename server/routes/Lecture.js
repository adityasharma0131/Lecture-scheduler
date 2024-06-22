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
const lectureSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

// Create a User model based on the schema

const Lecture = mongoose.model("Lecture", lectureSchema);

module.exports = Lecture;
