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
  let listActiveShows = () => {
      return new Promise((resolve, reject) => {
          pool.query("SELECT * FROM Shows where activated = ? ORDER BY showDate, showTime", [1], (error, rows) => {
            if (error) { return reject(error); }
            return resolve(rows);
        })
      })
  }
  let response = undefined
    const all_shows = await listActiveShows()
    response = {
        statusCode: 200,
        constants: all_shows
    } 
  
  
    
  
  pool.end()     // close DB connections

  return response;
}
