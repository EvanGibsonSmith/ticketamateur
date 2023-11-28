const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');
const { randomInt } = require('crypto');

exports.handler = async (event) => {
  
  // get credentials from the db_access layer (loaded separately via AWS console)
  var pool = mysql.createPool({
      host: db_access.config.host,
      user: db_access.config.user,
      password: db_access.config.password,
      database: db_access.config.database
  });
  
  let isVenueManager = (auth) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM VenueManagers WHERE auth=?", [auth], (error, rows) => {
                if (error) { return reject(error); }
                console.log(rows)
                if ((rows) && (rows.length == 1)) {
                    return resolve(true); 
                } else {
                    return resolve(false);
                }
            });
        });
  }

  let isAdmin = (auth) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM Admins WHERE auth=?", [auth], (error, rows) => {
            if (error) { return reject(error); }
            console.log(rows)
            if ((rows) && (rows.length == 1)) {
                return resolve(true); 
            } else {
                return resolve(false);
            }
        });
    });
}
  
    let response = undefined
    const admin = await isVenueManager(event.authToken);
    const manager = await isAdmin(event.authToken);
  if(!admin){
      response = {
        statusCode: 200,
        
        body: {"type" : "Admin"}

      }
  } else if (!manager){
    response = {
        statusCode: 200,
        
        body: {"type" : "manager"}
        
      }

  }else{
      response = {
        statusCode: 400,
        
        body: {"type" : "false"}
      };
  }

  pool.end();   // done with DB
  return response;
};
