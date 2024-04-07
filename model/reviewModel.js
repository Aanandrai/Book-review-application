const mongoose=require("mongoose");

const reviewSchema=new mongoose.Schema({

    description:{
        type:String,
        require:true
    },

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"userModel"
    },

    book:{
        type:mongoose.Schema.ObjectId,
        ref:"boolModel"
    }
});

const reviewModel=mongoose.model("reviewModel", reviewSchema);
model.exports=reviewModel;

