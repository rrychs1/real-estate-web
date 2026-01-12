"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    "/hero-slide-1.png",
    "/hero-slide-2.png",
    "/hero-slide-3.png",
];

export function HeroBackground() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${images[index]}')` }}
                />
            </AnimatePresence>

            {/* Enhanced Gradient Overlay with Primary Tint */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/60 z-10" />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" /> {/* Subtle tint */}
        </div>
    );
}
