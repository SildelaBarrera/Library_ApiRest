
const {connection} = require("../database")


const getBooks = async (request,response) =>
{
    try{
        let sql;
        let params;
        if (request.query.id_book != null){
            params = [request.query.id_book, request.query.id_user]
            sql = "SELECT * FROM book WHERE id_book = ? AND id_user = ?"

            let [result] = await connection.query(sql, params);
            // console.log(result);
            if(result[0] == null){
                respuesta = {error: true, codigo: 200, message: "The book has not been found"};
                }
                else {
                    respuesta = {error: false, codigo: 200, message: "This is the book", dataBook: result[0]}
                }
            }
        else{
            sql= "SELECT * FROM book WHERE id_user = ?" 
            params = [request.query.id_user]
            // console.log(params);
            let [result] = await connection.query(sql, params);
            // console.log(result);
                    
            if (result.length >= 1){
                respuesta = {error: false, codigo: 200, message: "These are the books ", dataLibrary: result};    
            }else {
                respuesta = {error: false, codigo: 200, message: "There are no books"};    
            }
        }
        response.send(respuesta);     
    
    }
    catch(error){
        console.log(error);
    }
}


    
const postBook = async (request, response) =>
{
    try{
        
        let params = [request.body.id_user, request.body.title, request.body.type, request.body.author, request.body.price, 
            request.body.photo];
            // console.log(params);
        let sql = "INSERT INTO book (id_user, title, type, author, price, photo)" +
        "VALUES (?, ?, ?, ?, ?, ?)"

        let[result] = await connection.query(sql, params);
        // console.log(result);
        respuesta = {error: false, codigo: 200, message: 'This book has been added succesfully.', dataBook: result}
        response.send(respuesta); 
    }
    catch(error){
        console.log(error);
    }      
}
const putBook = async (request, response) =>
{
    try{
        let params =[request.body.id_book, request.body.id_user]
        let sql = "SELECT * FROM book WHERE id_book = ? AND id_user = ?"
        let [result] = await connection.query(sql, params)
        // console.log[result]
        // console.log(result[0]);
        
        if(result[0] != undefined){
            if (request.body.title == ""){
                request.body.title = undefined;
            }
            if (request.body.type == ""){
            request.body.type = undefined;
            }
            if (request.body.author == ""){
            request.body.author = undefined;
            }
            if (request.body.price == ""){
            request.body.price= undefined;
            }
            if (request.body.photo == ""){
                request.body.photo= undefined;
            }
            
            let params = [  
                        request.body.title,
                        request.body.type,
                        request.body.author,
                        request.body.price,
                        request.body.photo,
                        request.body.id_book
                        ]
            let sql = "UPDATE book SET title = COALESCE(?, title), type = COALESCE(?, type), author = COALESCE(?, author), price = COALESCE(?, price),  "
             +  "photo = COALESCE(?, photo) WHERE id_book = ?";

            let[result] = await connection.query(sql, params);
            console.log(result)
            respuesta = {error: false, codigo: 200, message: 'This book has been edited successfully.'}
            
        }
        else{
            respuesta = {error: true, codigo: 200, message: 'The book has not been found.'}
        }
        response.send(respuesta); 
    }
    catch(error){
        console.log(error);
    }
}

const deleteBook= async (request, response) =>
{
    try{
        console.log(request.body);
        let params = [request.body.id_book]
        let sql = "DELETE FROM book WHERE id_book = ?";

        let[result] = await connection.query(sql, params);
        console.log(result);
        respuesta = {error: false, codigo: 200, message: 'Deleted book', dataBook: sql}
        response.send(respuesta); 
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {getBooks, postBook, putBook, deleteBook};