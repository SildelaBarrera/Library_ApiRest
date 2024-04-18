const {connection} = require("../database");

const postUser1 = async (request, response) =>
{
    try{
        let sql = "SELECT email FROM user WHERE email= ?"
        let [result] = await connection.query(sql, request.body.email)

        if( result[0] != undefined){
            respuesta = {error: true, codigo: 200, message: 'This user already exists.'}
        }
        else{ 
                let params = [request.body.name, request.body.last_name, request.body. email, request.body.photo, request.body.password]
                let sql = "INSERT INTO user (name, last_name, email, photo, password) " +
                "VALUES (?, ?, ?, ?, ?)"
            
                let[result] = await connection.query(sql, params);
                console.log(result);
                respuesta = {error: false, codigo: 200, message: 'This user has been registered succesfully.', dataUser: result[0]}
                response.send(respuesta)
        }
        response.send(respuesta)
    }
    catch(error){
        console.log(error);
    }      
}

const postUser2 = async (request, response) =>
{
    try{
        let sql = "SELECT id_user, name, last_name, email, photo, password FROM user WHERE email= ?"
        let [result] = await connection.query(sql, request.body.email)
        console.log(result[0]);
        
        if (result[0] != undefined){
            if (result[0].password == request.body.password){
                respuesta = {error: false, codigo: 200, message: 'User logged in', dataUser: result[0]}
            }
            else{
                respuesta = {error: true, codigo: 200, message: 'Incorrect username or password'}
            }
        }
        else{
            respuesta = {error: true, codigo: 200, message: 'Incorrect username or password'}
        }
        response.send(respuesta);
    }
    catch(error){
        console.log(error);
    }      
}
const putUser = async (request, response) =>
{
    try{
        let params =[request.body.id_user]
        let sql = "SELECT id_user FROM user WHERE id_user = ?"
        let [result] = await connection.query(sql, params)
        
        console.log(result[0]);
        if(result[0] != undefined){
            if (request.body.name == ""){
                request.body.name = undefined;
            }
            if (request.body.lastName == ""){
            request.body.lastName = undefined;
            }
            if (request.body.email == ""){
            request.body.email = undefined;
            }
            if (request.body.photo == ""){
            request.body.photo = undefined;
            }
            params = [  
                request.body.name,
                request.body.lastName,
                request.body.email,
                request.body.photo,
                request.body.id_user]
            sql = "UPDATE user SET name = COALESCE(?, name), last_name = COALESCE(?, last_name), email = COALESCE(?, email), photo = COALESCE(?, photo)  "
             +  " WHERE id_user = ?;";
            [result] = await connection.query(sql, params);
            console.log(result)


            respuesta = {error: false, codigo: 200, message: 'This user has been edited succesfully.', dataUser: result[0]}
            }
        else{
            respuesta = {error: true, codigo: 200, message: 'The user has not been found'}
        }    
        response.send(respuesta); 
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {postUser1, postUser2, putUser};