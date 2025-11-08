const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {
    try {
        let { name, email, password, phone } = req.body;

        //check all fields are present
        if (!name || !email || !password || !phone)
            return res.status(422).json({
                message: "All fields are required",
            });

        //check if user already exists
        let existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists or registered"
            });
        }
        // Create new user in db for registration
        const newUser = await UserModel.create({
            name, 
            email, 
            password, 
            phone,
        });

        let token = jwt.sign({id: newUser._id},process.env.jwt_secret,{
            expiresIn: '1h',
        });

        res.cookie('token',token);

        return res.status(201).json({
            message: "User registered successfully",
            user: newUser,
        });

    } catch (error) {
        console.log("error in registration", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
}

const loginController = async (req, res) => {
    try {
        let { email, password } = req.body;

        // check if email and password are present
        if (!email || !password) {
            return res.status(422).json({
                message: "email and password requied",
            });
        }
         
    const user = await UserModel.findOne({ email });

     if (!user)
      return res.status(404).json({
        message: "User not found",
      });
    
            // compare ppassword to check if user is valid
            let cp = await user.comparePass(password);
            if (!cp) 
                return res.status(400).json({
                    message: "Invalid credentials or wrong email & passsword",
                });
            
            
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token);

            return res.status(200).json({
                message: "User logged in successfully",
                user: user,
            });
    }
    
     catch (error) {
        console.log("error in login", error);
        return res.status(500).json({
            message: "internal server error",
            error: error,
        });
    }
}

module.exports = {
    registerController,
    loginController,
};