const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const sellerSchema = new mongoose.Schema({
    sellerName : {
        type: String,
        required: true,
    },
    sellerPhone:{
        type: String,
        unique: true,
        minLength:10,
        maxLength:10,
    },
    sellerEmail:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    sellerAdhar:{
        type: String,
        unique: true,
    },
    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
    },
],
},
{timestamps: true}
);
 //hashing password before saving to db
sellerSchema.pre("save", async function(next){
    let hashedPass = await bcrypt.hash(this.password, 10);
    this.password = hashedPass;
    next();
})

//method to compare password during login
sellerSchema.methods.comparePass = async function(password){
    let comparePass = await bcrypt.compare(password, this.password);
    return comparePass;

}


const SellerModel = mongoose.model('seller', sellerSchema);
module.exports = SellerModel;