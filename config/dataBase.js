const mongoose=require("mongoose");
require("dotenv").config();

const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE)
    .then(()=>{console.log("dataBase is connected")})
    .catch((err)=>{        
        console.log("error in connection");
        console.log(err.message);
        process.exit(1);
    });
};

module.exports=dbConnect;