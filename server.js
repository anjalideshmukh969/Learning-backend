require('dotenv').config();
const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth.routes');
const productRoutes = require("./src/routes/product.routes");
const sellerRoutes = require("./src/routes/sellerAuth.routes");
const mailRoutes = require("./src/routes/mail.routes");
// const paymentRoutes = require("./src/routes/payment.routes");
const otpRoutes = require("./src/routes/otp.routes");

const app = express();       
//middlewares
app.use(express.json());      // to parse json data
app.use(cookieParser());     // to parse cookies
app.use(express.urlencoded({extended:true})); // to parse urlencoded data to json
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true,
// }));
connectDB();

app.use('/api/auth/user', authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/auth/seller', sellerRoutes);
// app.use("/api/payment", paymentRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/otp", otpRoutes);

let port = process.env.port || 4000;
app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`);  
})