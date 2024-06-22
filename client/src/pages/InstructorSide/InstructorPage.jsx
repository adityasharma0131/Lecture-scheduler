import React from "react";
import { useNavigate } from "react-router-dom";

const InstructorPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <div>InstructorPage instructor side</div>
      <button type="submit" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default InstructorPage;
