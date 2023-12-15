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
  let deleteBlock = (id) => {
      return new Promise((resolve, reject) => {
            pool.query("DELETE FROM Blocks WHERE blockID=?", [id], (error, rows) => {
                if (error) { return reject(error); }
                if ((rows) && (rows.affectedRows == 1)) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
      });
  }
  
  let isShowActive = (id) => {
    return new Promise((resolve, reject) => {
          pool.query("SELECT * FROM Shows WHERE showID=? AND activated!=1", [id], (error, rows) => {
              console.log("THEID" +id)
              if (error) { return reject(error); }
              if ((rows) && (rows.length == 1)) {
                  return resolve(true);
              } else {
                  console.log(rows)
                  return resolve(false);
              }
          });
    });
}
let getShowData = () => {
    return new Promise((resolve, reject) => {
          pool.query("SELECT showPrice FROM Shows WHERE showID=? AND activated!=1", [event.showID], (error, rows) => {
              if (error) { return reject(error); }
              if ((rows) && (rows.length == 1)) {
                  return resolve(rows);
              } else {
                  console.log(rows)
                  return resolve(false);
              }
          });
    });
}
let getBlockData = () => {
    return new Promise((resolve, reject) => {
          pool.query("SELECT * FROM Blocks WHERE blockID = ?", [event.blockID], (error, rows) => {
              if (error) { return reject(error); }
              if ((rows) && (rows.length == 1)) {
                  return resolve(rows);
              } else {
                  console.log(rows)
                  return resolve(false);
              }
          });
    });
}
let updateSeats =(bdata,sdata)=>{
            
            
            let defaultPrice = sdata[0].showPrice
            console.log("PRICE" +defaultPrice)
            let sRow = bdata[0].startRow
            let eRow = bdata[0].endRow
            let sectionN = bdata[0].showSection
          return new Promise((resolve, reject) => {
            pool.query("UPDATE Seats SET seatPrice = ? WHERE showID = ? AND sectionName =? AND seatRow>=? AND seatRow<=?", [defaultPrice,event.showID,sectionN, sRow,eRow], (error, rows) => {
                if (error) { return reject(error); }
                if ((rows) && (rows.affectedRows != 0)) {
                        return resolve(true);
                    } else {
                        return resolve(false);
                }
                });
            });
        
          
      }
  let result = false
  let response = false
  let authed = await isVenueManager(event.authToken)
  let active = await isShowActive(event.showID)
  let showData = await getShowData()
  let blockData = await getBlockData()
  console.log(showData[0])
  console.log(blockData[0])
  if(authed){
    if(active){
        let updated = await updateSeats(blockData,showData )
        result = await deleteBlock(event.blockID)
    }
    if(result){
        
        response = {
        statusCode: 200,
        
        body: JSON.stringify(result)
        }
    }else{
        response = {
            statusCode: 400,
            error: "No Block Under That ID that is Inactive"
            }
    }
  }else{
    response = {
        statusCode: 400,
        error: "Not Authorized"
        }

  }
    

   
    
  
    pool.end()   // disconnect from database to avoid "too many connections" problem that can occur

  return response;
}


