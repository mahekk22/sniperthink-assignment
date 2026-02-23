import { useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useScrollProgress } from "../hooks/useScrollProgress";
import strategySteps from "../data/strategySteps";
import StrategyStep from "./StrategyStep";
import InterestModal from "./InterestModal";
import ProgressIndicator from "./ProgressIndicator";
import "../styles/strategyFlow.css";

const heroEase = [0.16, 1, 0.3, 1];

const heroContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.09, delayChildren: 0.06 },
    },
};

const heroItem = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: heroEase } },
};

export default function StrategyFlowSection() {
    const sectionRef = useRef(null);
    const { progress, activeStep } = useScrollProgress(sectionRef);
    const [modalStep, setModalStep] = useState(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const heroY = useTransform(scrollYProgress, [0, 0.15], [0, 28]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0.55]);
    const springProg = useSpring(progress, { stiffness: 100, damping: 30 });
    const progWidth = useTransform(springProg, (v) => `${v * 100}%`);

    const handleInterest = useCallback((s) => setModalStep(s), []);
    const handleCloseModal = useCallback(() => setModalStep(null), []);

    return (
        <>
            {/* ── Global top progress bar ── */}
            <div className="global-progress-bar">
                <motion.div className="global-progress-fill" style={{ width: progWidth }} />
            </div>

            <section className="strategy-section" ref={sectionRef}>

                {/* ── Vertical side progress indicator ── */}
                <ProgressIndicator
                    activeStep={activeStep}
                    progress={progress}
                    steps={strategySteps}
                />

                {/* ── Hero header ── */}
                <motion.div
                    className="section-header"
                    style={{ y: heroY, opacity: heroOpacity }}
                >
                    <div className="hero-glow" aria-hidden />
                    <motion.div
                        variants={heroContainer}
                        initial="hidden"
                        animate="visible"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <motion.span className="section-eyebrow" variants={heroItem}>
                            <span className="eyebrow-dot" />
                            How SniperThink Works
                        </motion.span>

                        <motion.h1 className="section-heading" variants={heroItem}>
                            From Chaos to{" "}
                            <span className="heading-accent">Clarity</span>
                        </motion.h1>

                        <motion.p className="section-subheading" variants={heroItem}>
                            A four-stage growth transformation — we turn scattered systems into
                            structured intelligence so your team can analyse, automate, and
                            accelerate with confidence.
                        </motion.p>
                    </motion.div>
                </motion.div>

                {/* ── Horizontal step tracker ── */}
                <div className="st-container">
                    <motion.div
                        className="step-tracker"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    >
                        {strategySteps.map((step, i) => (
                            <div key={step.id} style={{ display: "contents" }}>
                                <div
                                    className={`tracker-item${i <= activeStep ? " active" : ""}${i === activeStep ? " current" : ""}`}
                                    style={{ "--accent": step.colorAccent }}
                                >
                                    <div className="tracker-dot-wrap">
                                        <div className="tracker-dot" />
                                        <span className="tracker-label">0{step.id}</span>
                                    </div>
                                </div>

                                {i < strategySteps.length - 1 && (
                                    <div className="tracker-line">
                                        <div
                                            className="tracker-line-fill"
                                            style={{ width: i < activeStep ? "100%" : "0%" }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* ── Strategy steps ── */}
                <div className="section-steps">
                    {strategySteps.map((step, index) => (
                        <StrategyStep
                            key={step.id}
                            step={step}
                            index={index}
                            isActive={index === activeStep}
                            scrollProgress={progress}
                            onInterest={handleInterest}
                        />
                    ))}
                </div>
            </section>

            {modalStep && (
                <InterestModal step={modalStep} onClose={handleCloseModal} />
            )}
        </>
    );
}