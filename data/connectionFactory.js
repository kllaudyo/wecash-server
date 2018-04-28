const mysql = require('mysql');

function doConnection(){
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'wcschema'
    });
}

module.exports = function(){return doConnection};
