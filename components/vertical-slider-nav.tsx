import React from 'react';
import {AnimatePresence, motion} from "motion/react";
import Image from "next/image";

interface VerticalSliderNavProps {
    currentSlide: number;
    handleSlideChange: (index: number) => void;
}

const VerticalSliderNav = ({currentSlide, handleSlideChange}: VerticalSliderNavProps) => {
    return (
        <>
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
        </>
    );
};

export default VerticalSliderNav;