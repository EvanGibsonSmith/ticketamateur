import { get } from "./Api";

export let totalPrice = 0;

export function listActiveShows (authToken) { 
    get('/listActiveShows')
        .then(function (response) {
            let str = ''
            for (let c of response.constants) {
                str += "Name Of Venue: "+ c.venueName + ", Name Of Show: " + c.showName + ",  Date of Show" + c.showDate + ", Time of Show" + c.showTime +'<br>'
            }

            // insert HTML in the <div> with 
            // constant-list
            let cd = document.getElementById('listShowBox')
            cd.innerHTML = str
        })
        .catch(function (error) {
            console.log(error)
        })
}

export function searchShow() {
    // TODO
}

export function availableSeats() {
    // TODO
}

export function purchaseSeats() {
    // TODO
}

export function listShows() {
    // TODO
}