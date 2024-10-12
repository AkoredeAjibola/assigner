import { useState, ChangeEvent } from "react";
import image3 from "../assets/undraw_my_app_re_gxtj 1.png";
import Navbar from "../components/navbar";
import homeBg from "../assets/Home.png";
import { addUser } from "../services/service";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [step, setStep] = useState(1); // Track which step the form is on (1 for personal, 2 for company's information)
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    companyAddress: "",
    role: "",
    position: "",
  });

  const handleNext = () => {
    // Validation to check all personal fields are filled before moving to the next step
    if (
      personalInfo.firstName &&
      personalInfo.lastName &&
      personalInfo.email &&
      personalInfo.password &&
      personalInfo.confirmPassword
    ) {
      if (personalInfo.password !== personalInfo.confirmPassword) {
        alert("Passwords do not match!");
      } else {
        setStep(2); // Go to the next step (company's information)
      }
    } else {
      alert("Please fill in all personal information fields.");
    }
  };

  const handleBack = () => {
    setStep(1); // Go back to the personal information step
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    formType: "personal" | "company"
  ) => {
    const { name, value } = e.target;
    if (formType === "personal") {
      setPersonalInfo({ ...personalInfo, [name]: value });
    } else {
      setCompanyInfo({ ...companyInfo, [name]: value });
    }
  };

  const onSubmit = () => {
    const User = {
      firstName: personalInfo.firstName,
      lastName: personalInfo.lastName,
      email: personalInfo.email,
      password: personalInfo.password,
      companyName: companyInfo.companyName,
      companyAddress: companyInfo.companyAddress,
      role: companyInfo.role,
      position: companyInfo.position,
    };

    addUser(User);

    console.log(User);
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
            {step === 1 && (
              <>
                <p className="text-black200 text-3xl mb-6 font-extrabold">
                  Personal Information
                </p>
                <p className="text-black200 text-2xl py-4">First Name:</p>
                <input
                  type="text"
                  name="firstName"
                  value={personalInfo.firstName}
                  onChange={(e) => handleInputChange(e, "personal")}
                  placeholder="First Name"
                  required
                  className="w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl"
                />


                <p className="text-black200 text-2xl py-4">Last Name:</p>
                <input
                  type="text"
                  name="lastName"
                  value={personalInfo.lastName}
                  onChange={(e) => handleInputChange(e, "personal")}
                  placeholder="Last Name"
                  required
                  className="w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl"
                />

                <p className="text-black200 text-2xl py-4">Email:</p>
                <input
                  type="email"
                  name="email"
                  value={personalInfo.email}
                  onChange={(e) => handleInputChange(e, "personal")}
                  placeholder="Email"
                  required
                  className="w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl"
                />


                <p className="text-black200 text-2xl py-4">Password:</p>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={personalInfo.password}
                    onChange={(e) => handleInputChange(e, "personal")}
                    placeholder="Password"
                    required
                    className="w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl"
                  />


                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 text-black"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={25} />
                    ) : (
                      <FaEye size={25} />
                    )}
                  </button>
                </div>
                <p className="text-black200 text-2xl py-4">Confirm Password:</p>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={personalInfo.confirmPassword}
                    onChange={(e) => handleInputChange(e, "personal")}
                    placeholder="Confirm Password"
                    required
                    className="w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl"
                  />


                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 text-black"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={25} />
                    ) : (
                      <FaEye size={25} />
                    )}
                  </button>
                </div>
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
                <p className="text-black200 text-3xl mb-6 font-extrabold">
                  Company's Details
                </p>
                <p className="text-black200 text-2xl py-4">Company Name:</p>
                <input
                  type="text"
                  name="companyName"
                  value={companyInfo.companyName}
                  onChange={(e) => handleInputChange(e, "company")}
                  placeholder="Company Name"
                  required
                  className="w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl"
                />


                <p className="text-black200 text-2xl py-4">Company Address:</p>
                <input
                  type="text"
                  name="companyAddress"
                  value={companyInfo.companyAddress}
                  onChange={(e) => handleInputChange(e, "company")}
                  placeholder="Company Address"
                  required
                  className="w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl"
                />


                <p className="text-black200 text-2xl py-4">Role:</p>
                <select
                  name="role"
                  value={companyInfo.role}
                  onChange={(e) => handleInputChange(e, "company")}
                  className="w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl"
                  required
                >


                  <option value="" disabled>
                    Select your role
                  </option>
                  <option value="employer">Employer</option>
                  <option value="employee">Employee</option>
                </select>
                <p className="text-black200 text-2xl py-4">Position:</p>
                <input
                  type="text"
                  name="position"
                  value={companyInfo.position}
                  onChange={(e) => handleInputChange(e, "company")}
                  placeholder="Position"
                  required
                  className="w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl"
                />
                <div className="flex justify-between mt-10">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="text-white w-1/2 bg-blue-700 text-3xl rounded-lg py-3 mr-2"
                  >
                    Back
                  </button>
                  
                  <button
                    type="submit"
                    className="text-white w-1/2 bg-blue-700 text-3xl rounded-lg py-3 ml-2"
                    onClick={onSubmit}
                  >
                    Signup
                  </button>
                </div>
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


