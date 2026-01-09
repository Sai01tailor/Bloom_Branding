import React from "react";
import { easeIn, motion,animate } from "framer-motion";
import ReactCurvedText from "react-curved-text";
import TextPressure from "./PressureText";
import TextType from "./TextType";

const socials = [
  {
    name: "Instagram",
    url: "https://www.instagram.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
  },
];

const Footer = (props) => {
  var a = null;
  return (
    <motion.div
      className="w-screen bg-red-100  h-[100vh] "
      style={{ padding: 4, borderRadius: 50 }}
      onViewportEnter={() => {
        // Find the element
        const element = document.getElementById("path");
        if (element) {
          // Smoothly animate pathLength to 0
          animate(element, { pathLength: 0 ,x:'10vw'}, { duration: 0.8 });
        }
      }}
      onViewportLeave={() => {
        const element = document.getElementById("path");
        if (element) {
          // Smoothly animate pathLength back to 1
          animate(element, { pathLength: 1,x:0 }, { duration: 0.8 });
        }
      }}
      viewport={{
        amount: 0.5, 
        once: false,
      }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <div className="flex h-[70%] w-full bg-gray-300 justify-around items-center ">
        <div className="w-[20%] h-full bg-blue-200 flex flex-col justify-between">
          <motion.div
            className="w-full  flex-col flex items-center justify-center"
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <img
              src="/LogoSmall.png"
              alt="Logo"
              className="w-[50%] aspect-square  object-contain "
            />
            <motion.span
              className="overflow-hidden whitespace-nowrap underline  text-[3vh] font-bold mt-4 text-gray-800 "
              initial={{ width: 0 }}
              whileInView={{ width: "auto" }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              Bloom Branding
            </motion.span>
          </motion.div>
          <motion.div className="h-[40%] flex flex-col ">
            <motion.span
              className="overflow-hidden whitespace-nowrap underline  text-[3vh] font-bold mt-4 text-gray-800 "
              initial={{ width: 0 }}
              whileInView={{ width: "auto" }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
            >
              Follow US On
            </motion.span>
            {props.socials != null
              ? props.socials.map((social, index) => (
                  <motion.a
                    href={social.url}
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    target="_blank"
                    rel="noreferrer"
                    className="flex"
                  >
                    <img
                      src={social.icon}
                      alt={social.name}
                      className="w-10 h-10  object-contain "
                    />
                  </motion.a>
                ))
              : socials.map((social, index) => (
                  <motion.a
                    href={social.url}
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center"
                  >
                    <img
                      src={social.logo}
                      alt={social.name}
                      className="w-15 h-15  object-contain"
                    />
                    <motion.span
                      className="h-15 text-8 "
                      style={{ marginLeft: 16, color: "white" }}
                    >
                      {social.name}
                    </motion.span>
                  </motion.a>
                ))}
          </motion.div>
        </div>
        <div
          className="w-[40%] h-full  flex flex-col  justify-center"
          style={{ padding: 16, alignItems: "end" }}
        >
          <motion.div
            className="w-full h-[70%]  flex items-center flex-col justify-center "
            style={{ borderRadius: 20, padding: 10 }}
            initial={{ border: "0px solid white" }}
            animate={{ border: "10px solid white" }}
            transition={{ ease: easeIn, duration: 1.5 }}
          >
            <TextPressure
              text="Blooming"
              fontFamily="Main Heading"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#ffffff"
              strokeColor="#ff0000"
              minFontSize={36}
            />
            <TextType
              text="In The Style"
              textColors={["white"]}
              className="overflow-hidden Heading"
              loop={false}
            />
          </motion.div>
          <button
            className="left-0 w-[50%] h-[10%] Button text-white mt-4 font-bold text-[2vh] "
            style={{ marginTop: 16 }}
          >
            Contact Us
          </button>
        </div>
        <div className="w-[30%] h-full bg-blue-200 grid grid-cols-2 gap-4 ">
          <div className="w-full  bg-gray-500"></div>
          <div className="w-full  bg-gray-600"></div>
          <div className="w-full bg-gray-700"></div>
          <div className="w-full bg-gray-800"></div>
        </div>
      </div>
      <div className="w-full min-h-[25%] max-h-[35%]  flex items-center justify-center">
        <img
          src="/BigLogo.png"
          className="w-[20%]  object-cover"
          style={{
            filter: " drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5))",
          }}
        ></img>
      </div>
      <div className="w-full  leading-normal h-[2%]  font-bold text-white flex justify-center items-center text-[2vh]">
        &copy; 2024 Bloom Branding. All rights reserved.
      </div>
    </motion.div>
  );
};

export default Footer;
