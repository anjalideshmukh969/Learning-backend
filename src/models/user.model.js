const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,  
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },   
},
{timestamps:true}
);
//bcrypt - library ie used to hash password
// Hash the password before saving the user model
userSchema.pre('save', async function(next){
    let hashedPass = await bcrypt.hash(this.password,10);
    this.password = hashedPass;
    next();
});
// Method to compare password for login
userSchema.methods.comparePass = async function(password){
    let comparePass = await bcrypt.compare(password,this.password);
    return comparePass;
}
const UserModel = mongoose.model('user',userSchema);

module.exports = UserModel;