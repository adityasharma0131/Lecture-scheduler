import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <div>AdminPage</div>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default AdminPage;
