import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPage from "./pages/AdminSide/AdminPage";
import InstructorPage from "./pages/AdminSide/InstructorPage";
import CoursePage from "./pages/AdminSide/CoursePage";
import InstructorSide from "./pages/InstructorSide/InstructorPage";
import Error from "./pages/ErrorSide/ErrorPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/admin-register-page" element={<Register />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/admin" element={<AdminPage />} />
        <Route exact path="/admin/instructor" element={<InstructorPage />} />
        <Route exact path="/admin/course" element={<CoursePage />} />
        <Route exact path="/instructor" element={<InstructorSide />} />
        <Route exact path="/*" element={<Error />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
