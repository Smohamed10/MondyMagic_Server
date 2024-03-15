const mysql = require("mysql");

let pool;

function handleDisconnect() {
  pool = mysql.createPool({
    connectionLimit: 10, // Adjust the number of connections as per your requirement
    host: "batzxafimantv3idqcnp-mysql.services.clever-cloud.com",
    user: "ufc28uhckarynlxo",
    password: "zf9V3fxnlPyszhss91Ia",
    database: "batzxafimantv3idqcnp",
    port: "3306"
  });

  pool.on('error', function (err) {
    console.log('DB pool error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect(); // Reconnect if the connection is lost
    } else {
      throw err;
    }
  });
}

handleDisconnect(); // Call the function to initiate the connection

module.exports = pool;
