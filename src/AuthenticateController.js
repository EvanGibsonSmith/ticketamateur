import { useNavigate } from "react-router-dom";
import { post } from "./Api";

export function authenticateUser(authPageToken) { 
  let payload = {"authToken": authPageToken}

  post(payload, '/authenticateUser')
      .then(function (response) {

          switch (response.userType) {
            case "venueManager":
              console.log("Venue manager") // TODO add page redirect
              break;
            case "admin":
              console.log("Admin") // TODO add page redirect
              break;
          }


      })
      .catch(function (error) {
          // not much to do
          console.log(error)
      })
}