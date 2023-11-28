import { useNavigate } from "react-router-dom";
import { post } from "./Api";

export function authenticateUser(authPageToken) { 
  let payload = {"authToken": authPageToken}

  post(payload, '/Authenticate', response => {
          switch (response.type) {
            case "manager":
              console.log("VenueManager") // TODO add page redirect
              break;
            case "admin":
              console.log("Admin") // TODO add page redirect
              break;
          }
      })
}