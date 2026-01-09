import {
  motion,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  useSpring,
  AnimatePresence,
} from "motion/react"
import React, { useState } from "react"
import Home from "../Pages/Home"
import Journey from "../Pages/Journey"
import Contact from "../Pages/Contact"
import { Link } from "react-router-dom"
import { useMenu } from "./MenuProvider"

const menuItems = [
  { id: 1, title: "Home", img: "https://picsum.photos/400/300?random=5" },
  { id: 2, title: "Projects", img: "https://picsum.photos/400/300?random=1" },
  { id: 3, title: "Services", img: "https://picsum.photos/400/300?random=2" },
  { id: 4, title: "Journey", img: "https://picsum.photos/400/300?random=3" },
  { id: 5, title: "Contact", img: "https://picsum.photos/400/300?random=5" }
]

// Animation Variants for the staggered reveal
const containerVariants = {
  open: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4, // Wait for panel to start opening
    },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    y: 100,
    opacity: 0,
    transition: { duration: 0.4, ease: "easeIn" },
  },
}

const MenuItem = ({ title, img }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      variants={itemVariants}
      className="relative w-full border-b border-black/10 overflow-hidden cursor-pointer flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ height: "14vh" }}
      animate={{
        backgroundColor: isHovered ? "#000" : "rgba(255,255,255,0)",
      }}
      transition={{ duration: 0.35 }}
    >
      <div className="relative flex items-center justify-center w-full h-full px-10">
        

        <motion.h2
          className="heading text-5xl md:text-7xl font-bold uppercase z-10 tracking-tighter overflow-hidden"
          animate={{ color: isHovered ? "#fff" : "#000" }}
        >
          {title}
        </motion.h2>
      </div>
    </motion.div>
  )
}

const Menu = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768)

React.useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768)
    console.log(isMobile)
  }

  window.addEventListener("resize", handleResize)
  return () => window.removeEventListener("resize", handleResize)
}, [])
  const { menuStatus,setMenuStatus } = useMenu()
  const mouseX = useMotionValue(window.innerWidth)
  const mouseY = useMotionValue(window.innerHeight / 2)

  const smoothX = useSpring(mouseX, { stiffness: 400, damping: 35 })
  const smoothY = useSpring(mouseY, { stiffness: 400, damping: 35 })

  const pullX = useTransform(smoothX, (x) => {
    const dist = window.innerWidth - x
    return Math.max(Math.min(dist * 0.15, 80), 0)
  })

  const curveY = useTransform(smoothY, (y) => {
    const ratio = y / window.innerHeight
    return Math.min(Math.max(ratio * 1000, 120), 880)
  })
  const pathVariants = {
  hidden: { 
    d: "M 0 0 L 0 0", // An 'empty' or starting path
    transition: { duration: 0.8, ease: "easeInOut" }
  },
  visible: { 
    d: "M 10 10 L 90 90", // Your target path 'a'
    transition: { duration: 0.8, ease: "easeInOut" }
  }
};
const smoothPath = useMotionTemplate`
  M 100 0 Q ${
    menuStatus || !isMobile ? pullX : 0
  } ${
    menuStatus || !isMobile ? curveY : 500
  } 100 1000
`

  return (
    <motion.div
      className="fixed top-0 right-0 h-screen flex z-50 pointer-events-none"
      onPointerMove={(e) => {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
      }}
    >
      {/* PRELOAD IMAGES (Invisible) */}
      

      <motion.svg
        className="h-full w-[100px] pointer-events-auto"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
      >
        <motion.path
        id="path"
          d={smoothPath}
          fill="white"
          stroke="black"
          strokeWidth={1.5}
          initial={{ pathLength: 1 }}
          onClick={() => setMenuStatus(!menuStatus)}
          className="cursor-pointer"
          transition={{duration:0.5}}
        />
      </motion.svg>

      <motion.div
        className="h-full bg-white relative pointer-events-auto shadow-2xl"
        
        initial={{ width: 0 }}
        animate={{ width: menuStatus ? "100vw" : 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          className="absolute top-10 right-10 heading text-xl cursor-pointer z-50 mix-blend-difference text-white"
          onClick={() => setMenuStatus(false)}
        >
          CLOSE
        </motion.div>

        {/* This container handles the "hide until in viewport" and stagger reveal */}
        <motion.div
          className="flex flex-col justify-center h-full w-full overflow-hidden"
          variants={containerVariants}
          initial="closed"
          animate={menuStatus ? "open" : "closed"}
        >
          {menuItems.map((item) => (
            <Link to={'/'+item.title.toString().toLowerCase()}>
            <MenuItem key={item.id} title={item.title}  />
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Menu