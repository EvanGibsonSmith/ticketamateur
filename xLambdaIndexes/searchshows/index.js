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
  
  let SearchShows = () => {
      return new Promise((resolve, reject) => {
          pool.query("SELECT * FROM Shows WHERE ((LOWER(venueName) LIKE '%"+event.search+"_%') AND (activated=TRUE))", [], (error, rows) => {
            if (error) { return reject(error); }
            return resolve(rows);
        })
      })
  }

  const searched_shows = await SearchShows()
  response = {
      statusCode: 200,
      constants: searched_shows,
  }
  
  pool.end()     // close DB connections

  return response;
}
