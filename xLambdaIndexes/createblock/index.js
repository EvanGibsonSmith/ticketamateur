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
  let response = undefined
  let authed = await isVenueManager()
  if(authed){
      let createBlock = (showID, section, price, startRow, endRow) => {
        return new Promise((resolve, reject) => {
            pool.query("INSERT into Blocks(blockID, startRow, endRow, showSection, price, showID) VALUES(?,?,?,?,?,?);", [randomInt(1000000000),startRow,endRow,section,price,showID], (error, rows) => {
                if (error) { return reject(error); }
                if ((rows) && (rows.affectedRows == 1)) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
      }
      let getBlocks = (showID) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Blocks WHERE showID=?", [showID], (error, rows) => {
                if (error) { return reject(error); }
                return resolve(rows);
            })
        })
      }
      let updateSeats =()=>{
          return new Promise((resolve, reject) => {
            pool.query("UPDATE Seats SET seatPrice =? WHERE showID = ? AND sectionName =? AND seatRow>=? AND seatRow<=?", [event.price,event.showID,event.section, event.startRow,event.endRow], (error, rows) => {
                if (error) { return reject(error); }
                if ((rows) && (rows.affectedRows != 0)) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
          
      }
      let add_result = await createBlock(event.showID,event.section, event.price, event.startRow, event.endRow)
      let blocks = await getBlocks(event.showID)
      let updatedSeatPrices = await updateSeats()
      response = {
        statusCode: 200,
        constant: blocks
      }
  } else {
      response = {
        statusCode: 400,
        
        success: authed
      };
  }
  pool.end();   // done with DB
  return response;
};
