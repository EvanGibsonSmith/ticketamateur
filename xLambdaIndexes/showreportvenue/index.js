const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access')

exports.handler = async (event) => {
  
  // get credentials from the db_access layer (loaded separately via AWS console)
  var pool = mysql.createPool({
      host: db_access.config.host,
      user: db_access.config.user,
      password: db_access.config.password,
      database: db_access.config.database
  });
  let isVenueManager = () => {
      return new Promise((resolve, reject) => {
          pool.query("SELECT * FROM Venues WHERE authKey=?", [event.authToken], (error, rows) => {
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
  let ListShowReport = () => {
      return new Promise((resolve, reject) => {
          pool.query("SELECT * FROM Shows WHERE venueName =?", [event.nameVenue], (error, rows) => {
            if (error) { return reject(error); }
            return resolve(rows);
        })
      })
  }
  let response =undefined
  const showData = await ListShowReport()
  let manager = await isVenueManager()
  if(manager){
   response = {
    statusCode: 200,
    constants: showData
  }
  }else{
    response = {
    statusCode: 400,
    error:"NOT A MANAGER"
  }
  }
  pool.end()     // close DB connections

  return response;
}

