import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/config";

const Signin = ({ setUser }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login form submitted with:", { email: form.email });

    try {
      const res = await axios.post(`${API_URL}/auth/login`, form);
      console.log("Login response:", res.data);
      console.log("Cookies after login:", document.cookie);

      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-6 px-6 rounded-t-lg shadow-lg">
          <h2 className="text-white text-3xl text-center font-bold">Sign In</h2>
          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
        </div>
        <form
          className="bg-white py-6 px-6 rounded-b-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="email" className="font-bold text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border w-full mt-2 py-2 px-2 rounded"
            />
          </div>
          <div className="mt-6">
            <label htmlFor="password" className="font-bold text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="border w-full mt-2 py-2 px-2 rounded"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-blue-600 to-purple-600 py-3 px-4 rounded font-bold w-full hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Login
            </button>
          </div>
          <div className="w-full text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 ml-2 font-semibold"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
