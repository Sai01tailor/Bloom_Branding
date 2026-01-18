import React, { useEffect, useState } from "react";
import Hero from "../Home/Hero";
import { motion,AnimatePresence } from "framer-motion";
import Menu from "../Global/Menu";
import MouseTrail from "../Global/MouseTrail";
import Footer from "../Global/Footer";
import Header from "../Global/Header";
import Service from "../Home/Service";
import Product from "../Home/Product";
import LogoMarquee from "../Home/LogoMarquee";
import Instagram_preview from "../Home/Instagram_preview";
import Story from "../Home/Story";
import Color from "../Global/Color.jsx";
import transition from "../Global/PageTransition.jsx";
import Spline from "@splinetool/react-spline";
import axios from "axios";
import { Link } from "react-router-dom";
import { CloudRain } from "lucide-react";
import api from "../../utils/axios.js";
  const LOGO_SRC =  [
    { id: 1, text: "BRAND", badge: "https://cdn.simpleicons.org/react/61DAFB", bg: "bg-[#d1f3f1]" },
    { id: 2, text: "DESIGN", badge: "https://cdn.simpleicons.org/framer/0055FF", bg: "bg-[#d1f3f1]" },
    { id: 3, text: "EPIC", badge: "https://cdn.simpleicons.org/typescript/3178C6", bg: "bg-[#e2e2ff]" },
    { id: 4, text: "MOTION", badge: "https://cdn.simpleicons.org/nodedotjs/339933", bg: "bg-[#e2e2ff]" },
    { id: 5, text: "DESIGN", badge: "https://cdn.simpleicons.org/framer/0055FF", bg: "bg-[#d1f3f1]" },
    
  ];
function LoadingOverlay({ isLoading }) {
  return (
    <motion.div
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{backgroundColor:Color.DarkChoc,color:Color.EarlGray}}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center backdrop-blur-sm ${
        isLoading ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Spinner */}
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-white/20 border-t-white" />

      {/* Text */}
      <p className="mt-6 text-xs tracking-[0.35em] uppercase text-white/80">
        Loading 
      </p>
    </motion.div>
  );
}

const Home = () => {
  const [data, setData] = useState(null); // Use camelCase for setData

  const getHomepageAPI = async () => {
    try {
      // Ensure 'API' is defined as a string URL
      const response = await api.get("/homepage");
      console.log(response.data);
      setData(response.data);
    } catch (e) {
      console.error("API Error:", e.message);
    }
  };
  const services = [
    { title: "Web Design", desc: "Crafting beautiful digital experiences." },
    { title: "Development", desc: "Building scalable modern applications." },
    { title: "Marketing", desc: "Growing your brand reach globally." },
  ];
  const products = [
    {
      id: 1,
      title: "Project 01",
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400",
      state: false,
    },
    {
      id: 2,
      title: "Project 02",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
      state: false,
    },
    {
      id: 3,
      title: "Project 03",
      img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400",
      state: false,
    },
    {
      id: 4,
      title: "Project 04",
      img: "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=400",
      state: false,
    },
    {
      id: 5,
      title: "Project 05",
      img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400",
      state: false,
    },
  ];
  useEffect(() => {
    getHomepageAPI();
  }, []); // Empty array means this runs once on mount
  return (
    <div className={`w-screen `}>
      <Header />
      {/* <Hero /> */}
<Spline scene="https://prod.spline.design/H9CV7G84MsY90C-9/scene.splinecode" />
  
  

    <div
        className={`h-[80vh] w-screen  relative SubHeading `}
        style={{
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Color.DarkChoc,
          // backgroundImage:'url(./Back2Hero.png)',
          // backgroundBlendMode:'multiply',
          // backgroundSize:'50%',
          boxShadow:'inset 0px 2px 80px black'
        }}
      >
        <motion.img
          src="./Camera.png"
          className="h-[20%] absolute md:visible invisible left-[7%] md:top-[50%] top-[60%] md:h-[50%] "
          initial={{ rotateZ: 180 }}
          animate={{ rotateZ: [0, -10, 0, 10, 0] }}
          transition={{
            repeat: Infinity,
            ease: "easeInOut",
            duration: 2,
          }}
        />
        <motion.img
          src="./loud.png"
          className="h-[20%] absolute right-[5%] md:bottom-[50%] bottom-[10%] md:h-[50%]"
          initial={{ rotateZ: 180 }}
          animate={{ rotateZ: [0, -10, 0, 10, 0] }}
          transition={{
            repeat: Infinity,
            ease: "easeInOut",
            duration: 2,
          }}
          style={{ scaleX: -1 }} // ✅ OK here
        />
        <motion.img
          src="./FlowerPot.png"
          className="h-[20%] absolute   left-[2%] md:bottom-[50%] bottom-[10%] md:h-[50%]"
          initial={{ rotateZ: 180 }}
          animate={{ rotateZ: [0, -10, 0, 10, 0] }}
          transition={{
            repeat: Infinity,
            ease: "easeInOut",
            duration: 2,
          }}
          style={{ scaleX: -1 }} // ✅ OK here
        />
        <motion.img
          src="./FlowerPot.png"
          className="h-[20%] absolute md:visible right-[5%] invisible md:top-[50%] top-[60%] md:h-[50%] "
          initial={{ rotateZ: 180 }}
          animate={{ rotateZ: [0, -10, 0, 10, 0] }}
          transition={{
            repeat: Infinity,
            ease: "easeInOut",
            duration: 2,
          }}
          style={{ scaleX: -1 }} // ✅ OK here
        />

        <MouseTrail stroke="black" />
        <motion.div
          style={{
            textAlign: "center",
            overflow: "hidden",
            letterSpacing: 10,
            lineHeight:1,
            
            fontFamily: "Main Heading",
            color: Color.ButterYellow,
            fontWeight:'normal',
            zIndex: 2,
          }}
          className="text-[8vh] lg:text-[12vh]"
        >
          {data?.data?.homepage?.hero?.subHeading}
        </motion.div>
        <motion.button
          style={{
            fontSize: "3vh",
            textAlign: "center",
            color: Color.EarlGray,
            border: "2px solid ",
            borderColor: Color.EarlGray,
            backgroundColor:'transparent',
            fontFamily: "Para",
            borderRadius: 200,
            paddingInline: 32, 
            paddingBlock:8,
            margin: 32,
            zIndex: 2,
          }}
          whileHover={{
            backgroundColor: Color.EarlGray,
            color: Color.ButterYellow,
            borderColor:Color.ButterYellow,
            scale: 1.1,
          }}
        >
          <Link to="/contact">{data?.data?.homepage?.hero?.ctaText}</Link>
        </motion.button>
      </div>
      <Service
        services={
          data?.data?.homepage?.featuredServices.length > 0
            ? data?.data?.homepage?.featuredServices
            : services
        }
      />
      {/* <h1
        style={{
          backgroundColor: Color.DarkChoc,
          height: "10vh",
          fontSize: "5vh",
          textAlign: "center",
          fontWeight: "bolder",

          color: Color.ButterYellow,
        }}
      >
        Little Twist In Color{" "}
      </h1> */}
         <Product
        products={
          data?.data?.homepage?.featuredPortfolio.length > 0
            ? data?.data?.homepage?.featuredPortfolio
            : products
        }
      /><div className="relative " >   
      <LogoMarquee
        logos={
          data?.data?.homepage?.featuredClients.length > 0
            ? data?.data?.homepage?.featuredClients
            : LOGO_SRC
        }
      />


      <Story
        story={
          data?.data?.homepage?.story.length > 0
            ? data?.data?.homepage?.story
            : null
        }
      />
      </div>
      <Instagram_preview />
      <Menu />
      <Footer />
    </div>
  );
};
function App() {
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    // replace with real asset / spline load
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Home />
      <LoadingOverlay isLoading={loading} />
    </>
  );
}


export default App;
