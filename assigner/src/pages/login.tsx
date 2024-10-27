import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import homeBg from "../assets/Home.png";
import image2 from "../assets/undraw_Login_re_4vu2 (1) 1.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from '../context/AuthProvider';
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setIsAuthenticated } = useAuth();

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the email format
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return; // Stop further execution if the email is invalid
    }

    try {
      // Sign in user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the email is verified
      if (!user.emailVerified) {
        toast.error("Please verify your email address before logging in.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return; // Stop further execution if the email is not verified
      }

      setIsAuthenticated(true);

      // Retrieve user data from Firestore
      const userDoc = await getDoc(doc(db, "Users", user.uid)); 
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData?.role;

        // Redirect based on role
        if (userRole === "Employer") {
          navigate("/employer-dashboard");
        } else if (userRole === "Employee") {
          navigate("/employee-dashboard");
        } else {
          toast.error("User role not found.");
        }

        toast.success("Login successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("User data not found.");
      }
    } catch (error: any) {
      console.log("Error logging in:", error);
      toast.error(error.message || "Failed to login", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div style={{ backgroundImage: `url(${homeBg})` }}>
      <Navbar />

      <div className="font-montserrat font-semibold flex md:flex-row flex-col justify-center items-center">
        <div className="flex md:w-[704px] md:h-[540px] w-full h-auto flex-col justify-center items-center">
          <form
            className="md:px-10 px-7 mt-12 mx-auto w-full"
            onSubmit={handleLogin}
          >
            <p className="text-black200 text-3xl mb-6 font-extrabold">Login</p>
            <p className="text-black200 text-2xl mt-8 py-4">Email:</p>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl"
            />
            <p className="text-black200 text-2xl py-4">Password:</p>
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl"
            />
           
            <br />
            <button
              className="text-white mt-10 w-full bg-red-600 text-3xl rounded-lg py-3"
              type="submit"
            >
              Login
            </button>
          </form>

          <ToastContainer />
        </div>

        <div>
          <img
            src={image2}
            className="md:w-[761px] w-full h-auto md:h-[853px] md:mt-0 mt-8 px-5"
            alt="Login illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
