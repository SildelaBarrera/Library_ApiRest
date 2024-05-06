const mysql = require("mysql2");

let connection = mysql.createConnection(
    { 
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "ruralea0605",
    database: process.env.DB_NAME || "ruraleaDB",
    port: process.env.DB_PORT || 3306
    })

console.log("Conexión con la BBDD creada")

module.exports = {connection}