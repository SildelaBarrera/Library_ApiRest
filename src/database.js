const mysql = require("mysql2");
// const password = require("./workbenchPassword")

let connection = mysql.createConnection(
    { 
    host:  "localhost",
    user:  "root",
    password: "L1brary01..",
    database: "appbooks",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0
    }).promise();

console.log("Conexión con la BBDD creada")

module.exports = {connection}