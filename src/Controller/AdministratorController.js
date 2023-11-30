import { get, post } from "./Api";
import { authenticateUser } from "./AuthenticateController";

export function listVenues(authToken) { 
    /* MY BROKEN CODE
    console.log(authToken) // TODO just for testing delete me later
    let payload = {"/authToken": authToken} 

    post('/listVenues', payload, response => { // FIXME another security issue I think somebody could directly query /listVenues without proper authentication
        let authResponse = authenticateUser(authToken)

        // TODO getting rid of this check for now so list venues works
        //if (!authResponse) {
        //    console.log("FAILED")
        //    return // get out of here
        //}
        
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
    })*/

    
    // TRYING TO FIX THIS VERSION
    get('/listVenues')
        .then(function (response) {

            let str = ''
            for (let c of response.constants) {
                str += c.venueName + '<br>'
            }

            // insert HTML in the <div> with 
            // constant-list
            let cd = document.getElementById('listVenuesBox')
            cd.innerHTML = str

        })
        .catch(function (error) {
            // not much to do
            console.log(error)
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