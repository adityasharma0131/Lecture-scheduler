import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!values.email || !values.password) {
      toast.error("All fields are required");
      return false;
    }
    return true;
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Admin Login Attempt:", values);
    toast.success("Admin login successful");
    navigate("/admin");
  };

  const handleInstructorLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Instructor Login Attempt:", values);
    toast.success("Instructor login successful");
    navigate("/instructor");
  };

  return (
    <div className="container">
      <h2>Login Account</h2>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={handleChange}
            value={values.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="*****"
            onChange={handleChange}
            value={values.password}
          />
        </div>
        <div>
          <button type="submit" onClick={handleAdminLogin}>Admin Login</button>
          <button type="submit" onClick={handleInstructorLogin}>Instructor Login</button>
        </div>
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
      <Toaster />
    </div>
  );
};

export default Login;
