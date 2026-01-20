import { IoSearch } from "react-icons/io5";
import { FaPerson } from "react-icons/fa6";
import { LuClock } from "react-icons/lu";
import { FaHandHoldingMedical } from "react-icons/fa";
import { MdOutlineLocalPharmacy } from "react-icons/md";
import Marquee from "react-fast-marquee";
import { IoIosMedical } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { MdOutlinePerson2 } from "react-icons/md";
import { motion } from 'framer-motion';

function LandingPage() {

    const speciality = [
        'Cardiology',
        'Neurology',
        'Gynecology',
        'Obstetrics',
        'Pediatrics',
        'Orthopedics',
        'Dermatology',
        'Psychiatry',
        'Oncology',
        'Radiology',
        'Anesthesiology',
        'Ophthalmology',
        'Otolaryngology (ENT)',
        'Urology',
        'Nephrology',
        'Gastroenterology',
        'Endocrinology',
        'Pulmonology',
        'Rheumatology',
        'General Surgery'
    ];

    return (
        <>
            <div className={`w-full h-auto flex flex-col justify-start items-center relative overflow-hidden`}>

                {/* hero section */}
                <div className={`w-full relative h-[60vh] lg:h-screen flex flex-col items-center overflow-hidden rounded-b-4xl`}>
                    <img src="/hero-portrait.png" className={`h-full w-full lg:hidden object-top`} />
                    <img src="/hero-landscape.jpg" className={`h-full w-full hidden lg:block object-top`} />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, ease: 'easeInOut' }} className={`w-full text-black text-lg lg:text-sm text-center absolute top-5 font-Lora`}>MediLab</motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                        className={`w-[80%] md:w-[60%] lg:w-[40%] absolute top-14 lg:top-12 h-px bg-linear-to-r from-transparent via-black to-transparent`}></motion.div>

                    <div className={`w-full bg-linear-to-r from-black to-white bg-clip-text text-transparent absolute top-[43%] md:top-[40%] -translate-y-1/2 flex flex-col justify-center items-center `}>
                        <motion.h1 className={`text-4xl md:text-6xl xl:text-7xl font-Seasons`}>YOUR HEALTH</motion.h1>
                        <motion.h1 className={`text-4xl md:text-6xl xl:text-7xl font-Seasons`}>OUR PRIORITY</motion.h1>
                    </div>

                    <div className={`w-full absolute bottom-10 flex flex-col justify-center items-center md:flex-row gap-2 md:gap-5`}>
                        <p className={`w-auto font-Telegraf text-[14px] flex justify-center items-center gap-2 px-4 py-2 text-black rounded-full bg-white/20 cursor-pointer`}>Enter profile <MdArrowOutward /></p>
                        <p className={`w-auto font-Telegraf text-[14px] flex justify-center items-center gap-2 px-4 py-1 text-white border-b border-b-white cursor-pointer`}>Create an account <MdOutlinePerson2 /></p>
                    </div>
                </div>

                {/* main section */}
                <div className={`w-full h-auto flex flex-col justify-start items-center pt-10`}>
                    <p className={`w-full font-Telegraf text-[12px] md:text-lg lg:text-[16px] text-center px-5 lg:px-10 text-black`}>Search from a wide range of experienced and qualified doctors across multiple speciality. Filter by name, speciality or gender
                        to find the perfect match for your healthcare needs.</p>

                    <div className={`w-[90%] md:w-[60%] lg:w-[40%] bg-gray-200 h-auto mt-5 md:mt-10 pt-1 rounded-full flex justify-between items-center relative`}>
                        <input type="text" className={`w-full outline-none rounded-full px-3 py-2 text-[12px] md:text-sm text-black font-Telegraf`} placeholder="Search by name" />
                        <span className={`p-2 text-white absolute right-1 top-1 cursor-pointer active:opacity-75 duration-200 ease-in-out rounded-full bg-[#E0A470]`}><IoSearch /></span>
                    </div>
                    <div className={`w-[90%] md:w-[60%] lg:w-[40%] mt-3 flex justify-between items-center gap-3`}>
                        <span className={`w-full cursor-pointer py-2 active:opacity-80 duration-200 ease-in-out flex justify-center items-center gap-2 text-white font-Telegraf bg-black rounded-full text-[12px]`}><FaPerson /> Gender</span>
                        <span className={`w-full cursor-pointer py-2 active:opacity-80 duration-200 ease-in-out flex justify-center items-center gap-2 text-white font-Telegraf bg-black rounded-full text-[12px]`}><FaHandHoldingMedical /> Speciality</span>
                    </div>
                </div>

                {/* what we offer */}
                <div className={`w-full flex flex-col justify-start items-center pt-10`}>
                    <h2 className={`w-full text-center font-Telegraf text-black text-3xl font-semibold`}>What we offer</h2>

                    <div className={`w-[90%] mt-5 grid grid-cols-1 md:grid-cols-3 justify-items-center gap-3`}>
                        <div className={`w-full cursor-default bg-[#E0A470] p-1 h-auto rounded-xl shadow-lg flex flex-col justify-center items-center`}>
                            <div className={`w-full rounded-xl bg-white/25 inset-shadow-xs inset-shadow-orange-500 flex justify-center items-center text-5xl p-5`}><LuClock /></div>
                            <p className={`w-full px-5 text-black text-center text-xl py-2 font-semibold`}>24/7 Availability</p>
                        </div>
                        <div className={`w-full cursor-default bg-[#E0A470] p-1 h-auto rounded-xl shadow-lg flex flex-col justify-center items-center`}>
                            <div className={`w-full rounded-xl bg-white/25 inset-shadow-xs inset-shadow-orange-500 flex justify-center items-center text-5xl p-5`}><MdOutlineLocalPharmacy /></div>
                            <p className={`w-full px-5 text-black text-center text-xl py-2 font-semibold`}>In-centre Pharmacy</p>
                        </div>
                        <div className={`w-full cursor-default bg-[#E0A470] p-1 h-auto rounded-xl shadow-lg flex flex-col justify-center items-center`}>
                            <div className={`w-full rounded-xl bg-white/25 inset-shadow-xs inset-shadow-orange-500 flex justify-center items-center text-5xl p-5`}><FaHandHoldingMedical /></div>
                            <p className={`w-full px-5 text-black text-center text-xl py-2 font-semibold`}>Personalised Support</p>
                        </div>
                    </div>
                </div>

                {/* speciality marquee */}
                <div className={`w-full h-auto py-10 md:py-14 relative flex flex-col justify-center items-center gap-5`}>
                    <div className={`w-[30%] z-20 h-full absolute bg-linear-to-r from-white to-transparent left-0`}></div>
                    <Marquee direction="left">
                        {speciality.map((item, index) => {
                            return <div className={`w-auto flex justify-center items-center gap-3`}>
                                <p key={index} className={`w-auto text-4xl font-Telegraf text-black`}>{item}</p>
                                <span className={`text-xl lg:text-2xl mr-3 text-orange-500`}><IoIosMedical /></span>
                            </div>
                        })}
                    </Marquee>
                    <Marquee direction="right">
                        {speciality.map((item, index) => {
                            return <div className={`w-auto flex justify-center items-center gap-3`}>
                                <p key={index} className={`w-auto text-4xl font-Telegraf text-black`}>{item}</p>
                                <span className={`text-xl lg:text-2xl mr-3 text-orange-500`}><IoIosMedical /></span>
                            </div>
                        })}
                    </Marquee>
                    <div className={`w-[30%] z-20 h-full absolute bg-linear-to-l from-white to-transparent right-0`}></div>
                </div>

                <div className={`w-full`}><img src="/doctor-hand.png" className={`h-full w-full`} /></div>

                {/* footer */}
                <div className={`w-full pt-5 md:pt-14 pb-10 mt-20 flex flex-col md:flex-row justify-center items-center relative h-auto bg-zinc-950 rounded-t-2xl`}>
                    <p className={`w-full text-lg text-white lg:text-sm text-center absolute top-5 font-Lora`}>MediLab</p>
                    <div className={`w-[80%] md:w-[60%] lg:w-[40%] absolute top-14 lg:top-12 h-px bg-linear-to-r from-transparent via-white to-transparent`}></div>

                    <div className={`w-full md:w-[40%] flex justify-center items-start mt-14 md:mt-5 px-5 gap-10 xl:gap-16`}>
                        <div className={`w-auto flex flex-col justify-start items-start pt-5`}>
                            <p className={`text-white font-semibold text-lg xl:text-2xl mb-3`}>General</p>
                            <p className={`text-gray-200 text-[12px] lg:text-sm cursor-pointer`}>About</p>
                            <p className={`text-gray-200 text-[12px] lg:text-sm cursor-pointer`}>Services</p>
                            <p className={`text-gray-200 text-[12px] lg:text-sm cursor-pointer`}>Login</p>
                            <p className={`text-gray-200 text-[12px] lg:text-sm cursor-pointer`}>Register</p>
                        </div>
                        <div className={`w-auto flex flex-col justify-start items-start pt-5`}>
                            <p className={`text-white font-semibold text-lg xl:text-2xl mb-3`}>Legal</p>
                            <p className={`text-gray-200 text-[12px] lg:text-sm cursor-pointer`}>Privacy</p>
                            <p className={`text-gray-200 text-[12px] lg:text-sm cursor-pointer`}>Terms</p>
                            <p className={`text-gray-200 text-[12px] lg:text-sm cursor-pointer`}>License</p>
                            <p className={`text-gray-200 text-[12px] lg:text-sm cursor-pointer`}>Contact</p>
                        </div>
                    </div>

                    {/* message form */}
                    <div className={`w-full md:w-[50%] xl:w-[40%] mt-7 md:mt-10 px-5 flex flex-col justify-start items-center gap-2`}>
                        <input type="text" className={`w-full px-3 py-2 rounded-full bg-zinc-800 outline-none font-Telegraf text-white text-[12px] lg:text-[14px]`} placeholder="Enter your name" />
                        <input type="text" className={`w-full px-3 py-2 rounded-full bg-zinc-800 outline-none font-Telegraf text-white text-[12px] lg:text-[14px]`} placeholder="Enter your query title" />
                        <textarea className={`w-full h-32 px-3 py-1 rounded-xl bg-zinc-800 outline-none font-Telegraf text-white text-[12px] lg:text-[14px]`} placeholder="Enter your message" />
                        <p className={`w-full rounded-full text-center text-black py-2 cursor-pointer active:opacity-80 duration-150 ease-in-out font-bold text-[12px] lg:text-sm bg-linear-to-r from-[#ecbd97] to-[#974e03]`}>Send</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage