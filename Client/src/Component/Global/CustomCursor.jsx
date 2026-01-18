import React, { useState, useEffect } from "react";

const CustomCursor = ({ targetRef, imageUrl, width = 60, height = 60 }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    target.addEventListener("mousemove", onMouseMove);
    target.addEventListener("mouseenter", onMouseEnter);
    target.addEventListener("mouseleave", onMouseLeave);

    return () => {
      target.removeEventListener("mousemove", onMouseMove);
      target.removeEventListener("mouseenter", onMouseEnter);
      target.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [targetRef]);

  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        width: `${width}px`,
        height: `${height}px`,
        // The image is dynamic based on the hovered card
        backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
        backgroundColor: "#C5D193", // Fallback color so it's not invisible
        backgroundSize: "cover",
        backgroundPosition: "center",
        pointerEvents: "none",
        transform: "translate(-50%, -50%) scale(${imageUrl ? 1 : 0.2})", 
        zIndex: 9999,
        // Only show if mouse is in container AND an image is selected
        opacity: isHovering && imageUrl ? 1 : 0,
        transition: "opacity 0.3s ease, transform 0.3s ease",
        border: "2px solid white"
      }}
    />
  );
};

export default CustomCursor;