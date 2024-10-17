//import React from "react";

const Employersdashboard = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-900 p-8 flex flex-col justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold mb-10">Assigner</h1>
          <ul className="text-white space-y-6">
            <li className="cursor-pointer">Tasks</li>
            <li className="cursor-pointer">Assign</li>
          </ul>
        </div>
        <div>
          <button className="text-white text-lg">Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-10 flex flex-col justify-center items-center">
        <div className="w-2/4 border-2 border-blue-500 p-6 rounded-lg shadow-md">
          <h2 className="text-center text-3xl font-bold mb-8">Assign a task</h2>

          {/* Task Title Input */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Task title:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              placeholder="Write here..."
            />
          </div>

          {/* Task Description Input */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Task description:</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              placeholder="Write here..."
              rows={3}
            ></textarea>
          </div>

          {/* Due Date Input */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Due date:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              placeholder="Write here..."
            />
          </div>

          {/* Employee Dropdown */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Employee:</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg shadow-sm">
              <option value="" disabled selected>
                --Select--
              </option>
              <option value="employee1">Employee 1</option>
              <option value="employee2">Employee 2</option>
            </select>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-blue-600 text-white text-2xl py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default Employersdashboard;
