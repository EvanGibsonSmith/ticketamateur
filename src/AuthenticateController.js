import { useNavigate } from "react-router-dom";
import { get, post } from "./Api";

export function authenticateUser(authPageToken) { 
  let payload = {"authToken": authPageToken}

  post('/authenticate', payload, response => {
    console.log(payload)
    console.log(response)
          switch (response.body.type) {
            case "manager":
              console.log("VenueManager") // TODO add page redirect
              return 2
            case "Admin":
              console.log("Admin") // TODO add page redirect
              return 1
            default:
              return 3
          }
      })
}