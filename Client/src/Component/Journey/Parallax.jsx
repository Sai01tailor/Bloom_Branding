import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import Silk from "./Background";
import Color from "../Global/Color";

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}
const a = Color.ButterYellow;
function Image({ id, image, description,date,title }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="img-container  ">
      <motion.p className="w-[30%] h-[30%]  absolute z-5 opacity-0.8 "
      style={{backgroundColor:Color.ElectricBlue,color:Color.ButterYellow,padding:16,fontSize:'1.2rem',boxShadow:'2px 2px 10px black'}}
      >
        {description}
      </motion.p>
      <div ref={ref} className="relative " style={{borderRadius:20,boxShadow:'2px 2px 10px black'}} >
        <img src={image} alt="Cityscape" style={{objectFit:'fill'}} />
      </div>
      <motion.h2 style={{ y }}>
        <i>{`#${date}`}</i>
        <br/><i>{`#${title}`}</i>
      </motion.h2>
    </section>
  );
}

export default function Parallax(props) {
  const { scrollYProgress } = useScroll();
  const { events } = props;
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* 🔹 FIXED BACKGROUND */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Silk
          speed={5}
          scale={1.2}
          color={a}
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* 🔹 SCROLLING CONTENT */}
      <div id="example" className="relative overflow-hidden">
        {events?.map((event, i) => (
          <Image
            key={i}
            id={i}
            image={event.img}
            title={event.title}
            date={event.date}
            description={event.desc}
          />
        ))}

        <motion.div className="progress z-20" style={{ scaleY }} />
        <motion.div className="pback fixed z-10" />
        <StyleSheet />
      </div>
    </>
  );
}

/* ================= STYLES ================= */

function StyleSheet() {
  return (
    <style>{`
      html {
        scroll-snap-type: y mandatory;
      }

      .img-container {
        height: 100vh;
        scroll-snap-align: start;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      .img-container > div {
        width: 500px;
        height: 600px;
        background: red;
        overflow: hidden;
      }

      .img-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .img-container h2{
        position: absolute;
        color: #8df0cc;
        font-family: "Azeret Mono", monospace;
        font-size: 50px;
        font-weight: 700;
        top: 50%;
        left: calc(60% + 120px);
        transform: translateY(-50%);
      }
      .img-container p{
        left:50px;
        bottom:20%
        
      }
      .progress {
        position: fixed;
        left: 40px;
        top: 0;
        width: 6px;
        height: 100vh;
        background: #8df0cc;
        transform-origin: top;
      }

      .pback {
        left: 40px;
        top: 0;
        width: 5px;
        height: 100vh;
        background: gray;
      }

      @media (max-width: 500px) {
        .img-container > div {
          width: 200px;
          height: 150px;
        }

        .img-container h2 {
          left: 20%;
        }

        .progress,
        .pback {
          left: 20px;
        }
      }
    `}</style>
  );
}
