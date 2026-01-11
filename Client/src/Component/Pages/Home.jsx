import React from "react";
import Hero from "../Home/Hero";
import { motion } from "framer-motion";
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
      import Spline from '@splinetool/react-spline';
const LOGO_SRC = [
  "https://cdn.simpleicons.org/react/61DAFB", // React Blue
  "https://cdn.simpleicons.org/framer/0055FF", // Framer Blue
  "https://cdn.simpleicons.org/tailwindcss/06B6D4", // Tailwind Cyan
  "https://cdn.simpleicons.org/nextdotjs/000000", // Next.js Black
  "https://cdn.simpleicons.org/typescript/3178C6", // TS Blue
  "https://cdn.simpleicons.org/nodedotjs/339933", // Node Green
  "https://cdn.simpleicons.org/typescript/3178C6", // TS Blue
  "https://cdn.simpleicons.org/nodedotjs/339933", // Node Green
  "https://cdn.simpleicons.org/typescript/3178C6", // TS Blue
  "https://cdn.simpleicons.org/nodedotjs/339933", // Node Green
  "https://cdn.simpleicons.org/typescript/3178C6", // TS Blue
  "https://cdn.simpleicons.org/nodedotjs/339933", // Node Green
];

const Home = () => {
  return (
    <div className={`w-screen `}>
      <Header />
      {/* <Hero /> */}

    <Spline scene="https://prod.spline.design/H9CV7G84MsY90C-9/scene.splinecode" />

      <div
        className={`h-[80vh] w-screen  relative `}
        style={{
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Color.DarkChoc,
        }}
      >
        <motion.img
          src="./Camera.png"
          className="h-[20%] absolute left-[10%] top-[50%] md:h-[50%] "
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
          className="h-[20%] absolute right-[10%] md:bottom-[50%] bottom-[30%] md:h-[50%]"
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
          className="SubHeading"
          style={{
            fontSize: "10vh",
            fontWeight: "bold",
            textAlign: "center",
            color: Color.EarlGray,
            zIndex: 2,
          }}
        >
          Blooming the world
          <br /> with Creativity
        </motion.div>
      </div>
      <Service />
      <h1 style={{backgroundColor:Color.DarkChoc,height:'10vh',fontSize:'7vh',textAlign:'center',fontWeight:'bolder',color:Color.ButterYellow}}>Little Twist In Color </h1>
      <Product />
      <LogoMarquee logos={LOGO_SRC} />
      <Story />
      <Instagram_preview />
      <Menu />
      <Footer />
    </div>
  );
};

export default (Home);
