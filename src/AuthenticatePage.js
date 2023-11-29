import React from "react";
import { post } from "./Api";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { authenticateUser, generateNewVenueManagerAuthCode, generateVenueTest } from "./AuthenticateController";
import './AuthenticatePage.css';


export function Authenticate() {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        // 👇 Get input value from "event"
        setMessage(event.target.value);
    };

    function authenticateUser2(authPageToken) { 
        let payload = {"authToken": authPageToken}
      
        post('/authenticate', payload, response => {
          console.log(payload)
          console.log(response)
                switch (response.body.type) {
                    case "Admin":
                        console.log("Admin") // TODO add page redirect
                        navigate('/admin')
                        return;
                    case "manager":
                        console.log("VenueManager") // TODO add page redirect
                        navigate('/venuemanager')
                    return;
                  default:
                    return navigate('/')
                }
            })
      }

      const navigateConsumer= () => {
        navigate("/consumer")
      }

    return (
        <body>
            <h1>This is the authenticate page, while we will need to actually authenticate later, below are buttons to send to other pages</h1>
            <div className="flex-container-row">
                <p>Authenticate:    </p>
                <input type="text" id="authenticatePageID" name="name" height="2" value={message} onChange={handleChange}/>
                <button onClick={() => authenticateUser2(message)}>Submit</button>
            </div>

            <button onClick={navigateConsumer}>Consumer</button>
        </body>
    )
}


export default Authenticate;