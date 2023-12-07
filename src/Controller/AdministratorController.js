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

export function showReport(authToken) { 
    get('/showReport')
        .then(function (response) {

            let str = ''
            for (let c of response.constants) {
                str += "Name Of Venue: "+ c.venueName + ", Name Of Show: " + c.showName + ", Show ID: " + c.showID + ", Revenue: $" + c.showPrice*c.seatsSold + '<br>'
            }

            // insert HTML in the <div> with 
            // constant-list
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