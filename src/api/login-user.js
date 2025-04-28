import express from 'express';
import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

const router = express.Router();
router.use(express.json());

router.post('/login-user', async (req, res) => {
    try {
        const { identity, password } = req.body;

        const user = await User.findOne({
            $or: [
                { email: identity },
                { username: identity },
            ],
        });

        if (!user) {
            return res.status(400).json({ error: "The details provided is not associated with your account." });
        }

        if (password != user.password) {
            return res.status(400).json({ error: "Sorry, your password was incorrect. Please double-check your password." });
        }

        const tokenData = {
            id: user._id,
            isAdmin: user.isAdmin,
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
            expiresIn: '3d',
        });

        const cookieMaxAge = 3 * 24 * 60 * 60 * 1000;

        res.cookie("token", token, {
            secure: false,
            httpOnly: true,
            maxAge: cookieMaxAge,
            sameSite: 'lax',
        });

        return res.status(200).json({
            success: true,
            data: user,
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;