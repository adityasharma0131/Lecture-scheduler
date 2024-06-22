import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Correct import for useNavigate

const InstructorPage = () => {
  const [lectures, setLectures] = useState([]);
  const navigate = useNavigate(); // Hook to get navigation function

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const response = await axios.get("https://lecture-scheduler-seven.vercel.app/lectures");
      setLectures(response.data);
    } catch (error) {
      console.error("Error fetching lectures:", error);
      toast.error("Failed to fetch lectures");
    }
  };

  const handleLogout = () => {
    // Replace with actual logout logic, e.g., clearing tokens, state, etc.
    navigate("/"); // Use navigate function to go to home or login page
  };

  return (
    <>
      <div className="header">
        <h2>Lecture Schedule</h2>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Course</th>
            <th>Instructor</th>
          </tr>
        </thead>
        <tbody>
          {lectures.map((lecture, index) => (
            <tr key={lecture._id || index}>
              <td>{new Date(lecture.date).toLocaleDateString()}</td>
              <td>{lecture.course}</td>
              <td>{lecture.instructor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default InstructorPage;
