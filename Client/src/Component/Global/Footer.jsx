import React, { useState, useRef } from "react";
import { motion, animate, easeIn } from "framer-motion";
import TextPressure from "./PressureText";
import TextType from "./TextType";
import { Link } from "react-router-dom";
import Contact from "../Pages/Contact";
import Colors from "./Color";
import Color from "./Color";

/* ---------------- ACCORDION ITEM (MOBILE) ---------------- */

const FooterItem = ({ title, links, a = [] }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-white font-semibold"
      >
        {title}
        <span
          className={`text-xl transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{
          maxHeight: open ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
      >
        <ul className="pb-4 space-y-2 text-sm text-gray-400">
          {links.map((item, i) => (
            <li key={i} className="hover:text-white transition cursor-pointer">
              <Link to={a[i]}> {item}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/* ---------------- MOBILE FOOTER ---------------- */

const MobileFooter = () => (
  <footer
    className="md:hidden min-h-[40vh]  px-6 py-8 space-y-6"
    style={{
      paddingTop: "3vh",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingLeft: 16,
      paddingRight: 16,
      backgroundColor:Colors.ElectricBlue
    }}
  >
    {/* Services Accordion */}
    <FooterItem
      title="Services"
      links={["Branding", "UI / UX", "Marketing", "SEO"]}
    />

    {/* Pages Accordion */}
    <FooterItem title="Pages" links={["Home", "About", "Projects", "Blog"]} />
    <FooterItem title="Follow US" links={["Instagram", "Facebook", "X"]} />

    {/* Contact Us (DIRECT LINK) */}
    <div>
      <h3 className="text-white font-semibold mb-2">Contact Us</h3>
      <a
        href="/contact"
        className="text-sm text-gray-400 hover:text-white transition"
      >
        hello@bloombranding.com
      </a>
    </div>
    <div className="flex justify-center items-center">
      <img src="/BigLogo.png" className="h-[20vh] object-cover" />
    </div>
    <div className="text-center text-white font-bold text-sm mt-4">
      © 2024 Bloom Branding. All rights reserved.
    </div>
  </footer>
);

/* ---------------- DESKTOP FOOTER ---------------- */

const Footer = ({ socials }) => {
  return (
    <>
      <MobileFooter />

      <motion.div
        className="hidden md:block w-screen  h-[80vh] p-4 "
        style={{
          backgroundColor:Colors.ElectricBlue,
          paddingInline:'1vw'
        }} 
        onViewportEnter={() => {
          const el = document.getElementById("path");
          el && animate(el, { pathLength: 0, x: "10vw" }, { duration: 0.8 });
        }}
        onViewportLeave={() => {
          const el = document.getElementById("path");
          el && animate(el, { pathLength: 1, x: 0 }, { duration: 0.8 });
        }}
      >
        <div className="flex h-[95%] w-full  justify-between items-center px-6">
          {/* LEFT — 20% */}
          <div
            className="w-[20%] h-full flex flex-col justify-between "
            style={{ paddingBlock: 64 }}
          >
            <div className="flex flex-col items-center">
              <img src="/BigLogo.png" className="w-1/2 object-contain" />
              <span className="text-2xl font-bold underline mt-4">
                Bloom Branding
              </span>
            </div>

            <div>
              <span className="text-xl font-bold underline">Follow Us</span>
              <div className="mt-4 space-y-3">
                {socials?.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noreferrer">
                    <img
                      src={s.logo}
                      className="w-8 h-8 grayscale hover:grayscale-0 transition"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER — 40% */}
          <div className="w-[40%] h-full flex flex-col justify-center">
            <motion.div
              className="border-8 h-[50%]  rounded-2xl p-6 flex flex-col items-center justify-center"
              style={{borderColor:Colors.EarlGray,paddingInline:32,backgroundColor:Colors.ButterYellow}}
              transition={{ ease: easeIn, duration: 1.5 }}
            >
              <TextPressure
                text="Blooming"
                textColor={Colors.EarlGray}
                
                minFontSize={36}
              />
              <TextType text="In The Style" textColors={[Colors.EarlGray]} />
            </motion.div>

            <button
              className="mt-6 w-1/2 Button h-12 text-white font-bolder rounded-xl"
              style={{ margin: 16,borderColor:Colors.ButterYellow,color:Colors.ButterYellow }}
            >
              Contact Us
            </button>
          </div>

          {/* RIGHT COLUMN — DESKTOP */}
          <div className="w-[30%] h-full flex flex-col justify-center gap-6">
            {/* Top Row */}
            <div className="flex gap-6 h-[35%]">
              {/* Services */}
              <div className="flex-1 border-4 rounded-2xl flex flex-col items-center justify-center text-center p-6" style={{
backgroundColor:Colors.ButterYellow,borderColor:Colors.EarlGray}}>
                <h3 className="text-white font-bold text-lg mb-4">Services</h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className={`hover:text-white  text-${Colors.ElectricBlue} cursor-pointer`}>Branding</li>
                  <li className={`hover:text-white  text-${Colors.ElectricBlue} cursor-pointer`}>UI / UX</li>
                  <li className={`hover:text-white  text-${Colors.ElectricBlue} cursor-pointer`}>Marketing</li>
                  <li className={`hover:text-white  text-${Colors.ElectricBlue} cursor-pointer`}>SEO</li>
                </ul>
              </div>

              {/* Pages */}
              <div className="flex-1 border-4 bg-gray-600 rounded-2xl flex flex-col items-center justify-center text-center p-6" style={{
backgroundColor:Colors.ButterYellow,borderColor:Colors.EarlGray}}>
                <h3 className="text-white font-bold text-lg mb-4">Pages</h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className={`hover:text-white  text-${Colors.ElectricBlue} cursor-pointer`}>Home</li>
                  <li className={`hover:text-white  text-${Colors.ElectricBlue} cursor-pointer`}>About</li>
                  <li className={`hover:text-white  text-${Colors.ElectricBlue} cursor-pointer`}>Projects</li>
                  <li className={`hover:text-white  text-${Colors.ElectricBlue} cursor-pointer`}>Blog</li>
                </ul>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="h-[25%] bg-gray-700 border-4 rounded-2xl flex flex-col items-center justify-center text-center p-6" style={{
backgroundColor:Colors.ButterYellow,borderColor:Colors.EarlGray}}>
              <h3 className="text-white font-bold text-lg mb-3">Contact Us</h3>
              <p className="text-sm text-white/80">hello@bloombranding.com</p>
              <p className="text-sm text-white/80 mt-1">+91 98765 43210</p>
              <Link to={'/contact'}>Enquire Now </Link>
            </div>
          </div>
        </div>

        <div className="text-center  text-white font-bold text-m mt-4 ">
          © 2024 Bloom Branding. All rights reserved.
        </div>
      </motion.div>
    </>
  );
};

export default Footer;
