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
  let getSeatPurchased =(section, srow,erow,showID)=> {
    return new Promise((resolve, reject) => {
          pool.query("SELECT Count(seatBought) as seatSold FROM Seats WHERE showID = ? AND sectionName =? AND seatRow>=? AND seatRow<=? AND seatBought=1 GROUP BY seatBought ", [showID,section, srow,erow], (error, rows) => {
              if (error) { return reject(error); }
              if ((rows) && (rows.length != 0)) {
                  console.log(rows)
                  return resolve(rows);
              } else {
                  return resolve(false);
              }
          });
    });
  }
  let getSeatTotal =(section, srow,erow,showID)=> {
    return new Promise((resolve, reject) => {
          pool.query("SELECT Count(*) as seatTotal FROM Seats WHERE showID = ? AND sectionName =? AND seatRow>=? AND seatRow<=?", [showID,section, srow,erow], (error, rows) => {
              if (error) { return reject(error); }
              if ((rows) && (rows.length != 0)) {
                  return resolve(rows);
              } else {
                  console.log(rows)
                  return resolve(false);
              }
          });
    });
  }
  let getBlocksData = () =>{
     return new Promise((resolve, reject) => {
          pool.query("SELECT * from Blocks WHERE showID = ?", [event.showID], (error, rows) => {
              if (error) { return reject(error); }
              if ((rows) && (rows.length != 0)) {
                  return resolve(rows);
              } else {
                  console.log(rows)
                  return resolve(false);
              }
          });
    });
    
  }
  
  
  let response = undefined
  let authed = await isVenueManager(event.authToken)
  if(authed){
      let blockData = await getBlocksData(event.showID)
      console.log(blockData)
      let blocks = []
      console.log("RUNNING")
      for(let i = 0; i< blockData.length ; i++){
        console.log("RUNNING")
        let sRow = blockData[i].startRow
        let eRow = blockData[i].endRow
        let section = blockData[i].showSection
        let showID = blockData[i].showID
        let totalSeats = await getSeatTotal(section,sRow,eRow,showID) 
        let totalSeat = totalSeats[0].seatTotal
        let price = blockData[i].price
        let blockID = blockData[i].blockID
        let purchasedSeats = await getSeatPurchased(section,sRow,eRow,showID)
        console.log(purchasedSeats)
        let purchasedSeat = 0
        if(purchasedSeats){
           purchasedSeat = purchasedSeats[0].seatSold
        }
        let seatsLeft =totalSeat -purchasedSeat
        let pay = {"showID": showID, "sectionName":section, "startRow":sRow, "endRow":eRow, "purchasedSeats":purchasedSeat, "totalSeats": totalSeat, "price":price, "blockID":blockID, "remainingSeats":seatsLeft}
        //console.log(pay)
        blocks.push(pay)
      }
      
      response = {
        statusCode: 200,
        constant: blocks
      }
  } else {
      response = {
        statusCode: 400,
        success: false
      };
  }
  pool.end();   // done with DB
  return response;
};
