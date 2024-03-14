const mysql = require("mysql");

let connection;

function handleDisconnect() {
  connection = mysql.createConnection({
    host: "batzxafimantv3idqcnp-mysql.services.clever-cloud.com",
    user: "ufc28uhckarynlxo",
    password: "zf9V3fxnlPyszhss91Ia",
    database: "batzxafimantv3idqcnp",
    port: "3306"
  });

  connection.connect((err) => {
    if (err) {
      console.log('Error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // Attempt to reconnect after a delay
    }
    console.log("DATABASE IS CONNECTED");
  });

  connection.on('error', function (err) {
    console.log('DB error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect(); // Reconnect if the connection is lost
    } else {
      throw err;
    }
  });
}

handleDisconnect(); // Call the function to initiate the connection

module.exports = connection;
