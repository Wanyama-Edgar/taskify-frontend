import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Signin = ({ setUser }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/auth/login`, form);
      console.log("Login successful:", res.data);

      // Extract token and user from response
      const { token, user } = res.data;

      // Store token in localStorage
      if (token) {
        localStorage.setItem("token", token);
        console.log("Token stored successfully");
      }

      // Set user in app state
      if (user) {
        setUser(user);
      }

      // Configure axios to use token for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Clear form
      setForm({ email: "", password: "" });

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);

      // Handle different error scenarios
      if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else if (err.response?.status === 404) {
        setError("User not found. Please sign up first.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message === "Network Error") {
        setError("Cannot connect to server. Please try again later.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
      <div className="w-full max-w-md">
        <div className="bg-linear-to-r from-blue-600 to-purple-600 py-6 px-6 rounded-t-lg shadow-lg">
          <h2 className="text-white text-3xl text-center font-bold">Sign In</h2>
          <p className="text-blue-100 text-center mt-2">
            Welcome back! Please login to your account.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-none">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          </div>
        )}

        <form
          className="bg-white py-6 px-6 rounded-b-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="email"
              className="block font-semibold text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your.email@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border border-gray-300 w-full py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={loading}
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="password"
              className="block font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="border border-gray-300 w-full py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              minLength={6}
              disabled={loading}
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`text-white bg-linear-to-r from-blue-600 to-purple-600 py-3 px-4 rounded-lg font-bold w-full transition-all ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          <div className="w-full text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 ml-2 font-semibold hover:underline"
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
