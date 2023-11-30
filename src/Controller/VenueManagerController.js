
import { post } from "./Api"
import { authenticateUser } from "./AuthenticateController"

export function createVenue() { 
    let venueName = document.getElementById("createVenueID").value
    let numberRows = document.getElementById("venueNumberOfRows").value
    let numSeatsLeft = document.getElementById("venueLeftSeats").value
    let numSeatsCenter = document.getElementById("venueCenterSeats").value
    let numSeatsRight = document.getElementById("venueRightSeats").value

    let payload = {"nameVenue": venueName, "numberOfRows" : numberRows, "leftSeats" : numSeatsLeft, "centerSeats" : numSeatsCenter, "rightSeats" : numSeatsRight} 
  
    post('/createVenue', payload, response => {
        document.getElementById("authenticationToken").value = response.success
        console.log(response)
    })
  }

export function deleteVenue(venueName, authToken) {
    //let venueName = document.getElementById("deleteVenueID").value

    let payload = {"venueName": venueName, "authToken" : authToken} 
    console.log(payload)
    post('/deleteVenue', payload, response => {
        console.log(response)
    })
}

export function createShow(nameVenue) {
    let nameShow = document.getElementById("showName").value
    let time = document.getElementById("showTime").value
    let date = document.getElementById("showDate").value
    let payload = {"nameShow": nameShow, "nameVenue" : nameVenue, "showTime" : time, "showDate": date} 
  
    post('/createShow', payload, response => {
        let str = ''
             for (let c of response.constant) {
                 str += "Name: " + c.showName + " Time: "+ c.showTime + " Date: "+ c.showDate+ '<br>'
             }

             // insert HTML in the <div> with 
             // constant-list
             let cd = document.getElementById('listShowsBoxVM')
             cd.innerHTML = str
    })
}

// export function createBlock() {
//     let block = document.getElementById("enterBlockName").value
//     let price = document.getElementById("enterBlockPrice").value
//     let startRow = document.getElementById("startRow").value
//     let endRow = document.getElementById("endRow").value

//     let payload = {"block": block, "price" : price, "leftSeats" : startRow, "centerSeats" : endRow, "rightSeats" : numSeatsRight} 
  
//     post('/createBlock', payload, response => {
//         console.log(response)
//     })
// }