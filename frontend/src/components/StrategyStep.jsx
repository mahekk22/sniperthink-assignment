import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const animVariants = {
    slideLeft: {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
    },
    scaleFocus: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
    },
    parallax: {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
    },
    progressFill: {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
    },
};

const childVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: (d) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.7, ease, delay: d },
    }),
};

const childXVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (d) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.7, ease, delay: d },
    }),
};

export default function StrategyStep({ step, index, isActive, scrollProgress, onInterest, id }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px", amount: 0.1 });
    const base = index * 0.05;

    return (
        <div
            ref={ref}
            id={id}
            className={`strategy-step${isActive ? " step-active" : ""}`}
            style={{ "--accent": step.colorAccent }}
        >
            <motion.div
                className="step-content"
                variants={animVariants[step.animationVariant] || animVariants.parallax}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                {/* Meta row */}
                <motion.div
                    className="step-meta"
                    variants={childVariants}
                    custom={base + 0.08}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    <div className="step-badge">
                        <div className="badge-glow" />
                        0{step.id}
                    </div>
                    <span className="step-icon">{step.icon}</span>
                    <span className="step-chip">Step 0{step.id} of 4</span>
                </motion.div>

                {/* Title */}
                <motion.h2
                    className="step-title"
                    variants={childVariants}
                    custom={base + 0.18}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {step.title}
                </motion.h2>

                {/* Highlight tag */}
                <motion.div
                    className="step-highlight"
                    variants={childXVariants}
                    custom={base + 0.28}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    <span className="highlight-dot" />
                    {step.highlight}
                </motion.div>

                {/* Description */}
                <motion.p
                    className="step-description"
                    variants={childVariants}
                    custom={base + 0.36}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {step.description}
                </motion.p>

                {/* Progress bar (step 4 only) */}
                {step.animationVariant === "progressFill" && (
                    <motion.div
                        className="step-progress-wrap"
                        variants={childVariants}
                        custom={base + 0.44}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                    >
                        <div className="step-progress-labels">
                            <span>Execution rate</span>
                            <motion.span
                                className="pct"
                                initial={{ opacity: 0 }}
                                animate={inView ? { opacity: 1 } : {}}
                                transition={{ delay: base + 0.9, duration: 0.4 }}
                            >
                                100%
                            </motion.span>
                        </div>
                        <div className="step-progress-track">
                            <motion.div
                                className="step-progress-fill"
                                style={{
                                    background: `linear-gradient(90deg,${step.colorAccent},${step.colorAccent}99)`,
                                }}
                                initial={{ width: "0%" }}
                                animate={inView ? { width: "100%" } : { width: "0%" }}
                                transition={{ duration: 1.9, ease: [0.16, 1, 0.3, 1], delay: base + 0.62 }}
                            />
                        </div>
                    </motion.div>
                )}

                {/* CTA */}
                <motion.div
                    variants={childVariants}
                    custom={base + 0.5}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    <motion.button
                        className="btn-interest"
                        style={{ "--accent": step.colorAccent }}
                        onClick={() => onInterest(step)}
                    >
                        <div className="btn-glow" />
                        <span className="btn-txt">I'm Interested</span>
                        <span className="btn-arr">→</span>
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    );
}