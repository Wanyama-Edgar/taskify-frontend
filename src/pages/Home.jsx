import React from "react";
import homepage from "../assets/homepage.png";

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-linear-to-r from-blue-600 to-purple-600 lg:flex justify-center items-center p-8 space-y-8 lg:space-y-0 lg:space-x-8 min-h-screen">
        <div className="flex-1 flex justify-center items-center">
          <div className="max-w-md text-white">
            <h2 className="text-4xl font-bold mb-6">Welcome to Taskpile</h2>
            <p className="text-lg leading-relaxed">
              A simple and elegant todo app that helps you organize your daily
              tasks. Add, edit, and delete tasks with ease. Mark tasks as
              complete and keep track of your progress. Stay productive and
              never miss a deadline with Taskpile's clean and intuitive
              interface.
            </p>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img
            src={homepage}
            className="max-w-full max-h-full"
            alt="Taskpile Homepage"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
