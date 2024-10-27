import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, query, where, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

import userIcon from '../assets/user-icon.png';
import { AiOutlineMenu } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the Employee and Task interfaces
interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    role: string;
}

interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    assignedTo: string;
    status: string;
}

const Employersdashboard: React.FC = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const db = getFirestore();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [assignedEmployee, setAssignedEmployee] = useState<string>('');
    const [view, setView] = useState<'assign' | 'tasks' | 'settings'>('assign');
    const [userDetails, setUserDetails] = useState<any>(null);
 ;

    const handleLogout = () => {
        navigate('/'); // Redirect to the landing page
    };

    const fetchEmployees = async (userId: string) => {
        try {
            const userDocRef = doc(db, 'Users', userId);
            const userSnapshot = await getDoc(userDocRef);

            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                const { companyName, companyAddress } = userData;

                const employeesRef = collection(db, 'Users');
                const employeeQuery = query(
                    employeesRef,
                    where('companyName', '==', companyName),
                    where('companyAddress', '==', companyAddress),
                    where('role', '==', 'Employee')
                );

                const employeesSnapshot = await getDocs(employeeQuery);
                const employeeList: Employee[] = employeesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data() as Omit<Employee, 'id'>,
                }));

                setEmployees(employeeList);
            }
        } catch (error) {
            console.error("Error fetching employees.");
        }
    };

    const fetchTasks = async () => {
        try {
            const tasksRef = collection(db, 'Tasks');
            const tasksSnapshot = await getDocs(tasksRef);
            const taskList: Task[] = tasksSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data() as Omit<Task, 'id'>,
            }));
            setTasks(taskList);
        } catch (error) {
            console.error("Error fetching tasks.");
        }
    };

    const fetchUserData = async (userId: string) => {
        const userRef = doc(db, 'Users', userId);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setUserDetails(userData);
            // Set the profile image URL if it exists
            
        } else {
            console.error("User does not exist.");
        }
    };
    
    const handleTaskSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!assignedEmployee || !taskTitle || !taskDescription || !dueDate) {
            toast.error('Please fill in all fields!');
            return;
        }

        try {
            await addDoc(collection(db, 'Tasks'), {
                title: taskTitle,
                description: taskDescription,
                dueDate,
                assignedTo: assignedEmployee,
                status: 'Pending',
            });

            setTaskTitle('');
            setTaskDescription('');
            setDueDate('');
            setAssignedEmployee('');
            toast.success('Task assigned successfully!');
            fetchTasks(); // Refresh task list
        } catch (error) {
            console.error("Error assigning task: ", error);
            toast.error('Error assigning task. Please try again.');
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        try {
            const taskRef = doc(db, 'Tasks', taskId);
            await deleteDoc(taskRef);
            toast.success('Task deleted successfully!');
            fetchTasks(); // Refresh task list after deletion
        } catch (error) {
            console.error("Error deleting task: ", error);
            toast.error('Error deleting task. Please try again.');
        }
    };

    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        const userRef = doc(db, 'Users', auth.currentUser?.uid as string);
        try {
            await updateDoc(userRef, userDetails);
            toast.success('User details updated successfully!');
        } catch (error) {
            console.error("Error updating user details: ", error);
            toast.error('Error updating user details. Please try again.');
        }
    };





    // Function to get greeting based on time
    const getGreeting = () => {
        const hours = new Date().getHours();
        if (hours < 12) return 'Good morning';
        if (hours < 18) return 'Good afternoon';
        return 'Good evening';
    };

    // Function to collapse the sidebar
    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            fetchEmployees(user.uid);
            fetchTasks();
            fetchUserData(user.uid);
        }
    }, [auth]);

    return (
        <div className="flex h-screen relative">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
            <button className="absolute top-6 left-4 text-3xl md:hidden z-50" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <AiOutlineMenu />
            </button>

            <aside className={`w-64 md:w-1/4 bg-blue-800 text-white flex flex-col justify-between p-4 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 fixed md:relative z-40 h-full`}>
                <div className="space-y-8 mt-4 md:mt-8">
                    <div className="flex items-center justify-start pl-4 md:pl-8">
                        <img src={userIcon} alt="User" className="rounded-full w-20 h-20 md:w-24 md:h-24" />
                    </div>
                    <div className="text-xl md:text-2xl font-bold pl-4 md:pl-8">
                        {userDetails ? `${getGreeting()}, ${userDetails.firstName} ${userDetails.lastName}!` : 'Welcome!'}
                    </div>
                    <nav className="space-y-4 md:space-y-6 pl-4 md:pl-8 flex flex-col items-start">
                        <button className="text-lg hover:underline" onClick={() => { setView('tasks'); closeSidebar(); }}>Tasks</button>
                        <button className="text-lg hover:underline" onClick={() => { setView('assign'); closeSidebar(); }}>Assign</button>
                        <button className="text-lg hover:underline" onClick={() => { setView('settings'); closeSidebar(); }}>Settings</button>
                    </nav>
                </div>
                <div className="mt-4 md:mb-8 pl-4 md:pl-8 text-left">
                    <button onClick={handleLogout} className="text-lg hover:underline">Logout</button>
                </div>
            </aside>

            <div className="w-full md:w-3/4 p-4 md:p-10 flex flex-col justify-center items-center">
                {view === 'assign' ? (
                    <div className="w-full md:w-2/4 border-2 border-blue-500 p-6 rounded-lg shadow-md">
                        <h2 className="text-center text-3xl font-bold mb-8">Assign a task</h2>

                        <form onSubmit={handleTaskSubmit}>
                            <div className="mb-4">
                                <label className="block text-lg font-semibold mb-2">Task title:</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm" placeholder="Write here..." value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-semibold mb-2">Task description:</label>
                                <textarea className="w-full p-3 border border-gray-300 rounded-lg shadow-sm" placeholder="Write here..." value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-semibold mb-2">Due Date:</label>
                                <input type="date" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-semibold mb-2">Assign to:</label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg shadow-sm" value={assignedEmployee} onChange={(e) => setAssignedEmployee(e.target.value)}>
                                    <option value="">Select an employee</option>
                                    {employees.map((employee) => (
                                        <option key={employee.id} value={employee.id}>{`${employee.firstName} ${employee.lastName}`}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">Assign Task</button>
                        </form>
                    </div>
                ) : view === 'tasks' ? (
                    <div className="w-full md:w-3/4 border-2 border-blue-500 p-6 rounded-lg shadow-md mt-4">
                        <h2 className="text-center text-3xl font-bold mb-8">Assigned Tasks</h2>
                        {tasks.length > 0 ? (
                            tasks.map(task => (
                                <div key={task.id} className="border p-4 mb-4 rounded-lg shadow-sm">
                                    <h3 className="text-xl font-semibold">{task.title}</h3>
                                    <p>{task.description}</p>
                                    <p><strong>Due Date:</strong> {task.dueDate}</p>
                                    <p><strong>Status:</strong> {task.status}</p>
                                    <button className="text-red-500" onClick={() => handleDeleteTask(task.id)}>Delete Task</button>
                                </div>
                            ))
                        ) : (
                            <p>No tasks assigned yet.</p>
                        )}
                    </div>
                ) : (
                    <div className="w-full md:w-2/4 border-2 border-blue-500 p-1 rounded-lg shadow-md">
                        <h2 className="text-center text-3xl font-bold mb-8">Settings</h2>
                        <form onSubmit={handleUpdateUser}>
                        

                            <div className="mb-4">
                                <label className="block text-lg font-semibold mb-2">First Name:</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm" value={userDetails?.firstName} onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })} />
                            </div>

                            <div className="mb-4">
                                <label className="block text-lg font-semibold mb-2">Last Name:</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm" value={userDetails?.lastName} onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-semibold mb-2">Email:</label>
                                <input type="email" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm" value={userDetails?.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-semibold mb-2">Company Name:</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm" value={userDetails?.companyName} onChange={(e) => setUserDetails({ ...userDetails, companyName: e.target.value })} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-semibold mb-2">Company Address:</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm" value={userDetails?.companyAddress} onChange={(e) => setUserDetails({ ...userDetails, companyAddress: e.target.value })} />
                            </div>
                            <button type="submit" className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">Update Details</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Employersdashboard;

