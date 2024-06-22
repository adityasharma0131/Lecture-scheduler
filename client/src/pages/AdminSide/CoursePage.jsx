import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const InstructorPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/courses");
      setCourses(response.data);
    } catch (error) {
      toast.error("Failed to fetch courses");
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back one step in history
  };

  const handleAdd = async () => {
    if (!name || !level || !description || !image) {
      toast.error("All fields are required");
      return;
    }

    try {
      // Assuming your backend correctly handles image uploads and responds with appropriate messages
      const response = await axios.post(
        "http://localhost:3000/register-course",
        {
          name: name,
          level: level,
          description: description,
          image: image,
        }
      );

      // Display success message from backend
      toast.success(response.data.message);

      // Clear the form inputs after successful registration
      setName("");
      setLevel("");
      setDescription("");
      setImage("");

      fetchCourses();
    } catch (error) {
      // Display error message from backend (if available) or generic error
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Course registration failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <button type="button" className="back-button" onClick={handleGoBack}>
        Back
      </button>
      <div className="header">Course Page</div>
      <div className="container">
        <table className="input-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Level</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Enter Course Name"
                  className="input-field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Enter Course Level"
                  className="input-field"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Enter Course Description"
                  className="input-field"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Enter Image Link"
                  className="input-field"
                  onChange={(e) => setImage(e.target.value)}
                />
              </td>
              <td>
                <button
                  type="button"
                  className="action-button"
                  onClick={handleAdd}
                >
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <h2>List of Instructors</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Level</th>
              <th>Description</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course._id || index}>
                <td>{course.name}</td>
                <td>{course.level}</td>
                <td>{course.description}</td>
                <td>
                  <img
                    src={course.image}
                    alt={course.name}
                    style={{ maxWidth: "100px" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InstructorPage;
