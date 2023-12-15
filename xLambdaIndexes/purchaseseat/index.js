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
  let soldSeat = () => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM"+ " Seats WHERE showID=? AND sectionName=? AND seatRow=? AND seatColumn=? AND seatBought = 1", [event.showID, event.section, event.row, event.column], (error, rows) => {
                if (error) { return reject(error); }
                if ((rows) && (rows.length == 1)) {
                    return resolve(true); 
                } else {
                    return resolve(false);
                }
            });
        });
  }

let PurchaseSeat = () => {
    return new Promise((resolve, reject) => {
            //console.log("TESTESTE")
            pool.query("UPDATE Seats SET seatBought=? WHERE showID=? AND sectionName=? AND seatRow=? AND seatColumn=?", [1, event.showID, event.section, event.row, event.column], (error, rows) => {
            //console.log("TESTESTE")
            if (error) { return reject(error); }
            if ((rows) && (rows.affectedRows == 1)) {
                return resolve(rows);
            } else {
                return resolve(false);
            }
        });
    });
  }
  let updateCounter = () =>{
      return new Promise((resolve, reject) => {
            //console.log("TESTESTE")
            pool.query("UPDATE Shows SET seatsSold= seatsSold + 1 WHERE showID=?", [event.showID], (error, rows) => {
            //console.log("TESTESTE")
            if (error) { return reject(error); }
            if ((rows) && (rows.affectedRows == 1)) {
                return resolve(true);
            } else {
                return resolve(false);
            }
        });
    });
  }
  let checkStillOpen=()=>{
      return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Shows WHERE showID=? AND showDate<=? AND showTime<=?", [event.showID,event.date,event.time], (error, rows) => {
                if (error) { return reject(error); }
                if ((rows) && (rows.length == 1)) {
                    return resolve(true); 
                } else {
                    return resolve(false);
                }
            });
        });
  }
  let updateRevenue=()=>{
      return new Promise((resolve,reject) => {
          pool.query("UPDATE Shows SET revenue= revenue + ? WHERE showID=?", [event.cost, event.showID], (error, rows) => {
              if (error) { return reject(error); }
              else {return resolve(true); }
          });
      });
  }
  
  let response = undefined
  let sold = await soldSeat()
  if(!sold){
    const result = await PurchaseSeat()
    const upped = await updateCounter()
    const past = await checkStillOpen()
    if(!past){
        const revenue = await updateRevenue()
     response = {
         statusCode: 200,
         body:result,
         updated: upped
        }
    }else{
        response = {
      statusCode: 402,
      body: {"error":"Show start time has passed."}
    }
    }
    }else{
      response = {
      statusCode: 400,
      body: {"error":"Seat Sold"}
    }
      
    }
    
  
  
  pool.end()   // disconnect from database to avoid "too many connections" problem that can occur

  return response;
}