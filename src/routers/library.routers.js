const {Router} = require ("express")
const router = Router();
const booksCtrl = require("../controller/book.controller");
const usersCtrl = require("../controller/user.controller")
// const booksTestCtrl = require("../controller/bookTest.controller.js")

router.post("/register", usersCtrl.postUser1);

router.post("/login", usersCtrl.postUser2);

router.put("/user", usersCtrl.putUser);

router.get("/book", booksCtrl.getBooks);
  
router.post("/book", booksCtrl.postBook);
        
router.put("/book", booksCtrl.putBook);
        
router.delete("/book", booksCtrl.deleteBook); 


// router.get("/books", booksTestCtrl.getAllBooks);
// router.delete("/books", booksTestCtrl.deleteBook); 
// router.post("/books", booksTestCtrl.postBook); 

module.exports = router;


