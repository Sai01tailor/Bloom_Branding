import React, { useRef } from "react";
import Headers from "../Global/Header";
import Footer from "../Global/Footer";
import Menu from "../Global/Menu";
import { motion, useScroll, useTransform } from "framer-motion";
import Parallax from "../Journey/Parallax";
import Silk from "../Journey/Background";
import transition from "../Global/PageTransition";

const events = [
  {
    date: "2020",
    title: "The Beginning",
    desc: "Started our journey with a small team.",
    img: 'https://cdn.naturettl.com/wp-content/uploads/2023/10/20173922/landscape-vs-portrait-orientation-8-534x800.jpg ',
  },
  {
    date: "2021",
    title: "First Milestone",
    desc: "Reached our first 100 clients globally.",
    img: 'https://cdn.naturettl.com/wp-content/uploads/2023/10/20173922/landscape-vs-portrait-orientation-8-534x800.jpg ',
  },
  {
    date: "2022",
    title: "Expansion",
    desc: "Opened new offices in London and Tokyo.",
    img: 'https://cdn.naturettl.com/wp-content/uploads/2023/10/20173922/landscape-vs-portrait-orientation-8-534x800.jpg ',
  },
  {
    date: "2023",
    title: "Innovation Award",
    desc: "Recognized for our sustainable tech solutions.",
    img: 'https://cdn.naturettl.com/wp-content/uploads/2023/10/20173922/landscape-vs-portrait-orientation-8-534x800.jpg ',
  },
  {
    date: "2024",
    title: "Series B",
    desc: "Secured funding to scale operations further.",
    img: 'https://cdn.naturettl.com/wp-content/uploads/2023/10/20173922/landscape-vs-portrait-orientation-8-534x800.jpg ',
  },
  {
    date: "2025",
    title: "Future Vision",
    desc: "Launching our AI-driven core platform.",
    img: 'https://cdn.naturettl.com/wp-content/uploads/2023/10/20173922/landscape-vs-portrait-orientation-8-534x800.jpg ',
  },
];

const Journey = () => {
  return (
    <>
      <Parallax  events={events}/>

      <Menu />
      <div className="absolute z-30">
      <Footer />
      </div>
    </>
  );
};

export default (Journey);
