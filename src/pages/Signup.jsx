import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = ({ setUser }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/register", form);
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-6 px-6 rounded-t-lg shadow-lg">
          <h2 className="text-white text-3xl text-center font-bold">Sign Up</h2>
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
            <label htmlFor="name" className="font-bold text-gray-700">
              User Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border w-full mt-2 py-2 px-2 rounded"
            />
          </div>
          <div className="mt-6">
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
              Sign up
            </button>
          </div>
          <div className="w-full text-center mt-6">
            <p className="text-gray-600">
              Already have an account?
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 ml-2 font-semibold"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
