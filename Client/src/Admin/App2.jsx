import { Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import AdminDashboard from "../pages/AdminDashboard.jsx";
import Testimonials from "../pages/Testimonials.jsx";
import Services from "../pages/Services.jsx";
import Enquiries from "../pages/Enquiries.jsx";

import Signup from "../pages/auth/Signup.jsx";
import Login from "../pages/auth/Login.jsx";
import OtpVerify from "../pages/auth/OtpVerify.jsx";

import ProtectedRoute from "../components/ProtectedRoute.jsx";

function AdminLayout() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* 🔓 PUBLIC ADMIN ROUTES */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="verify-otp" element={<OtpVerify />} />

        {/* 🔒 PROTECTED ADMIN ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="services" element={<Services />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="enquiries" element={<Enquiries />} />
        </Route>

        {/* 🔁 DEFAULT */}
        <Route index element={<Navigate to="/admin/login" replace />} />
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AdminLayout;
