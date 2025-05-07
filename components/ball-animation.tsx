import React from 'react';
import Image from "next/image";
import {motion, useScroll, useSpring, useTransform} from "motion/react";

const BallAnimation = () => {
    const {scrollYProgress} = useScroll();

    const xRaw = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.5], [200, 0, -300, -500]);
    const yRaw = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.5], [300, 50, -300, -500]);
    const scaleRaw = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.2, 0.6, 1.0]);
    const rotateRaw = useTransform(scrollYProgress, [0, 0.3], [0, 90]);
    const opacityRaw = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

    const x = useSpring(xRaw, {stiffness: 60, damping: 20});
    const y = useSpring(yRaw, {stiffness: 60, damping: 20});
    const scale = useSpring(scaleRaw, {stiffness: 80, damping: 15});
    const rotate = useSpring(rotateRaw, {stiffness: 60, damping: 15});
    const opacity = useSpring(opacityRaw, {stiffness: 70, damping: 18});


    return (
        <motion.div
            className="absolute top-0 left-0 z-10"
            style={{x, y, scale, rotate, opacity}}
        >
            <Image
                className="rounded-3xl"
                src="/ball.png"
                alt="ball"
                width={836}
                height={836}
            />
        </motion.div>

    );
};

export default BallAnimation;