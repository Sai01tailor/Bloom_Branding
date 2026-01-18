import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Lenis from "lenis";

import Home from "./Component/Pages/Home.jsx";
import Contact from "./Component/Pages/Contact.jsx";
import Journey from "./Component/Pages/Journey.jsx";
import Projects from "./Component/Pages/Projects.jsx";
import ServicesPage from "./Component/Pages/Services.jsx";

import AdminLayout from './Admin/App2.jsx';

import "./App.css";
import PageTransitionOverlay from "./Component/Global/PressureText.jsx";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
    <Routes>
      {/* 🌐 PUBLIC SITE */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/journey" element={<Journey />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/services" element={<ServicesPage />} />


      {/* 🔐 ADMIN */}
      <Route path="/admin/*" element={<AdminLayout />} />
    </Routes></>
  );
}

export default App;
