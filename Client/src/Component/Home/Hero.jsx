import React from 'react'
import { motion, scale } from 'framer-motion'
const Hero = (props) => {
  return (
    <motion.div className='w-[100vw] h-[100vh] bg-gray-800 flex flex-col justify-center items-center  overflow-hidden'
        initial={{ opacity: 0,scale:0.9,borderRadius:'20px' }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5,ease:'easeInOut' }}
        whileInView={{scale:1,borderRadius:'0px',opacity:1,margin:0}}
        viewport={{amount :0.7}}
    >
        <div style={{filter:'grayscale(1)',width:'100%',height:"100%"}}>
        <video  autoPlay loop muted
            className='w-full h-full object-cover absolute top-0 left-0 z-5'
            src={props.video? props.video : 'https://cdn.pixabay.com/video/2021/04/15/71122-537102350_large.mp4'}
            style={{backdropFilter:'blur(10)'}}
        />
        </div>
        <motion.h1 className='text-white text-5xl md:text-7xl font-bold z-5 absolute  top-[20vh] underline decoration-5 decoration-[#7DF9FF] rounded overflow-hidden ' 
        initial={{ y: -250,opacity:0 }}
        animate={{ y: 0 , opacity: 1 }}
        transition={{ delay: 0.8, type: 'tween', stiffness: 120 }}
        
        >
        <span style={{color:"#7DF9FF"}}>
            {props.title? props.title : "Bloom".toUpperCase()[0]}
        </span>
 
            {props.title? "" : "BLoom".toUpperCase().slice(1)}
        </motion.h1>
        <motion.h1 className='text-white text-5xl md:text-7xl font-bold z-5 absolute  top-[20vh] underline decoration-5 decoration-[#7DF9FF] rounded  overflow-hidden  ' 
        initial={{ y: -250,opacity:0 }}
        animate={{ y: 100 , opacity: 1 }}
        transition={{ delay: 0.8, type: 'tween', stiffness: 120 }}
        
        >
        <span style={{color:"#7DF9FF"}}>
            {props.title? props.title : "Branding".toUpperCase()[0]}
        </span>
 
            {props.title? "" : "Branding".toUpperCase().slice(1)}
        </motion.h1>
        {/* <Button text={props.buttonText? props.buttonText : "Get Started"}  position="absolute bottom-[20vh] left-1/2 transform -translate-x-1/2"/> */}
     </motion.div>
  )
}

export default Hero