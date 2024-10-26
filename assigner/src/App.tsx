import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Employeesdashboard from "./pages/employeesdashboard";
import Employersdashboard from "./pages/employersdashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from './context/AuthProvider'; 



function App() {
  return (
    <BrowserRouter>
     <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />   
        <Route
          path="/employer-dashboard"
          element={
            <ProtectedRoute>
              <Employersdashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute>
              <Employeesdashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
