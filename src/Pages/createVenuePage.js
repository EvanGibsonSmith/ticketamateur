import React from "react";
import "./VenueManagerPage.css";
import { createVenue, deleteVenue, createShow } from "../Controller/VenueManagerController"
import { useNavigate } from "react-router-dom";
import { post } from "../Controller/Api"
import { useState } from 'react';

export function VenueManager() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    function authenticateUser2(authPageToken) { 
        let payload = {"authToken": authPageToken}
      
        post('/authenticate', payload, response => {
                switch (response.body.type) {
                    case "manager":
                        console.log("VenueManager") // TODO add page redirect
                        navigate('/venuemanager', {"state" :response.constant[0]})
                    return;
                  default:
                    return navigate('/')
                }
            })
      }

    const handleChange = (event) => {
        // 👇 Get input value from "event"
        setMessage(event.target.value);
    };

    const navigateVenueManager= () => {
        navigate("/venuemanager")
      }
    
    return (
        <body>
            <h1>This is the Venue Manager page</h1>
            <div className='flex-container-space column'>
                <div className="flex-container-space row pad">
                    <input type="text" id="createVenueID" placeholder="Enter Venue Name Here" width="30px"/>
                    <input type="text" id="venueNumberOfRows" placeholder="Enter Number of Rows" width="30px"/>
                    <input type="text" id="venueLeftSeats" placeholder="Seat Number Left" width="30px"/>
                    <input type="text" id="venueCenterSeats" placeholder="Seat Number Center" width="30px"/>
                    <input type="text" id="venueRightSeats" placeholder="Seat Number Right" width="30px"/>

                    <button onClick={e => createVenue()}>Create Venue</button>
                    <text>Authentication Token:</text>
                    <output type='text' id='authenticationToken'></output>
                </div>
            </div>
            <div className="flex-container-row">
                <p>Authenticate:    </p>
                <input type="text" id="authenticatePageID" name="name" height="2" value={message} onChange={handleChange}/>
                <button onClick={() => authenticateUser2(message)}>Submit</button>
            </div>
        </body>
    )
}



export default VenueManager;