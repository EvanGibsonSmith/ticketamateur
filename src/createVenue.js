import { post } from "./Api"
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