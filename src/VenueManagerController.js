

export function createVenue(model, name) {
    let venueName = document.getElementById("createVenueID").value
    let payload = {"nameVenue": venueName} 
    const response = fetch(
        {method: "POST", 
        body: JSON.stringify(payload)}).then((response) => response)

        const fetchResult = async() => {
            let val = await response
            let result = await val.json()
            document.getElementByld("result").value = result.body
        }
        fetchResult() 
    console.log("Clicked")
}

export function deleteVenue(model, name) {
    let venueName = document.getElementById("deleteVenueID").value
    let payload = {"nameVenueDelete": venueName} 
    const response = fetch(
        {method: "POST", 
        body: JSON.stringify(payload)}).then((response) => response)

        const fetchResult = async() => {
            let val = await response
            let result = await val.json()
            document.getElementByld("result").value = result.body
        }
        fetchResult() 
    console.log("Test delete successful")
}

export function createShow(model, name) {
    let showName = document.getElementById("showName").value
    let venueName = document.getElementById("venueNameShow").value
    let showTime = document.getElementById("showTime").value 
    let payload = {"nameVenue": venueName, "nameShow": showName, "time": showTime} 
    const response = fetch(
        {method: "POST", 
        body: JSON.stringify(payload)}).then((response) => response)

        const fetchResult = async() => {
            let val = await response
            let result = await val.json()
            document.getElementByld("result").value = result.body
        }
        fetchResult() 
    console.log("Clicked")
    console.log("Create show test")
}