import React from "react";
import { motion, animate, color } from "framer-motion";
import TextType from "../Global/TextType";
import Colors from "../Global/Color";
import Color from "../Global/Color";
import { Link } from "react-router-dom";

function JourneyComponent({ timeLabel, heading, description, flipe = false }) {
  return (
    <div className="w-[100vw]  bg-white overflow-hidden">
      {/* Logic: Targets the global 'path' element when this section is in view */}
      <motion.div className=" relative">
        {/* Desktop Flip Logic: Uses row-reverse if flipe is true */}
        <div
          className={`flex flex-col  ${
            flipe ? "lg:flex-row-reverse" : "lg:flex-row"
          } items-stretch min-h-[300px] lg:min-h-[341px]`}
          style={{ backgroundColor: Colors.DarkChoc }}
        >
          {/* LEFT SECTION (Blue Box) */}
          <motion.div
            initial={{ flex: 0.2 }}
            whileInView={{ flex:1 }}
            transition={{type:'spring',ease:'easeOut',damping:20}}
            className="flex-1 flex items-center justify-center p-6 lg:p-8 "
            style={{ color: Colors.EarlGray }}
          >
            {/* flipe logic for internal items to keep date on the outer edge */}
            <div
              className={`flex items-center gap-4 lg:gap-8 w-full h-full max-w-md ${
                flipe ? "flex-row-reverse" : ""
              }`}
            >
              {/* Vertical Time Label */}
              <div className="bg-white w-[39px] flex items-center justify-center py-8 lg:py-0 lg:h-full">
                <div
                  className="text-black font-normal text-sm lg:text-base whitespace-nowrap"
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  {timeLabel}
                </div>
              </div>

              {/* Blue Border Box */}
              <div className="flex-1 bg-white border-[10px] border-journey-blue h-[200px] lg:h-[309px]"></div>
            </div>
          </motion.div>

          {/* CENTER ARROW: Flipped horizontally if flipe is true */}
          <motion.div className="hidden lg:flex items-center justify-center bg-gray-200 flex-shrink-0 w-[90px] border-0">
            <svg
              className={`w-full h-full border-0 ${
                flipe ? "scale-x-[-1]" : ""
              }`}
              viewBox="0 0 90 340"
              fill={Colors.DarkChoc}
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              style={{ backgroundColor: Colors.ButterYellow }}
            >
              <path
                d="M0 0L80 170.253L0 340"
                stroke={Colors.EarlGray}
                strokeWidth="5"
              />
            </svg>
          </motion.div>

          {/* RIGHT SECTION (Gold Box) */}
          <div
            className="flex-1 flex flex-col  p-6 lg:p-8"
            style={{ backgroundColor: Colors.ButterYellow }}
          >
            <div className="bg-transparent px-6 lg:px-8 py-3 lg:py-4 flex items-center">
              <h2 className="text-2xl lg:text-[32px] font-normal text-black uppercase">
                {heading}
              </h2>
            </div>

            <div className=" px-6 lg:px-8 py-6 lg:py-8 flex-1 flex items-start">
              <p className="text-sm lg:text-base font-normal text-black">
                {description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Story() {
  return (
    <div className="bg-black flex flex-col items-center justify-center p-4">
      <TextType
        text="Listen to our Story"
        textColors={["white"]}
        className="overflow-hidden Heading py-10"
        loop={false}
      />

      {/* Example of alternating layouts */}
      <JourneyComponent
        timeLabel="JANUARY 2024"
        heading="PROJECT KICKOFF"
        description="This marks the start of our journey where we defined the core goals and brand identity for the upcoming year."
        flipe={false}
      />

      <JourneyComponent
        timeLabel="FEBRUARY 2024"
        heading="DESIGN PHASE"
        description="Translating our vision into high-fidelity designs and interactive prototypes."
        flipe={true}
      />
    </div>
  );
}
