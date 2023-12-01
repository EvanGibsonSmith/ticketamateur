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
  let deleteShow = (id) => {
      return new Promise((resolve, reject) => {
            pool.query("DELETE FROM Shows WHERE showID=? AND activated !=1", [id], (error, rows) => {
                if (error) { return reject(error); }
                if ((rows) && (rows.affectedRows == 1)) {
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
    const result = await deleteShow(event.showID)
    if(result){
        response = {
        statusCode: 200,
        
        body: JSON.stringify(result)
        }
    }else{
        response = {
            statusCode: 400,
            error: "No Show Under That ID that is Inactive"
            }
    }
    

  }else{
    response = {
        statusCode: 400,
        error: "Not Authorized"
        }

  }
    

   
    
  
    pool.end()   // disconnect from database to avoid "too many connections" problem that can occur

  return response;
}


