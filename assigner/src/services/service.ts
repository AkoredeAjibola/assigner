/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../firebase";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth } from "../firebase"; // Import Firebase Auth

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName: string;
  companyAddress: string;
  role: string;
  position: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  role: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  assignedTo: string;
  status: string;
  companyName: string;
  assignedBy: string;
  assignedByName: string;
}

export const addUser = async (user: UserData) => {
  try {
    // Get the current authenticated user's uid
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("No authenticated user found");
    }

    const uid = currentUser.uid; // Retrieve uid from the authenticated user

    const userDocRef = doc(db, "Users", uid); // Use uid as document ID
    await setDoc(userDocRef, user); // Set the document with the given uid
  } catch (e) {
    console.log("Error adding user data", e);
  }
};

export const fetchEmployees = async (userId: string) => {
  try {
    const userDocRef = doc(db, "Users", userId);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const { companyName, companyAddress } = userData;

      const employeesRef = collection(db, "Users");
      const employeeQuery = query(
        employeesRef,
        where("companyName", "==", companyName),
        where("companyAddress", "==", companyAddress),
        where("role", "==", "Employee")
      );

      const employeesSnapshot = await getDocs(employeeQuery);
      const employeeList: Employee[] = employeesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Employee, "id">),
      }));

      return employeeList;
    } else {
      console.error("User document not found.");
    }
  } catch (error) {
    console.error("Error fetching employees.");
  }
};

export const fetchTasks = async () => {
  try {
    const tasksRef = collection(db, "Tasks");
    const tasksSnapshot = await getDocs(tasksRef);
    const taskList: Task[] = tasksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Task, "id">),
    }));

    return taskList;
  } catch (error) {
    console.error("Error fetching tasks.");
  }
};

export const fetchUserData = async (userId: string) => {
  const userRef = doc(db, "Users", userId);
  const userSnapshot = await getDoc(userRef);
  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();
    return userData;
    // Set the profile image URL if it exists
  } else {
    console.error("User does not exist.");
  }
};

export const createTask = async (taskDetails: any) => {
  await addDoc(collection(db, "Tasks"), taskDetails);
};

export const handleDeleteTask = async (taskId: string) => {
  try {
    const taskRef = doc(db, "Tasks", taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error("Error deleting task: ", error);
  }
};
