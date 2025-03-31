const { verifyToken } = require('../utils/jwt.utils');

exports.authenticate = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Authorization header missing or invalid." });
        }

        // Extract the token
        const token = authHeader.split(' ')[1];

        // Verify the token
        const decoded = verifyToken(token);

        // Attach the user ID to the request object
        req.userId = decoded.id;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};