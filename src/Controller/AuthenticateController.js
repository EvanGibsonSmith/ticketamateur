import { useNavigate } from "react-router-dom";
import { get, post } from "./Api";

export function authenticateUser(authPageToken) { 
  let payload = {"authToken": authPageToken}

  post('/authenticate', payload, response => {
    console.log(payload)
    console.log(response)
          switch (response.body.type) {
            case "manager":
              console.log("VenueManager")
              return 2
            case "Admin":
              console.log("Admin")
              return 1
            default:
              return 3
          }
      })
}