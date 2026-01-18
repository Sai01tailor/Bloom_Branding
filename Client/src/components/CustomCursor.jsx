import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      if (!cursorRef.current) return;

      cursorRef.current.style.transform =
        `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="
        fixed top-0 left-0
        w-5 h-5
        rounded-full
        bg-black
        pointer-events-none
        z-[99999]
      "
    />
  );
};

export default CustomCursor;
