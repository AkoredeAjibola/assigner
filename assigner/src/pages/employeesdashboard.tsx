/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
// import userIcon from '../assets/user-icon.png';
import DashNavbar from '../components/dashNavbar';
import { AiOutlineMenu } from 'react-icons/ai';

const Employeesdashboard: React.FC = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const db = getFirestore();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [tasks, setTasks] = useState<any[]>([]);
    const [employeeName, setEmployeeName] = useState({ firstName: '', lastName: '' });

    const handleLogout = () => {
        navigate('/'); // Redirect to the landing page
    };

    const fetchTasks = async (userId: string) => {
        try {
            const tasksRef = collection(db, 'Tasks');
            const tasksQuery = query(tasksRef, where('assignedTo', '==', userId));
            const tasksSnapshot = await getDocs(tasksQuery);
            const taskList = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTasks(taskList);
        } catch (error) {
            console.error("Error fetching tasks.");
        }
    };

    const fetchEmployeeName = async (userId: string) => {
        try {
            const userRef = doc(db, 'Users', userId);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const { firstName, lastName } = userDoc.data();
                setEmployeeName({ firstName, lastName });
            }
        } catch (error) {
            console.error("Error fetching employee name:", error);
        }
    };

    const getGreeting = () => {
        const hours = new Date().getHours();
        if (hours < 12) return "Good morning";
        if (hours < 18) return "Good afternoon";
        return "Good evening";
    };

    const markTaskAsDone = async (taskId: string) => {
        try {
            const taskDocRef = doc(db, 'Tasks', taskId);
            await updateDoc(taskDocRef, { status: 'Done' });
            setTasks(prevTasks => 
                prevTasks.map(task => 
                    task.id === taskId ? { ...task, status: 'Done' } : task
                )
            );
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    const markTaskAsUndone = async (taskId: string) => {
        try {
            const taskDocRef = doc(db, 'Tasks', taskId);
            await updateDoc(taskDocRef, { status: 'Pending' });
            setTasks(prevTasks => 
                prevTasks.map(task => 
                    task.id === taskId ? { ...task, status: 'Pending' } : task
                )
            );
        } catch (error) {
            console.error("Error reverting task status:", error);
        }
    };

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            fetchTasks(user.uid);
            fetchEmployeeName(user.uid);
        }
    }, [auth]);

    return (
        <div>
               <DashNavbar/>

        <div className="flex h-screen relative">

            <button
                className="absolute top-6 left-4 text-3xl md:hidden z-50"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <AiOutlineMenu />
            </button>

            <aside className={`w-64 md:w-1/4 bg-blue-800 text-white flex flex-col justify-between p-4 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 fixed md:relative z-40 h-full`}>
                <div className="space-y-8 mt-4 md:mt-8">
                    {/* <div className="flex items-center justify-start pl-4 md:pl-8">
                        <img src={userIcon} alt="User" className="rounded-full w-20 h-20 md:w-24 md:h-24" />
                    </div> */}
                    <div className="text-xl md:text-2xl font-bold pl-4 md:pl-8">
                        {getGreeting()}, {employeeName.firstName} 
                    </div>
                    <nav className="space-y-4 md:space-y-6 pl-4 md:pl-8 flex flex-col items-start">
                        <a href="#" className="text-lg hover:underline">Tasks</a>
                    </nav>
                </div>
                <div className="mt-4 md:mb-8 pl-4 md:pl-8 text-left">
                    <button onClick={handleLogout} className="text-lg hover:underline">Logout</button>
                </div>
            </aside>

            <div className="w-full md:w-3/4 p-4 md:p-10 flex flex-col justify-center items-center">
                <h2 className="text-3xl font-bold mb-8">My Tasks</h2>
                <div className="w-full border-2 border-blue-500 p-6 rounded-lg shadow-md">
                    {tasks.length > 0 ? (
                        <ul className="space-y-4">
                            {tasks.map(task => (
                                <li key={task.id} className="p-4 border border-gray-300 rounded-lg flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-semibold">{task.title}</h3>
                                        <p>{task.description}</p>
                                        <p><strong>Due Date:</strong> {task.dueDate}</p>
                                        <p><strong>Status:</strong> {task.status}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        {task.status !== 'Done' ? (
                                            <button 
                                                onClick={() => markTaskAsDone(task.id)} 
                                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                                            >
                                                Mark as Done
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => markTaskAsUndone(task.id)} 
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                                            >
                                                Mark as Undone
                                            </button>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No tasks assigned.</p>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
};

export default Employeesdashboard;
