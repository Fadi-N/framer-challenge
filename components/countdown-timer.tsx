import {useEffect, useMemo, useRef, useState} from "react";
import {motion, useInView} from "motion/react";
import {getTimeLeft} from "@/utils/utils";
import {TimeLeft} from "@/types/countdown-timer";

interface CountdownTimerProps {
    setDaysLeft?: (daysLeft: number) => void;
}

const CountdownTimer = ({setDaysLeft}: CountdownTimerProps) => {
    const targetDate = useMemo(() => new Date("2025-09-22T00:00:00"), []);
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft(targetDate));


    const countDownRef = useRef<HTMLDivElement | null>(null);
    const countDownInView = useInView(countDownRef, {once: true, margin: "-50px"})

    useEffect(() => {
        const interval = setInterval(() => {
            const updated = getTimeLeft(targetDate);
            setTimeLeft(updated);
            setDaysLeft?.(updated.days);
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <motion.div
            className="grid grid-cols-4 lg:flex gap-2 w-full"
            ref={countDownRef}
            initial={{opacity: 0, y: 50}}
            animate={countDownInView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.5, delay: 0.1}}
        >
            {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => {
                const value = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds][i];
                return (
                    <motion.div
                        key={label}
                        className="flex flex-col items-center justify-center bg-white/10 px-6 py-7 rounded-xl text-center w-full lg:w-24"
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.4}}
                    >
                        <div className="text-sm lg:text-base">{label}</div>
                        <div className="text-base lg:text-xl font-semibold">{value}</div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
};

export default CountdownTimer;