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
  
  let ValidateExists = (name) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Venues WHERE venueName=?", [name], (error, rows) => {
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
  const can_create = await ValidateExists(event.nameVenue);

  if (!can_create) {
      let CreateConstant = (name,numRows, numSeatsLeft,numSeatsCenter,numSeatsRight,auth) => {
        return new Promise((resolve, reject) => {
            pool.query("INSERT into Venues(venueName,numRows,numSeatsLeft, numSeatsCenter,numSeatsRight, authKey) VALUES(?,?,?,?,?,?);", 
                        [name,numRows,numSeatsLeft,numSeatsCenter,numSeatsRight,auth], (error, rows) => {
                if (error) { return reject(error); }
                if ((rows) && (rows.affectedRows == 1)) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
      }
      let new_auth = randomInt(1000000000)
      let add_result = await CreateConstant(event.nameVenue, event.numberOfRows,event.leftSeats, event.centerSeats,event.rightSeats, new_auth)
      
      response = {
        statusCode: 200,
        
        success: new_auth, 
      }
  } else {
      response = {
        statusCode: 400,
        
        success: false
      };
  }

  pool.end();   // done with DB
  return response;
};
