import express from 'express';
import User from '../models/user-model.js';

const router = express.Router();
router.use(express.json());

router.post('/validate-phone-number', async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        const user = await User.findOne({ phoneNumber });

        if (user) {
            return res.status(400).json({ error: "An account with this phone number already registered." });
        }

        return res.status(200).json({
            message: 'This phone number can be registered',
            success: true,
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;