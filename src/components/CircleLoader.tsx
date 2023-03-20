import {motion, MotionStyle, Transition, Variants} from "framer-motion";
import React from "react";

export default function CircleLoader() {
    const loadingCircleTransition: Transition = {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
    }

    const loadingContainerVariants: Variants = {
        start: {
            transition: {
                staggerChildren: 0.2,
            },
        },
        end: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const loadingCircleVariants: Variants = {
        start: {
            y: "0%",
        },
        end: {
            y: "100%",
        },
    }

    const loadingContainer: MotionStyle = {
        width: "2rem",
        height: "1rem",
        display: "flex",
        justifyContent: "space-around"
    };

    const loadingCircle: MotionStyle = {
        width: "0.5rem",
        height: "0.5rem",
        backgroundColor: "white",
        borderRadius: "0.25rem"
    };
    return (
        <motion.div
            style={loadingContainer}
            variants={loadingContainerVariants}
            initial="start"
            animate="end"
        >
            <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            />
            <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            />
            <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            />
        </motion.div>
    );
}