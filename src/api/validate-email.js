import express from 'express';
import User from '../models/user-model.js';

const router = express.Router();
router.use(express.json());

router.post('/validate-email', async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ error: "An account with this email already registered." });
        }

        return res.status(200).json({
            message: 'This email can be registered',
            success: true,
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;