import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ModernArrowButton = () => {
  return (
    <motion.button
      initial="initial"
      whileHover="animate"
      className="group relative flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-600 bg-transparent text-blue-600 overflow-hidden"
    >
      {/* Background fill effect on hover */}
      <motion.div
        variants={{
          initial: { y: "100%" },
          animate: { y: 0 }
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 bg-blue-600"
      />

      {/* The Arrow Icon */}
      <motion.div
        variants={{
          initial: { x: 0, color: "#2563eb" }, // blue-600
          animate: { x: 3, color: "#ffffff" }
        }}
        className="relative z-1"
      >
        <ArrowRight size={24} strokeWidth={2.5} />
      </motion.div>
    </motion.button>
  );
};

export default ModernArrowButton;