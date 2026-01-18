import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Menu from "../Global/Menu";
import Footer from "../Global/Footer";
import Color from "../Global/Color";
import Header from "../Global/Header";
gsap.registerPlugin(ScrollTrigger);

const Journey = () => {
  const [events, setEvents] = useState([]);
  const horizontalRef = useRef(null);
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  
  const fetchJourneyData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/homepage");
      setEvents(response.data?.data?.story || FALLBACK_EVENTS);
    } catch (e) {
      setEvents(FALLBACK_EVENTS);
    }
  };

  useEffect(() => {
    fetchJourneyData();
  }, []);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Horizontal Content Slide
      gsap.to(horizontalRef.current, {
        xPercent: -100,
        x: "100vw",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${horizontalRef.current.offsetWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Parallax effect for background years
      gsap.utils.toArray(".bg-year").forEach((year) => {
        gsap.to(year, {
          x: -150,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            scrub: true,
          },
        });
      });
    });

    return () => mm.revert();
  }, [events]);

  return (
    <div 
      style={{ backgroundColor: Color.EarlGray, color: Color.DarkChoc }} 
      className={`min-h-screen font-serif selection:bg-[#2E5BFF] selection:text-white overflow-x-hidden`}
    >
      <Menu />
      <Header/>

      {/* --- PREMIUM HERO: MASTHEAD --- */}
      <section ref={heroRef} className="h-[80vh] flex flex-col justify-center px-6 md:px-12 border-b-[12px] " style={{borderColor:Color.DarkChoc}}>
        <div className="flex justify-between uppercase font-sans font-bold text-[10px] md:text-xs tracking-[0.4em] mb-12 text-[#4A4E52]">
          <span>Archive Edition No. 001</span>
          <span>EST. 2020</span>
        </div>

        <div className="text-center ">
          <h1 className="text-[12vw] leading-[0.75] font-black uppercase tracking-tighter italic overflow-hidden" >
            THE <br /> <span style={{ color: Color.DarkChoc }}>Blooming Journey</span>
          </h1>
          <div className="w-full h-[4px]  mt-8 mb-4" style={{backgroundColor:Color.DarkChoc}}></div>
          <div className="flex justify-between  font-sans font-black uppercase text-xs md:text-xl tracking-tighter">
            <span>Special Report</span>
            <span style={{ color: Color.ElectricBlue }}>●</span>
            <span>The History of Innovation</span>
            <span style={{ color: Color.ElectricBlue }}>●</span>
            <span>{new Date().getFullYear()} Edition</span>
          </div>
          <div className="w-full h-[2px] " style={{backgroundColor:Color.DarkChoc}}></div>
        </div>
      </section>

      {/* --- HORIZONTAL JOURNEY: FLOATING LAYOUT --- */}
      <div ref={containerRef} className="relative">
        <div 
          ref={horizontalRef} 
          className="flex flex-col lg:flex-row h-auto lg:h-screen items-start lg:items-center px-6 lg:px-[5vw] gap-0"
          style={{ width: "max-content", minWidth: "100%" }}
        >
          {events.map((event, index) => (
            <article 
              key={index} 
              className="w-full lg:w-[900px] py-20 lg:py-0 h-auto lg:h-[85vh] flex-shrink-0 border-b-2 lg:border-b-0 lg:border-l border-[#2D1B10]/20 px-8 lg:px-24 flex flex-col justify-center relative group"
            >
              {/* PARALLAX BACKGROUND YEAR */}
              <div className="bg-year absolute top-[10%] right-0 lg:right-[-100px] z-0 pointer-events-none select-none overflow-hidden">
                <span className="text-[13rem] lg:text-[25rem] font-black opacity-[0.04] leading-none">
                  {event.date}
                </span>
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-end gap-12">
                
                {/* COLUMN 1: IMAGE (NO CARD) */}
                <div className="w-full lg:w-1/2">
                   <div className="relative border-b-4  pb-4" style={{borderColor:Color.DarkChoc}}>
                      <img 
                        src={event.img} 
                        alt={event.title} 
                        className="w-full h-[400px] object-cover grayscale contrast-125 brightness-105 group-hover:grayscale-0 transition-all duration-1000" 
                      />
                      <div className="absolute top-4 left-4 text-white font-sans text-[10px] font-bold px-2 py-1 uppercase tracking-widest" style={{backgroundColor:Color.DarkChoc,color:Color.ButterYellow}}>
                        Document {index + 1}
                      </div>
                   </div>
                </div>

                {/* COLUMN 2: TYPOGRAPHY */}
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-black italic underline decoration-4 "style={{textDecorationColor:Color.ElectricBlue,color:Color.DarkChoc}}>
                       {event.date}
                    </span>
                    <div className="h-[2px] flex-1 " style={{backgroundColor:Color.DarkChoc,opacity:0.5}}></div>
                  </div>

                  <h2 className="text-5xl lg:text-7xl overflow-hidden  font-black leading-[0.85] uppercase tracking-tighter mb-8 group-hover:italic transition-all duration-500" style={{fontFamily:'Sub Heading',color:Color.ButterYellow}}>
                    {event.title}
                  </h2>

                  <div className="max-w-md">
                    <p className="font-sans text-base lg:text-lg leading-relaxed text-justify " style={{color:Color.ElectricBlue,fontFamily:'Para'}} >
                      <span className="text-7xl float-left mr-3 leading-[0.7] font-black overflow-hidden items-center " style={{ color: Color.DarkChoc }}>
                        {event.desc.charAt(0)}
                      </span>
                      {event.desc.slice(1)}
                    </p>
                  </div>
                </div>

              </div>
              
              {/* PAGE NUMBER FOOTER */}
              <div className="absolute bottom-10 left-24 font-sans font-bold text-[10px] uppercase tracking-[0.5em] opacity-30">
                event No. {index + 1} / Page {index + 2}
              </div>
            </article>
          ))}
          
          {/* FINAL EDITORIAL SECTION */}
          <div className="w-full lg:w-[600px] px-24 flex flex-col justify-center border-l-8 h-full py-20 lg:py-00 hover:italic" style={{borderColor:Color.DarkChoc}}>
            <h3 className="text-8xl font-black  leading-none uppercase mb-4 overflow-hidden " style={{letterSpacing:0,fontFamily:'Sub Heading'}}>FINAL</h3>
            <p className="font-sans font-bold uppercase tracking-widest text-xs " style={{color:Color.ElectricBlue}}>End of the Chronicle</p>
          </div>
        </div>
      </div>

      <div className="relative z-30">
        <Footer />
      </div>

      <style jsx global>{`
        body {
          background-color: ${Color.EarlGray};
          background-image: url("https://www.transparenttextures.com/patterns/handmade-paper.png");
         overflow:auto!important
        }
      `}</style>
    </div>
  );
};

const FALLBACK_EVENTS = [
  {
    date: "2020",
    title: "THE GREAT GENESIS",
    desc: "A bold leap into the unknown. We redefined the digital core by stripping away the excess and focusing on the raw power of intuitive architecture. Our foundation was built on logic, but driven by human pulse.",
    img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    date: "2025",
    title: "SENTIENT SYSTEMS",
    desc: "The future is no longer a destination; it is the platform. Our AI-driven core now breathes with the user, predicting needs before they arise and crafting experiences in real-time.",
    img: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1000',
  }
];

export default Journey;