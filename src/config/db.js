const mongoose = require('mongoose');

const connnectDB = async (req,res)=>{
    try {
       let res = await mongoose.connect(process.env.mongo_uri);
       if(res){
        console.log("DataBase Connected"); 
       }
    } catch (error) {
        console.log("error in connectiong db",error);
    }
}
module.exports = connnectDB;