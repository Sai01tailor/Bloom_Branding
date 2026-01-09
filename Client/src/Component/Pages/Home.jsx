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

const LOGO_SRC = [
  "https://cdn.simpleicons.org/react/61DAFB",     // React Blue
  "https://cdn.simpleicons.org/framer/0055FF",    // Framer Blue
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
    <div className="w-screen ">
      <Header />
      <Hero />
      <div
        className="h-[80vh] w-screen bg-transparent "
        style={{
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MouseTrail stroke="black" />
        <motion.div
          className="SubHeading"
          style={{
            fontSize: "10vh",
            fontWeight: "bold",
            textAlign: "center",
            color: "black",
          }}
        >
          Blooming the world
          <br /> with Creativity
        </motion.div>
      </div>
          <Service/>
          <Product/>
          <LogoMarquee logos={LOGO_SRC}/>
          <Story/>
          <Instagram_preview/>
      <Menu />
      <Footer />
    </div>
  );
};

export default Home;
