import { get, post } from "./Api";
export let totalPrice = 0;

export function listActiveShows () { 
    get('/listActiveShows')
        .then(function (response) {
            console.log(response)
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
    var showsSelect = document.getElementById('customerShowsList');
    let selectedIndex = showsSelect.options.selectedIndex;
    if (selectedIndex!=-1) { // if something is actually selected
        let selectedShow = selectedIndex.value; // TODO this gives the name not the id?

        let payload = {"showID": "835680242"} // TODO make this dynamically change rather than being hard coded in
        post('/showAvailableSeats', payload, response => { 
            console.log(response)
            showsSelect.textContent = '';

            for (var seat in response.seats) {
                var nextSeat = document.createElement('option');
                nextSeat.textContent = "" + seat.seatRow + seat.seatColumn;
                showsSelect.appendChild(nextSeat);
            }
        })
    }
}

/* COMPLETELY WRONG PUTTING HERE FOR POTENTIAL LATER USE 
export function availableSeats() {
    var showsSelect = document.getElementById('seatsList');
    var selectedShows = showsSelect.children;
    var selectedShowsValues = [];
    for (let i of selectedShows) {
        selectedShowsValues.push(i.value);
    }
    let payload = {"seats": selectedShowsValues} // TODO how 

    post('/availableSeats', payload, response => { 
        console.log(response);
        /*showsSelect.textContent = '';

        for (var seat in response.seats) {
            var nextSeat = document.createElement('option');
            nextSeat.textContent = "" + seat.row + seat.column;
            showsSelect.appendChild(nextSeat);
        }
    })
}*/

export function purchaseSeats() {
    // TODO
}
