
import { post } from "./Api"

export function createVenue() { 
    let venueName = document.getElementById("createVenueID").value
    let numberRows = document.getElementById("venueNumberOfRows").value
    let numSeatsLeft = document.getElementById("venueLeftSeats").value
    let numSeatsCenter = document.getElementById("venueCenterSeats").value
    let numSeatsRight = document.getElementById("venueRightSeats").value

    let payload = {"nameVenue": venueName, "numberOfRows" : numberRows, "leftSeats" : numSeatsLeft, "centerSeats" : numSeatsCenter, "rightSeats" : numSeatsRight} 
  
    post('/createVenue', payload, response => {
        document.getElementById("authenticationToken").value = response.body
        console.log(response)
    })
  }

export function deleteVenue() {
    let venueName = document.getElementById("deleteVenueID").value
    let payload = {"nameVenueDelete": venueName} 
    const response = fetch(
        {method: "POST", 
        body: JSON.stringify(payload)}).then((response) => response)

        const fetchResult = async() => {
            let val = await response
            let result = await val.json()
            document.getElementById("result").value = result.body
        }
        fetchResult() 
    console.log("Test delete successful")
}

export function createShow() {
    let nameShow = document.getElementById("showName").value
    let nameVenue = document.getElementById("venueNameShow").value
    let time = document.getElementById("showTime").value
    let date = document.getElementById("showDate").value
    let payload = {"nameShow": nameShow, "nameVenue" : nameVenue, "showTime" : time, "showDate": date} 
  
    post('/createShow', payload, response => {
        console.log(response)
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