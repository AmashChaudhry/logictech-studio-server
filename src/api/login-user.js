import express from 'express';
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
                { phoneNumber: identity },
            ],
        });

        if (!user) {
            return res.status(400).json({ error: "The details provided is not associated with any account." });
        }

        if (password != user.password) {
            return res.status(400).json({ error: "Sorry, your password was incorrect. Please double-check your password." });
        }

        await user.save();

        return res.status(200).json({
            success: true,
            data: user,
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;