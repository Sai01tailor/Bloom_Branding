import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Service = () => {
  const containerRef = useRef(null);
  const [activeZ, setActiveZ] = useState(10);

  const bringToFront = (e) => {
    setActiveZ((prev) => prev + 1);
    // Directly update zIndex on the dragged element
    e.target.style.zIndex = activeZ + 1;
  };

  const services = [
    { title: "Web Design", desc: "Crafting beautiful digital experiences." },
    { title: "Development", desc: "Building scalable modern applications." },
    { title: "Marketing", desc: "Growing your brand reach globally." },
  ];

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen relative overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #f5efe6, #e6dac7)",
      }}
    >
      {/* Cards are now positioned relative to the whole screen */}
      {services.map((service, index) => (
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
          className="absolute select-none bg-[#f7f3ff] p-4 rounded-xl shadow-2xl cursor-grab flex items-center justify-center flex-col"
          style={{
            width: 320,
            height: 350,
            zIndex: index+1,
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
          <p className="text-gray-500 mt-2">{service.desc}</p>
          
          <div className="absolute bottom-4 right-4 text-xs font-mono text-gray-400">
            0{index + 1}
          </div>
        </motion.div>
      ))}

      {/* Bottom Interface */}
      <div className="absolute  flex flex-col items-center gap-6 pointer-events-none ">
        <h1 className="text-[20vh] font-serif text-gray-900 tracking-tight opacity-90 overflow-hidden">
          Services
        </h1>

      </div>
    </div>
  );
};

export default Service;