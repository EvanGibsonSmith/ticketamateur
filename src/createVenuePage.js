import React from "react";
import "./VenueManagerPage.css";
import { createVenue, deleteVenue, createShow } from "./VenueManagerController"
import { useNavigate } from "react-router-dom";

export function VenueManager() {
    const navigate = useNavigate();

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
            <button onClick={navigateVenueManager}>Venue Manager</button>
        </body>
    )
}



export default VenueManager;