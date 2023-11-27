import React from "react";
import "./VenueManagerPage.css";
import { createVenue, deleteVenue, createShow } from "./VenueManagerController"

export function VenueManager() {
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

                    <button onClick={e => createVenue(null, "test name")}>Create Venue</button>
                </div>
                <div className="flex row left50 pad">
                    <input type="text" id="deleteVenueID" placeholder="Enter Venue Here"/>
                    <button onClick={e => deleteVenue(null, "test delete name")}>Delete Venue</button>
                </div>
                <div className="flex row pad">
                    <input type="text" id="showName" placeholder="Enter Show Here"/>
                    <input type="text" id="venueNameShow" placeholder="Enter Venue Here"/>
                    <input type="text" id="showTime" placeholder="Enter Time Here"/>
                    <div className="flex column">
                        <button>Create Show</button>
                        <button>Delete Show</button>
                    </div>
                </div>
                <div className="flex row row-wrap pad">
                    <input type="text" placeholder="Enter Block Name"/>
                    <input type="text" placeholder="Enter Block Price"/>
                    <input type="text" placeholder="Start Row"/>
                    <input type="text" placeholder="End Row"/>
                    <div className="flex column">
                        <button onClick={e => createShow(null, "test create show")}>Create Show</button>
                        <button>Delete Show</button>
                    </div>
                </div>
                <div className="flex row left50 pad">
                    <input type="text" placeholder="Enter Venue Here"/>
                    <button>Delete Venue</button>
                </div>
                <div className="flex row left50 pad">
                    <input type="text" placeholder="Enter Block"/>
                    <input type="text" placeholder="Enter Show"/>
                    <button>Delete Block</button>
                </div>
                <div className="flex row left50 pad">
                    <input type="text" placeholder="Enter Show Here"/>
                    <button>Activate Show</button>
                </div>      
                
                <div className="flex row spaced pad">
                    <div className="flex column">
                        <div className="flex row pad">
                            <button>List Shows</button>
                        </div>
                        <div className="flex column scroll list1 pad">
                            <text>Show 1</text>
                            <text>Show 2</text>
                            <text>Show 3</text>
                            <text>Show 4</text>
                            <text>Show 5</text>
                            <text>Show 6</text>
                        </div>
                    </div>
                    <div className="flex column">
                        <div className="flex row pad">
                            <input type='text' placeholder="Enter Show Here"></input>
                            <button>List Blocks</button>
                        </div>
                        <div className="flex column scroll list2 pad">
                            <text>Block 1</text>
                            <text>Block 2</text>
                            <text>Block 3</text>
                            <text>Block 4</text>
                            <text>Block 5</text>
                            <text>Block 6</text>
                        </div>
                    </div>
                    
                    <div className="flex column">
                        <div className="flex row pad center">
                            <text>My Venues</text>
                        </div>
                        <div className="flex column scroll list1 pad">
                            <text>Venue 1</text>
                            <text>Venue 2</text>
                            <text>Venue 3</text>
                            <text>Venue 4</text>
                            <text>Venue 5</text>
                            <text>Venue 6</text>
                        </div>
                    </div>
                </div>

            </div>
        </body>
    )
}



export default VenueManager;