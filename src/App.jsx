import React from "react";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Todo from "./pages/Todo.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedLayout from "./layout/ProtectedLayout.jsx";
import PublicLayout from "./layout/PublicLayout.jsx";

//axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      {/*Public Routes*/}
      <Route element={<PublicLayout user={user} setUser={setUser} />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Signin setUser={setUser} />
            )
          }
        />
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Signup setUser={setUser} />
            )
          }
        />
      </Route>

      {/*Protected Routes*/}
      <Route
        element={
          user ? (
            <ProtectedLayout user={user} setUser={setUser} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Redirect root to appropriate page */}
      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/"} replace />}
      />
    </Routes>
  );
};

export default App;
