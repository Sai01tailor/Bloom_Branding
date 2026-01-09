import React from 'react'
import {motion} from 'framer-motion'

const Header = () => {
  return (
    <motion.div className='h-[10vh] fixed z-40 bg-transparent w-screen flex flex-row-reverse ' style={{paddingLeft:30,paddingRight:30,justifyContent:'space-between',alignItems:'center'}}>
    <div className='h-[60%] md:hidden w-[10vw] flex' style={{borderRadius:1000,border:"4px solid gray",alignItems:'center',justifyContent:'center'}}>
      <a href='#' className='SubHeading md:text-[1.5vw] ' style={{justifyContent:'center',alignContent:'center'}} >=</a>
    </div>
    <div className='h-full aspect-square absolute z-50 md:left-0 md:right-auto left-0 right-0' style={{marginInline:'auto'}}>
      <img src='/LogoSmall.png' className='h-full w-full object-cover'/>
    </div>
    <div className='h-[60%] md:w-[10vw] w-[30vw] flex' style={{borderRadius:1000,border:"4px solid gray",alignItems:'center',justifyContent:'center'}}>
      <a href='#' className='SubHeading md:text-[1.5vw] ' style={{justifyContent:'center',alignContent:'center'}} >Enquire Now</a>
    </div>
    </motion.div>
  )
}

export default Header