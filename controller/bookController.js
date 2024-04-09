const bookModel=require("../model/bookModel");

// get all book using async and await 
exports.getAllBooks=async (req,res)=>{

    try{
        let data=await bookModel.find();

        if(!data){
            return res.json({
                success:true,
                message:"No data present"
            });
        };

        return res.json({
            success:true,
            data:data
        });
    }
    catch(err){
        return res.json({
            success:false,
            message:"Error in geting all books",
            error:err.message
        })
    }
};


// get by Isbn Number using promise 
exports.getByIsbn=(req,res)=>{

    const isbn = req.params.isbn;

    if (!isbn) {
        return res.status(400).json({
            success:false,
            error: 'ISBN is required' 
            });
    }

    // Call the function to search for books by ISBN
    searchBooksByISBN(isbn)
        .then(book => {
            if(book.length==0){
                return res.json({
                    success:true,
                    message:"This book is not present",
                    data:book
                });
            }
            else{
                return res.json({
                    success:true,
                    data:book
                });
            }
        })
        .catch(err => {
            return res.status(500).json({ 
                success:false,
                error: 'Internal server error'
            });
        });
}

function searchBooksByISBN(isbn) {
    return new Promise((resolve, reject) => {
        // Query the database to find books by ISBN
        bookModel.find({ ISBN: isbn })
            .then(books => {
                resolve(books);
            })
            .catch(err => {
                reject(err);
            });
    });
}

// search book by author name 
exports.getBookByAuthor= async(req,res)=>{
    try{
        const author=req.params.author;

        if(!author){
            return res.json({
                success:false,
                message:"author field is empty"
            });
        };

        const data=await bookModel.find({author:author});

        return res.json({
            success:true,
            data:data
        });

    }
    catch{
        return res.json({
            success:false,
            message:"Error in getting book by author",
            error:err.message
        })
    }

}


// search book by title name 
exports.getAllBookByTitle=async(req,res)=>{
    try{
        const title=req.params.name;

        if(!title){
            return res.json({
                success:false,
                message:"title field can't be empty"
            });
        };

        const data=await bookModel.find({title:title});

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

exports.addBook= async(req,res)=>{
    try{
        const {title , author, ISBN }=req.body;

        const data= await bookModel.create({title,author,ISBN });

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