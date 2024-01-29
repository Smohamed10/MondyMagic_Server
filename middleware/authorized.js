const connection = require("../db/dbConnection");
const util = require("util"); // helper 

const authorized = async (req,res,next)=>{
    
    const query = util.promisify(connection.query).bind(connection);
    const {token} = req.headers;
    const user = await query("select * from user where token =?",[token]);
    if(user[0])
    {
        next();
    }
    else
    {
        res.status(403).json({
            msg:"YOU ARE NOT AUTHORIZED TO THIS ROUTE....."
        })
    }
    
}


module.exports = authorized;