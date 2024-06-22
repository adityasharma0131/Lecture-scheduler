import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const InstructorPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const response = await axios.get("https://lecture-scheduler-seven.vercel.app/instructors");
      setInstructors(response.data);
    } catch (error) {
      toast.error("Failed to fetch instructors");
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back one step in history
  };

  const handleAdd = async () => {
    if (!email || !password) {
      toast.error("Email and Password are required");
      return;
    }

    try {
      // Validate email format
      if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error("Invalid email format. Please enter a valid email.");
      }

      const response = await axios.post(
        "https://lecture-scheduler-seven.vercel.app/register-instructor",
        {
          name: name,
          email: email,
          password: password,
        }
      );

      // Assuming your backend responds with a success message
      toast.success(response.data.message);

      // Clear the form inputs after successful registration
      setEmail("");
      setPassword("");

      // Refresh the list of instructors
      fetchInstructors();
    } catch (error) {
      // Display error message from backend (if available) or generic error
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <button type="button" className="back-button" onClick={handleGoBack}>
        Back
      </button>
      <div className="header">Instructor Page Admin side</div>
      <div className="container">
        <table className="input-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="input-field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
        <table className="instructors-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map((instructor, index) => (
              <tr key={instructor._id || index}>
                <td>{instructor.name}</td>
                <td>{instructor.email}</td>
                <td>{instructor.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InstructorPage;
