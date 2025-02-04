// const jwt = require("jsonwebtoken")


// const userAuth=(req,res,next)=>{
//     let token = req.header("Authorization");
//     if (!token) {
//         return res.status(400).json({msg:"token no found"})
//     }
//     let newToken = token.slice(7,token.length)
//     let decode = jwt.verify(newToken,"nevil")
//     req.user = decode;
//     next()
// }

// module.exports = userAuth ; 

const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
    const token = req.headers.authorization; // Get token from headers

    if (!token) {
        return res.status(401).json({ msg: "Access Denied. No Token Provided" });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], "nevil"); // Verify token
        req.user = decoded.userData; // Correctly assign user data
        console.log("Decoded User Data:", req.user); // Debugging
        next();
    } catch (err) {
        return res.status(400).json({ msg: "Invalid Token" });
    }
};

module.exports = userAuth;
