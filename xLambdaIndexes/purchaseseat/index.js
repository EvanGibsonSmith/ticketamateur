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

  let PurchaseSeat = () => {
    return new Promise((resolve, reject) => {
        // check whether or not the seat is available
        pool.query("SELECT bought FROM seats WHERE 'showID'=? AND section=? AND row=? AND column=?", [event.showID], [event.section], [event.row], [event.column], (error, rows) => { //SQL
            if (error) { return reject(error); }//Error
            console.log(rows)
            // if seat has not been bought
            if(!bought){
              pool.query("UPDATE seats SET bought=? WHERE 'showID'=? AND section=? AND row=? AND column=?", [true], [event.showID], [event.section], [event.row], [event.column], (error, rows) => { //SQL
                if (error) { return reject(error); }//Error
                console.log(rows)
                if ((rows) && (rows.length == 1)) {//Should it return a line it means it exists 
                    return resolve(true); 
                } else {
                    return resolve(false);//Seat doesnt exist 
                }
              });
            }
            // seat already purchased
            else{
              return resolve(false);
            }
        });
    });
  }
  
  let response = undefined
  const result = await PurchaseSeat()
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
  
  
    pool.end()   // disconnect from database to avoid "too many connections" problem that can occur

  return response;
}