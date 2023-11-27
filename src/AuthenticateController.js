import { useNavigate } from "react-router-dom";


export function authenticateUser (authPageToken) {
    let authenticateToken = authPageToken
    let payload = {"authToken": authenticateToken}
    const response = fetch(
        {method: "POST", 
        body: JSON.stringify(payload)}).then((response) => response)

        const fetchResult = async() => {
            //const navigate = useNavigate()
            let val = await response
            let result = await val.json()
            switch(result.userType) {
                case "venueManager":
                  //navigate("/venuemanager"); TODO make this work
                  break;
                case "administrator":
                  //navigate("/admin"); TODO make this work
                  break;
              }
        }
        fetchResult() 
}
