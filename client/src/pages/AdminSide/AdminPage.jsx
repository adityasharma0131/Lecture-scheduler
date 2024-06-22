import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  // Dummy data for the table
  const tableData = [
    [
      "Row 1, Col 1",
      "Row 1, Col 2",
      "Row 1, Col 3",
      "Row 1, Col 4",
      "Row 1, Col 5",
    ],
    [
      "Row 2, Col 1",
      "Row 2, Col 2",
      "Row 2, Col 3",
      "Row 2, Col 4",
      "Row 2, Col 5",
    ],
    [
      "Row 3, Col 1",
      "Row 3, Col 2",
      "Row 3, Col 3",
      "Row 3, Col 4",
      "Row 3, Col 5",
    ],
    [
      "Row 4, Col 1",
      "Row 4, Col 2",
      "Row 4, Col 3",
      "Row 4, Col 4",
      "Row 4, Col 5",
    ],
    [
      "Row 5, Col 1",
      "Row 5, Col 2",
      "Row 5, Col 3",
      "Row 5, Col 4",
      "Row 5, Col 5",
    ],
  ];

  return (
    <>
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
                <th>Column 1</th>
                <th>Column 2</th>
                <th>Column 3</th>
                <th>Column 4</th>
                <th>Column 5</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
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
