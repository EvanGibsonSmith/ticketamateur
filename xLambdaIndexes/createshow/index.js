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
  
  let ValidateExists = (time,date) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Shows WHERE showTime=? AND showDate=? AND venueName =?", [time, date, event.venueName], (error, rows) => {
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
   let getShows = (venue) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM Shows WHERE venueName=?", [venue], (error, rows) => {
            if (error) { return reject(error); }
            return resolve(rows);
        })
    })
    }
    let createShow = (ID,name, venue, time, date, price, totalSeat) => {
        return new Promise((resolve, reject) => {
            pool.query("INSERT into Shows(showID, showName, showTime, showDate, showPrice, seatsSold, totalSeats, soldOut, activated, venueName, revenue) VALUES(?,?,?,?,?,?,?,?,?,?,?);", [ID,name,time,date,price,0,totalSeat,0,0,venue,0], (error, rows) => {
                if (error) { return reject(error); }
                if ((rows) && (rows.affectedRows == 1)) {
                    
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
      }
      let insertSeat = (ID,section,row,col) =>{
          return new Promise((resolve, reject) => {
            pool.query("INSERT into Seats(showID, sectionName, seatRow, seatColumn, seatBought, seatPrice) VALUES(?,?,?,?,false,?);", [ID,section,row,col,event.showPrice], (error, rows) => {
                if (error) { return reject(error); }
                if ((rows) && (rows.affectedRows == 1)) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
      }
    let iterateSeats = (ID,section,rows,col) =>{
        let overflow = 0;
        let currentRow = ""
        for(let i = 0; i<rows;i++){
            if(i<25){
                currentRow = String.fromCharCode(65 + i)
            }else{
                currentRow = String.fromCharCode(65 + overflow) + String.fromCharCode(65 + i-((overflow+1)*25))
                if(i % 25 == 0 && i != 25){
                    overflow++;
                }
            }
            for(let j = 1; j<col+1; j++){
                console.log("ROW NAME:" + currentRow)
                let inserted = insertSeat(ID,section,currentRow,j)
                console.log(inserted)
            }
        }
    }
    let makeSeats = (ID) =>{
        let rows = event.numRows
        console.log("THE NUMBER OF ROWS" + rows)
        iterateSeats(ID,"Left",rows,event.numSeatsLeft) 
        iterateSeats(ID,"Center",rows,event.numSeatsCenter)
        iterateSeats(ID,"Right",rows,event.numSeatsRight)
        return true;
    }
  let response = undefined
  const can_create = await ValidateExists(event.showTime,event.showDate);
 
  if (!can_create) {
      let newShowID =randomInt(1000000000)
      let total = (event.numRows*(event.numSeatsLeft + event.numSeatsCenter+ event.numSeatsRight))
      let add_result = await createShow(newShowID,event.nameShow,event.nameVenue, event.showTime, event.showDate, event.showPrice,total)
      let addedSeats = await makeSeats(newShowID)
      let shows = await getShows(event.nameVenue) 
      
      response = {
        statusCode: 200,
        
        constant: shows,
        seats: addedSeats
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
