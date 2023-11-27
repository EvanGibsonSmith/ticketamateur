import React from "react";
import "./AdministratorPage.css";
import { deleteShow } from "./AdministratorController"

export function Admin() {
    return (
        <body>
            <h1>This is the admin page</h1>
            <div className="flex row left50 pad">
                    <input type="text" id="deleteShowID" placeholder="Enter Venue Here"/>
                    <button onClick={e => deleteShow(null, "test delete name")}>Remove Show</button>
                </div>
            <div className="flex column">
                        <div className="flex row pad center">
                            <button>List Venues</button>
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
                    <div className="flex column">
                        <div className="flex row pad">
                            <button>Show Report</button>
                        </div>
                        <div className="flex column scroll list2 pad">
                            <text>Show 1</text>
                            <text>Show 2</text>
                            <text>Show 3</text>
                            <text>Show 4</text>
                            <text>Show 5</text>
                            <text>Show 6</text>
                        </div>
                    </div>
        </body>
    )
}



export default Admin;