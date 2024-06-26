import { get, post } from "./Api";
import { authenticateUser } from "./AuthenticateController";

export function listVenues(authToken) { // TODO this will be ap post
    let payload = {"authToken": authToken} 

    post('/listVenues', payload, response => { 
        console.log(response);
        let str = ''
        for (let c of response.constants) {
            str += c.venueName + '<br>'
        }

        // insert HTML in the <div> with 
        // constant-list
        let cd = document.getElementById('listVenuesBox')
        cd.innerHTML = str
    })
}

export function showReport(venueName, authToken) { 
    let payload = {"nameVenue" : venueName, "authToken" : authToken} 
    console.log(payload)
    post('/showReport', payload, response => {
        let str = ''
        for (let c of response.constants) {
            str += "Name Of Venue: "+ c.venueName + ", Name Of Show: " + c.showName + ", Show ID: " + c.showID + ", Revenue: $" + c.revenue + ", Active Status: " + c.activated + ", Remaining Tickets: " + (c.totalSeats - c.seatsSold) + ", Seats Sold: " + c.seatsSold +'<br>'
        }
        
        let cd = document.getElementById('listShowBox')
        cd.innerHTML = str

        })
        .catch(function (error) {
            // not much to do
            console.log(error)
        })
}

export function deleteShow(showID, authToken) {
    //let venueName = document.getElementById("deleteVenueID").value

    let payload = {"showID": showID, "authToken" : authToken} 
    console.log(payload)
    post('/deleteShowAdmin', payload, response => {
        console.log(response)
    })
}