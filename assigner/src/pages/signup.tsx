import { useState } from "react";
import image3 from "../assets/undraw_my_app_re_gxtj 1.png";
import Navbar from "../components/navbar";
import homeBg from "../assets/Home.png";

const SignUp = () => {
  const [step, setStep] = useState(1); // Track which step the form is on (1 for personal, 2 for company's information)

  const handleNext = () => {
    setStep((prevStep) => (prevStep === 1 ? 2 : 1)); // Toggle between step 1 and step 2
  };

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

        <div className="flex md:w-[1204px] md:h-[1190px] w-full h-auto flex-col justify-center items-center">
          <form className="md:px-10 px-7 mt-12 mx-auto w-full">
            {/* <p className="text-black200 text-3xl mb-6 font-extrabold">Signup</p> */}

            {step === 1 && (
              <>
              <p className="text-black200 text-3xl mb-6 font-extrabold">Personal Information</p>
                <p className="text-black200 text-2xl py-4">Full Name:</p>
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
                <button
                  type="button"
                  onClick={handleNext}
                  className="text-white mt-10 w-full bg-blue-700 text-3xl rounded-lg py-3"
                >
                  Next
                </button>
              </>
            )}

            {step === 2 && (
              <>
              <p className="text-black200 text-3xl mb-6 font-extrabold">Company's Details</p>
                <p className="text-black200 text-2xl py-4">Company Name:</p>
                <input
                  type="text"
                  placeholder="Company Name"
                  required
                  className="w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl"
                />
                <p className="text-black200 text-2xl py-4">Company Address:</p>
                <input
                  type="text"
                  placeholder="Company Address"
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
                <p className="text-black200 text-2xl py-4">Position:</p>
                <input
                  type="text"
                  placeholder="Position"
                  required
                  className="w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl"
                />
                <button
                  type="button"
                  onClick={handleNext}
                  className="text-white mt-10 w-full bg-blue-700 text-3xl rounded-lg py-3"
                >
                  Back
                </button>
                <button className="text-white mt-4 w-full bg-blue-700 text-3xl rounded-lg py-3">
                  Signup
                </button>
              </>
            )}

            {/* Step indicators */}
            <div className="flex justify-center mt-8">
              <div
                className={`w-4 h-4 rounded-full mx-1 ${
                  step === 1 ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
              <div
                className={`w-4 h-4 rounded-full mx-1 ${
                  step === 2 ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
