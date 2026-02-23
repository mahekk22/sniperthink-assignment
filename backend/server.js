const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── POST /api/interest ────────────────────────────────────────────────────────
app.post("/api/interest", (req, res) => {
    const { name, email, step } = req.body;

    console.log("=================================");
    console.log("[SniperThink] Interest registered:");
    console.log("  Name: ", name);
    console.log("  Email:", email);
    console.log("  Step: ", step);
    console.log("  Time: ", new Date().toISOString());
    console.log("=================================");

    if (!name || !email || !step) {
        return res.status(400).json({
            success: false,
            message: "name, email, and step are required."
        });
    }

    return res.status(200).json({
        success: true,
        message: "Interest recorded successfully"
    });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log("✓ Backend running at http://localhost:" + PORT);
    console.log("✓ Health: http://localhost:" + PORT + "/health");
    console.log("✓ POST endpoint: http://localhost:" + PORT + "/api/interest");
});




