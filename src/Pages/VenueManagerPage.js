import React from "react";
import "./VenueManagerPage.css";
import { deleteVenue, createShow } from "../Controller/VenueManagerController"
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

export function VenueManager() {
    const navigate = useNavigate();
    const location = useLocation();
    const title = location.state 
    console.log(title)
    
    
    return (
        <body>
            <h1>Venue Manager Page For {title.venueName}</h1>
            <h2>This Venue has {title.numRows} rows, {title.numSeatsLeft} Seats in Left Section, {title.numSeatsCenter} Seats in Center Section, {title.numSeatsRight} Seats in Right Section</h2>
            <div className='flex-container-space column'>
                <div className="flex row left50 pad">
                    <input type="text" id="deleteVenueID" placeholder="Enter Venue Here"/>
                    <button onClick={e => deleteVenue(title.venueName, title.authKey)}>Delete Venue</button>
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