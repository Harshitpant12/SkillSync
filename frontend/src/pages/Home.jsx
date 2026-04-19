import React from 'react'
import { motion } from "framer-motion";
import { Link } from 'react-router-dom'
import myVideo from '../assets/hero-bg.mp4';
import { MoveUpRightIcon } from "lucide-react"

function Home() {
  return (
    <>
        <nav>
            {/* nav comes here */}
        </nav>
        <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gray-900">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
                >
                    <source src={myVideo} type="video/mp4" />
                </video>

                <div className="absolute bottom-0 left-0 w-full h-[65%] bg-linear-to-t from-black via-black/70 to-transparent md:h-full md:bg-none z-10"></div>
                

                <div className='absolute z-20 w-full px-6 bottom-20 flex flex-col items-center text-center md:block md:w-auto md:px-0 md:text-left md:max-w-4xl md:mx-auto md:left-40 md:bottom-40'>
                    <motion.h1
                    initial={{opacity: 0, y: 40}}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className='text-white text-4xl md:text-7xl my-4'>Beat the ATS. <br /> Land the interview</motion.h1>
                    <Link to='/register' className='inline-block rounded-4xl text-xl bg-white hover:bg-white/80 text-black px-6 py-5 mt-6 md:mt-10'>
                        Start Free Analysis
                    </Link>
                </div>

        </div>

        <div>
            I am another section
        </div>

    </>
  )
}

export default Home