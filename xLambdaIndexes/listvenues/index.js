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

  let ListVenues = () => {
      return new Promise((resolve, reject) => {
          pool.query("SELECT * FROM Venues", [], (error, rows) => {
              if (error) { return reject(error); }
              return resolve(rows);
          })
      })
  }
  
  let response = undefined
  const all_venues = await ListVenues()
  const admin = await isAdmin(event.authToken);
  if(admin){
    response = {
    statusCode: 200,
    constants: all_venues
  }
    
  }else{
    response = {
    statusCode: 400,
    constants: false
  }
    
  }
  
  
  
  pool.end()     // close DB connections

  return response;
}

