import { useState } from 'react';
import { motion } from 'framer-motion';

function Register() {
  return (
    <>
     <div className={`w-full min-h-screen bg-white flex justify-center items-center relative overflow-hidden`}>

       <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }} 
            className={`w-full text-black text-lg lg:text-sm text-center absolute top-5 font-Lora`}>MediLab</motion.p>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className={`w-[80%] md:w-[60%] lg:w-[40%] absolute top-14 lg:top-12 h-px bg-linear-to-r from-transparent via-black to-transparent`}></motion.div>

       <img src='/auth-page-bg.jpg' className={`h-1/2 absolute top-1/2 -translate-y-1/2 z-10`}/>
       
        <div className={`w-[95%] h-auto rounded-xl backdrop-blur-md flex flex-col justify-center items-center border border-orange-400 px-2 py-2`}>
          
        </div>
     </div>
    </>
  )
}


export default Register
