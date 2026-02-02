import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { 
  FaPlus, 
  FaCheckCircle, 
  FaClock, 
  FaTasks, 
  FaUser, 
  FaChartLine
} from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0
  });
  const [recentTodos, setRecentTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Quick add todo form
  const [quickAdd, setQuickAdd] = useState({
    description: "",
    completed: false,
  });

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  // Fetch todos and calculate stats
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/todos");
        const todosData = res.data;
        setTodos(todosData);
        
        // Calculate statistics
        const total = todosData.length;
        const completed = todosData.filter(todo => todo.completed).length;
        const pending = total - completed;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        setStats({ total, completed, pending, completionRate });
        
        // Get recent todos (last 5)
        setRecentTodos(todosData.slice(0, 5));
        
        setLoading(false);
      } catch (err) {
        setError("Failed to load dashboard data");
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // Handle quick add todo
  const handleQuickAdd = async (e) => {
    e.preventDefault();
    if (!quickAdd.description.trim()) return;
    
    try {
      await axios.post("http://localhost:5000/todos/add", {
        todo_description: quickAdd.description,
        completed: false
      });
      
      // Refresh todos
      const todosRes = await axios.get("http://localhost:5000/todos");
      const todosData = todosRes.data;
      setTodos(todosData);
      
      // Update stats
      const total = todosData.length;
      const completed = todosData.filter(todo => todo.completed).length;
      const pending = total - completed;
      const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      setStats({ total, completed, pending, completionRate });
      setRecentTodos(todosData.slice(0, 5));
      
      // Reset form
      setQuickAdd({ description: "", completed: false });
    } catch (err) {
      setError("Failed to add todo");
      setTimeout(() => setError(""), 3000);
    }
  };

  // Toggle todo completion
  const toggleTodoCompletion = async (todoId, currentStatus) => {
    try {
      await axios.put(`http://localhost:5000/todos/${todoId}`, {
        completed: !currentStatus
      });
      
      // Refresh data
      const res = await axios.get("http://localhost:5000/todos");
      const todosData = res.data;
      setTodos(todosData);
      
      // Update stats
      const total = todosData.length;
      const completed = todosData.filter(todo => todo.completed).length;
      const pending = total - completed;
      const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      setStats({ total, completed, pending, completionRate });
      setRecentTodos(todosData.slice(0, 5));
    } catch (err) {
      setError("Failed to update todo");
      setTimeout(() => setError(""), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'User'}! 👋
          </h1>
          <p className="text-gray-600">Here's what's happening with your tasks today.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-2 sm:p-3">
                <FaTasks className="text-blue-600 text-lg sm:text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="bg-green-100 rounded-full p-2 sm:p-3">
                <FaCheckCircle className="text-green-600 text-lg sm:text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl sm:text-3xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <div className="bg-orange-100 rounded-full p-2 sm:p-3">
                <FaClock className="text-orange-600 text-lg sm:text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl sm:text-3xl font-bold text-purple-600">{stats.completionRate}%</p>
              </div>
              <div className="bg-purple-100 rounded-full p-2 sm:p-3">
                <FaChartLine className="text-purple-600 text-lg sm:text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="w-full flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors">
                      <FaPlus />
                      <span>Add New Task</span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Quick Add Task</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleQuickAdd} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Task Description
                        </label>
                        <input
                          type="text"
                          value={quickAdd.description}
                          onChange={(e) => setQuickAdd({ ...quickAdd, description: e.target.value })}
                          placeholder="What needs to be done?"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <DialogFooter className="flex space-x-3">
                        <DialogClose asChild>
                          <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                          >
                            Add Task
                          </button>
                        </DialogClose>
                        <DialogClose asChild>
                          <button
                            type="button"
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium"
                          >
                            Cancel
                          </button>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                <Link
                  to="/todo"
                  className="w-full flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-colors"
                >
                  <FaTasks />
                  <span>View All Tasks</span>
                </Link>

                <Link
                  to="/profile"
                  className="w-full flex items-center space-x-3 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg transition-colors"
                >
                  <FaUser />
                  <span>Manage Profile</span>
                </Link>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Progress Overview</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Completion Rate</span>
                    <span>{stats.completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${stats.completionRate}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.completed}</p>
                    <p className="text-xs sm:text-sm text-gray-600">Done</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-orange-600">{stats.pending}</p>
                    <p className="text-xs sm:text-sm text-gray-600">To Do</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Tasks */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Recent Tasks</h2>
                <Link 
                  to="/todo"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  View All →
                </Link>
              </div>

              {recentTodos.length === 0 ? (
                <div className="text-center py-8">
                  <FaTasks className="text-gray-300 text-4xl mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No tasks yet. Create your first task!</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                        Add Your First Task
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add Your First Task</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleQuickAdd} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Task Description
                          </label>
                          <input
                            type="text"
                            value={quickAdd.description}
                            onChange={(e) => setQuickAdd({ ...quickAdd, description: e.target.value })}
                            placeholder="What needs to be done?"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <DialogFooter className="flex space-x-3">
                          <DialogClose asChild>
                            <button
                              type="submit"
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                            >
                              Add Task
                            </button>
                          </DialogClose>
                          <DialogClose asChild>
                            <button
                              type="button"
                              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium"
                            >
                              Cancel
                            </button>
                          </DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentTodos.map((todo) => (
                    <div 
                      key={todo.todo_id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleTodoCompletion(todo.todo_id, todo.completed)}
                          className={`h-6 w-6 border-2 rounded-full flex items-center justify-center transition-colors ${
                            todo.completed 
                              ? "bg-green-500 border-green-500 text-white" 
                              : "border-gray-400 hover:border-green-400"
                          }`}
                        >
                          {todo.completed && <MdOutlineDone size={16} />}
                        </button>
                        <div>
                          <p className={`font-medium ${
                            todo.completed ? "text-gray-500 line-through" : "text-gray-900"
                          }`}>
                            {todo.description}
                          </p>
                          <p className="text-sm text-gray-500">
                            Task #{todo.todo_id}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          todo.completed 
                            ? "bg-green-100 text-green-800" 
                            : "bg-orange-100 text-orange-800"
                        }`}>
                          {todo.completed ? "Completed" : "Pending"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Welcome Message for New Users */}
        {stats.total === 0 && (
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 sm:p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              Welcome to Taskify! 🎉
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              You're all set up and ready to boost your productivity. Start by creating your first task 
              and experience how Taskify can help you stay organized and focused.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
                    Create Your First Task
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create Your First Task</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleQuickAdd} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        What would you like to accomplish?
                      </label>
                      <input
                        type="text"
                        value={quickAdd.description}
                        onChange={(e) => setQuickAdd({ ...quickAdd, description: e.target.value })}
                        placeholder="e.g., Review project proposal"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <DialogFooter className="flex space-x-3">
                      <DialogClose asChild>
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                        >
                          Create Task
                        </button>
                      </DialogClose>
                      <DialogClose asChild>
                        <button
                          type="button"
                          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium"
                        >
                          Maybe Later
                        </button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Link
                to="/about"
                className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium"
              >
                Learn More About Taskify
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;