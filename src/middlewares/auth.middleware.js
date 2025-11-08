const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

// Middleware to authenticate requests using JWT
const authMiddleware = async (req, res, next) => {
    try {
    // to check token in cookies 
        let token = req.cookies.token;
        if(!token)
            return res.status(401).json({
                message:" Unauthorized: No token provided"
            });
// to verify token
        let decode = jwt.verify(token, process.env.jwt_secret);
        if(!decode)
            return res.status(401).json({
                message:" Unauthorized: Invalid token"
            });
        // to find user by id from token
        let user = await UserModel.findById(decode.userId);
        if(!user)
            return res.status(400).json({
                message:" Unauthorized: User not found"
            });
            req.user = user;
            next();

    } catch (error) {
        console.log("error in middleware",error);
        
    }
}