import { useNavigate } from "react-router-dom";

import { axios } from "axios"; // TODO remove if not used eventually, might be easier

const URL = "REALURL";

// TODO later make this imported in multiple places so that URL doesn't need to be copied in a bunch of places if using axios. Use import port from API like he has in many of his examples
const instance = axios.create({ 
  baseURL: URL // TODO make actual URL
});

export function authenticateUser (authPageToken) {
    console.log(authPageToken)
    let payload = {"authToken": authPageToken}

    // TODO I have this axios way in here just to see how they compare for now. This way might be easier, following his hangman example
    //instance.post('/authenticate').then((response) => {
    //  model.setInfo(response.data.gameID, response.data.wordLength)
    //  forceRedraw(redraw+1)
    //})

    const response = fetch(URL, 
        {method: "POST", 
        body: JSON.stringify(payload)}).then((response) => response)

        const fetchResult = async() => {
            //const navigate = useNavigate()
            let val = await response
            let result = await val.json()
            switch(result.userType) {
                case "venueManager":
                  console.log("VENUEMANAGERTYPE")
                  //navigate("/venuemanager"); TODO make this work
                  break;
                case "administrator":
                  console.log("ADMINTYPE")

                  //navigate("/admin"); TODO make this work
                  break;
                default:
            }
        }
        fetchResult() 
}
