import { get, post } from "./Api";
export let totalPrice = 0;

export function listActiveShows () { 
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

export function searchShow(searchQuery) {
    console.log(searchQuery); // TODO DELETE THIS LATER
    let payload = {"search": searchQuery} 

    post('/searchShows', payload, response => { 

        let str = ''
        for (let c of response.constants) {
            str += c.venueName + '<br>'
        }

        // insert HTML in the <div> with 
        // constant-list
        let cd = document.getElementById('customerShowsList')
        cd.innerHTML = str
    })
}

export function availableSeats() {
    var showsSelect = document.getElementById("customerShowsList");
    var selectedShows = showsSelect.options;
    console.log(selectedShows); // TODO delete later
    let payload = {"selectedShows": JSON.stringify(selectedShows)} 

    post('/availableSeats', payload, response => { 
        showsSelect.textContent = '';

        for (var seat in response.seats) {
            var nextSeat = document.createElement('option');
            nextSeat.textContent = "" + seat.row + seat.column;
            showsSelect.appendChild(nextSeat);
        }
    })
}

export function purchaseSeats() {
    // TODO
}

export function listShows() {
    // TODO
}