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
  
  let DeleteVenue = (name) => {
      return new Promise((resolve, reject) => {
            pool.query("DELETE FROM Venues WHERE name=?", [name], (error, rows) => {
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
  try {
    const result = await DeleteVenue(event.name)

    response = {
      statusCode: 200,
      
      body: JSON.stringify(result)
    }
  } catch (err) {
    response = {
      statusCode: 400,
      error: err
    }
  } finally {
    pool.end()   // disconnect from database to avoid "too many connections" problem that can occur
  }

  return response;
}


