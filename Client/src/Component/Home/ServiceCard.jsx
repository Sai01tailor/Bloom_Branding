import React from 'react'
import { motion, scale } from 'framer-motion'
const ServiceCard = (props) => {
    const constraintsRef = React.useRef(null);
  return (
    <div ref={constraintsRef} className='w-screen h-[98vh] flex justify-center items-center bg-gray-100'>
    <motion.div 
    drag 
    dragConstraints={constraintsRef}
    dragElastic={0.2}
    className='w-100 h-30   bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center relative border-2 border-gray-300'
    
    >
        {(props.imgsrc) ? <img src={props.imgsrc} alt="Service" className='w-20 h-20 mx-auto' /> : null}
        <h1 className='absolute top-4 left-4 text-3xl font-bold text-left mt-4'>Our Services</h1>
        <p className='absolute bottom-4 left-4 text-center mt-2 text-gray-600'>We offer a wide range of services to meet your needs.</p>
    </motion.div>
    </div>
  )
}

export default ServiceCard