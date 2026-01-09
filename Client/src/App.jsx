import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import AdminDashboard from "./pages/AdminDashboard";
import Testimonials from "./pages/Testimonials";
import Services from "./pages/Services";
import Enquiries from "./pages/Enquiries";

import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import OtpVerify from "./pages/auth/OtpVerify";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>

          {/* 🔐 PUBLIC ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<OtpVerify />} />

          {/* 🔒 ALL ADMIN ROUTES PROTECTED */}
          <Route
            element={
              <ProtectedRoute />
            }
          >
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/enquiries" element={<Enquiries />} />
          </Route>

          {/* 🔁 DEFAULT */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
