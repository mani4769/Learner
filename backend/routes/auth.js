const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto"); // For generating reset tokens
const User = require("../models/User");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();
        return res.status(201).json({ success: true, message: "Signup successful" });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ success: false, message: "Error signing up" });
    }
});


// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

        res.status(200).json({ success: true, message: "Login successful" });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Error logging in" });
    }
});

// Forgot Password Route
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: "User not found" });

        // Generate a random reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        user.resetToken = resetToken;
        user.resetTokenExpire = Date.now() + 3600000; // Token valid for 1 hour
        await user.save();

        // Simulate email sending (Replace this with an actual email sender)
        console.log(`Password reset link: http://localhost:5000/reset-password?token=${resetToken}`);

        res.status(200).json({ success: true, message: "Password reset link sent. Check console (For now)." });
    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({ success: false, message: "Error generating reset token" });
    }
});

// Reset Password Route
router.post("/reset-password", async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const user = await User.findOne({ resetToken: token, resetTokenExpire: { $gt: Date.now() } });
        if (!user) return res.status(400).json({ success: false, message: "Invalid or expired token" });

        // Hash the new password
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = undefined;
        user.resetTokenExpire = undefined;
        await user.save();

        res.status(200).json({ success: true, message: "Password reset successful" });
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ success: false, message: "Error resetting password" });
    }
});

module.exports = router;
