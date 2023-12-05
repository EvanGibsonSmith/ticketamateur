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
            let cd = document.getElementById('customerShowsList')
            cd.innerHTML = str
        })
        .catch(function (error) {
            console.log(error)
        })
}

export function searchActiveShows() {
    let searchQuery = document.getElementById('searchshowinput').value;
    let payload = {"search": searchQuery}
    var activeShowsBox = document.getElementById("customerShowsList");

    post('/searchShows', payload, response => { 
        activeShowsBox.textContent = '';
        console.log(response.constants)
        for (var i in response.constants) {
            let show = response.constants[i];
            var nextShow = document.createElement('option');
            nextShow.textContent = show.showName + " " + show.showTime + " " + show.showDate 
            activeShowsBox.appendChild(nextShow);
        }
    })
}

export function availableSeats() {
    var showsSelect = document.getElementById("seatsList");
    var selectedShows = showsSelect.options;
    console.log(selectedShows); // TODO delete later (HOW DO I GET THE IDS FROM THIS? Name isn't unique after all. )
    let payload = {"selectedShows": JSON.stringify(selectedShows)} // TODO how 

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
