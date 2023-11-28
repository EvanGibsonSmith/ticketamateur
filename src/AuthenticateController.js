import { useNavigate } from "react-router-dom";
import { get, post } from "./Api";

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

export function generateVenueTest() { // TODO delete this and replace in proper location. Axios would allow me to pretend the API gave a proper call but I have not done axios so here we are
  let cd = document.getElementById('authCode');
  cd.innerHTML = "myTestAuthCode"
}


export function generateNewVenueManagerAuthCode() { 

  get('/NewAuthenticationCode', response => {
          let cd = document.getElementById('authCode'); // TODO should this be stored within the entity instead of just somewhere on the boundary?
          cd.innerHTML = response.authCode
      })
}