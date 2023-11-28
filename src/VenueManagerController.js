
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
            document.getElementByld("result").value = result.body
        }
        fetchResult() 
    console.log("Test delete successful")
}

export function createShow() {
    let showName = document.getElementById("showName").value
    let venueName = document.getElementById("venueNameShow").value
    let showTime = document.getElementById("showTime").value 
    let payload = {"nameVenue": venueName, "nameShow": showName, "time": showTime} 
    const response = fetch(
        {method: "POST", 
        body: JSON.stringify(payload)}).then((response) => response)

        const fetchResult = async() => {
            let val = await response
            let result = await val.json()
            document.getElementByld("result").value = result.body
        }
        fetchResult() 
    console.log("Clicked")
    console.log("Create show test")
}