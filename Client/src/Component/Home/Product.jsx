import React, { useState } from "react";
import { motion } from "framer-motion";

const Product = ({products}) => {
  // Common animation settings for the "drawing" look
  const drawTransition = {
    strokeDashoffset: { duration: 2, ease: "easeInOut" },
    fillOpacity: { duration: 1, delay: 1.8, ease: "easeIn" },
  };

  return (
    <div className={`w-screen h-screen bg relative overflow-hidden ` }
    style={{
    backgroundImage: 'url(noiseBack.png)',
    backgroundColor:Color.EarlGray,
    backgroundSize:'50%',
    backgroundBlendMode:'multiply',
  }}
    >
     
      <div
        className="flex flex-col items-center justify-center w-full absolute top-[10%] left-0 right-0"
        style={{ margin: "auto" }}
      >
        {/* SVG 1: Some Glimpses */}
        <svg className="w-full h-[5vh] overflow-visible">
          <motion.text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-[2.2vh] tracking-[0.8rem] md:tracking-[1.4rem]"
            style={{
              stroke: "#ffffff",
              fontWeight:100,
              strokeWidth: "0.3px", // Thin line for a cleaner "draw"
              fill: "#ffffff",
              fontFamily:'sans-serif',
              textTransform: "uppercase",
            }}
            initial={{
              strokeDasharray: 1000,
              strokeDashoffset: 1000,
              fillOpacity: 0,
            }}
            animate={{ strokeDashoffset: 0, fillOpacity: 1 }}
            transition={drawTransition}
          >
            Some Glimpses of Our
          </motion.text>
        </svg>

        {/* SVG 2: WORKS */}
        <svg className="w-full h-[30vh] overflow-visible ">
          <motion.text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className=" text-[20vh] md:text-[30vh] font-black "
            style={{
              stroke: "#ffffff",
              strokeWidth: "3px", // Slightly thicker for the main heading
              fill: "#ffffff",
              fontFamily: "Main Heading",
              fontWeight:100,
            }}
            initial={{
              strokeDasharray: 1000,
              strokeDashoffset: 1000,
              fillOpacity: 0,
            }}
            whileInView={{ strokeDashoffset: 0, fillOpacity: 1 }}
            viewport={{ once: true }}
            transition={{
              strokeDashoffset: {
                duration: 2.5,
                ease: "easeInOut",
                delay: 0.2,
              },
              fillOpacity: { duration: 1, delay: 2.2 },
            }}
          >
            WORKS
          </motion.text>
        </svg>
      </div>

      <ProductCarousel products={products} />
    </div>
  );
};

export default Product;

import { AnimatePresence } from "framer-motion";
import Color from "../Global/Color";
import { redirect } from "react-router-dom";

const ProductCarousel = ({ products = [] }) => {
  const [index, setIndex] = useState(0);

  

  const radius = 220; // Distance from center
  const totalItems = products.length;

  const next = () => setIndex((prev) => (prev + 1) % totalItems);
  const prev = () => setIndex((prev) => (prev - 1 + totalItems) % totalItems);

  return (
    <motion.div
      className="relative w-screen h-screen bg-transparent flex items-center justify-center absolute z-50 top-[40%] "
      initial={{ y: "60%" }}
      whileInView={{ y: "0" }}
      transition={{ duration: 0.5,delay:1.2, ease: "easeIn" }}
    >
      {/* The Central Hub (Optional) */}
      <div className="absolute w-20 h-20 bg-white/10 rounded-full blur-3xl" />
      {/* The Orbiting Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {products.map((item, i) => {
          // Calculate the angle for each card based on the current index
          // We subtract the current index * (360/total) to rotate the whole set
          const angle = (i - index) * (360 / totalItems);
          const radian = (angle * Math.PI) / 180;

          // Trigonometry to find X and Y positions
          const x = Math.sin(radian) * radius;
          const y = -Math.cos(radian) * radius;

          // Scale and Opacity logic: Front item is clear/large, back items fade
          const isCenter = i === index;

          return (
            <motion.div
              key={item.id}
              initial={false}
              animate={{
                x: x,
                y: y,
                rotateZ: angle,
                scale: isCenter ? 1 : 0.6,
                opacity: isCenter ? 1 : 0.3,
                zIndex: isCenter ? 2 : 1,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="absolute cursor-pointer"
              onClick={() => {
                if(isCenter)
                window.open(`/project/${item.title}`,'_self')
                setIndex(i)}}
            >
              <ProductCard data={item} isCenter={isCenter} />
            </motion.div>
            
          );
        })}
      </div>

    </motion.div>
  );
};

const ProductCard = ({ data, isCenter }) => {
  return (
    <div
      className={`w-[280px] h-[380px] rounded-2xl overflow-hidden bg-zinc-900 border ${
        isCenter ? "border-white/40" : "border-transparent"
      } shadow-2xl`}
    >
      {data.state && isCenter  ? (
        <video
          src={data.src}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          src={data.img}
          alt={data.title}
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/80 to-transparent rounded-2xl">
        <p className="text-white font-bold">{data.title}</p>
      </div>
    </div>
  );
};
