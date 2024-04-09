const express=require("express");
const {getAllBooks, getByIsbn,getBookByAuthor,getAllBookByTitle,addBook}=require("../controller/bookController");
const {isAdmin}=require("../middleware/isAdmin")
const {auth}=require("../middleware/auth");

const bookRouter=express.Router();

bookRouter.get("/allBook",getAllBooks);
bookRouter.get("/:isbn",getByIsbn);
bookRouter.get("/allBook/:author",getBookByAuthor);
bookRouter.get("/title/:name",getAllBookByTitle);

bookRouter.post("/add",auth ,isAdmin ,addBook);


module.exports=bookRouter;