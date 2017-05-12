var mysql = require('mysql');

function createDBConnection(){
    return mysql.createConnection({
        host : '192.168.1.32',
        user : 'root',
        password : 'root',
        database : 'casadocodigo_nodejs'
    });
}

//wrapper
module.exports = function(){
    return createDBConnection;
}