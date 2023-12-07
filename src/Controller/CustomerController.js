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

export function showAllActiveShows() {
    var activeShowsBox = document.getElementById("selectActiveShow");
    let payload = {"search": ""}
    post('/searchShows', payload, response => { 
        console.log(response.constants)
        for (var i in response.constants) {
            let show = response.constants[i];
            var nextShow = document.createElement('option');
            nextShow.textContent = show.showName + " " + show.showTime + " " + show.showDate 
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
    var showsSelect = document.getElementById('selectActiveShow');
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

export function purchaseSeats() {
    // TODO
    let showID = document.getElementById("selectActiveShow").value
    let section = document.getElementById("selectSection").value
    let row = document.getElementById("selectRow").value
    let column = document.getElementById("selectColumn").value
    let payload = {"showID": showID, "section": section, "row" : row, "column": column}
    console.log(payload)

    // post('/purchaseSeat', payload, response => {
    //     console.log(response)
    // })
}

