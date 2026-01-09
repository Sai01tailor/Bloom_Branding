import React from 'react'
import {motion} from 'framer-motion'

const Header = () => {
  return (
    <motion.div className='h-[10vh] fixed z-40 bg-transparent w-screen flex ' style={{paddingLeft:50,paddingRight:50,justifyContent:'space-between',alignItems:'center'}}>
    <div className='h-full aspect-square'>
      <img src='/LogoSmall.png' className='h-full w-full object-cover'/>
    </div>
    <div className='h-[60%] w-[10vw] flex' style={{borderRadius:1000,border:"4px solid gray",alignItems:'center',justifyContent:'center'}}>
      <a href='#' className='SubHeading text-[1.5vw]' style={{justifyContent:'center',alignContent:'center'}} >Enquire Now</a>
    </div>
    </motion.div>
  )
}

export default Header