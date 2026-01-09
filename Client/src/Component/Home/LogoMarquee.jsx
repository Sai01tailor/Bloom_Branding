import React from "react";
import { motion } from "framer-motion";

const InfiniteMarquee = ({ logos }) => {
  const repeatedLogos = [...logos, ...logos]; // seamless

  return (
    <div className="relative h-[20vh] w-full overflow-hidden bg-white py-12">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Track */}
      <motion.div
        className="flex w-max h-full items-center gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {repeatedLogos.map((logo, index) => {
          const direction = index % 2 === 0 ? -14 : 14; // 🔥 alternate

          return (
            <motion.div
              key={index}
              className="flex-shrink-0 w-[160px] flex justify-center"
              animate={{
                y: [ 0,direction, -direction,0],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              <img
                src={logo}
                alt=""
                className="h-16 w-auto object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default InfiniteMarquee;
