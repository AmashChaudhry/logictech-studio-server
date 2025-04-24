import express from 'express';
import User from '../models/user-model.js';

const router = express.Router();
router.use(express.json());

router.post('/validate-username', async (req, res) => {
    try {
        const { username } = req.body;

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "An account with this username already exists." });
        }

        return res.status(200).json({
            message: 'Username available',
            success: true,
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;