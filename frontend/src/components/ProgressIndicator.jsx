import { memo } from "react";

const ProgressIndicator = memo(({ activeStep, progress, steps }) => (
    <div className="progress-indicator">
        <p className="progress-indicator-label">Progress</p>
        <div className="progress-nodes">
            <div className="progress-track-bg" />
            <div className="progress-track-fill" style={{ height: `${progress * 100}%` }} />
            {steps.map((step, i) => (
                <div
                    key={step.id}
                    className={`progress-node${i <= activeStep ? " active" : ""}${i === activeStep ? " current" : ""}`}
                    style={{ "--accent": step.colorAccent }}
                >
                    <div className="node-dot-wrap">
                        <div className="node-dot" />
                        <div className="node-ring" />
                    </div>
                    <div className="node-info">
                        <div className="node-num">0{step.id}</div>
                        <div className="node-lbl">{step.title}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
));

ProgressIndicator.displayName = "ProgressIndicator";
export default ProgressIndicator;