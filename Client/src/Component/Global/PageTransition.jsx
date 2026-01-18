import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function PageTransitionOverlay() {
  const location = useLocation();
  const previousPath = useRef(location.pathname);
  const [phase, setPhase] = useState("idle"); 
  // idle | exit | enter

  useEffect(() => {
    // skip home
    if (location.pathname === "/") {
      previousPath.current = location.pathname;
      return;
    }

    // EXIT animation
    setPhase("exit");

    const exitTimer = setTimeout(() => {
      // ENTER animation
      setPhase("enter");
      previousPath.current = location.pathname;
    }, 500);

    const clearTimer = setTimeout(() => {
      setPhase("idle");
    }, 1000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(clearTimer);
    };
  }, [location.pathname]);

  return (
    <motion.div
      animate={
        phase === "exit"
          ? { opacity: 1, scaleY: 1 }
          : phase === "enter"
          ? { opacity: 0, scaleY: 1 }
          : { opacity: 0, scaleY: 0 }
      }
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{ transformOrigin: "top" }}
      className="fixed inset-0 z-[9998] bg-black pointer-events-none"
    />
  );
}
