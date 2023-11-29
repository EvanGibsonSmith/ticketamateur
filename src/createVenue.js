import { post } from "./Api"
export function createVenue() { 
    function authenticateUser2(authPageToken) { 
        let payload = {"authToken": authPageToken}
      
        post('/authenticate', payload, response => {
          console.log(payload)
          console.log(response)
                switch (response.body.type) {
                    case "manager":
                        console.log("VenueManager")
                        navigate('/venuemanager')
                    return;
                  default:
                    return navigate('/')
                }
            })
      }

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