const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({

    name:{
        type:String,
        require:true
    },

    email:{
        type:String,
        require:true,
        unique:true
    },

    password:{
        type:String,
        require:true
    }, 

    review:[{
        type:mongoose.Schema.ObjectId,
        ref:"reviewModel" 
        }
    ]
});

const userModel=mongoose.model("userModel",userSchema);

model.exports=userModel;