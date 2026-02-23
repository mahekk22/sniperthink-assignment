// src/hooks/useScrollProgress.js
// Custom hook that tracks scroll position within a given section ref.
// Returns:
//   progress  — 0 to 1 float (how far through the section the user has scrolled)
//   activeStep — index of the currently "active" step based on scroll position
//
// Uses a passive scroll listener to avoid blocking the main thread.
// Dependency: only the ref — safe for the whole session.

import { useState, useEffect } from "react";
import strategySteps from "../data/strategySteps";

export function useScrollProgress(ref) {
    const [progress, setProgress] = useState(0);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleScroll = () => {
            const rect = el.getBoundingClientRect();
            const windowH = window.innerHeight;
            const totalScrollable = rect.height - windowH;
            const scrolled = Math.max(0, -rect.top);
            const p = Math.min(1, Math.max(0, scrolled / totalScrollable));

            setProgress(p);

            const stepIndex = Math.min(
                strategySteps.length - 1,
                Math.floor(p * strategySteps.length)
            );
            setActiveStep(stepIndex);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // run once on mount to set initial state

        return () => window.removeEventListener("scroll", handleScroll);
    }, [ref]);

    return { progress, activeStep };
}