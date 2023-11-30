import { get, post } from "./Api";
import { authenticateUser } from "./AuthenticateController";

export function listVenues(authToken) { // TODO this will be ap post
    let payload = {"authToken": authToken} 

    post('/listVenues', payload, response => { // FIXME another security issue I think somebody could directly query /listVenues without proper authentication
        // if authResponse is good then we can list venues
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
                str += c.venueName + c.showName + '<br>'
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
export function deleteShow() {
    console.log("Test delete successful")
}