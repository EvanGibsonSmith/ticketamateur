import React from "react";
import "./VenueManagerPage.css";
import { deleteVenue, createShow, activateShow, deleteShow } from "../Controller/VenueManagerController"
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

export function VenueManager() {
    const navigate = useNavigate();
    const location = useLocation();
    const title = location.state;
    console.log(title)
    
    function removeCurrentVenue(){
        deleteVenue(title.venueName, title.authKey)
        navigate("/")
    }

    return (
        <body>
            <h1>Venue Manager Page For {title.venueName}</h1>
            <h2>This Venue has {title.numRows} rows, {title.numSeatsLeft} Seats in Left Section, {title.numSeatsCenter} Seats in Center Section, {title.numSeatsRight} Seats in Right Section</h2>
            <div className='flex-container-space column'>
                <div className="flex row pad center">
                    <text type="text" id="venueNameShow">{title.venueName}</text>
                    <input type="text" className='height-50px' id="showName" placeholder="Enter Show Here" style={{width: "500px"}}/>
                    <input type="text" className='height-50px' id="showTime" placeholder="Enter Time Here" style={{width: "200px"}}/>
                    <input type="text" className='height-50px' id="showDate" placeholder="Enter Date Here" style={{width: "250px"}}/>
                    <div className="flex column">
                        <button onClick={e => createShow(title.venueName)}>Create Show</button>
                        <button>Delete Show</button>
                    </div>
                </div>
                <div className="flex row row-wrap pad">
                    <input type="text" className='height-50px' id="enterBlockName" placeholder="Enter Block Name"/>
                    <input type="text" className='height-50px' id="enterBlockPrice" placeholder="Enter Block Price"/>
                    <input type="text" className='height-50px' id="startRow" placeholder="Start Row"/>
                    <input type="text" className='height-50px' id="endRow" placeholder="End Row"/>
                    <div className="flex column">
                        <button>Create Block</button>
                        <button>Delete Block</button>
                    </div>
                </div>
                <div className="flex row left50 pad">
                    <input type="text" className='height-50px' id="deleteShowBox" placeholder="Enter Show Here"/>
                    <button onClick={e => deleteShow(document.getElementById("deleteShowBox"), title.authKey)}>Delete Show</button>
                </div>
                <div className="flex row left50 pad">
                    <input type="text" className='height-50px' placeholder="Enter Block"/>
                    <input type="text" className='height-50px' placeholder="Enter Show"/>
                    <button>Delete Block</button>
                </div>
                <div className="flex row left50 pad">
                    <input type="text" className='height-50px' id="activateShowName" placeholder="Enter Show Here"/>
                    <button onClick={e => activateShow(title.venueName, title.authKey)}>Activate Show</button>
                </div>      
                
                <div className="flex row spaced pad">
                    <div className="flex column">
                        <div className="flex row pad">
                            <button>List Shows</button>
                        </div>
                        <div id = "listShowsBoxVM"className="flex column scroll list2 pad">
                            <text>No Shows</text>
                        </div>
                    </div>
                    <div className="flex column">
                        <div className="flex row pad">
                            <input type='text' className='height-50px' placeholder="Enter Show Here"></input>
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
                        <div id = "listBlocksBoxVM" className="flex column scroll list2 pad">
                            <text>No Venues</text>
                        </div>
                    </div>
                </div>
                <div className="flex row left50 pad">
                    <button onClick={e => removeCurrentVenue()}>Delete Venue</button>
                </div>
            </div>
            <button onClick={e => navigate("/")}>Return to Authenticate Page</button>
        </body>
    )
}



export default VenueManager;