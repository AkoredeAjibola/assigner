import { useState, ChangeEvent } from "react";
import image3 from "../assets/undraw_my_app_re_gxtj 1.png";
import Navbar from "../components/navbar";
import homeBg from "../assets/Home.png";
import { addUser } from "../services/service";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CustomPopup from "../components/CustomPopup";
import { toast } from "react-toastify";

// Define types for personal and company information
interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface CompanyInfo {
  companyName: string;
  companyAddress: string;
  role: string;
  position: string;
}

const SignUp: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    companyName: "",
    companyAddress: "",
    role: "",
    position: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<Record<keyof PersonalInfo, string>>>({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePersonalInfo = () => {
    const newErrors: Partial<Record<keyof PersonalInfo, string>> = {};

    if (!personalInfo.firstName) {
      newErrors.firstName = "First Name is required.";
    }
    if (!personalInfo.lastName) {
      newErrors.lastName = "Last Name is required.";
    }
    if (!personalInfo.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(personalInfo.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!personalInfo.password) {
      newErrors.password = "Password is required.";
    } else if (personalInfo.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    if (personalInfo.password !== personalInfo.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match!";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validatePersonalInfo()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    formType: "personal" | "company"
  ) => {
    const { name, value } = e.target;
    if (formType === "personal") {
      setPersonalInfo({ ...personalInfo, [name]: value });
      setErrors({ ...errors, [name]: "" }); // Clear error for this field
    } else {
      setCompanyInfo({ ...companyInfo, [name]: value });
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = {
      ...personalInfo,
      ...companyInfo,
    };

    addUser(user)
      .then(() => {
        setPopupMessage(`Signup successful for ${personalInfo.lastName}!`);
        setShowPopup(true);

        // Reset the form
        setPersonalInfo({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setCompanyInfo({
          companyName: "",
          companyAddress: "",
          role: "",
          position: "",
        });
        setStep(1);
      })
      .catch((err) => {
        console.error("Signup error:", err);
        toast.error("Signup failed. Please try again.", { icon: false });
      });
  };

  return (
    <div style={{ backgroundImage: `url(${homeBg})` }}>
      <Navbar />
      <div className="font-montserrat font-semibold flex md:flex-row flex-col justify-center items-center">
        <div className="flex w-full h-auto justify-center items-center md:flex-row flex-col">
          <img
            src={image3}
            className="md:w-[503px] w-full h-auto md:h-[807px] md:mt-0 mt-8 px-5"
            alt="Illustration"
          />
        </div>

        <div className="flex md:w-[1204px] md:h-[1190px] w-full h-auto flex-col justify-center items-center">
          <form onSubmit={onSubmit} className="md:px-10 px-7 mt-12 mx-auto w-full">
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
                  className={`w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl ${errors.firstName ? 'border-red-500' : ''}`}
                />
                {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}

                <p className="text-black200 text-2xl py-4">Last Name:</p>
                <input
                  type="text"
                  name="lastName"
                  value={personalInfo.lastName}
                  onChange={(e) => handleInputChange(e, "personal")}
                  placeholder="Last Name"
                  className={`w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl ${errors.lastName ? 'border-red-500' : ''}`}
                />
                {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}

                <p className="text-black200 text-2xl py-4">Email:</p>
                <input
                  type="email"
                  name="email"
                  value={personalInfo.email}
                  onChange={(e) => handleInputChange(e, "personal")}
                  placeholder="Email"
                  className={`w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}

                <p className="text-black200 text-2xl py-4">Password:</p>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={personalInfo.password}
                    onChange={(e) => handleInputChange(e, "personal")}
                    placeholder="Password"
                    className={`w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl ${errors.password ? 'border-red-500' : ''}`}
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
                {errors.password && <p className="text-red-500">{errors.password}</p>}

                <p className="text-black200 text-2xl py-4">Confirm Password:</p>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={personalInfo.confirmPassword}
                    onChange={(e) => handleInputChange(e, "personal")}
                    placeholder="Confirm Password"
                    className={`w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl ${errors.confirmPassword ? 'border-red-500' : ''}`}
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
                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}

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
                  Company Information
                </p>

                <p className="text-black200 text-2xl py-4">Company Name:</p>
                <input
                  type="text"
                  name="companyName"
                  value={companyInfo.companyName}
                  onChange={(e) => handleInputChange(e, "company")}
                  placeholder="Company Name"
                  className="w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl"
                />

                <p className="text-black200 text-2xl py-4">Company Address:</p>
                <input
                  type="text"
                  name="companyAddress"
                  value={companyInfo.companyAddress}
                  onChange={(e) => handleInputChange(e, "company")}
                  placeholder="Company Address"
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
      <CustomPopup
        showPopup={showPopup}
        popupMessage={popupMessage}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
};

export default SignUp;
