'use client';

import Image from "next/image";
import BallAnimation from "@/components/ball-animation";
import CountdownTimer from "@/components/countdown-timer";
import React, {Fragment, useRef} from "react";
import {useInView, motion} from "motion/react";
import Slider from "@/components/slider";

export default function Home() {
    const [daysLeft, setDaysLeft] = React.useState<number>(0);

    const parentRef = useRef<HTMLDivElement | null>(null);
    const childrenRef = useRef<HTMLDivElement | null>(null);
    const p1Ref = useRef<HTMLParagraphElement | null>(null);
    const p2Ref = useRef<HTMLParagraphElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const isInView = useInView(childrenRef, {once: true, margin: "-50px"})
    const p1InView = useInView(p1Ref, {once: true, margin: "-50px"});
    const p2InView = useInView(p2Ref, {once: true, margin: "-50px"});
    const buttonInView = useInView(buttonRef, {once: true, margin: "-50px"});

    return (
        <div className="container mx-auto px-4 lg:px-8">
            {/*Challenge 2*/}
            <Slider/>

            {/*Challenge 1*/}
            <motion.div
                ref={parentRef}
                className="lg:relative mx-auto max-w-xl lg:max-w-screen"
                initial={{y: 50, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.8, ease: "easeInOut"}}
            >
                <BallAnimation/>

                <Image
                    className="rounded-3xl rounded-b-none lg:rounded-3xl h-full max-h-72 lg:max-h-full object-cover object-top "
                    src="/golfer.jpg"
                    alt="golfer"
                    width={1824}
                    height={1081}
                />

                <motion.div
                    ref={childrenRef}
                    className="lg:absolute bottom-0 w-full lg:p-6 z-20"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{
                        hidden: {},
                        visible: {transition: {staggerChildren: 0.2}},
                    }}
                >
                    <motion.div
                        className="flex flex-col lg:flex-row justify-between px-6 lg:px-12 py-10 lg:py-11 rounded-3xl rounded-t-none lg:rounded-xl"
                        initial={{y: 50, opacity: 0}}
                        animate={isInView ? {y: 0, opacity: 1} : {}}
                        transition={{duration: 0.5, ease: "easeOut"}}
                        style={{
                            backgroundImage: `
                              radial-gradient(45% 120% at 50% 115%, #ffb76252 0%, #00000000 100%),
                              radial-gradient(85% 150% at 50% 120%, #4a00e9d4 0%, #00000000 100%),
                              linear-gradient(0deg, #000000, #000000)
                            `,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}
                    >

                        <div className="flex flex-col items-center lg:items-start justify-between text-white space-y-5">
                            <div>
                                <motion.p
                                    ref={p1Ref}
                                    initial={{opacity: 0, y: 50}}
                                    animate={p1InView ? {opacity: 1, y: 0} : {}}
                                    transition={{duration: 0.5, delay: 0.1}}
                                >
                                    September 22nd, 2025
                                </motion.p>
                                <motion.p
                                    ref={p2Ref}
                                    className="text-[2rem] lg:text-[2.75rem] font-semibold"
                                    initial={{opacity: 0, y: 50}}
                                    animate={p2InView ? {opacity: 1, y: 0} : {}}
                                    transition={{duration: 0.5, delay: 0.1}}
                                >
                                    Only {daysLeft} days left
                                </motion.p>
                            </div>
                            <div>
                                <motion.button
                                    ref={buttonRef}
                                    className="hidden lg:flex items-center border border-white hover:border-[#5542f4] rounded-[0.875rem] px-6 py-3.5 h-11 hover:bg-[#5542f4] hover:cursor-pointer transition-colors"
                                    initial={{opacity: 0, y: 50}}
                                    animate={buttonInView ? {opacity: 1, y: 0} : {}}
                                    transition={{duration: 0.5, delay: 0.1}}
                                >
                                    Buy Tickets
                                </motion.button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center text-white space-y-5">
                            <CountdownTimer setDaysLeft={setDaysLeft}/>
                            <button
                                className="flex lg:hidden items-center justify-center border border-white hover:border-[#5542f4] rounded-[0.875rem] px-6 py-3.5 h-11 hover:bg-[#5542f4] hover:cursor-pointer transition-colors w-full">
                                Buy Tickets
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {Array.from({length: 5}).map((_, index) => (
                <Fragment key={index}>
                    <Slider/>
                </Fragment>
            ))}
        </div>
    );
}
