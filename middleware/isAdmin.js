
exports.isAdmin=async(req,res,next)=>{

    try{
        if(req.payload.role!="admin"){
            return res.json({
                success:false,
                error:"This is protected route for admin"
            })
        }
        next();

    }catch(err){
        return res.json({
            success:false,
            error:err.message
        })
    }
}