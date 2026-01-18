import React from 'react';
import { motion } from 'framer-motion';
import Color from '../Global/Color';
import TextType from '../Global/TextType';

const CrossingMarquees = ({ logos }) => {
  // Ensure the component handles null or empty logo props safely
  const marqueeData = logos || [];
  
  // Triplicating the data ensures a seamless, infinite loop on all screen sizes
  const duplicatedData = [...marqueeData, ...marqueeData, ...marqueeData];

  // Helper component for the diagonal ribbons
  const Ribbon = ({ direction, speed, rotate, yOffset, zIndex, color = 'white' }) => (
    <motion.div 
      initial={{ opacity: 0, scaleX: 1.2 }}
      whileInView={{ opacity: 1, scaleX: 1, rotate: rotate }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      /* STYLING FIX: 
         - h-24 (mobile) to h-52 (desktop) provides the "Safety Zone".
         - w-[200%] ensures diagonal edges never show on any screen.
      */
      className={`absolute ${yOffset} ${zIndex} flex items-center  justify-center h-16 md:h-25 w-[200%]  -left-[50%] shadow-2xl border-4 overflow-hidden`}
      style={{ backgroundColor: color,padding:0 ,borderColor:Color.ElectricBlue}} 
    >
      <motion.div
        className="flex items-center justify-center whitespace-nowrap  "
      
        animate={{ x: direction === 'left' ? ["0%", "-33.33%"] : ["-33.33%", "0%"] }}
        transition={{ ease: "linear", duration: speed, repeat: Infinity }}
      >
        {duplicatedData.map((item, index) => {
          // ALTERNATE SCALE LOGIC: Every second logo (odd index) scales to 1.2
          const isAlternate = index % 2 !== 0;
          const scaleValue = isAlternate ? 0.95 : 0.7;

          return (
            <div 
              key={`${item.id}-${index}`} 
              /* px-4 (mobile) to px-16 (desktop) for better spacing */
              className="flex items-center justify-center px-4 md:px-16 h-full overflow-hidden"
            >
              {/* TEXT: Neutralized rotation to stay level while ribbon tilts */}
              <span 
                className="text-2xl md:text-7xl font-black italic tracking-tighter text-black/80 select-none" 
                style={{ transform: `rotate(${-rotate}deg)` }}
              >
                {item.text}
              </span>
              
              {/* LOGO BADGE: 
                  - Mobile size: w-12 h-12 
                  - Desktop size: w-28 h-28 
              */}
              <div 
                className="mx-3 md:mx-10 w-12 h-12 md:w-20 md:h-20 rounded-full border-2 md:border-4 border-white shadow-xl bg-transparent flex items-center justify-center flex-shrink-0 transition-transform duration-500" 
                style={{ 
                  transform: `rotate(${-rotate}deg) scale(${scaleValue})` 
                }}
              >
                <motion.img 
                  src={item.badge} 
                  alt="Brand" 
                  className="w-7 h-7 md:w-12 md:h-12 object-contain" 
                />
              </div>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );

  return (
    /* SECTION HEIGHT: Adjusts from 400px (mobile) to 700px (desktop) 
       to accommodate the 'X' crossing reach.
    */
   <div  className='absolute left-0 z-50 h-[40vh] flex w-full  overflow-hidden justify-center items-center' >
      
    <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden bg-transparent"
    
    >
      
      {/* Ribbon 1: Tilting Downward */}
      <Ribbon 
        direction="left" 
        speed={25} 
        rotate={3} 
        yOffset="top-[20%] md:top-[25%]" 
        zIndex="z-10"
        color={Color.EarlGray}
      />

      {/* Glass-style gradient sweep */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/2 to-transparent z-30" />
    </section></div>
  );
};

export default CrossingMarquees;