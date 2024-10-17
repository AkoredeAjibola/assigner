import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Employeesdashboard from "./pages/employeesdashboard";
import Employersdashboard from "./pages/employersdashboard";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />   
        <Route path="/employee-dashboard" element={<Employeesdashboard />} />
        <Route path="/employer-dashboard" element={<Employersdashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
