import React from "react";
import Demo from "../Projects/Demo";
import Menu from "../Global/Menu";
import Footer from "../Global/Footer";
import Header from "../Global/Header";
import Color from "../Global/Color";

const HorizontalMenu = () => {
  const items = [
    "All",
    "Design",
    "Development",
    "Motion",
    "3D",
    "AI",
    "Games",
    "Branding",
    "UX/UI",
    "More",
  ];

  return (
    <div className="w-full bg-transparent py-4 " >
      <div
        className="
          flex justify-center gap-3 overflow-x-auto px-4
          scrollbar-hide
          snap-x snap-mandatory
        "
      >
        {items.map((item, i) => (
          <button
            key={i}
            className="
              snap-start shrink-0
              rounded-full border border-white/15
              h-[5vh]
              cursor-pointer
              px-5 py-2
              text-sm font-medium text-white
              backdrop-blur-md
              hover:bg-white hover:text-black
              transition
            "
            style={{marginTop:'10vh',marginBottom:'2vh',paddingInline:20}}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <div>
      <Header />
      <div style={{backgroundImage:`linear-gradient(to bottom, ${Color.DarkChoc}, ${Color.EarlGray})`,backgroundPosition:'fixed'}}>
        <HorizontalMenu />
        <Demo />
      </div>

      <Menu />
      <Footer />
    </div>
  );
};

export default Projects;
