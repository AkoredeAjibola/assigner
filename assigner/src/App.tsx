import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Employeesdashboard from "./pages/employeesdashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Employeesdashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
