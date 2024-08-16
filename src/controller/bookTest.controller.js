const {connection} = require("../database")


const getAllBooks = async (request,response) =>
    {
        try{
            let sql;
            let params;
            
                sql = "SELECT * FROM appbooks.book;"
    
                let [result] = await connection.query(sql, params);
                
                console.log(result);
                
                    respuesta = {error: false, codigo: 200, message: "These are the book", data: result}
                    response.send(respuesta.data);    
                }
         
        catch(error){
            console.log(error);
        }
    }

    const deleteBook= async (request, response) =>
        {
            try{
            
                let params = [request.query.id_book]
                let sql = "DELETE FROM book WHERE id_book = ?";
        
                let[result] = await connection.query(sql, params);
                console.log(result);

                respuesta = {error: false, codigo: 200, message: 'Deleted book', dataBook: "Affected row " + result.affectedRows}
                response.send(respuesta); 
            }
            catch(error){
                console.log(error);
            }
        }

        const postBook = async (request, response) =>
            {
                try{
                    
                    let params = [request.body.title, request.body.type, request.body.author, request.body.price, 
                        request.body.photo];
                        console.log(params);
                    let sql = "INSERT INTO book (title, type, author, price, photo)" +
                    "VALUES (?, ?, ?, ?, ?)"
            
                    let[result] = await connection.query(sql, params);
                    console.log(result);
                    respuesta = {error: false, codigo: 200, message: 'This book has been added succesfully.', dataBook: result}
                    response.send(respuesta); 
                }
                catch(error){
                    console.log(error);
                }      
            }

    module.exports = {getAllBooks, deleteBook, postBook};