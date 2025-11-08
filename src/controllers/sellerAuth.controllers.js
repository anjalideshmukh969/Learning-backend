const SellerModel = require("../models/seller.model");
const jwt = require("jsonwebtoken");

const registerSellerController = async (req,res) => {
  try {

    let {sellerName, sellerPhone, sellerEmail,sellerAdhar, password } = req.body;

    // validate required fields
    if (!sellerName || !sellerPhone || !sellerEmail || !sellerAdhar || !password) {
      return res.status(422).json({
        message: "All fields are required",
      });
    }
    
    // check if seller already exists
    let existingSeller = await SellerModel.findOne({ sellerEmail });;
    if (existingSeller) {
      return res.status(409).json({
        message: "Seller already exists, please login",
      });
    }
    // 
    let sellerToken = jwt.sign({sellerEmail,}, process.env.jwt_seller_secret,
      { expiresIn: "7d" }
    );

    res.cookie("sellerToken", sellerToken);

    // create new seller
    let newSeller = await SellerModel.create({
      sellerName,
      sellerPhone,
      sellerEmail,
      sellerAdhar,
      password,
    });
    return res.status(201).json({
        message: "Seller registered successfully",
        sellerId: newSeller._id,
    });


  } catch (error) {
    console.log("error in seller register api->", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

const SellerLoginController = async () => {
  try {
    let {sellerEmail,sellerPassword} = req.body;

    // validate required fields
    if(!sellerEmail || !sellerPassword){
      return res.status(422).json({
        message:"All fields are required"
      });
    }
    // check if seller exists
    let seller = await SellerModel.findOne({sellerEmail});
    if(!seller){
      return res.status(404).json({
        message:"Seller not found, please register"
      });
    }
    // compare password
     let cp = await seller.comparePass(password);
     if(!cp){
      return res.status(401).json({
        message:"Invalid credentials"
      });
     }
      return res.status(200).json({
        message:"Seller logged in successfully",
        seller : seller,
  
      });


  } catch (error) {
    console.log("error in seller login api->", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
}

const getSellerProfileController = async (req, res) => {
  try {
    // check for seller token   
    if(!req.seller)
        return res.status(400).json({
            message: "Token not found",
        });
    let sellerEmail = req.seller.sellerEmail;

    // fetch seller profile from db
    let sellerProfile = await SellerModel.findOne({sellerEmail
    });
    // to check if seller profile exists for the given email
    if(!sellerProfile){
      return res.status(404).json({
        message:"Seller not found"
      });
    }
    // return seller profile to client
    return res.status(200).json({
      message:"Seller profile fetched successfully",
      sellerProfile : sellerProfile,
    });

  } catch (error) {
    console.log("error in get seller profile api->", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
}

// const updateSellerProfileController = async (req, res) => {
// }


module.exports = {
  registerSellerController,
  SellerLoginController,
  getSellerProfileController,
};