import Navbar from "../components/navbar";
import homeBg from "../assets/Home.png";
import image1 from "../assets/undraw_completed_tasks_vs6q 1.png";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate('/'+path);
    }
  return (
    <div className="w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${homeBg})` }}>
      <div>
        <Navbar />
      </div>

      {/* Body section */}
      <div className="font-semibold mt-10 mx-auto flex-col font-montserrat w-full h-auto items-center flex md:flex-row justify-center">

        <div className="w-full md:w-[800px] h-auto flex-col px-8">
            <p className="font-600 text-black text-3xl">Assign tasks to employees and track progress with ease</p>
            <button className="bg-black200 mt-6 py-3 px-5 rounded-md h-auto text-white" onClick={() => handleNavigation('login')}>Get Started</button>
        </div>

        <div>
            <img src={image1} className="md:w-[789px] w-full h-auto md:h-[787px] md:mt-0 mt-8 px-5"/>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
