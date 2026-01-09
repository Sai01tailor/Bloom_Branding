import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxColumnGrid = ({ images = [] }) => {
  const sectionRef = useRef(null);
  images = [...images,...images,...images]
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // column parallax values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const cols = [[], [], [], [], []];
  images.forEach((img, i) => {
    cols[i % 5].push(img);
  });

  const colYs = [y1, y2, y3, y4, y5];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black py-40"
    >
      <div className="mx-auto grid grid-cols-1 gap-10 
                      sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {cols.map((col, colIndex) => (
          <motion.div
            key={colIndex}
            style={{ y: colYs[colIndex] }}
            className="flex flex-col gap-10"
          >
            {col.map((src, i) => (
              <div
                key={i}
                className="relative h-[420px] w-full overflow-hidden rounded-xl"
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ParallaxColumnGrid;
