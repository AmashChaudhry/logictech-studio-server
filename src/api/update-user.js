import express from 'express';
import User from '../models/user-model.js';

const router = express.Router();
router.use(express.json());

router.patch('/update-user', async (req, res) => {
    try {
        const { _id, fullName, username, email, phoneNumber } = req.body;

        const user = await User.findOne({ _id });

        if (username) {
            const existingUsername = await User.findOne({ username });

            if (username === user.username) {
                return res.status(200).json({ success: true });
            } else if (existingUsername) {
                return res.status(400).json({ error: "An account with this username already exists." });
            }
        }

        if (!user) {
            return res.status(400).json({ error: "User not found." });
        }

        if (email) user.email = email;
        if (fullName) user.fullName = fullName;
        if (username) user.username = username;
        if (phoneNumber) user.phoneNumber = phoneNumber;

        await user.save();

        return res.status(200).json({
            success: true,
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;