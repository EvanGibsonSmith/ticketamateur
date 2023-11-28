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
            pool.query("SELECT * FROM Venues WHERE name=?", [name], (error, rows) => {
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
      let createShow = (name, venue, time, date) => {
        return new Promise((resolve, reject) => {
            pool.query("INSERT into Shows(venueID,venueName) VALUES(?,?);", [randomInt(100),name], (error, rows) => {
                if (error) { return reject(error); }
                if ((rows) && (rows.affectedRows == 1)) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
      }
      
      let add_result = await createShow(event.nameShow,event.nameVenue, event.showTime,event.showDate)
      response = {
        statusCode: 200,
        
        success: add_result
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
