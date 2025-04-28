import express from 'express';
import User from '../models/user-model.js';

const router = express.Router();
router.use(express.json());

router.post('/register-user', async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;

        const user = await User.findOne({
            $or: [
                { email },
                { username },
            ],
        });

        if (user) {
            return res.status(400).json({ usernameError: "An account with these details already exists." });
        }

        const newUser = new User({
            fullName,
            username,
            email,
            password,
        });

        const savedUser = await newUser.save();

        return res.status(200).json({
            message: 'User successfully registered',
            success: true,
            data: savedUser,
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;