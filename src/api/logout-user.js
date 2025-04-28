import express from 'express';

const router = express.Router();
router.use(express.json());

router.post('/logout-user', async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            expires: new Date(0),
        });

        return res.status(200).json({
            success: true,
            message: " Logout successfully",
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;