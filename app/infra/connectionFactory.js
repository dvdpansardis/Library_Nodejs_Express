var mysql = require('mysql');

function createDBConnection(){
    if(!process.env.NODE_ENV || process.env.node === 'dev'){
        return mysql.createConnection({
            host : '192.168.1.32',
            user : 'root',
            password : 'root',
            database : 'casadocodigo_nodejs'
        });
    }
    if(process.env.NODE_ENV == 'test'){
        return mysql.createConnection({
            host : '192.168.1.32',
            user : 'root',
            password : 'root',
            database : 'casadocodigo_nodejs_teste'
        });
    }
    
}

//wrapper
module.exports = function(){
    return createDBConnection;
}