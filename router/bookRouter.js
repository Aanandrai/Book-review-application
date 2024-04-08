const express=require("express");
const {getAllBooks, getByIsbn,getBookByAuthor,getAllBookByTitle,addBook}=require("../controller/bookController");

const bookRouter=express.Router();

bookRouter.get("/allBook",getAllBooks);
bookRouter.get("/:isbn",getByIsbn);
bookRouter.get("/allBook/:author",getBookByAuthor);
bookRouter.get("/title/:name",getAllBookByTitle);

bookRouter.post("/add",addBook);


module.exports=bookRouter;