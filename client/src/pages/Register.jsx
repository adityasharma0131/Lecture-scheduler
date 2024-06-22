import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate email format
      if (!/\S+@\S+\.\S+/.test(values.email)) {
        throw new Error("Invalid email format. Please enter a valid email.");
      }

      const response = await axios.post("https://lecture-scheduler-seven.vercel.app/register-admin", {
        name: values.email,
        email: values.email,
        password: values.password,
      });

      // Assuming your backend responds with a success message
      toast.success(response.data.message);

      // Clear the form inputs after successful registration
      setValues({ name: "",  email: "", password: "" });
    } catch (error) {
      // Display error message from backend (if available) or generic error
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container">
      <h2>Register Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={values.name}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={values.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="*****"
            value={values.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to="/">Login</Link>
        </span>
      </form>
      <Toaster />
    </div>
  );
};

export default Register;
