import { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitInterest } from "../services/api";

const InterestModal = memo(({ step, onClose }) => {
    const [form, setForm] = useState({ name: "", email: "" });
    const [status, setStatus] = useState("idle");
    const [errorMsg, setErr] = useState("");
    const overlayRef = useRef(null);

    useEffect(() => {
        const esc = (e) => { if (e.key === "Escape") onClose(); };
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", esc);
        return () => {
            window.removeEventListener("keydown", esc);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    const handleOverlay = useCallback(
        (e) => { if (e.target === overlayRef.current) onClose(); },
        [onClose]
    );

    const handleChange = useCallback(
        (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value })),
        []
    );

    const handleSubmit = async () => {
        if (!form.name.trim() || !form.email.trim()) return;
        setStatus("loading");
        setErr("");
        try {
            await submitInterest({
                name: form.name.trim(),
                email: form.email.trim(),
                step: step.title,
            });
            setStatus("success");
            setForm({ name: "", email: "" });
        } catch (err) {
            setStatus("error");
            setErr(err.message || "Something went wrong. Please try again.");
        }
    };

    const disabled = status === "loading" || !form.name.trim() || !form.email.trim();

    return (
        <motion.div
            className="modal-overlay"
            ref={overlayRef}
            onClick={handleOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
        >
            <motion.div
                className="modal-panel"
                style={{ "--accent": step.colorAccent }}
                role="dialog"
                aria-modal="true"
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            >
                <button className="modal-close" onClick={onClose}>✕</button>

                <span className="modal-step-tag">
                    Step 0{step.id} — {step.highlight}
                </span>
                <h3 className="modal-title">{step.title}</h3>
                <p className="modal-sub">
                    Tell us about yourself and we'll reach out with a tailored breakdown.
                </p>

                <AnimatePresence mode="wait">
                    {status === "success" ? (
                        <motion.div
                            key="success"
                            className="modal-success"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="success-icon-wrap">
                                <span className="success-checkmark">✓</span>
                            </div>
                            <p className="success-msg">You're on our radar.</p>
                            <p className="success-sub">
                                Our team will reach out with a precision plan tailored to your growth stage.
                            </p>
                            <button className="btn-close-success" onClick={onClose}>
                                Close
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="form-field">
                                <label htmlFor="m-name">Your Name</label>
                                <input
                                    id="m-name"
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Mahek Kohli"
                                    disabled={status === "loading"}
                                    autoFocus
                                    autoComplete="name"
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="m-email">Work Email</label>
                                <input
                                    id="m-email"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@company.com"
                                    disabled={status === "loading"}
                                    autoComplete="email"
                                />
                            </div>
                            {status === "error" && (
                                <motion.p
                                    className="form-error"
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {errorMsg}
                                </motion.p>
                            )}
                            <motion.button
                                className="btn-submit"
                                onClick={handleSubmit}
                                disabled={disabled}
                                style={{
                                    background: `linear-gradient(135deg, ${step.colorAccent}, ${step.colorAccent}cc)`,
                                }}
                                whileHover={!disabled ? { scale: 1.01 } : {}}
                                whileTap={!disabled ? { scale: 0.99 } : {}}
                            >
                                {status === "loading" ? (
                                    <span className="btn-loading">
                                        <span className="spinner" />
                                        Sending...
                                    </span>
                                ) : (
                                    "Register Interest"
                                )}
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
});

InterestModal.displayName = "InterestModal";
export default InterestModal;