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
  
let getAvailableSeats = (showIDs) => {
    return new Promise((resolve, reject) => {
        pool.query("(SELECT * FROM Seats WHERE ((showID IN ?) AND (seatBought=0)))", [showIDs], (error, rows) => {
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
const seats = await getAvailableSeats(event.selectedShows);

// TODO generate body for the response
response = {
statusCode: 200,

body: {"seats": seats}
}

  pool.end();   // done with DB
  return response;
};
