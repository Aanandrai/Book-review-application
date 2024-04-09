const reviewModel=require("../model/reviewModel");
const bookModel=require("../model/bookModel");
const userModel=require("../model/userModel");


exports.getAllReview=async(req,res)=>{
    try{

        const data=await reviewModel.find();
        
        return res.json({
            success:true,
            data:data
        })
    }
    catch(err){
        return res.json({
            success:false,
            error:err.message
        })
    }
}

exports.getReviewByIsbn=async(req,res)=>{
    try{
        const isbn=req.params.isbn;
        if(!isbn){
            return res.json({
                success:false,
                message:"isbn is empty"
            });
        };

        let data=await bookModel.findOne({ISBN:isbn});
        if(data.review.length==0){
            return res.json({
                success:true,
                data:data.review,
                message:"This isbn is not present"
            });
        };

        return res.json({
            success:true,
            data:data.review
        });
    }
    catch(err){
        return res.json({
            success:false,
            error:err.message,
            message:"error in getReview by isbn number"
        })
    }
}

exports.addReview= async(req,res)=>{
    try{
        const {description ,user,book}=req.body;

        if(!description || !user || !book ){
            return res.json({
                success:false,
                message:"any one field is empty"
            });
        }

        const data= await reviewModel.create({description,user,book});

        const updatebook =await bookModel.findByIdAndUpdate(book, {$push :{review:data._id}}, {new:true});
        const updateuser=await userModel.findByIdAndUpdate(user ,{$push :{review:data._id}}, {new:true});

        return res.json({
            success:true,
            data:data,
            message:"review is created successfully"
        })
    }
    catch(err){

        return res.json({
            success:false,
            error:err.message,
            message:"error is addReview"
        })
    
    }
}

exports.deleteReview=async(req,res)=>{
    try{
        const {review_id}=req.body;

        if(!review_id){
            return res.json({
                success:false,
                message:"review_id is empty"
            });
        };

        const review=await reviewModel.findById(review_id);

        if(req.payload.role=="admin" || req.payload.id==review.user){
            const data= await reviewModel.findByIdAndDelete(review_id);

            if(!data){
                return res.json({
                    success:false,
                    message:"this review id doesnot exist"
                });
            }

            const updateuser= await userModel.findByIdAndUpdate(data.user, {$pull : {review:review_id}},{new:true});
            const updatepost= await bookModel.findByIdAndUpdate(data.book,{$pull: {review:review_id}}, {new:true});

            return res.json({
                success:true,
                data:data
            });
        }
        

        return res.json({
            success:false,
            error:"only review's owner or admin can delete the review"
        })
    }
    catch(err){

        return res.json({
            success:false,
            error:err.message,
            message:"error is deleteReview"
        })
    
    }
}


exports.updateReview=async(req,res)=>{
    try{
        const {review_id,description}=req.body;

        if(!review_id){
            return res.json({
                success:false,
                message:"review_id is empty"
            });
        };

        const review=await reviewModel.findById(review_id);
       
        if(req.payload.id !=review.user){
            return res.json({
                success:false,
                error:"Only owner can update the review"
            })
        }
        const data= await reviewModel.findByIdAndUpdate(review_id,{description});

        if(!data){
            return res.json({
                success:false,
                message:"this review id doesnot exist"
            });
        }

        return res.json({
            success:true,
            data:data
        });
    }
    catch(err){

        return res.json({
            success:false,
            error:err.message,
            message:"error is updateReview"
        })
    
    }
}