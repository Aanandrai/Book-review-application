const express=require("express");
const {getAllReview ,getReviewByIsbn, addReview, deleteReview,updateReview}=require("../controller/reviewController");
const {auth}=require("../middleware/auth");
const reviewRouter=express.Router();


reviewRouter.get("/getReview/",getAllReview);
reviewRouter.get("/getReview/:isbn",getReviewByIsbn);

reviewRouter.post("/addReview",auth ,addReview);
reviewRouter.patch("/updateReview",auth ,updateReview);
reviewRouter.delete("/deleteReview",auth,deleteReview);

module.exports=reviewRouter;