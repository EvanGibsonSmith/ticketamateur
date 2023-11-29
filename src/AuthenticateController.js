import { useNavigate } from "react-router-dom";
import { get, post } from "./Api";

export function authenticateUser(authPageToken) { 
  let payload = {"authToken": authPageToken}

  post(payload, '/Authenticate', response => {
          switch (response.type) {
            case "manager":
              console.log("VenueManager") // TODO add page redirect
              return "manager"
              break;
            case "admin":
              console.log("Admin") // TODO add page redirect
              return "admin"
              break;
            default:
              return "null"
          }
      })
}