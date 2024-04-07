const mongoose =require("mongoose")

const bookSchema=new mongoose.Schema({

    title:{
        type:String,
        require:true
    },

    author:{
        type:String,
        require:true
    },

    ISBN:{
        type:Number,
        require:true,
        unique:true
    },

    review:[{
        type:mongoose.Schema.ObjectId,
        ref:"reviewModel"
    }]

});

const bookModel=mongoose.model("bookModel",bookSchema);
model.exports=boolModel;

