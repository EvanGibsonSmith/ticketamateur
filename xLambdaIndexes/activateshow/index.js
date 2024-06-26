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
  //Used to chek if the authentication code is actually tied to a venue
  let isVenueManager = (auth) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM Venues WHERE authKey=?", [auth], (error, rows) => { //SQL
            if (error) { return reject(error); }//Error
            console.log(rows)
            if ((rows) && (rows.length == 1)) {//Should it return a line it means it exists 
                return resolve(true); 
            } else {
                return resolve(false);//Doesnt Exist 
            }
        });
    });
  }
  
  let ActivateShow = () => {
      return new Promise((resolve, reject) => {
            pool.query("UPDATE Shows SET activated=1 WHERE showID =?", [event.showID], (error, rows) => {
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
    const result = await ActivateShow()
    if(result){
      response = {
      statusCode: 200,
      
      body: JSON.stringify(result)
    }
    }else{
      response = {
      statusCode: 400,
      error: "Show Does Not Exist"
    }
    }
  }else{
    response = {
      statusCode: 400,
      error: "not Authorized"
    }
  }
  
  
    pool.end()   // disconnect from database to avoid "too many connections" problem that can occur

  return response;
}


