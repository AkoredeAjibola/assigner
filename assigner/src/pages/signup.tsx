import image3 from "../assets/undraw_my_app_re_gxtj 1.png";
import Navbar from "../components/navbar";
import homeBg from "../assets/Home.png";

const SignUp = () => {
  return (
    <div style={{ backgroundImage: `url(${homeBg})` }}>
      <Navbar />

      {/* Body section */}
     


      <div className="font-montserrat font-semibold flex md:flex-row flex-col justify-center items-center">

      <div className="flex w-full h-auto justify-center items-center md:flex-row flex-col">
          <img
            src={image3}
            className="md:w-[503px] w-full h-auto md:h-[807px] md:mt-0 mt-8 px-5"
          />
        </div>

        <div className='flex md:w-[1204px] md:h-[1190px] w-full h-auto flex-col justify-center items-center'>
          <form className="md:px-10 px-7 mt-12 mx-auto w-full">
            <p className="text-black200 text-3xl mb-6 font-extrabold">Signup</p>
            <p className="text-black200 text-2xl mt-8 py-4">Full Name:</p>
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl"
            />
            <p className="text-black200 text-2xl py-4">Username:</p>
            <input
              type="text"
              placeholder="Username"
              required
              className="w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl"
            />
            <p className="text-black200 text-2xl py-4">Email:</p>
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl"
            />

            <p className="text-black200 text-2xl py-4">Role:</p>
            <select
              className="w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl"
              required
            >
              <option value="" disabled selected>
                Select your role
              </option>
              <option value="employer">Employer</option>
              <option value="employee">Employee</option>
            </select>
            <p className="text-black200 text-2xl py-4">Password:</p>
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl"
            />
            <p className="text-black200 text-2xl py-4">Confirm Password:</p>
            <input
              type="password"
              placeholder="Confirm Password"
              required
              className="w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl"
            />
            <br />
            <button className="text-white mt-10 w-full bg-blue-700 text-3xl rounded-lg py-3">
              Signup
            </button>
          </form>
        </div>

       
      </div>
    </div>
  );
};

export default SignUp;
