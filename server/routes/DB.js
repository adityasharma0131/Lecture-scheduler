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
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true, // Assuming "admin" is the default type
  },
});

// Create a User model based on the schema
const User = mongoose.model("User", UserSchema);

module.exports = User;
