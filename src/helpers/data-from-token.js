import jwt from "jsonwebtoken";

export const dataFromToken = (req) => {
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