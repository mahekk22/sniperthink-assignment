// backend/routes/interest.js
// POST /api/interest
// Validates input, logs the submission, returns success response.
// In production: swap the console.log for DB write / CRM push / email trigger.

const express = require("express");
const router = express.Router();

// Basic email format check
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

router.post("/", (req, res) => {
    console.log("🚀 POST /api/interest hit");
    console.log("Request Body:", req.body);
    const { name, email, step } = req.body;

    // ── Input validation ────────────────────────────────────────────────────
    if (!name || !email || !step) {
        return res.status(400).json({
            success: false,
            message: "name, email, and step are all required.",
        });
    }

    if (typeof name !== "string" || name.trim().length < 2) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid name.",
        });
    }

    if (!isValidEmail(email.trim())) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email address.",
        });
    }

    // ── Success — log and respond ────────────────────────────────────────────
    // Replace this with: DB insert / CRM API call / email notification
    console.log(`[SniperThink] Interest registered:`);
    console.log(`  Name:  ${name.trim()}`);
    console.log(`  Email: ${email.trim()}`);
    console.log(`  Step:  ${step}`);
    console.log(`  Time:  ${new Date().toISOString()}`);

    return res.status(200).json({
        success: true,
        message: "Interest recorded successfully",
    });
});

module.exports = router;