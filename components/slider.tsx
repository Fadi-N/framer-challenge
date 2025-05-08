import React, {Fragment, useState} from 'react';
import Image from "next/image";
import {slides, tabNames} from "@/data/data-slides";
import {AnimatePresence, motion, PanInfo, Variants} from "motion/react";
import VerticalSliderNav from "@/components/vertical-slider-nav";


const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [direction, setDirection] = useState<number>(0);
    const [previousSlide, setPreviousSlide] = useState<number>(0);

    const handleSlideChange = (newIndex: number) => {
        if (newIndex === currentSlide) return;

        setDirection(newIndex > currentSlide ? 1 : -1);
        setPreviousSlide(currentSlide);
        setCurrentSlide(newIndex);
    }

    const handleDragEnd = (e: PointerEvent | TouchEvent | MouseEvent, info: PanInfo) => {
        if (info.offset.x < -100 && currentSlide < slides.length - 1) {
            handleSlideChange(currentSlide + 1);
        } else {
            handleSlideChange(currentSlide - 1);
        }
    }

    const slideVariants: Variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
            scale: 0.5,
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
            scale: 0.5,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 40,
            }
        })
    }

    return (
        <div
            className="flex flex-col lg:flex-row justify-between relative bg-white rounded-3xl px-6 py-8 lg:py-10 lg:pl-24 lg:pr-10 my-20 max-h-[34.75rem] h-[29rem] xl:h-[26.5rem] mx-auto max-w-xl lg:max-w-screen">
            {/*Vertical slider nav - Desktop*/}
            <div className="hidden lg:flex flex-col absolute start-12 top-0 justify-center h-full">
                <VerticalSliderNav
                    currentSlide={currentSlide}
                    handleSlideChange={handleSlideChange}
                />
            </div>
            {/*Slides*/}
            <div className="flex-1 flex relative overflow-hidden">
                <AnimatePresence custom={direction} initial={false}>
                    <motion.div
                        key={`previous-${previousSlide}`}
                        className="flex-1 flex flex-col lg:flex-row absolute lg:space-x-24 top-0 left-0 w-full h-full"
                        custom={direction}
                        variants={slideVariants}
                        initial="center"
                        animate="exit"
                        exit="exit"
                    >
                        <div className="flex-1 lg:pt-10">
                            <div className="flex-1 flex flex-col pb-10 justify-evenly space-y-10">
                                <h3 className="text-2xl lg:text-3xl">{slides[previousSlide].title}</h3>
                                <p className="lg:text-lg lg:max-w-[40ch]">{slides[previousSlide].description}</p>
                            </div>
                        </div>
                        <div className="flex-1 relative h-full">
                            <Image
                                className="rounded-lg lg:rounded-xl object-cover object-right-bottom"
                                src={slides[previousSlide].image}
                                alt="golfer"
                                fill
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        key={`current-${currentSlide}`}
                        className="flex-1 flex flex-col lg:flex-row absolute lg:space-x-24 top-0 left-0 w-full h-full"
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
                        <div className="flex-1 lg:pt-10">
                            <div className="flex-1 flex flex-col pb-10 justify-evenly space-y-10">
                                <h3 className="text-2xl lg:text-3xl">{slides[currentSlide].title}</h3>
                                <p className="lg:text-lg lg:max-w-[40ch]">{slides[currentSlide].description}</p>
                            </div>
                        </div>
                        <div className="flex-1 relative h-full">
                            <Image
                                className="rounded-lg lg:rounded-xl object-cover object-right-bottom"
                                src={slides[currentSlide].image}
                                alt="golfer"
                                fill
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
            {/*Horizontal slider nav - Desktop*/}
            <div className="hidden lg:flex space-x-2.5 absolute bottom-10">
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
            {/*Horizontal slider nav - Mobile*/}
            <div className="lg:hidden pt-10">
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-6 z-10">
                    <VerticalSliderNav
                        currentSlide={currentSlide}
                        handleSlideChange={handleSlideChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Slider;