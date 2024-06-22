import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const InstructorPage = () => {
  const navigate = useNavigate();
  const [courseId, setCourseId] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [date, setDate] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchInstructors();
    fetchLectures();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("lecture-scheduler-seven.vercel.app/courses");
      setCourses(response.data);
    } catch (error) {
      toast.error("Failed to fetch courses");
    }
  };

  const fetchInstructors = async () => {
    try {
      const response = await axios.get("lecture-scheduler-seven.vercel.app/instructors");
      setInstructors(response.data);
    } catch (error) {
      toast.error("Failed to fetch instructors");
    }
  };

  const fetchLectures = async () => {
    try {
      const response = await axios.get("lecture-scheduler-seven.vercel.app/lectures");
      setLectures(response.data);
    } catch (error) {
      toast.error("Failed to fetch lectures");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCourseChange = (e) => {
    setCourseId(e.target.value);
  };

  const handleInstructorChange = (e) => {
    setInstructorId(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleAdd = async () => {
    if (!courseId || !instructorId || !date) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post("lecture-scheduler-seven.vercel.app/register-lecture", {
        courseId,
        instructorId,
        date,
      });

      toast.success(response.data.message);

      setCourseId("");
      setInstructorId("");
      setDate("");

      fetchLectures(); // Refresh lectures after successful addition
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to add lecture. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <button type="button" className="back-button" onClick={handleGoBack}>
        Back
      </button>
      <div className="header">Lecture Page</div>
      <div className="container">
        <table className="input-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Instructor</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select
                  value={courseId}
                  onChange={handleCourseChange}
                  className="input-field"
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course.name}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={instructorId}
                  onChange={handleInstructorChange}
                  className="input-field"
                >
                  <option value="">Select Instructor</option>
                  {instructors.map((instructor) => (
                    <option key={instructor._id} value={instructor.name}>
                      {instructor.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="date"
                  value={date}
                  onChange={handleDateChange}
                  className="input-field"
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

        <h2>Lecture Schedule</h2>
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
      </div>
    </>
  );
};

export default InstructorPage;
