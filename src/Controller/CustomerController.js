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
                nextShow.value = show.showID
                activeShowsBox.appendChild(nextShow);
            }
        })
        .catch(function (error) {
            console.log(error)
        })

}

export function showAllActiveShows() {
    var activeShowsBox = document.getElementById("selectActiveShow");
    activeShowsBox.textContent = ''
    let payload = {"search": ""}
    post('/searchShows', payload, response => { 
        console.log(response.constants)
        for (var i in response.constants) {
            let show = response.constants[i];
            var nextShow = document.createElement('option');
            nextShow.textContent = show.showName + " " + show.showTime + " " + show.showDate
            nextShow.setAttribute('showID', show.showID);
            activeShowsBox.appendChild(nextShow);
        }
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
    var selectElement = document.querySelector('#selectActiveShow');

    let index = selectElement.options.selectedIndex
    let selectedShow = selectElement.options[index]
    let selectedShowID = selectedShow.getAttribute("showid")
    console.log(selectedShowID)

    let showsSelect = document.getElementById('seatsList');
    showsSelect.textContent = '';

    if (index!=-1) { // if something is actually selected
        let payload = {"showID": selectedShowID} // TODO make this dynamically change rather than being hard coded in
        post('/showAvailableSeats', payload, response => { 
            for (var seat in response.seats) {
                var nextSeat = document.createElement('option');
                nextSeat.textContent = "" + seat.seatRow + seat.seatColumn;
                showsSelect.appendChild(nextSeat);
            }
        })
    }
}

export function purchaseSeats() {
    // TODO
}
