import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate('/'+path);
    }
        
  return (
    <div className="w-full h-auto font-montserrat font-semibold py-4 px-10 flex md:flex-row flex-col md:items-center justify-start md:justify-between bg-yellow-300">
        <div className="">
            <p className="text-2xl  text-blue400 font-600 md:mb-0 mb-3">Assigner</p>
        </div>
        <div className="flex md:flex-row gap-x-7 font-200 flex-col">
            <button className="py-3" onClick={() => handleNavigation('')}>Home</button>
            <button className="bg-white shadow-black py-3 shadow-2xl md:my-0 my-4 px-5 rounded-md h-auto " onClick={() => handleNavigation('login')}>Login</button>
            <button className="bg-black200 px-5 py-3 rounded-md h-auto text-white" onClick={() => handleNavigation('signup')}>Sign Up</button>
        </div>
    </div>
  )
}

export default Navbar;