import React from "react";
import { post } from "../Controller/Api";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { setAuthToken } from "./AdministratorPage";
import { authenticateUser, generateNewVenueManagerAuthCode, generateVenueTest } from "../Controller/AuthenticateController";
import './AuthenticatePage.css';


export function Authenticate() {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    let invalid = ""
    const handleChange = (event) => {
        // 👇 Get input value from "event"
        setMessage(event.target.value);
    };

    function authenticateUser2(authPageToken) { // TODO THis has to be here in order for the navigate to work due to the navigate rules
        let payload = {"authToken": authPageToken}
      
        post('/authenticate', payload, response => {
          console.log(response)
                switch (response.body.type) {
                    case "Admin":
                        console.log("Admin") 
                        navigate('/admin', {"state" : authPageToken}) // TODO change titleData field name?
                        return;
                    case "manager":
                        console.log("VenueManager") 
                        console.log(response.constant[0])
                        navigate('/venuemanager',{"state" :response.constant[0]})
                    return;
                    case "false":
                        invalid = "INVALID AUTHENITCATION"
                        
                        return;
                  default:
                    return navigate('/')
                }
            })
      }

      const navigateConsumer= () => {
        navigate("/consumer")
      }

      const navigateCreateVenue= () => {
        navigate("/createvenue")
      }

    return (
        <body>
            <h1>This is the Authenticate Page</h1>
            <body> Below are three Buttons: </body>
            <body> -- One Allows you to purchase a ticket</body>
            <body> -- One allows for you to Create a New Venue</body>
            <body> -- One allows you to access venues based on a key</body>
            <div className="flex-container-row">
                <p>Authenticate:    </p>
                <input type="text" id="authenticatePageID" name="name" height="2" value={message} onChange={handleChange}/>
                <button onClick={() => authenticateUser2(message)}>Submit</button>
                <p>{invalid}</p>
            </div>

            <button className = "consumerButton" onClick={navigateConsumer}>Purchase Ticket</button>
            <button className = "makeVenueButton"onClick={navigateCreateVenue}>Make Venue</button>
        </body>
    )
}


export default Authenticate;