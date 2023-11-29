import React from "react";
import "./VenueManagerPage.css";
import { createVenue, deleteVenue, createShow } from "./VenueManagerController"
import { useNavigate } from "react-router";

export function VenueManager() {
    const navigate = useNavigate();
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
                <div className="flex row left50 pad">
                    <input type="text" id="deleteVenueID" placeholder="Enter Venue Here"/>
                    <button onClick={e => deleteVenue()}>Delete Venue</button>
                </div>
                <div className="flex row pad">
                    <input type="text" id="showName" placeholder="Enter Show Here"/>
                    <input type="text" id="venueNameShow" placeholder="Enter Venue Here"/>
                    <input type="text" id="showTime" placeholder="Enter Time Here"/>
                    <input type="text" id="showDate" placeholder="Enter Date Here"/>
                    <div className="flex column">
                        <button onClick={e => createShow()}>Create Show</button>
                        <button>Delete Show</button>
                    </div>
                </div>
                <div className="flex row row-wrap pad">
                    <input type="text" id="enterBlockName" placeholder="Enter Block Name"/>
                    <input type="text" id="enterBlockPrice" placeholder="Enter Block Price"/>
                    <input type="text" id="startRow" placeholder="Start Row"/>
                    <input type="text" id="endRow" placeholder="End Row"/>
                    <div className="flex column">
                        <button>Create Block</button>
                        <button>Delete Block</button>
                    </div>
                </div>
                <div className="flex row left50 pad">
                    <input type="text" placeholder="Enter Show Here"/>
                    <button>Delete Show</button>
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
                        <div id = "listShowsBoxVM"className="flex column scroll list1 pad">
                            <text>No Shows</text>
                        </div>
                    </div>
                    <div className="flex column">
                        <div className="flex row pad">
                            <input type='text' placeholder="Enter Show Here"></input>
                            <button>List Blocks</button>
                        </div>
                        <div id = "listBlocksBoxVM" className="flex column scroll list2 pad">
                            <text>No Blocks</text>
                        </div>
                    </div>
                    
                    <div className="flex column">
                        <div className="flex row pad center">
                            <text>My Venues</text>
                        </div>
                        <div id = "listBlocksBoxVM" className="flex column scroll list1 pad">
                            <text>No Venues</text>
                        </div>
                    </div>
                </div>

            </div>
            <button onClick={e => navigate("/")}>Return to Authenticate Page</button>
        </body>
    )
}



export default VenueManager;