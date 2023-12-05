import { get, post } from "./Api";
export let totalPrice = 0;

export function listActiveShows () { 
    var activeShowsBox = document.getElementById("customerShowsList");
    get('/listActiveShows')
        .then(function (response) {
            activeShowsBox.textContent = '';
            console.log(response.constants)
            for (var i in response.constants) {
                let show = response.constants[i];
                var nextShow = document.createElement('option');
                nextShow.textContent = show.showName + " " + show.showTime + " " + show.showDate 
                activeShowsBox.appendChild(nextShow);
            }
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
        }*/
    })
}

export function purchaseSeats() {
    // TODO
}
