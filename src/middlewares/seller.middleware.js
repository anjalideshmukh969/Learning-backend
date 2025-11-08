const SellerModel = require("../models/seller.model");
const jwt = require("jsonwebtoken");

// Middleware to authenticate seller requests using JWT
const sellerAuthMiddleware = async (req, res, next) => {}
try {
    // to check token in cookies
    let seller_token = req.cookies.sellerToken;
    if(!seller_token)
        return res.status(404).json({
            message:" token not found"
        });

        // to verify token
    let decode = jwt.verify(token, process.env.jwt_secret);
    if(!decode)
        return res.status(401).json({
            message:" Unauthorized: Invalid token"
        });
    // to find seller by id from token
    let seller = await SellerModel.findById(decode.id);
    if(!seller)
        return res.status(400).json({
            message:" Unauthorized: Seller not found", error });
        req.seller = seller;
        next();


} catch (error) {
    console.log("error in seller middleware",error);
    
}