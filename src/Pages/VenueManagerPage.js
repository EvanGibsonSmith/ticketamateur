import React from "react";
import "./VenueManagerPage.css";
import { deleteVenue, createShow, activateShow, deleteShow, listShows, showReport, createBlock, deleteBlock, listBlocks } from "../Controller/VenueManagerController"
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
    function loadRow (){
        var listRow = document.getElementById("startRow")
        //listRow.textContent = ''
        for(let i= 0; i<title.row; i++){
            let Option= document.createElement('option')
            let currentRow = String.fromCharCode(65 + i)
            Option.textContent= currentRow
            listRow.appendChild(Option)
        }
    }
    window.onload=loadRow()
    return (
        <body>
            <h1>Venue Manager Page For {title.venueName}</h1>
            <text>This Venue has {title.numRows} rows, {title.numSeatsLeft} Seats in Left Section, {title.numSeatsCenter} Seats in Center Section, {title.numSeatsRight} Seats in Right Section</text>
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
                <text>Show ID: </text>
                <select id = "createBlockSelect" className="flex column align-left row scroll margin-children" style={{fontSize :"25px",width:"200px"}}>
                    </select>
                    <text>Section: </text>
                    <select id="enterBlockSection" className="flex column align-left row scroll margin-children" style={{fontSize :"25px",width:"200px"}}>
                        <option className="section">Left</option>
                        <option className="section">Center</option>
                        <option className="section">Right</option>
                    </select>
                    <input type="text" className='height-50px' id="enterBlockPrice" placeholder="Enter Block Price"/>
                    <text>Start Row: </text>
                    <select id="startRow" className="flex column align-left row scroll margin-children" style={{fontSize :"25px",width:"75px"}}>
                        <option className="row">A</option>
                        <option className="row">B</option>
                        <option className="row">C</option>
                        <option className="row">D</option>
                        <option className="row">E</option>
                        <option className="row">F</option>
                        <option className="row">G</option>
                        <option className="row">H</option>
                        <option className="row">I</option>
                        <option className="row">J</option>
                        <option className="row">K</option>
                        <option className="row">L</option>
                        <option className="row">M</option>
                        <option className="row">N</option>
                        <option className="row">O</option>
                        <option className="row">P</option>
                        <option className="row">Q</option>
                        <option className="row">R</option>
                        <option className="row">S</option>
                        <option className="row">T</option>
                        <option className="row">U</option>
                        <option className="row">V</option>
                        <option className="row">W</option>
                        <option className="row">X</option>
                        <option className="row">Y</option>
                        <option className="row">Z</option>
                    </select>
                    <text>End Row: </text>
                    <select id="endRow" className="flex column align-left row scroll margin-children" style={{fontSize :"25px",width:"75px"}}>
                        <option className="row">A</option>
                        <option className="row">B</option>
                        <option className="row">C</option>
                        <option className="row">D</option>
                        <option className="row">E</option>
                        <option className="row">F</option>
                        <option className="row">G</option>
                        <option className="row">H</option>
                        <option className="row">I</option>
                        <option className="row">J</option>
                        <option className="row">K</option>
                        <option className="row">L</option>
                        <option className="row">M</option>
                        <option className="row">N</option>
                        <option className="row">O</option>
                        <option className="row">P</option>
                        <option className="row">Q</option>
                        <option className="row">R</option>
                        <option className="row">S</option>
                        <option className="row">T</option>
                        <option className="row">U</option>
                        <option className="row">V</option>
                        <option className="row">W</option>
                        <option className="row">X</option>
                        <option className="row">Y</option>
                        <option className="row">Z</option>
                    </select>
                    <div className="flex column">
                    <button onClick={e => createBlock(title.authKey)}>Create Block</button>
                    </div>
                </div>
                <div className="flex row left50 pad center">
                    <select id = "deleteShowSelect" className="flex column align-left row scroll margin-children" style={{fontSize :"25px",width:"200px"}}>
                    </select>
                    <div className="flex column">
                    <button onClick={e => deleteShow(document.getElementById("deleteShowSelect").value, title.authKey)}>Delete Show</button>
                    <text id="didShowDelete"></text>
                    </div>
                </div>
                
                <div className="flex row left50 pad center">
                    <select id = "activateShowSelect" className="flex column align-left row scroll margin-children" style={{fontSize :"25px",width:"200px"}}>
                    </select>
                    <div className="flex column">
                    <button onClick={e => activateShow(document.getElementById("activateShowSelect").value, title.authKey)}>Activate Show</button>
                    </div>
                </div>      
                
                <div className="flex row spaced pad">
                    <div className="flex column">
                        <div className="flex row pad center">
                            <div className="flex row">
                                <button onClick={e => listShows(title.venueName, title.authKey)}>List Shows</button>
                                <button onClick={e => showReport(title.venueName, title.authKey)}>Show Report</button>
                                </div>
                            </div>
                        <div id = "listShowsBoxVM"className="flex column scroll list2 pad"style={{width:"700px",backgroundColor:"#f8f8f8"}}>
                            <text>Press "List Shows" to view</text>
                        </div>
                    </div>
                    <div className="flex column">
                        <div className="flex row pad">
                            <select id = "listBlockSelect" className="flex column align-left row scroll margin-children" style={{fontSize :"25px",width:"200px"}}>
                            </select>
                            <div className="flex column">
                                <button onClick={e => listBlocks(document.getElementById("listBlockSelect").value, title.authKey)}>List Blocks</button>
                            </div>
                        </div>
                        <select multiple id = "listBlocksBoxVM" className="flex column scroll list2 pad" style={{width:"700px",backgroundColor:"#f8f8f8"}}>
                            <option>Press "List Block" to view</option>
                        </select> 
                        <div className="flex column">
                            <button onClick={e=> deleteBlock(title.authKey)}>Delete Block </button>
                            <text id="didBlockDelete"></text>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="flex row pad">
                <button onClick={e => removeCurrentVenue()} style={{fontSize: "25px"}}>Delete Venue</button>
                <button onClick={e => navigate("/")} style={{fontSize: "30px"}}>Return to Authenticate Page</button>
            </div>
            
        </body>
    )
}



export default VenueManager;