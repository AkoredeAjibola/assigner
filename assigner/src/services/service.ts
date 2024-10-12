import {collection, addDoc} from 'firebase/firestore';
import {db} from '../firebase'

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

export const addUser = async (user: UserData) => {
  try {
    console.log("Adding user:", user); // Log user data before adding to Firebase
    const docRef = await addDoc(collection(db, "Users"), user);
    console.log("User with ID:", docRef.id); 
  } catch (e) {
    console.log("Error adding user data", e);
  }
};
