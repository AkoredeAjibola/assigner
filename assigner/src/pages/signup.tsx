// src/pages/SignUp.tsx

import React, { useState, ChangeEvent } from "react";
import image3 from "../assets/undraw_my_app_re_gxtj 1.png";
import Navbar from "../components/navbar";
import homeBg from "../assets/Home.png";
import { addUser } from "../services/service";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

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
  const [errors, setErrors] = useState<Partial<Record<keyof PersonalInfo | keyof CompanyInfo, string>>>({});

  const navigate = useNavigate(); // Initialize navigate

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePersonalInfo = (): boolean => {
    const newErrors: Partial<Record<keyof PersonalInfo, string>> = {};
  
    if (!personalInfo.firstName.trim()) {
      newErrors.firstName = "First Name is required.";
      toast.error(newErrors.firstName);
    }
    if (!personalInfo.lastName.trim()) {
      newErrors.lastName = "Last Name is required.";
      toast.error(newErrors.lastName);
    }
    if (!personalInfo.email.trim()) {
      newErrors.email = "Email is required.";
      toast.error(newErrors.email);
    } else if (!/\S+@\S+\.\S+/.test(personalInfo.email)) {
      newErrors.email = "Email is invalid.";
      toast.error(newErrors.email);
    }
    if (!personalInfo.password) {
      newErrors.password = "Password is required.";
      toast.error(newErrors.password);
    } else if (personalInfo.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      toast.error(newErrors.password);
    }
    if (personalInfo.password !== personalInfo.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match!";
      toast.error(newErrors.confirmPassword);
    }
  
    setErrors(prevErrors => ({ ...prevErrors, ...newErrors }));
    return Object.keys(newErrors).length === 0; // Return whether there are no errors
  };
  
  // const validateCompanyInfo = (): boolean => {
  //   const newErrors: Partial<Record<keyof CompanyInfo, string>> = {};

  //   if (!companyInfo.companyName.trim()) {
  //     newErrors.companyName = "Company Name is required.";
  //     toast.error("Company Name is required.");
  //   }
  //   if (!companyInfo.companyAddress.trim()) {
  //     newErrors.companyAddress = "Company Address is required.";
  //     toast.error("Company Address is required.");
  //   }
  //   // Corrected role validation logic
  //   if (companyInfo.role !== 'Employer' && companyInfo.role !== 'Employee') {
  //     newErrors.role = "Role is required.";
  //     toast.error("Role is required.");
  //   }
  //   if (!companyInfo.position.trim()) {
  //     newErrors.position = "Position is required.";
  //     toast.error("Position is required.");
  //   }

  //   setErrors(prevErrors => ({ ...prevErrors, ...newErrors }));
  //   return Object.keys(newErrors).length === 0;
  // };


  const handleNext = () => {
    // Validate personal information
    const isValid = validatePersonalInfo(); // Call validation
  
    if (isValid) {
      setStep(2); // Move to the next step only if valid
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
      setErrors(prevErrors => ({ ...prevErrors, [name]: "" })); // Clear error for this field
    } else {
      setCompanyInfo({ ...companyInfo, [name]: value });
      setErrors(prevErrors => ({ ...prevErrors, [name]: "" })); // Clear error for this field
    }
  };

  // const onSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (validateCompanyInfo()) {
  //     const user = {
  //       ...personalInfo,
  //       ...companyInfo,
  //     };

  //     try {
  //       await addUser(user);
  //       toast.success("Signup successful! Redirecting to login page...", {
  //         onClose: () => navigate("/login"), // Redirect after toast closes
  //         autoClose: 2000, // 2 seconds
  //       });

  //       // Optionally, you can reset the form here if needed
  //       setPersonalInfo({
  //         firstName: "",
  //         lastName: "",
  //         email: "",
  //         password: "",
  //         confirmPassword: "",
  //       });
  //       setCompanyInfo({
  //         companyName: "",
  //         companyAddress: "",
  //         role: "",
  //         position: "",
  //       });
  //       setStep(1);
  //     } catch (err) {
  //       console.error("Signup error:", err);
  //       toast.error("Signup failed. Please try again.");
  //     }
  //   }
  // };


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, personalInfo.email, personalInfo.password);
      const user = userCredential.user;

      const userData = {
        ...personalInfo,
        ...companyInfo,
      };

      // Save additional user data in Firestore
      await addUser(userData);

      console.log(user);

      // Show success message with Toastify
      toast.success("Account created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Redirect to login page or dashboard after successful sign-up
      navigate('/login');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error signing up:', error);
      // Display error message with Toastify
      toast.error(error.message || "Failed to create account", {
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
    <div style={{ backgroundImage: `url(${homeBg})` }} className="min-h-screen bg-cover bg-center">
      <Navbar />
      <ToastContainer /> {/* Display toast notifications */}
      <div className="font-montserrat font-semibold flex md:flex-row flex-col justify-center items-center py-8">
        {/* Image Section */}
        <div className="flex w-full h-auto justify-center items-center md:flex-row flex-col">
          <img
            src={image3}
            className="md:w-[503px] w-full h-auto md:h-[807px] md:mt-0 mt-8 px-5"
            alt="Illustration"
          />
        </div>

        {/* Form Section */}
        <div className="flex md:w-[1204px] md:h-[1190px] w-full h-auto flex-col justify-center items-center">
          <form onSubmit={onSubmit} className="md:px-10 px-7 mt-12 mx-auto w-full">
            {step === 1 && (
              <>
                <p className="text-black200 text-3xl mb-6 font-extrabold">
                  Personal Information
                </p>
                {/* First Name */}
                <div className="mb-4">
                  <label className="block text-black200 text-2xl py-2">First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={personalInfo.firstName}
                    onChange={(e) => handleInputChange(e, "personal")}
                    placeholder="First Name"
                    className={`w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl ${
                      errors.firstName ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div className="mb-4">
                  <label className="block text-black200 text-2xl py-2">Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={personalInfo.lastName}
                    onChange={(e) => handleInputChange(e, "personal")}
                    placeholder="Last Name"
                    className={`w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl ${
                      errors.lastName ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-black200 text-2xl py-2">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={(e) => handleInputChange(e, "personal")}
                    placeholder="Email"
                    className={`w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="block text-black200 text-2xl py-2">Password:</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={personalInfo.password}
                      onChange={(e) => handleInputChange(e, "personal")}
                      placeholder="Password"
                      className={`w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl ${
                        errors.password ? 'border-red-500' : ''
                      }`}
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
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                  <label className="block text-black200 text-2xl py-2">Confirm Password:</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={personalInfo.confirmPassword}
                      onChange={(e) => handleInputChange(e, "personal")}
                      placeholder="Confirm Password"
                      className={`w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl ${
                        errors.confirmPassword ? 'border-red-500' : ''
                      }`}
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
                </div>

                {/* Next Button */}
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

                {/* Company Name */}
                <div className="mb-4">
                  <label className="block text-black200 text-2xl py-2">Company Name:</label>
                  <input
                    type="text"
                    name="companyName"
                    value={companyInfo.companyName}
                    onChange={(e) => handleInputChange(e, "company")}
                    placeholder="Company Name"
                    className={`w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl ${
                      errors.companyName ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.companyName && <p className="text-red-500">{errors.companyName}</p>}
                </div>

                {/* Company Address */}
                <div className="mb-4">
                  <label className="block text-black200 text-2xl py-2">Company Address:</label>
                  <input
                    type="text"
                    name="companyAddress"
                    value={companyInfo.companyAddress}
                    onChange={(e) => handleInputChange(e, "company")}
                    placeholder="Company Address"
                    className={`w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl ${
                      errors.companyAddress ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.companyAddress && <p className="text-red-500">{errors.companyAddress}</p>}
                </div>

                {/* Role */}
                <div className="mb-4">
                  <label className="block text-black200 text-2xl py-2">Role:</label>
                  <select
                    name="role"
                    value={companyInfo.role}
                    onChange={(e) => handleInputChange(e, "company")}
                    className={`w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl ${
                      errors.role ? 'border-red-500' : ''
                    }`}
                    required
                  >
                    <option value="" disabled>
                      Select your role
                    </option>
                    <option value="Employer">Employer</option>
                    <option value="Employee">Employee</option>
                  </select>
                  {errors.role && <p className="text-red-500">{errors.role}</p>}
                </div>

                {/* Position */}
                <div className="mb-4">
                  <label className="block text-black200 text-2xl py-2">Position:</label>
                  <input
                    type="text"
                    name="position"
                    value={companyInfo.position}
                    onChange={(e) => handleInputChange(e, "company")}
                    placeholder="Position"
                    className={`w-full text-lg shadow-lg p-4 border-gray-300 rounded-xl ${
                      errors.position ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.position && <p className="text-red-500">{errors.position}</p>}
                </div>

                {/* Navigation Buttons */}
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

            {/* Step Indicators */}
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
