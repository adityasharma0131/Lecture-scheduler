import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AdminPage = () => {
  const navigate = useNavigate();
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const response = await axios.get("https://lecture-scheduler-seven.vercel.app/lectures");
      setLectures(response.data);
    } catch (error) {
      toast.error("Failed to fetch lectures");
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
      <div className="header">AdminPage</div>
      <div className="container">
        <div className="pages">
          <Link to="/admin/instructor">
            <button>Instructors Page</button>
          </Link>
          <Link to="/admin/course">
            <button>Courses Page</button>
          </Link>
          <Link to="/admin/lecture">
            <button>Lectures Page</button>
          </Link>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Course</th>
                <th>Instructor</th>
              </tr>
            </thead>
            <tbody>
              {lectures.map((lecture) => (
                <tr key={lecture._id}>
                  <td>{new Date(lecture.date).toLocaleDateString()}</td>
                  <td>{lecture.course}</td>
                  <td>{lecture.instructor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminPage;