import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userIcon from '../assets/user-icon.png'; // Add your user image here
import del from '../assets/delete.png';
import { AiOutlineMenu } from 'react-icons/ai'; // React Icons for Hamburger menu

const Employeesdashboard: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to toggle sidebar

  const handleLogout = () => {
    navigate('/landing-page');  // Redirect to the landing page
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
      <main className="flex-1 p-4 md:p-8 ml-0 md:ml-auto mt-16"> {/* Added margin-top to create space */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8">Your Tasks</h1>

          {/* Task Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="px-2 md:px-4 py-2 text-left">Title</th>
                  <th className="px-2 md:px-4 py-2 text-left">Description</th>
                  <th className="px-2 md:px-4 py-2 text-left">End date</th>
                  <th className="px-2 md:px-4 py-2 text-left">Status</th>
                  <th className="px-2 md:px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-2 md:px-4 py-2">Lorem ipsum dolor sit amet</td>
                    <td className="px-2 md:px-4 py-2">Lorem ipsum dolor sit amet consect...</td>
                    <td className="px-2 md:px-4 py-2">Friday 3rd February, 2024</td>
                    <td className="px-2 md:px-4 py-2">
                      <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">Pending</span>
                    </td>
                    <td className="px-2 md:px-4 py-2">
                      <button className="w-12 h-12 md:w-16 md:h-16">
                        <img src={del} alt="Delete Icon" className="w-full h-full"/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Employeesdashboard;
