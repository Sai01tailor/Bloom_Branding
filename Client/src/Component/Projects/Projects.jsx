import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const ParallaxScroll = ({ images, className = "" }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(images.length / 3);

  const col1 = images.slice(0, third);
  const col2 = images.slice(third, third * 2);
  const col3 = images.slice(third * 2);

  const ImageItem = ({ src, y }) => (
    <div className="relative h-100 w-full overflow-hidden rounded-lg bg-red-500">
      <motion.img
        src={src}
        style={{ y }}
        className="absolute inset-0 h-full w-full object-cover"
        alt="parallax"
      />
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`h-[100vh] w-full bg-black relative  overflow-y-auto ${className}`}
    >
      <div className="  mx-auto grid grid-cols-1 gap-10  py-40 md:grid-cols-2 lg:grid-cols-5" >
        <div className="grid gap-10">
          {col2.map((src, i) => (
            <ImageItem key={i} src={src} y={y2} />
          ))}
        </div>
        <div className="grid gap-10">
          {col1.map((src, i) => (
            <ImageItem key={i} src={src} y={y1} />
          ))}
        </div>

        <div className="grid gap-10">
          {col2.map((src, i) => (
            <ImageItem key={i} src={src} y={y2} />
          ))}
        </div>

        <div className="grid gap-10">
          {col1.map((src, i) => (
            <ImageItem key={i} src={src} y={y1} />
          ))}
        </div>
       
        <div className="grid gap-10">
          {col2.map((src, i) => (
            <ImageItem key={i} src={src} y={y2} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParallaxScroll;
