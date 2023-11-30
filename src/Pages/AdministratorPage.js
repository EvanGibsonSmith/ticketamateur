import React from "react";
import "./AdministratorPage.css";
import { deleteShow } from "../Controller/AdministratorController"
import { listVenues } from "../Controller/AdministratorController";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

export function Admin() {
    const navigate = useNavigate();

    return (
        <body>
            <h1>This is the admin page</h1>
            <div className="flex row left50 pad">
                    <input type="text" id="deleteShowID" placeholder="Enter Venue Here"/>
                    <button onClick={e => deleteShow(null, "test delete name")}>Remove Show</button>
                </div>
            <div className="flex column">
                        <div className="flex row pad center">
                            <button onClick={e => listVenues(1234) /* TODO MAKE THIS PASS IN AUTH*/}>List Venues</button>
                        </div>
                        <div id = "listVenuesBox"className="flex column scroll list1 pad">
                            <text>No Venues</text>
                        </div>
                    </div>
                    <div className="flex column">
                        <div className="flex row pad">
                            <button>Show Report</button>
                        </div>
                        <div id = "listShowBox" className="flex column scroll list2 pad">
                            <text>No Shows</text>
                        </div>
                    </div>
                    <button onClick={e => navigate("/")}>Return to Authenticate Page</button>
        </body>
    )
}



export default Admin;