import React from "react";
import Demo from "../Projects/Demo";
import Menu from "../Global/Menu";
import Footer from "../Global/Footer";
import Header from "../Global/Header";

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
    <div className="w-full bg-black py-4">
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
              w-[5vw]
              px-5 py-2
              text-sm font-medium text-white
              backdrop-blur-md
              hover:bg-white hover:text-black
              transition
            "
            style={{marginTop:'10vh',marginBottom:'2vh'}}
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
      <div>
        <HorizontalMenu />
        <Demo />
      </div>

      <Menu />
      <Footer />
    </div>
  );
};

export default Projects;
