import React from "react";
import "./AdministratorPage.css";
import { deleteShow, showReport } from "../Controller/AdministratorController"
import { listVenues } from "../Controller/AdministratorController";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

export function Admin() {
    const navigate = useNavigate();
    const location = useLocation();
    const AdminToken = location.state
    return (
        <body>
            <h1>This is the admin page</h1>
            <div className="flex row left50 pad">
                    <input type="text" id="deleteShowBox" placeholder="Enter Show ID Here"/>
                    <button onClick={e => deleteShow(document.getElementById("deleteShowBox").value, AdminToken)}>Remove Show</button>
                    
                </div>
            <div className="flex column">
                        <div className="flex row pad center">
                            <button onClick={e => listVenues(AdminToken) /* TODO MAKE THIS PASS IN AUTH*/}>List Venues</button>
                        </div>
                        <div id = "listVenuesBox" className="flex column scroll list1 pad" style={{height: "300px", width: "600px", backgroundColor:"#f8f8f8"}}>
                            <text>Press "List Venues" to view.</text>
                        </div>
                    </div>
                    <div className="flex column">
                        <div className="flex row pad">
                            <input type="text" id="reportBox" placeholder="Enter Venue Name Here"/>
                            <button onClick={e => showReport(document.getElementById("reportBox").value, AdminToken) }>Show Report</button>
                        </div>
                        <div id = "listShowBox" className="flex column scroll list2 pad" style={{height: "300px", width: "600px", backgroundColor:"#f8f8f8"}}>
                            <text>Choose a venue to view.</text>
                        </div>
                    </div>
                    <button onClick={e => navigate("/")}>Return to Authenticate Page</button>
        </body>
    )
}



export default Admin;