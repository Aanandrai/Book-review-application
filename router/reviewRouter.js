const express=require("express");
const {getAllReview ,getReviewByIsbn, addReview, deleteReview}=require("../controller/reviewController");

const reviewRouter=express.Router();


reviewRouter.get("/getReview/",getAllReview);
reviewRouter.get("/getReview/:isbn",getReviewByIsbn);

reviewRouter.post("/addReview",addReview);
// reviewRouter.patch("/updateReview",updateReview);
reviewRouter.delete("/deleteReview",deleteReview);

module.exports=reviewRouter;