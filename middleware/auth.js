const jwt =require("jsonwebtoken")
require("dotenv").config();

exports.auth=(req,res,next)=>{
    try{
    const token=req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");
       
    if(!token){
        return res.status(401).json({
            success:false,
            error:"User is not login"
        })
    }

    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.payload=decode;

    }
    catch(err){
        return res.status(401).json({
            success:false,
            error:err.message,
            message:"invalid tokens"
        })
    }
      next();
    }
    catch(err){
        
        return res.json({
            success:false,
            error:err.message
            
        })
    }

}