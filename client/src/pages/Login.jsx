import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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

  const handleLogin = async (e, userType) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(`http://localhost:3000/login`, {
        email: values.email,
        password: values.password,
      });

      toast.success(response.data.message);

      if (response.data.user) {
        if (userType === "admin" && response.data.user.type === "admin") {
          navigate("/admin");
        } else if (
          userType === "instructor" &&
          response.data.user.type === "instructor"
        ) {
          navigate("/instructor");
        } else {
          toast.error("Unauthorized access");
        }
      } else {
        toast.error("User not found or invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    }
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
          <button type="submit" onClick={(e) => handleLogin(e, "admin")}>
            Admin Login
          </button>
          <button type="submit" onClick={(e) => handleLogin(e, "instructor")}>
            Instructor Login
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Login;
