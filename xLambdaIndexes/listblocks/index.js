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
  let response = undefined
  let authed = await isVenueManager(event.authToken)
  if(authed){
      let getBlocks = (showID) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Blocks WHERE showID=?", [showID], (error, rows) => {
                if (error) { return reject(error); }
                return resolve(rows);
            })
        })
      }
      
      let blocks = await getBlocks(event.showID)
      response = {
        statusCode: 200,
        constant: blocks
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
