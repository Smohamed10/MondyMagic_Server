const mysql = require("mysql");

const connection = mysql.createConnection({
    host:"batzxafimantv3idqcnp-mysql.services.clever-cloud.com",
    user:"ufc28uhckarynlxo",
    password:"zf9V3fxnlPyszhss91Ia",
    database:"batzxafimantv3idqcnp",
    port:"3306"
})

connection.connect((err)=>{
    if(err)
    {
        throw err ;
    }
    console.log("DATABASE IS CONNECTED");
})

module.exports = connection ;