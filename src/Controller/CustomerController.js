import { get, post } from "./Api";
export let totalPrice = 0;

export function listActiveShows () { 
    var activeShowsBox = document.getElementById("selectActiveShow");
    let soldOutValue = ""
    get('/listActiveShows')
        .then(function (response) {
            activeShowsBox.textContent = '';
            console.log(response.constants)
            let str = ''
            for (var i in response.constants) {
                let show = response.constants[i];
                var nextShow = document.createElement('option');

                if (show.soldOut==0) {
                    soldOutValue = "Seats Available"
                }
                else {
                    soldOutValue = "SOLD OUT"
                }
                nextShow.textContent = show.showName + " " + show.showTime + " " + show.showDate + "    " + soldOutValue
                nextShow.value = show.showID
                activeShowsBox.appendChild(nextShow);
                str += show.showName + " " + show.showTime + " " + show.showDate + "    " + soldOutValue + '<br>'
            }
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
        let str = ''
        for (var i in response.constants) {
            
            let show = response.constants[i];
            /*
            var nextShow = document.createElement('option');
            nextShow.textContent = 
            activeShowsBox.appendChild(nextShow);

            */
        str += show.showName + " " + show.showTime + " " + show.showDate
        if (show.soldOut==0) {
            str += "    Seats Available"
        }
        else {
            str += "    SOLD OUT"
        }

        str += "<br>"
        }
        let d = document.getElementById('customerShowsList')
        d.innerHTML = str
    })
}

export function availableSeats() {
    var selectElement = document.querySelector('#selectActiveShow');

    let index = selectElement.options.selectedIndex
    let selectedShow = selectElement.options[index]
    let selectedShowID = selectedShow.getAttribute("value")
    console.log(selectedShowID)

    let showsSelect = document.getElementById('seatsList');
    showsSelect.textContent = '';

    if (index!=-1) { // if something is actually selected
        let payload = {"showID": selectedShowID}
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
