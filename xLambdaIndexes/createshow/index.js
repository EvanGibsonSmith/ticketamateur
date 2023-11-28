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
            pool.query("SELECT * FROM Shows WHERE name=?", [name], (error, rows) => {
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
  let getShows = (venue) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM Shows WHERE venueName=?", [venue], (error, rows) => {
            if (error) { return reject(error); }
            return resolve(rows);
        })
    })
}
  let response = undefined
  const can_create = await ValidateExists(event.nameShow);

  if (!can_create) {
      let createShow = (name, venue, time, date) => {
        return new Promise((resolve, reject) => {
            pool.query("INSERT into Shows(showID, showName, showTime, showDate, soldOut, activated, venueName) VALUES(?,?,?,?,?,?,?);", [randomInt(1000000000),name,time,date,0,0,venue], (error, rows) => {
                if (error) { return reject(error); }
                if ((rows) && (rows.affectedRows == 1)) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
      }
      
      let add_result = await createShow(event.nameShow,event.nameVenue, event.showTime, event.showDate)
      response = {
        statusCode: 200,
        
        body: JSON.stringify(getShows(event.nameVenue))
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
