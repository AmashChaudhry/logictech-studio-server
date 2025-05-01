import express from 'express';
import User from "../models/user-model.js";
import { dataFromToken } from '../helpers/auth-token-manager.js';

const router = express.Router();
router.use(express.json());

router.get('/current-user', async (req, res) => {
    try {
        const userId = await dataFromToken(req);

        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        return res.status(200).json({
            success: true,
            data: user,
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;