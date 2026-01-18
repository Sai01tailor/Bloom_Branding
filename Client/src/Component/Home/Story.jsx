import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import TextType from "../Global/TextType";
import CustomCursor from "../Global/CustomCursor";
import Color from "../Global/Color";

const DEFAULT_DATA = [
  {
    date: "JAN 2024",
    heading: "research & moodboard",
    description: "Deep dive into visual directions and user personas.",
    img: "https://images.unsplash.com/photo-1586717791821-3f44a563cc4c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    date: "MAR 2024",
    heading: "logo concept exploration",
    description: "Sketching and refining core brand marks.",
    img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    date: "JUN 2024",
    heading: "brand system & guidelines",
    description: "Defining typography, colors, and usage rules.",
    img: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function Story({ data = DEFAULT_DATA }) {
  const displayData = data.slice(0, 3);
  const sectionRef = useRef(null);
  
  // State to pass to the cursor
  const [hoveredImage, setHoveredImage] = useState("");

  return (
    <section
      className=" w-full flex flex-col items-center py-20 overflow-hidden relative"
      style={{
        backgroundColor: Color.DarkChoc,
        backgroundImage: "url(./Hero2Back.jpg)",
        backgroundBlendMode: "multiply",
        paddingTop:'30vh'
      }}
    >
      {/* Desktop Custom Cursor */}
      <div className="hidden lg:block">
        <CustomCursor
          targetRef={sectionRef}
          imageUrl={hoveredImage}
          width={180} // Larger size to see the image clearly
          height={180}
        />
      </div>
<motion.div
          style={{
            fontSize: "12vh",
            textAlign: "center",
            overflow: "hidden",
            letterSpacing: 12,
            
            fontFamily: "Main Heading",
            color: Color.ButterYellow,
            fontWeight:'bolder',
            zIndex: 2,
          }}
        >
        Listen to Our Story
        </motion.div>

      {/* Target Container */}
      <div
        ref={sectionRef}
        className="w-full max-w-[1600px] px-6 lg:px-16 lg:cursor-none"
      >
        <div className="hidden lg:flex flex-row w-full items-stretch  border-white/10 mt-12">
          {displayData.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredImage(item.img)}
              onMouseLeave={() => setHoveredImage("")}
              className={`flex-1 px-8 py-20 min-h-[420px] transition-all duration-500 hover:bg-white/[0.03] ${
                index !== displayData.length - 1
                  ? "border-r border-white/10"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-2 mb-8">
                <span
                  className=" italic font-serif text-4xl"
                  style={{ color: Color.ButterYellow }}
                >
                  0{index + 1}
                </span>
                <span className="text-white/40 text-xs tracking-widest uppercase font-mono">
                  {item.date}
                </span>
              </div>

              <h3 className="text-white text-[38px] font-medium uppercase leading-[1.1] mb-6 overflow-hidden">
                {item.heading}
              </h3>

              <p className="text-white/50 text-sm leading-relaxed max-w-[300px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        {/* MOBILE VIEW - Fixed Clipping */}
        <div className="lg:hidden mt-10 w-full overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -950 }} // Adjust based on card count
            className="flex gap-6 px-6 cursor-grab active:cursor-grabbing"
          >
            {displayData.map((item, index) => (
              <div
                key={index}
                className="min-w-[85vw] flex-shrink-0 bg-[#0a221f] p-8 border border-white/10 rounded-sm flex flex-col"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[#C5D193] italic font-serif text-3xl">
                    0{index + 1}
                  </span>
                  <span className="text-white/30 text-[10px] tracking-widest uppercase font-mono">
                    {item.date}
                  </span>
                </div>

                <div className="w-full h-48 mb-6 overflow-hidden rounded-sm">
                  <img
                    src={item.img}
                    className="w-full h-full object-cover opacity-80"
                    alt=""
                  />
                </div>

                <h3 className="text-white text-2xl font-medium uppercase leading-tight mb-4">
                  {item.heading}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
            {/* Empty spacer to ensure the last card isn't clipped */}
            <div className="min-w-[10vw] flex-shrink-0" />
          </motion.div>
        </div>
      </div>

      <motion.button
        style={{
          fontSize: "3vh",
          textAlign: "center",
          color: Color.EarlGray,
          border: "2px solid ",
          borderColor: Color.EarlGray,
          backgroundColor: 'transparent',
          fontFamily: "Para",
          borderRadius: 200,
          paddingInline: 32,
          paddingBlock: 8,
          margin: 32,
          zIndex: 2,
        }}
        whileHover={{
          backgroundColor: Color.EarlGray,
          color: Color.ButterYellow,
          borderColor: Color.ButterYellow,
          scale: 1.1,
        }}
      >
        <Link to="/contact">Click Here to Listen it Whole</Link>
      </motion.button>
    </section>
  );
}
