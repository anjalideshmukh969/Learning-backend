const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    productName:{
        type:String,
        required:true,
    },
    price:{
       currency:{ 
        type:String, 
        required:true,
        enum:["INR","USD"], 
        default:"INR" 
     },
       amount:{
        type:Number, 
        required:true
    }
    },
    description:{
        type:String,
        required:true,
    },
     category: {
      type: String,
      enum: ["ladies, men, kids, beauty, home"],
    },
    images:{
        type:Array,
        required:true,
    },
    sizes:[
        {
            type:String,
            enum:["S","M","L","XL","XXL"],
            default:"M"
        }
    ],
    colors:[
        {
            type:String,
            // enum:["red","blue","green","black","white","yellow"],
            // default:"black"
        }
    ],
    seller_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    razorpay_order_id:{
        type:String,
    },
    payment_status:{
        type:String,
        enum:["pending","completed","failed"],
    },
}, {timestamps:true}
);

let ProductModel = mongoose.model('products',productSchema);
module.exports = ProductModel;