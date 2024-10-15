import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/navbar";
import homeBg from "../assets/Home.png";
import image2 from '../assets/undraw_Login_re_4vu2 (1) 1.png';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Function to handle login logic
  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  return (
    <div style={{ backgroundImage: `url(${homeBg})` }}>
      <Navbar />
      
      {isLoggedIn ? (
        <p>Welcome back!</p>
      ) : (
        <div className="font-montserrat font-semibold flex md:flex-row flex-col justify-center items-center">
          <div className='flex md:w-[704px] md:h-[540px] w-full h-auto flex-col justify-center items-center'>
            <form 
              className="md:px-10 px-7 mt-12 mx-auto w-full" 
              onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
            >
              <p className="text-black200 text-3xl mb-6 font-extrabold">Login</p>
              <p className="text-black200 text-2xl mt-8 py-4">Email:</p>
              <input 
                type="email" 
                placeholder="Write here..." 
                required 
                className="w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl"
              />
              <p className="text-black200 text-2xl py-4">Password:</p>
              <input 
                type="password" 
                placeholder="Write here..." 
                required 
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
          </div>

          <div>
            <img 
              src={image2} 
              className="md:w-[761px] w-full h-auto md:h-[853px] md:mt-0 mt-8 px-5" 
              alt="Login illustration"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
