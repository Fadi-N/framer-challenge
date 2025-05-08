import React, {Fragment, useState} from 'react';
import Image from "next/image";
import {slides, tabNames} from "@/data/data-slides";
import {AnimatePresence, motion} from "motion/react";


const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);
    const [previousSlide, setPreviousSlide] = useState(0);

    const handleSlideChange = (newIndex: number) => {
        if (newIndex === currentSlide) return;

        setDirection(newIndex > currentSlide ? 1 : -1);
        setPreviousSlide(currentSlide);
        setCurrentSlide(newIndex);
    }

    const handleDragEnd = (e: any, info: any) => {
        if (info.offset.x < -100 && currentSlide < slides.length - 1) {
            handleSlideChange(currentSlide + 1);
        } else {
            handleSlideChange(currentSlide - 1);
        }
    }

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
            scale: 0.85,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 40,
            }
        },
        exit: (direction: number) => ({
            x: direction > 0 ? "-100%" : "100%",
            opacity: 0,
            scale: 0.85,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 40,
            }
        })
    }

    return (
        <div
            className="flex justify-between relative bg-white rounded-3xl px-6 py-8 lg:py-10 lg:pl-24 lg:pr-10 my-20 max-h-[34.75rem] lg:h-[29rem] xl:h-[26.5rem]">
            <div className="flex flex-col absolute start-12 top-0 justify-center h-full">
                {Array.from({length: 4}).map((_, index) => (
                    <div
                        key={index}
                        className="relative grid cursor-pointer place-content-center py-3"
                        onClick={() => handleSlideChange(index)}
                    >
                        <span className="size-1 rounded-full bg-black transition-transform"/>

                        <AnimatePresence>
                            {currentSlide === index && (
                                <motion.div
                                    key={`ball-${index}`}
                                    initial={{scale: 0.5, rotate: 0, opacity: 0}}
                                    animate={{scale: 1, rotate: 90, opacity: 1}}
                                    exit={{scale: 0, rotate: -180, opacity: 0}}
                                    transition={{duration: 0.5, ease: 'easeInOut'}}
                                    className="absolute left-1/2 top-1/2 size-7 transform -translate-x-1/2 -translate-y-1/2 will-change-transform"
                                >
                                    <Image
                                        src="/ball-tiny.webp"
                                        alt=""
                                        width={80}
                                        height={80}
                                        className="object-contain"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
            <div className="flex-1 flex relative overflow-hidden">
                <AnimatePresence custom={direction} initial={false}>
                    <motion.div
                        key={`previous-${previousSlide}`}
                        className="flex-1 flex absolute  top-0 left-0 w-full h-full"
                        custom={direction}
                        variants={slideVariants}
                        initial="center"
                        animate="exit"
                        exit="exit"
                    >
                        <div className="flex-1 flex flex-col pb-10 justify-evenly">
                            <h3 className="text-3xl">{slides[previousSlide].title}</h3>
                            <p className="text-ld max-w-[40ch]">{slides[previousSlide].description}</p>
                        </div>
                        <div className="flex-1">
                            <div className="flex-1 relative h-full">
                                <Image
                                    className="rounded-xl object-cover"
                                    src={slides[previousSlide].image}
                                    alt="golfer"
                                    fill
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        key={`current-${currentSlide}`}
                        className="flex-1 flex absolute top-0 left-0 w-full h-full"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        drag="x"
                        dragConstraints={{left: 0, right: 0}}
                        onDragEnd={handleDragEnd}
                        whileTap={{scale: 0.97}}
                    >
                        <div className="flex-1 flex flex-col pb-10 justify-evenly">
                            <h3 className="text-3xl">{slides[currentSlide].title}</h3>
                            <p className="text-ld max-w-[40ch]">{slides[currentSlide].description}</p>
                        </div>
                        <div className="flex-1 relative h-full">
                            <Image
                                className="rounded-xl object-cover"
                                src={slides[currentSlide].image}
                                alt="golfer"
                                fill
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="flex space-x-2.5 absolute bottom-10">
            {tabNames.map((label, index) => (
                    <Fragment key={index}>
                        <button
                            className={`text-xs hover:cursor-pointer hover:text-black hover:bg-[#ebecfa] px-2.5 py-0.5 leading-7 rounded-lg transition-colors ${currentSlide === index ? "bg-[#ebecfa] text-black" : "bg-none text-gray-500"}`}
                            onClick={() => handleSlideChange(index)}
                        >
                            {label}
                        </button>
                    </Fragment>
                ))}
            </div>

        </div>
    );
};

export default Slider;