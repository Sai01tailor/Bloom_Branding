import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
4;
import Color from "../Global/Color";
import AnimatedButton from "./AnimatedArrow";

const Service = (props) => {
  const containerRef = useRef(null);
  const [activeZ, setActiveZ] = useState(10);

  const bringToFront = (e) => {
    setActiveZ((prev) => prev + 1);
    // Directly update zIndex on the dragged element
    e.target.style.zIndex = activeZ + 1;
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen relative overflow-hidden flex flex-col items-center justify-center overflow-hidden"
      style={{
        // background: `linear-gradient(135deg, ${Color.EarlGray}, ${Color.EarlGray})`,
        backgroundImage:'url(Hero2Back.jpg)',
        backgroundBlendMode:'multiply',
        backgroundColor:Color.EarlGray

      }}
    >
      <motion.img
        className="absolute top-0 left-0"
        style={{ x: "-50%", rotateZ: -45 }}
        src="/TornPaper.png"
      />
      <motion.img
        className="absolute bottom-0 right-0"
        style={{ x: " 40%", y: "10%", rotateZ: -20 }}
        src="/TornPaper.png"
      />
      {/* Cards are now positioned relative to the whole screen */}
      {props.services.map((service, index) => (
        <motion.div
          key={index}
          drag
          dragConstraints={containerRef}
          onDragStart={bringToFront}
          initial={{ scale: 0, rotate: 0 }}
          animate={{
            scale: 1,
            rotate: index * 4 - 4, // Spread them slightly so edges show
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: index * 0.1,
          }}
          whileTap={{
            scale: 1.05,
            boxShadow: "0 40px 80px rgba(0,0,0,0.2)",
            cursor: "grabbing",
          }}
          className="absolute select-none bg-[#f7f3ff] p-4 rounded-xl shadow-2xl cursor-grab flex items-center justify-center flex-col "
          style={{
            width: 300,
            height: 300,
            zIndex: index + 1,
          }}
        >
          {/* Image Area */}
          {/* <div className="w-full h-44 rounded-lg mb-4 bg-gray-200 overflow-hidden">
            <img 
              src={`https://picsum.photos/seed/${index + 40}/400/300`} 
              alt="service" 
              className="w-full h-full object-cover pointer-events-none"
            />
          </div> */}

          <h3 className="text-3xl font-bold text-gray-800">{service.title}</h3>
          <p className="text-gray-500 mt-2 text-center">{service.desc}</p>

          <div className="absolute bottom-4 right-4 text-xs font-mono text-gray-400">
            0{index + 1}
          </div>
        </motion.div>
      ))}

      {/* Bottom Interface */}
      <div className="absolute  flex flex-col items-center pointer-events-none ">
        <h1
          className="md:text-[40vh] text-[30vw] font-serif text-gray-900 tracking-tight opacity-90 overflow-hidden"
          style={{ color: Color.DarkChoc,backgroundBlendMode:'multiply',fontWeight:'normal',paddingInline:2,paddingBlock:2 }}
        >
          Services
        </h1>
        {/* <motion.div style={{rotateZ:-20,position:'absolute' ,bottom:'40%',backgroundColor:Color.ButterYellow,width:'10vw',textAlign:'center' }}>
          <AnimatedButton/>
          <h4
            className="md:text-[3vh] text-[6vw] font-serif text-gray-900 tracking-tight opacity-90 overflow-hidden "
            style={{ color: Color.DarkChoc,fontFamily:'para'}}

          >
            we Offer
          </h4>
        </motion.div> */}
      </div>
    </div>
  );
};

export default Service;
