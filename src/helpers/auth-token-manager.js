import jwt from "jsonwebtoken";

export const signToken = async (res, tokenData) => {
    try {
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

        return token;

    } catch (error) {
        throw new Error(error.message);
    }
};

export const dataFromToken = async (req) => {
    try {
        if (!req.cookies) {
            throw new Error("No cookies found");
        }

        const token = req.cookies["token"] || "";
        if (!token) {
            throw new Error("Token not found");
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        return decodedToken.id;
    } catch (error) {
        throw new Error(error.message);
    }
};