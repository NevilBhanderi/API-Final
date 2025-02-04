const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers.authorization; // Get token from request header

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], "nevil"); // Verify token with your secret key
        req.user = decoded.userdata; // Attach user data to request
        next();
    } catch (err) {
        res.status(401).json({ msg: "Invalid token" });
    }
};
