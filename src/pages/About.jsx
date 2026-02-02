import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Taskify</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personal productivity companion designed to help you organize, track, and accomplish your daily tasks with ease.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* What is Taskify */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What is Taskify?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Taskify is a modern, intuitive todo application built to streamline your daily productivity. 
              Whether you're managing personal tasks, work projects, or long-term goals, Taskify provides 
              the tools you need to stay organized and focused.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our clean, user-friendly interface makes task management effortless, allowing you to spend 
              less time organizing and more time accomplishing your goals.
            </p>
          </div>

          {/* Key Features */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Create and manage unlimited tasks</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Mark tasks as complete with visual indicators</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Edit and update task descriptions easily</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Secure user authentication and profiles</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Personal dashboard for task overview</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Responsive design for all devices</span>
              </li>
            </ul>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your free account to get started with Taskify</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Add Tasks</h3>
              <p className="text-gray-600">Quickly add tasks with descriptions and organize your workflow</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay Productive</h3>
              <p className="text-gray-600">Track progress, complete tasks, and achieve your goals</p>
            </div>
          </div>
        </div>

        {/* What You Can Do */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">What You Can Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">+</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Create Tasks</h4>
                  <p className="text-gray-600 text-sm">Add new tasks with detailed descriptions to keep track of everything you need to do.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Mark Complete</h4>
                  <p className="text-gray-600 text-sm">Check off completed tasks and see your progress with visual completion indicators.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-yellow-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✎</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Edit & Update</h4>
                  <p className="text-gray-600 text-sm">Modify task descriptions and details as your priorities change.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-red-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">×</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Delete Tasks</h4>
                  <p className="text-gray-600 text-sm">Remove tasks that are no longer relevant or needed.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-purple-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">📊</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Track Progress</h4>
                  <p className="text-gray-600 text-sm">Monitor your productivity through your personal dashboard.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-indigo-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">👤</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Manage Profile</h4>
                  <p className="text-gray-600 text-sm">Customize your account settings and personal information.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We believe that productivity shouldn't be complicated. Taskify is designed to be simple, 
            efficient, and powerful - helping you focus on what matters most while keeping your tasks 
            organized and your goals within reach.
          </p>
          <div className="mt-8">
            <a 
              href="/register" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 inline-block"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
