const {Router} = require ("express")
const router = Router();
const booksCtrl = require("../controller/book.controller");
const usersCtrl = require("../controller/user.controller")

router.post("/register", usersCtrl.postUser1);

router.post("/login", usersCtrl.postUser2);

router.put("/user", usersCtrl.putUser);

router.get("/book", booksCtrl.getBooks);
        
router.post("/book", booksCtrl.postBook);
        
router.put("/book", booksCtrl.putBook);
        
router.delete("/book", booksCtrl.deleteBook); 

module.exports = router;


