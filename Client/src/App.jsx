import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import AdminDashboard from "./pages/AdminDashboard";
import Testimonials from "./pages/Testimonials";
import Services from "./pages/Services";
import Enquiries from "./pages/Enquiries";

import { EnquiryProvider } from "./context/EnquiryContext";
import { ServiceProvider } from "./context/ServiceContext";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/services" element={<Services />} />
        <Route path="/enquiries" element={<Enquiries />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <EnquiryProvider>
        <ServiceProvider>
          <AnimatedRoutes />
        </ServiceProvider>
      </EnquiryProvider>
    </BrowserRouter>
  );
}

export default App;
