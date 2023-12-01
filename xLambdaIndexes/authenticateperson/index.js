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
            pool.query("SELECT * FROM Venues WHERE authKey=?", [auth], (error, rows) => {
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
let getVenueInfo = (auth) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM Venues WHERE authkey=?", [auth], (error, rows) => {
            if (error) { return reject(error); }
            console.log(rows)
            if ((rows) && (rows.length == 1)) {
                return resolve(rows); 
            } else {
                return resolve(false);
            }
        });
    });
}
  
    let response = undefined
    const manager = await isVenueManager(event.authToken);
    const admin = await isAdmin(event.authToken);
  if(admin){
      response = {
        statusCode: 200,
        
        body: {"type" : "Admin"}
        

      }
  } else if (manager){
      let venueInfo = await getVenueInfo(event.authToken)
    response = {
        statusCode: 200,
        
        body: {"type" : "manager"},
        constant: venueInfo
            
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
