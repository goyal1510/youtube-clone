import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1]; // Fix token extraction

        if (!token) {
            return res.status(403).json({ message: "Access denied" });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};
