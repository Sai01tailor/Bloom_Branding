import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="h-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
