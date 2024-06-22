import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";

const Login = () => {
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
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="*****"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <button type="submit">Admin Login</button>
          <button type="submit">Instructor Login</button>
        </div>
        {/* <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span> */}
      </form>
      <Toaster />
    </div>
  );
};

export default Login;
