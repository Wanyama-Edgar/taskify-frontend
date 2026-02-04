import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdOutlineDone } from "react-icons/md";
import { API_URL } from "@/config";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [add, setAdd] = useState({
    todo_description: "",
    completed: false,
  });

  const [edit, setEdit] = useState({
    todo_description: "",
    todo_id: null,
  });

  // Configure axios to include token in all requests
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(res.data);
      setLoading(false);
    } catch (err) {
      let errorMessage = "Failed to load todos";
      if (err.response?.status === 401) {
        errorMessage = "Authentication failed. Please login again.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      setError(errorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!add.todo_description.trim()) {
      setError("Please enter a todo description");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/todos/add`, add, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdd({ todo_description: "", completed: false });
      setSuccess("Todo added successfully!");
      setTimeout(() => setSuccess(""), 3000);
      fetchTodos();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add todo");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!edit.todo_description.trim()) {
      setError("Please enter a todo description");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/todos/${edit.todo_id}`,
        {
          todo_description: edit.todo_description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setEdit({ todo_description: "", todo_id: null });
      setSuccess("Todo updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
      fetchTodos();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update todo");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleDelete = async (todoId) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${API_URL}/todos/${todoId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuccess("Todo deleted successfully!");
        setTimeout(() => setSuccess(""), 3000);
        fetchTodos();
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete todo");
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  const toggleComplete = async (todoId, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/todos/${todoId}`,
        {
          completed: !currentStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      fetchTodos();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update todo");
      setTimeout(() => setError(""), 3000);
    }
  };

  const openEditDialog = (todo) => {
    setEdit({
      todo_description: todo.description,
      todo_id: todo.todo_id,
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">My Tasks</h1>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-end mb-6">
            <Dialog>
              <DialogTrigger asChild>
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Add Task
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAdd}>
                  <div className="mb-4">
                    <label
                      htmlFor="add_todo_description"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Task Description:
                    </label>
                    <input
                      type="text"
                      id="add_todo_description"
                      placeholder="Enter what needs to be done"
                      value={add.todo_description}
                      required
                      onChange={(e) =>
                        setAdd({
                          ...add,
                          todo_description: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <DialogFooter className="flex space-x-3">
                    <DialogClose asChild>
                      <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Add
                      </button>
                    </DialogClose>
                    <DialogClose asChild>
                      <button
                        type="button"
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {todos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                No tasks available. Add your first task!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {todos.map((todo) => (
                    <tr key={todo.todo_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {todo.todo_id}
                      </td>
                      <td
                        className={`px-6 py-4 text-sm ${todo.completed ? "line-through text-gray-500" : "text-gray-900"}`}
                      >
                        {todo.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() =>
                            toggleComplete(todo.todo_id, todo.completed)
                          }
                          className={`h-6 w-6 border-2 rounded-full flex items-center justify-center transition-colors ${
                            todo.completed
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-gray-400 hover:border-green-400"
                          }`}
                        >
                          {todo.completed && <MdOutlineDone size={16} />}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <button
                                onClick={() => openEditDialog(todo)}
                                className="text-blue-600 hover:text-blue-900 p-1"
                              >
                                <FaEdit />
                              </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Update Task</DialogTitle>
                              </DialogHeader>
                              <form onSubmit={handleEdit}>
                                <div className="mb-4">
                                  <label
                                    htmlFor="edit_todo_description"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                  >
                                    Task Description:
                                  </label>
                                  <input
                                    type="text"
                                    id="edit_todo_description"
                                    placeholder="Enter your todo"
                                    value={edit.todo_description}
                                    required
                                    onChange={(e) =>
                                      setEdit({
                                        ...edit,
                                        todo_description: e.target.value,
                                      })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                </div>
                                <DialogFooter className="flex space-x-3">
                                  <DialogClose asChild>
                                    <button
                                      type="submit"
                                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded"
                                    >
                                      Update
                                    </button>
                                  </DialogClose>
                                  <DialogClose asChild>
                                    <button
                                      type="button"
                                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-2 rounded"
                                    >
                                      Cancel
                                    </button>
                                  </DialogClose>
                                </DialogFooter>
                              </form>
                            </DialogContent>
                          </Dialog>

                          <button
                            onClick={() => handleDelete(todo.todo_id)}
                            className="text-red-600 hover:text-red-900 p-1"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
