
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userIcon from '../assets/user-icon.png';
import { AiOutlineMenu} from 'react-icons/ai';

const Employersdashboard: React.FC = () => {
    const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to toggle sidebar

  const handleLogout = () => {
    navigate('/');  // Redirect to the landing page
  };

    return (
       <div className="flex h-screen relative">
      {/* Hamburger Menu for small screens */}
      <button 
        className="absolute top-6 left-4 text-3xl md:hidden z-50" // Adjusted top position
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <AiOutlineMenu />
      </button>

        {/* Sidebar */}
        <aside className={`w-64 md:w-1/4 bg-blue-800 text-white flex flex-col justify-between p-4 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 fixed md:relative z-40 h-full`}>
        <div className="space-y-8 mt-4 md:mt-8">
          {/* User Image */}
          <div className="flex items-center justify-start pl-4 md:pl-8">
            <img src={userIcon} alt="User" className="rounded-full w-20 h-20 md:w-24 md:h-24" />
          </div>
          <div className="text-xl md:text-2xl font-bold pl-4 md:pl-8">Assigner</div>

          {/* Stacked Navigation */}
          <nav className="space-y-4 md:space-y-6 pl-4 md:pl-8 flex flex-col items-start">
            <a href="#" className="text-lg hover:underline">Tasks</a>
            <a href="#" className="text-lg hover:underline">Assign</a>
          </nav>
        </div>

        <div className="mt-4 md:mb-8 pl-4 md:pl-8 text-left">
          <button onClick={handleLogout} className="text-lg hover:underline">
            Logout
          </button>
        </div>
      </aside>


        {/* Main Content */}
        <div className="w-full md:w-3/4 p-4 md:p-10 flex flex-col justify-center items-center">
          <div className="w-full md:w-2/4 border-2 border-blue-500 p-6 rounded-lg shadow-md">
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
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
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
  