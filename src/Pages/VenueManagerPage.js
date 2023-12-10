import React from "react";
import "./VenueManagerPage.css";
import { deleteVenue, createShow, activateShow, deleteShow, listShows, showReport, createBlock } from "../Controller/VenueManagerController"
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

export function VenueManager() {
    const navigate = useNavigate();
    const location = useLocation();
    const title = location.state;
    console.log(title)
    const createShowDisplay = "display : none;"
    function removeCurrentVenue(){
        deleteVenue(title.venueName, title.authKey)
        navigate("/")
    }
    //listShows(title.venueName, title.authKey)
    /*<input type="text" className='height-50px' id="deleteShowBox" placeholder="Enter Show ID Here"/>*/
    return (
        <body>
            <h1>Venue Manager Page For {title.venueName}</h1>
            <h2>This Venue has {title.numRows} rows, {title.numSeatsLeft} Seats in Left Section, {title.numSeatsCenter} Seats in Center Section, {title.numSeatsRight} Seats in Right Section</h2>
            <div className='flex-container-space column'>
                <div className="flex row pad center">
                    <text type="text" id="venueNameShow">{title.venueName} Venue:</text>
                    <input type="text" className='height-50px' id="showName" placeholder="Enter Show Name Here" style={{width: "500px"}}/>
                    <input type="time" className='height-50px' id="showTime" placeholder="Enter Time Here" style={{width: "100px"}}/>
                    <input type="date" className='height-50px' id="showDate" placeholder="Enter Date Here" style={{width: "100px"}}/>
                    <input type="text" className='height-50px' id="showPrice" placeholder="Enter Price Here" style={{width: "100px"}}/>
                    <div className="flex column">
                        <button onClick={e => createShow(title.venueName, title.numRows,title.numSeatsLeft,title.numSeatsCenter, title.numSeatsRight)}>Create Show</button>
                    </div>
                </div>
                <div className="flex row row-wrap pad center">
                <select id = "createBlockSelect" className="flex column align-left row scroll margin-children" style={{fontSize :"25px",width:"200px"}}>
                    </select>
                    <select id="enterBlockSection" className="flex column align-left row scroll margin-children" style={{fontSize :"25px",width:"200px"}}>
                        <option className="section">Side Left</option>
                        <option className="section">Center</option>
                        <option className="section">Side Right</option>
                    </select>
                    <input type="text" className='height-50px' id="enterBlockPrice" placeholder="Enter Block Price"/>
                    <input type="text" className='height-50px' id="startRow" placeholder="Start Row"/>
                    <input type="text" className='height-50px' id="endRow" placeholder="End Row"/>
                    <button onClick={e => createBlock(title.authKey)}>Create Block</button>
                    
                </div>
                <div className="flex row left50 pad">
                    <select id = "deleteShowSelect" className="flex column align-left row scroll margin-children" style={{fontSize :"25px",width:"200px"}}>
                    </select>
                    <button onClick={e => deleteShow(document.getElementById("deleteShowSelect").value, title.authKey)}>Delete Show</button>
                </div>
                
                <div className="flex row left50 pad">
                    <select id = "activateShowSelect" className="flex column align-left row scroll margin-children" style={{fontSize :"25px",width:"200px"}}>
                    </select>
                    <button onClick={e => activateShow(document.getElementById("activateShowSelect").value, title.authKey)}>Activate Show</button>
                </div>      
                
                <div className="flex row spaced pad">
                    <div className="flex column">
                        <div className="flex row pad">
                            <button onClick={e => listShows(title.venueName, title.authKey)}>List Shows</button>
                            <button onClick={e => showReport(title.venueName, title.authKey)}>Show Report</button>
                        </div>
                        <div id = "listShowsBoxVM"className="flex column scroll list2 pad"style={{width:"700px"}}>
                            <text>No Shows</text>
                        </div>
                    </div>
                    <div className="flex column">
                        <div className="flex row pad">
                            <select id = "listBlockSelect" className="flex column align-left row scroll margin-children" style={{fontSize :"25px",width:"200px"}}>
                            </select>
                            <button>List Blocks</button>
                        </div>
                        <select multiple id = "listBlocksBoxVM" className="flex column scroll list2 pad">
                            <option>No Blocks</option>
                        </select> 
                        <button>Delete Block</button>
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