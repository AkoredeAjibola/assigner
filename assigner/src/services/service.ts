
import {db} from '../firebase'
import { doc, setDoc } from 'firebase/firestore';
import { auth } from '../firebase'; // Import Firebase Auth

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
    // Get the current authenticated user's uid
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('No authenticated user found');
    }

    const uid = currentUser.uid; // Retrieve uid from the authenticated user

    const userDocRef = doc(db, "Users", uid); // Use uid as document ID
    await setDoc(userDocRef, user); // Set the document with the given uid
  
  } catch (e) {
    console.log("Error adding user data", e);
  }
};

