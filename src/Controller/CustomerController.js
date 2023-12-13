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

                if (show.seatsSold!=show.totalSeats) {
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
    var activeShowsBox = document.getElementById("selectActiveShow");

    post('/searchShows', payload, response => { 
        activeShowsBox.textContent = '';
        console.log(response.constants)
        let str = ''
        for (var i in response.constants) {
            
            let show = response.constants[i];
            var nextShow = document.createElement('option');
            nextShow.textContent = show.showName + " " + show.showTime + " " + show.showDate 
            nextShow.value = show.showID
            activeShowsBox.appendChild(nextShow);
                
        str += show.showName + " " + show.showTime + " " + show.showDate
        console.log(show.seatsSold + " " + show.totalSeats)
        if (show.seatsSold==show.totalSeats) {
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
        let payload = {"showID": selectedShowID, "sortBy": "showID"}
        post('/showAvailableSeats', payload, response => {
            for (let i in response.body) {
                let seat = response.body[i]
                console.log("Seat: " + seat)
                let nextSeat = document.createElement('option');
                nextSeat.textContent = "" + seat.sectionName + " " + seat.seatRow + " " + seat.seatColumn;
                showsSelect.appendChild(nextSeat);
            }
        })
    }
}

export function sortSeats() {
    let selectElement = document.querySelector('#selectActiveShow');
    let selectSeatSort = document.querySelector('#sortBySeats').value;
    console.log("Sort By: " + selectSeatSort);

    let index = selectElement.options.selectedIndex
    let selectedShow = selectElement.options[index]
    let selectedShowID = selectedShow.getAttribute("value")
    console.log(selectedShowID)

    let showsSelect = document.getElementById('seatsList');
    showsSelect.textContent = '';
    let sortedChoice = ""
    switch(selectSeatSort){
        case "Default":
            sortedChoice = "showID"
            break;
        case "Price":
            sortedChoice = "TBD"
            break;
        case "Section":
            sortedChoice = "sectionName"
            break;
        case "Row":
            sortedChoice = "seatRow"
            break;
        default:
            sortedChoice = "showID"
            break;
    }
    if (index!=-1) { // if something is actually selected
        let payload = {"showID": selectedShowID, "sortBy": sortedChoice}
        
        post('/showAvailableSeats', payload, response => {
            console.log(response)
            for (let i in response.body) {
                let seat = response.body[i]
                console.log("Seat: " + seat)
                let nextSeat = document.createElement('option');
                nextSeat.textContent = "" + seat.sectionName + " " + seat.seatRow + " " + seat.seatColumn;
                showsSelect.appendChild(nextSeat);
            }
        })
    }
}

export function purchaseSeats() {
    let current_date = new Date()
    console.log(current_date)
    let showID = document.getElementById("selectActiveShow").value
    let seats = document.getElementById("seatsList").options
    for(let i = 0; i < seats.length; i++){
        if(seats[i].selected == true){
            let seatInfo = seats[i].value.split(" ")
            let section = seatInfo[0]
            let row = seatInfo[1]
            let column = seatInfo[2]
            // console.log("Section: " + section + ", Row: " + row + ", Column: " + column)
            let payload = {"showID": showID, "section": section, "row" : row, "column": column}
            post('/purchaseSeat', payload, response => {
                if (response.statusCode==400) { // in this case somebody has already bought the ticket
                    document.getElementById("didPurchaseSeat").textContent = "Seat Already Bought"
                }
                else {
                    document.getElementById("didPurchaseSeat").textContent = "Success!"
                }
                console.log("Seat(s) Purchased: " + response.body + " " + section + row + column)
            })
        }
    }
}