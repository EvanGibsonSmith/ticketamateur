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
  
  let ListShowReport = () => {
      return new Promise((resolve, reject) => {
          pool.query("SELECT * FROM Shows", [], (error, rows) => {
            if (error) { return reject(error); }
            return resolve(rows);
        })
      })
  }
  
  const showData = await ListShowReport()
  
  const response = {
    statusCode: 200,
    constants: showData
  }
  
  pool.end()     // close DB connections

  return response;
}

