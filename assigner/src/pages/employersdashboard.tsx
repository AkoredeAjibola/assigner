/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAuth } from "firebase/auth";
// import DashNavbar from "../components/dashNavbar";
// import { AiFillDelete, AiOutlineMenu } from "react-icons/ai";
// import { ToastContainer, toast } from "react-toastify";
// import {
//   createTask,
//   Employee,
//   fetchEmployees,
//   fetchTasks,
//   fetchUserData,
//   handleDeleteTask,
//   Task,
// } from "../services/service";
// import "react-toastify/dist/ReactToastify.css";

// // Define the Employee and Task interfaces

// const Employersdashboard: React.FC = () => {
//   const navigate = useNavigate();
//   const auth = getAuth();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [taskTitle, setTaskTitle] = useState("");
//   const [taskDescription, setTaskDescription] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [assignedEmployee, setAssignedEmployee] = useState<string>("");
//   const [view, setView] = useState<"assign" | "tasks" | "settings">("assign");
//   const [userDetails, setUserDetails] = useState<any>(null);
//   const [activeTab, setActiveTab] = useState("companyTasks");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

//   const handleLogout = () => {
//     navigate("/"); // Redirect to the landing page
//   };

//   const getEmployees = async (userId: string) => {
//     try {
//       const employeeList = await fetchEmployees(userId);
//       if (employeeList) {
//         setEmployees(employeeList);
//       } else {
//         return [];
//         console.log("No employees found.");
//       }
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   };

//   const getTasks = async () => {
//     try {
//       const taskList = await fetchTasks();

//       if (taskList) {
//         setTasks(taskList);
//       } 
//     } catch (error) {
//       console.error("Error fetching tasks.");
//     }
//   };

//   const getUserData = async (userId: string) => {
//     const userData = await fetchUserData(userId);
//     if (userData) {
//       setUserDetails(userData);
//       // Set the profile image URL if it exists
//     } else {
//       console.error("User does not exist.");
//     }
//   };

//   const handleTaskSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!assignedEmployee || !taskTitle || !taskDescription || !dueDate) {
//       toast.error("Please fill in all fields!");
//       return;
//     }

//     try {
//       const taskDetails = {
//         title: taskTitle,
//         description: taskDescription,
//         dueDate,
//         assignedTo: assignedEmployee,
//         assignedBy: auth?.currentUser?.uid,
//         assignedByName: userDetails.firstName + ' ' + userDetails.lastName,
//         companyName: userDetails.companyName,
//         status: "Pending",
//       };
//       await createTask(taskDetails);

//       setTaskTitle("");
//       setTaskDescription("");
//       setDueDate("");
//       setAssignedEmployee("");
//       toast.success("Task assigned successfully!");
//       getTasks(); // Refresh task list
//     } catch (error) {
//       console.error("Error assigning task: ", error);
//       toast.error("Error assigning task. Please try again.");
//     }
//   };

//   const deleteTask = async (taskId: string) => {
//     try {
//       await handleDeleteTask(taskId);
//       toast.success("Task deleted successfully!");
//       getTasks(); // Refresh task list after deletion
//     } catch (error) {
//       console.error("Error deleting task: ", error);
//       toast.error("Error deleting task. Please try again.");
//     }
//   };

//   const filterTasks = () => {
//     const filtered = tasks.filter((task) => {
//       const isCompleted = task.status === "Done" && activeTab === "completed";
//       const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "Done" && activeTab === "Overdue";
//       const isInHistory = activeTab === "history";
//       const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());

//       return (isCompleted || isOverdue || isInHistory) && matchesSearch;
//     });
//     setFilteredTasks(filtered);
//   };


//   // Function to get greeting based on time
//   const getGreeting = () => {
//     const hours = new Date().getHours();
//     if (hours < 12) return "Good morning";
//     if (hours < 18) return "Good afternoon";
//     return "Good evening";
//   };

//   // Function to collapse the sidebar
//   const closeSidebar = () => {
//     setSidebarOpen(false);
//   };

//   useEffect(() => {
//     const user = auth.currentUser;
//     if (user) {
//       getEmployees(user.uid);
//       getTasks();
//       getUserData(user.uid);
//       filterTasks(); 
//     }
//   }, [auth, activeTab, searchQuery, tasks]);

//   return (
//     <div>
//       <DashNavbar />

//       <div className="flex h-screen relative">
//         <ToastContainer
//           position="top-right"
//           autoClose={3000}
//           hideProgressBar={false}
//           closeOnClick
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//         />
//         <button
//           className="absolute top-6 left-4 text-3xl md:hidden z-50"
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//         >
//           <AiOutlineMenu />
//         </button>

//         <aside
//           className={`w-64 md:w-1/4 bg-blue-800 text-white flex flex-col justify-between p-4 transform ${
//             sidebarOpen ? "translate-x-0" : "-translate-x-full"
//           } transition-transform duration-300 ease-in-out md:translate-x-0 fixed md:relative z-40 h-full`}
//         >
//           <div className="space-y-8 mt-4 md:mt-8">
//             <div className="text-lg md:text-2xl font-bold pl-4 md:pl-8">
//               {userDetails
//                 ? `${getGreeting()}, ${userDetails.firstName}`
//                 : "Welcome!"}
//             </div>
//             <nav className="space-y-4 md:space-y-6 pl-4 md:pl-8 flex flex-col items-start">
//               <button
//                 className="text-lg hover:underline"
//                 onClick={() => {
//                   setView("tasks");
//                   closeSidebar();
//                 }}
//               >
//                 Tasks
//               </button>
//               <button
//                 className="text-lg hover:underline"
//                 onClick={() => {
//                   setView("assign");
//                   closeSidebar();
//                 }}
//               >
//                 Assign
//               </button>
//             </nav>
//           </div>
//           <div className="mt-4 md:mb-8 pl-4 md:pl-8 text-left">
//             <button onClick={handleLogout} className="text-lg hover:underline">
//               Logout
//             </button>
//           </div>
//         </aside>

//         <div className="w-full md:w-3/4 p-4 md:p-10 flex flex-col justify-center items-center">
//           {view === "assign" ? (
//             <div className="w-full md:w-2/4 border-2 border-blue-500 p-6 rounded-lg shadow-md">
//               <h2 className="text-center text-3xl font-bold mb-8">
//                 Assign a task
//               </h2>

//               <form onSubmit={handleTaskSubmit}>
//                 <div className="mb-4">
//                   <label className="block text-lg font-semibold mb-2">
//                     Task title:
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
//                     placeholder="Write here..."
//                     value={taskTitle}
//                     onChange={(e) => setTaskTitle(e.target.value)}
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-lg font-semibold mb-2">
//                     Task description:
//                   </label>
//                   <textarea
//                     className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
//                     placeholder="Write here..."
//                     value={taskDescription}
//                     onChange={(e) => setTaskDescription(e.target.value)}
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-lg font-semibold mb-2">
//                     Due Date:
//                   </label>
//                   <input
//                     type="date"
//                     className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
//                     value={dueDate}
//                     onChange={(e) => setDueDate(e.target.value)}
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-lg font-semibold mb-2">
//                     Assign to:
//                   </label>
//                   <select
//                     className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
//                     value={assignedEmployee}
//                     onChange={(e) => setAssignedEmployee(e.target.value)}
//                   >
//                     <option value="">Select an employee</option>
//                     {employees.map((employee) => (
//                       <option
//                         key={employee.id}
//                         value={employee.id}
//                       >{`${employee.firstName} ${employee.lastName}`}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
//                 >
//                   Assign Task
//                 </button>
//               </form>
//             </div>


//           ) :view === "tasks" ? (
//             <div>
//               <div className="flex justify-end space-x-4 mb-4">
//                 <button onClick={() => setActiveTab("companyTasks")} className={`p-2 ${activeTab === "companyTasks" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>Company's Total Tasks</button>
//                 <button onClick={() => setActiveTab("assignedTasks")} className={`p-2 ${activeTab === "assignedTasks" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>Assigned Tasks</button>
//                 <button onClick={() => setActiveTab("completed")} className={`p-2 ${activeTab === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"}`}> Completed </button>
//                 <button onClick={() => setActiveTab("Overdue")} className={`p-2 ${activeTab === "Overdue" ? "bg-blue-600 text-white" : "bg-gray-200"}`}> Overdue </button>
//                 <button onClick={() => setActiveTab("history")} className={`p-2 ${activeTab === "history" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>History</button>
//               </div>

//               {activeTab === "companyTasks" && (
//                 <div>
//                   <h2 className="text-2xl font-semibold mb-4">Company's Total Tasks</h2>
//                   <table className="w-full text-left bg-white border rounded-lg shadow-md">
//                     <thead>
//                     <tr className="bg-gray-200">
//                         <th className="p-4">Title</th>
//                         <th className="p-4">Description</th>
//                         <th className="p-4">Assigned By</th>
//                         <th className="p-4">Assigned To</th>
//                         <th className="p-4">End Date</th>
//                         <th className="p-4">Status</th>



//                       </tr>
//                     </thead>
//                     <tbody>
//                       {tasks.map((task) => (
//                         <tr key={task.id}>
//                           <td className="p-4">{task.title}</td>
//                           <td className="p-4" >{task.description}</td>
//                           <td className="p-4" >{task.assignedByName}</td>
//                           <td className="p-4">
//                         {employees.find(emp => emp.id === task.assignedTo)?.firstName}{" "}
//                        {employees.find(emp => emp.id === task.assignedTo)?.lastName}
//                           </td>

//                           <td className="p-4">{task.dueDate}</td>
//                           <td className="p-4"> <span className={`px-2 py-1 rounded ${task.status === "Pending" ? "bg-orange-200 text-orange-700" : "bg-green-200 text-green-700"}`}>
//                           {task.status}
//                         </span></td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}


//               {activeTab === "assignedTasks" && (
//                 <div>
//                   <h2 className="text-2xl font-semibold mb-4">Assigned Tasks</h2>
//                   <table className="w-full text-left bg-white border rounded-lg shadow-md">
//                     <thead>
//                     <tr className="bg-gray-200">
//                         <th className="p-4">Title</th>
//                         <th className="p-4">Description</th>
//                         <th className="p-4">Assigned To</th>
//                         <th className="p-4">End Date</th>
//                         <th className="p-4">Status</th>
//                         <th className="p-4">Action</th>

//                       </tr>
//                     </thead>
//                     <tbody>
//                       {tasks.map((task) => (
//                         <tr key={task.id}>
//                           <td className="p-4">{task.title}</td>
//                           <td className="p-4" >{task.description}</td>
//                           <td className="p-4">
//                         {employees.find(emp => emp.id === task.assignedTo)?.firstName}{" "}
//                        {employees.find(emp => emp.id === task.assignedTo)?.lastName}
//                           </td>

//                           <td className="p-4">{task.dueDate}</td>
//                           <td className="p-4"> <span className={`px-2 py-1 rounded ${task.status === "Pending" ? "bg-orange-200 text-orange-700" : "bg-green-200 text-green-700"

//                           }`}>
//                           {task.status}
//                         </span></td>
//                         <td className="p-4 text-center">
//                         <button
//                           onClick={() => deleteTask(task.id)}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           <AiFillDelete size={20} />
//                         </button>
//                       </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}




//                 {activeTab === "completed" && (
//   <div>
//     <h2 className="text-2xl font-semibold mb-4">Completed Tasks</h2>
//     <input
//       type="text"
//       className="w-full p-3 border border-gray-300 rounded-lg mb-4"
//       placeholder="Search completed tasks..."
//       value={searchQuery}
//       onChange={(e) => setSearchQuery(e.target.value)}
//     />
//     <table className="w-full text-left bg-white border rounded-lg shadow-md">
//       <thead>
//         <tr className="bg-gray-200">
//           <th className="p-4">Title</th>
//           <th className="p-4">Description</th>
//           <th className="p-4">Assigned To</th>
//           <th className="p-4">End Date</th>
//           <th className="p-4">Status</th>
//         </tr>
//       </thead>
//       <tbody>
//         {filteredTasks.map((task) => (
//           task.status === "Done" && (
//             <tr key={task.id}>
//               <td className="p-4">{task.title}</td>
//               <td className="p-4">{task.description}</td>
//               <td className="p-4">
//                 {employees.find(emp => emp.id === task.assignedTo)?.firstName}{" "}
//                 {employees.find(emp => emp.id === task.assignedTo)?.lastName}
//               </td>
//               <td className="p-4">{task.dueDate}</td>
//               <td className="p-4">
//                 <span className="px-2 py-1 rounded bg-green-200 text-green-700">
//                   {task.status}
//                 </span>
//               </td>
//             </tr>
//           )
//         ))}
//       </tbody>
//     </table>
//   </div>
// )}

// {activeTab === "Overdue" && (
//   <div>
//     <h2 className="text-2xl font-semibold mb-4">Overdue Tasks</h2>
//     <input
//       type="text"
//       className="w-full p-3 border border-gray-300 rounded-lg mb-4"
//       placeholder="Search overdue tasks..."
//       value={searchQuery}
//       onChange={(e) => setSearchQuery(e.target.value)}
//     />
//     <table className="w-full text-left bg-white border rounded-lg shadow-md">
//       <thead>
//         <tr className="bg-gray-200">
//           <th className="p-4">Title</th>
//           <th className="p-4">Description</th>
//           <th className="p-4">Assigned To</th>
//           <th className="p-4">End Date</th>
//           <th className="p-4">Status</th>
//         </tr>
//       </thead>
//       <tbody>
//         {filteredTasks.map((task) => (
//           new Date(task.dueDate) < new Date() && task.status !== "Done" && (
//             <tr key={task.id}>
//               <td className="p-4">{task.title}</td>
//               <td className="p-4">{task.description}</td>
//               <td className="p-4">
//                 {employees.find(emp => emp.id === task.assignedTo)?.firstName}{" "}
//                 {employees.find(emp => emp.id === task.assignedTo)?.lastName}
//               </td>
//               <td className="p-4">{task.dueDate}</td>
//               <td className="p-4">
//                 <span className="px-2 py-1 rounded bg-red-200 text-red-700">
//                   Overdue
//                 </span>
//               </td>
//             </tr>
//           )
//         ))}
//       </tbody>
//     </table>
//   </div>
// )}

// {activeTab === "history" && (
//   <div>
//     <h2 className="text-2xl font-semibold mb-4">Task History</h2>
//     <input
//       type="text"
//       className="w-full p-3 border border-gray-300 rounded-lg mb-4"
//       placeholder="Search task history..."
//       value={searchQuery}
//       onChange={(e) => setSearchQuery(e.target.value)}
//     />
//     <table className="w-full text-left bg-white border rounded-lg shadow-md">
//       <thead>
//         <tr className="bg-gray-200">
//           <th className="p-4">Title</th>
//           <th className="p-4">Description</th>
//           <th className="p-4">Assigned To</th>
//           <th className="p-4">End Date</th>
//           <th className="p-4">Status</th>
//         </tr>
//       </thead>
//       <tbody>
//         {filteredTasks.map((task) => (
//           <tr key={task.id}>
//             <td className="p-4">{task.title}</td>
//             <td className="p-4">{task.description}</td>
//             <td className="p-4">
//               {employees.find(emp => emp.id === task.assignedTo)?.firstName}{" "}
//               {employees.find(emp => emp.id === task.assignedTo)?.lastName}
//             </td>
//             <td className="p-4">{task.dueDate}</td>
//             <td className="p-4">
//               <span className={`px-2 py-1 rounded ${task.status === "Pending" ? "bg-orange-200 text-orange-700" : "bg-green-200 text-green-700"}`}>
//                 {task.status}
//               </span>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// )}



//             </div>



//       </div>
//     </div>
//     </div>
//   );
// };

// export default Employersdashboard;





import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DashNavbar from "../components/dashNavbar";
import { AiFillDelete, AiOutlineMenu } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import {
  createTask,
  Employee,
  fetchEmployees,
  fetchTasks,
  fetchUserData,
  handleDeleteTask,
  Task,
} from "../services/service";
import "react-toastify/dist/ReactToastify.css";





const EmployersDashboard: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  // State variables for managing various data and UI elements
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedEmployee, setAssignedEmployee] = useState<string>("");
  const [view, setView] = useState<"assign" | "tasks" | "settings">(() => {
    return localStorage.getItem("currentView") as "assign" | "tasks" | "settings" || "assign";
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userDetails, setUserDetails] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "companyTasks";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  // Authentication and data persistence
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getEmployees(user.uid);
        getTasks();
        getUserData(user.uid);
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  // Save view and tab state to localStorage
  useEffect(() => {
    localStorage.setItem("currentView", view);
    localStorage.setItem("activeTab", activeTab);
  }, [view, activeTab]);



  // Filter tasks based on active tab and search query
  useEffect(() => {
    const filtered = tasks.filter((task) => {
      const searchMatch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());




      switch (activeTab) {
        case "completed":
          return task.status === "Done" && searchMatch;
        // case "assignedTasks":
        //   return tasks.filter(task => task.assignedBy === userDetails.uid);
        // case "companyTasks":
        //   return tasks;
        case "Overdue":
          return new Date(task.dueDate) < new Date() && task.status !== "Done" && searchMatch;
        case "history":
          return (task.status === "Done" || new Date(task.dueDate) < new Date()) && searchMatch;
        default:
          return searchMatch;
      }
    });
    setFilteredTasks(filtered);
  }, [tasks, activeTab, searchQuery]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out. Please try again.");
    }
  };
  // Function to fetch employees of the current user
  const getEmployees = async (userId: string) => {
    try {
      const employeeList = await fetchEmployees(userId);
      if (employeeList) {
        setEmployees(employeeList);
      } else {
        console.log("No employees found.");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Function to fetch tasks and set them in state
  const getTasks = async () => {
    try {
      const taskList = await fetchTasks();
      if (taskList) {
        setTasks(taskList);
      }
    } catch (error) {
      console.error("Error fetching tasks.");
    }
  };

  // Function to fetch user data for the current user
  const getUserData = async (userId: string) => {
    const userData = await fetchUserData(userId);
    if (userData) {
      setUserDetails(userData);
    } else {
      console.error("User does not exist.");
    }
  };

  // Function to handle submitting a new task
  const handleTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!assignedEmployee || !taskTitle || !taskDescription || !dueDate) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      // Task details object to be sent to the backend
      const taskDetails = {
        title: taskTitle,
        description: taskDescription,
        dueDate,
        assignedTo: assignedEmployee,
        assignedBy: auth?.currentUser?.uid,
        assignedByName: userDetails.firstName + " " + userDetails.lastName,
        companyName: userDetails.companyName,
        status: "Pending",
      };
      await createTask(taskDetails);

      // Reset the form fields after task creation
      setTaskTitle("");
      setTaskDescription("");
      setDueDate("");
      setAssignedEmployee("");
      toast.success("Task assigned successfully!");
      getTasks(); // Refresh task list
    } catch (error) {
      console.error("Error assigning task: ", error);
      toast.error("Error assigning task. Please try again.");
    }
  };

  // Function to delete a task
  const deleteTask = async (taskId: string) => {
    try {
      await handleDeleteTask(taskId);
      toast.success("Task deleted successfully!");
      getTasks(); // Refresh task list after deletion
    } catch (error) {
      console.error("Error deleting task: ", error);
      toast.error("Error deleting task. Please try again.");
    }
  };

  // Function to filter tasks based on the active tab and search query
  const filterTasks = () => {
    const filtered = tasks.filter((task) => {
      const isCompleted = task.status === "Done" && activeTab === "completed";
      const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "Done" && activeTab === "Overdue";
      const isInHistory = activeTab === "history";
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());

      return (isCompleted || isOverdue || isInHistory) && matchesSearch;
    });
    setFilteredTasks(filtered);
  };

  // Function to get greeting based on time
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 18) return "Good afternoon";
    return "Good evening";
  };

  // Function to collapse the sidebar
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const getTaskStatusStyle = (task: Task) => {
    if (task.status === "Done") {
      return "bg-green-200 text-green-700";
    }
    if (new Date(task.dueDate) < new Date() && task.status !== "Done") {
      return "bg-red-200 text-red-700";
    }
    return "bg-orange-200 text-orange-700";
  };

  const getTaskStatus = (task: Task) => {
    if (task.status === "Done") return "Completed";
    if (new Date(task.dueDate) < new Date() && task.status !== "Done") return "Overdue";
    return task.status;
  };


  // Fetch initial data and filter tasks when dependencies change
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      getEmployees(user.uid);
      getTasks();
      getUserData(user.uid);
      filterTasks();
    }
  }, [auth, activeTab, searchQuery, tasks]);

  return (
    <div>
      <DashNavbar />
      <div className="flex h-screen relative">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <button
          className="absolute top-6 left-4 text-3xl md:hidden z-50"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <AiOutlineMenu />
        </button>
        <aside
          className={`w-64 md:w-1/4 bg-blue-800 text-white flex flex-col justify-between p-4 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out md:translate-x-0 fixed md:relative z-40 h-full`}
        >
          <div className="space-y-8 mt-4 md:mt-8">
            <div className="text-lg md:text-2xl font-bold pl-4 md:pl-8">
              {userDetails ? `${getGreeting()}, ${userDetails.firstName}` : "Welcome!"}
            </div>
            <nav className="space-y-4 md:space-y-6 pl-4 md:pl-8 flex flex-col items-start">
              <button
                className="text-lg hover:underline"
                onClick={() => {
                  setView("tasks");
                  closeSidebar();
                }}
              >
                Tasks
              </button>
              <button
                className="text-lg hover:underline"
                onClick={() => {
                  setView("assign");
                  closeSidebar();
                }}
              >
                Assign
              </button>
            </nav>
          </div>
          <div className="mt-4 md:mb-8 pl-4 md:pl-8 text-left">
            <button onClick={handleLogout} className="text-lg hover:underline">
              Logout
            </button>
          </div>
        </aside>
        <div className="w-full md:w-3/4 p-4 md:p-10 flex flex-col justify-center items-center">
          {view === "assign" ? (
            <div className="w-full md:w-2/4 border-2 border-blue-500 p-6 rounded-lg shadow-md">
              <h2 className="text-center text-3xl font-bold mb-8">
                Assign a task
              </h2>
              <form onSubmit={handleTaskSubmit}>
                <div className="mb-4">
                  <label className="block text-lg font-semibold mb-2">
                    Task title:
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                    placeholder="Write here..."
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-semibold mb-2">
                    Task description:
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                    placeholder="Write here..."
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-semibold mb-2">
                    Due Date:
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
                <div className="mb-8">
                  <label className="block text-lg font-semibold mb-2">
                    Assign to:
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                    value={assignedEmployee}
                    onChange={(e) => setAssignedEmployee(e.target.value)}
                  >
                    <option value="">Select Employee</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.firstName} {employee.lastName}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition duration-300"
                >
                  Assign Task
                </button>
              </form>
            </div>
          ) : view === "tasks" ? (
            <div>
              <div className="flex justify-end space-x-4 mb-4">
                <button onClick={() => setActiveTab("companyTasks")} className={`p-2 ${activeTab === "companyTasks" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>Company's Total Tasks</button>
                <button onClick={() => setActiveTab("assignedTasks")} className={`p-2 ${activeTab === "assignedTasks" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>Assigned Tasks</button>
                <button onClick={() => setActiveTab("completed")} className={`p-2 ${activeTab === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"}`}> Completed </button>
                <button onClick={() => setActiveTab("Overdue")} className={`p-2 ${activeTab === "Overdue" ? "bg-blue-600 text-white" : "bg-gray-200"}`}> Overdue </button>
                <button onClick={() => setActiveTab("history")} className={`p-2 ${activeTab === "history" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>History</button>
              </div>
              {activeTab === "companyTasks" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Company's Total Tasks</h2>
                  <table className="w-full text-left bg-white border rounded-lg shadow-md">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="p-4">Title</th>
                        <th className="p-4">Description</th>
                        <th className="p-4">Assigned By</th>
                        <th className="p-4">Assigned To</th>
                        <th className="p-4">End Date</th>
                        <th className="p-4">Status</th>



                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task) => (
                        <tr key={task.id}>
                          <td className="p-4">{task.title}</td>
                          <td className="p-4" >{task.description}</td>
                          <td className="p-4" >{task.assignedByName}</td>
                          <td className="p-4">
                            {employees.find(emp => emp.id === task.assignedTo)?.firstName}{" "}
                            {employees.find(emp => emp.id === task.assignedTo)?.lastName}
                          </td>

                          <td className="p-4">{task.dueDate}</td>
                          <td className="p-4"> <span className={`px-2 py-1 rounded ${task.status === "Pending" ? "bg-orange-200 text-orange-700" : "bg-green-200 text-green-700"}`}>
                            {task.status}
                          </span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}



              {activeTab === "assignedTasks" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Assigned Tasks</h2>
                  <table className="w-full text-left bg-white border rounded-lg shadow-md">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="p-4">Title</th>
                        <th className="p-4">Description</th>
                        <th className="p-4">Assigned To</th>
                        <th className="p-4">End Date</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Action</th>

                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task) => (
                        <tr key={task.id}>
                          <td className="p-4">{task.title}</td>
                          <td className="p-4" >{task.description}</td>
                          <td className="p-4">
                            {employees.find(emp => emp.id === task.assignedTo)?.firstName}{" "}
                            {employees.find(emp => emp.id === task.assignedTo)?.lastName}
                          </td>

                          <td className="p-4">{task.dueDate}</td>
                          <td className="p-4"> <span className={`px-2 py-1 rounded ${task.status === "Pending" ? "bg-orange-200 text-orange-700" : "bg-green-200 text-green-700"

                            }`}>
                            {task.status}
                          </span></td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <AiFillDelete size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}


              {activeTab === "completed" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Completed Tasks</h2>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                    placeholder="Search completed tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <table className="w-full text-left bg-white border rounded-lg shadow-md">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="p-4">Title</th>
                        <th className="p-4">Description</th>
                        <th className="p-4">Assigned To</th>
                        <th className="p-4">End Date</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTasks.map((task) => (
                        task.status === "Done" && (
                          <tr key={task.id}>
                            <td className="p-4">{task.title}</td>
                            <td className="p-4">{task.description}</td>
                            <td className="p-4">
                              {employees.find(emp => emp.id === task.assignedTo)?.firstName}{" "}
                              {employees.find(emp => emp.id === task.assignedTo)?.lastName}
                            </td>
                            <td className="p-4">{task.dueDate}</td>
                            <td className="p-4">
                              <span className="px-2 py-1 rounded bg-green-200 text-green-700">
                                {task.status}
                              </span>
                            </td>
                          </tr>
                        )
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "Overdue" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Overdue Tasks</h2>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                    placeholder="Search overdue tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <table className="w-full text-left bg-white border rounded-lg shadow-md">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="p-4">Title</th>
                        <th className="p-4">Description</th>
                        <th className="p-4">Assigned To</th>
                        <th className="p-4">End Date</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTasks.map((task) => (
                        new Date(task.dueDate) < new Date() && task.status !== "Done" && (
                          <tr key={task.id}>
                            <td className="p-4">{task.title}</td>
                            <td className="p-4">{task.description}</td>
                            <td className="p-4">
                              {employees.find(emp => emp.id === task.assignedTo)?.firstName}{" "}
                              {employees.find(emp => emp.id === task.assignedTo)?.lastName}
                            </td>
                            <td className="p-4">{task.dueDate}</td>
                            <td className="p-4">
                              <span className="px-2 py-1 rounded bg-red-200 text-red-700">
                                Overdue
                              </span>
                            </td>
                          </tr>
                        )
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "history" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Task History</h2>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                    placeholder="Search task history..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <table className="w-full text-left bg-white border rounded-lg shadow-md">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="p-4">Title</th>
                        <th className="p-4">Description</th>
                        <th className="p-4">Assigned To</th>
                        <th className="p-4">End Date</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTasks.map((task) => (
                        <tr key={task.id}>
                          <td className="p-4">{task.title}</td>
                          <td className="p-4">{task.description}</td>
                          <td className="p-4">
                            {employees.find(emp => emp.id === task.assignedTo)?.firstName}{" "}
                            {employees.find(emp => emp.id === task.assignedTo)?.lastName}
                          </td>
                          <td className="p-4">{task.dueDate}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded ${getTaskStatusStyle(task)}`}>
                              {getTaskStatus(task)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EmployersDashboard;


