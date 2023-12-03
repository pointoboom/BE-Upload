export const protect = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Unauthorized",
        });
    }
    const tokenWithoutBearer = token.split(" ")[1];
    if (tokenWithoutBearer !== "DEVCREW-BACKEND-TEST") {
        return res.status(401).json({
            error: "Unauthorized",
        });
    }
    next()
};
