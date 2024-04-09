const userModel=require("../model/userModel");
const bcrypt =require("bcrypt")
const jwt=require("jsonwebtoken");

exports.signUp=async (req,res)=>{
    try{
        const {name,email, password,role}=req.body;

        if(!name || !email || email=="" || !password || password==""){
            return res.json({
                success:false,
                error:"any of one field can not be empty"
            });
        }
        const isUser=await userModel.findOne({email:email});

        if(isUser){
            return res.json({
                success:false,
                error:"User already exist"
            })
        }

        const hashed=await bcrypt.hash(password ,10);

        const user=await userModel.create({name,email,password:hashed,role});

        return res.json({
            success:true,
            data:user
        })
    }
    catch(err){
        return res.josn({
            success:false,
            error:err.message
        })
    }
}

exports.login=async(req,res)=>{
    try{
        const {email, password}=req.body;

        if(!email || email=="" || !password || password==""){
            return res.json({
                success:false,
                error:"any one field is empty"
            });
        }

        

        const user=await userModel.findOne({email:email});

        if(!user){
            return res.status(404).json({
                suucess:false,
                error:"user does not exist"
            })
        }
        

        if(await bcrypt.compare(password, user.password)){
            const payload={
                email:user.email,
                id:user.id,
                name:user.name,
                role:user.role
            }

            let token=jwt.sign(payload, process.env.JWT_SECRET);

            user.password=undefined;

            const option={
                expires:new Date(Date.now() + 3*24*24*60*1000),
                httpOnly:true
           }

           res.cookie("token",token,option).status(200).json({
            success:true,
            token,
            user,
            message:'User login'
           });
        }

        else{
            return res.json({
                success:false,
                error:"Wrong password"
            })
        }
    }
    catch(err){
        return res.json({
            suucess:false,
            error:err.message
        })
    }
}