
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

/* OLD VERSION
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
*/

export function deleteVenue(authPageToken) {
    let venueName = document.getElementById("deleteVenueID").value

    let payload = {"venueName": venueName} 

    post('/deleteVenue', payload, response => {
        let authResponse = authenticateUser(authPageToken) // FIXME security issue? COuld somebody fake input. Probably fine because of this is within API call
        // TODO make it pass in and actually use authPageToken
        //if (!authResponse) {
        //    console.log("FAILED") // TODO make nicer than console log
        //    return // get out of here
        //}
        console.log(response)
    })
}

export function createShow() {
    let nameShow = document.getElementById("showName").value
    let nameVenue = document.getElementById("venueNameShow").value
    let time = document.getElementById("showTime").value
    let date = document.getElementById("showDate").value
    let payload = {"nameShow": nameShow, "nameVenue" : nameVenue, "showTime" : time, "showDate": date} 
  
    post('/createShow', payload, response => {
        //console.log(payload)
         console.log(response)
        //console.log(response.listShows)
        //console.log(response.constants)
        console.log(response.body)
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