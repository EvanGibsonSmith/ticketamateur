
import { post } from "./Api"
import { authenticateUser } from "./AuthenticateController"

export function createVenue() { 
    let venueName = document.getElementById("createVenueID").value
    let numberRows = document.getElementById("venueNumberOfRows").value
    let numSeatsLeft = document.getElementById("venueLeftSeats").value
    let numSeatsCenter = document.getElementById("venueCenterSeats").value
    let numSeatsRight = document.getElementById("venueRightSeats").value

    let payload = {"nameVenue": venueName, "numberOfRows" : numberRows, "leftSeats" : numSeatsLeft, "centerSeats" : numSeatsCenter, "rightSeats" : numSeatsRight} 
  
    post('/createVenue', payload, response => {
        document.getElementById("authenticationToken").value = response.success
        console.log(response)
    })
  }

export function deleteVenue(venueName, authToken) {
    //let venueName = document.getElementById("deleteVenueID").value

    let payload = {"venueName": venueName, "authToken" : authToken} 
    console.log(payload)
    post('/deleteVenue', payload, response => {
        console.log(response)
    })
}

export function createShow(nameVenue, numberRows, left, center, right) {
    let nameShow = document.getElementById("showName").value
    let time = document.getElementById("showTime").value
    let date = document.getElementById("showDate").value
    let price = document.getElementById("showPrice").value
    let payload = {
        "nameShow": nameShow, 
        "nameVenue" : nameVenue, 
        "showTime" : time, 
        "showDate": date,
        "showPrice": price,
        "numRows" : numberRows,
        "numSeatsLeft": left,
        "numSeatsCenter": center,
        "numSeatsRight": right
} 
    
    post('/createShow', payload, response => {
            let str = ''
            var deleteSelectBox = document.getElementById("deleteShowSelect");
            var activateSelectBox = document.getElementById("activateShowSelect");
            var listBlockSelecttBox = document.getElementById("listBlockSelect");
            var createBlockSelectBox = document.getElementById("createBlockSelect")
            deleteSelectBox.textContent = ''
            activateSelectBox.textContent = ''
            listBlockSelecttBox.textContent = ''
            createBlockSelectBox.textContent = ''
             for (let c of response.constant) {
                str +="Show ID Number:"+ c.showID + " Name: " + c.showName + " Time: "+ c.showTime + " Date: "+ c.showDate+ ", Price: " + c.showPrice + '<br>'
                var deleteOption = document.createElement('option');
                var activateOption = document.createElement('option');
                var deleteBlockOption = document.createElement('option');
                var createBlockSelectOption =document.createElement('option');
                deleteOption.textContent = c.showID
                activateOption.textContent = c.showID
                deleteBlockOption.textContent = c.showID
                createBlockSelectOption.textContent = c.showID
                deleteSelectBox.appendChild(deleteOption);
                activateSelectBox.appendChild(activateOption);
                listBlockSelecttBox.appendChild(deleteBlockOption);
                createBlockSelectBox.appendChild(createBlockSelectOption);
             }

             // insert HTML in the <div> with 
             // constant-list
             let cd = document.getElementById('listShowsBoxVM')
             cd.innerHTML = str
    })
}


export function activateShow(showID, authToken) {
    let payload = {"showID": showID, "authToken" : authToken} 
    console.log(payload)
    post('/activateShow', payload, response => {
        console.log(response)
    })
}


export function deleteShow(showID, authToken) {
    let payload = {"showID": showID, "authToken" : authToken} 
    console.log(payload)
    post('/deleteShowVenue', payload, response => {
        console.log(response)
    })
}

export function listShows(venueName, authToken) {

    let payload = {"nameVenue" : venueName, "authToken" : authToken} 
    console.log(payload)
    post('/listShows', payload, response => {
        let str = ''
        var deleteSelectBox = document.getElementById("deleteShowSelect");
        var activateSelectBox = document.getElementById("activateShowSelect");
        var listBlockSelecttBox = document.getElementById("listBlockSelect");
        var createBlockSelectBox = document.getElementById("createBlockSelect")
        deleteSelectBox.textContent = ''
        activateSelectBox.textContent = ''
        listBlockSelecttBox.textContent = ''
        createBlockSelectBox.textContent = ''
         for (let c of response.constants) {
            str +="Show ID Number:"+ c.showID + " Name: " + c.showName + " Time: "+ c.showTime + " Date: "+ c.showDate+ ", Price: " + c.showPrice + '<br>'
            var deleteOption = document.createElement('option');
            var activateOption = document.createElement('option');
            var deleteBlockOption = document.createElement('option');
            var createBlockSelectOption =document.createElement('option');
            deleteOption.textContent = c.showID
            activateOption.textContent = c.showID
            deleteBlockOption.textContent = c.showID
            createBlockSelectOption.textContent = c.showID
            deleteSelectBox.appendChild(deleteOption);
            activateSelectBox.appendChild(activateOption);
            listBlockSelecttBox.appendChild(deleteBlockOption);
            createBlockSelectBox.appendChild(createBlockSelectOption);
         }

         // insert HTML in the <div> with 
         // constant-list
         let cd = document.getElementById('listShowsBoxVM')
         cd.innerHTML = str
        
    })
}
export function showReport(venueName, authToken) { 
    let payload = {"nameVenue" : venueName, "authToken" : authToken} 
    console.log(payload)
    var deleteSelectBox = document.getElementById("deleteShowSelect");
    var activateSelectBox = document.getElementById("activateShowSelect");
    post('/showReportVenue', payload, response => {
        let str = ''
        deleteSelectBox.textContent = ''
        activateSelectBox.textContent = ''
        for (let c of response.constants) {
            str += "Name Of Venue: "+ c.venueName + ", Name Of Show: " + c.showName + ", Show ID: " + c.showID + ", Revenue: $" + c.showPrice*c.seatsSold + ", Active Status: " + c.activated + ", Remaining Tickets: " + (c.totalSeats - c.seatsSold) +'<br>'
            var deleteOption = document.createElement('option');
            var activateOption = document.createElement('option');
            deleteOption.textContent = c.showID
            activateOption.textContent = c.showID
            deleteSelectBox.appendChild(deleteOption);
            activateSelectBox.appendChild(activateOption);
        }
        let cd = document.getElementById('listShowsBoxVM')
        cd.innerHTML = str

        })
}

export function createBlock(authKey) {
    let showID = document.getElementById("createBlockSelect").value
    let section = document.getElementById("enterBlockSection").value
    let price = document.getElementById("enterBlockPrice").value
    let startRow = document.getElementById("startRow").value
    let endRow = document.getElementById("endRow").value

    console.log("Auth Key: " + authKey)
    let payload = {"authToken": authKey,"showID": showID, "section": section, "price" : price, "startRow" : startRow, "endRow" : endRow} 

    post('/createBlock', payload, response => {
        console.log(response)
        let str = ''
        var listBlockSelecttBox = document.getElementById("listBlocksBoxVM");
        var deleteSelectBox = document.getElementById("deleteBlockSelect");
        listBlockSelecttBox.textContent = ''
         for (let c of response.constant) {
            str +="Show ID Number: "+ c.showID + ", Block ID Number: " + c.blockID + ", Section: "+ c.section + ", Price: " + c.price + ", Start Row: " + c.startRow + ", endRow: " + c.endRow + '<br>'
            let deleteOption = document.createElement('option');
            deleteOption.textContent = c.blockID
            listBlockSelecttBox.appendChild(deleteOption);
         }

         // insert HTML in the <div> with 
         // constant-list
         let cd = document.getElementById('listBlocksBoxVM')
         cd.innerHTML = str
    })
}