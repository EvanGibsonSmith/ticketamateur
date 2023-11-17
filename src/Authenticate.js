import React from "react";
import { Link } from "react-router-dom";

export function Authenticate() {
    return (
        <body>
            <h1>This is the authenticate page, while we will need to actually authenticate later, below are buttons to send to other pages</h1>
            <div>
            <Link to='/Admin'>Admin</Link>
            </div>
            <div>
            <Link to='/Consumer'>Consumer</Link>
            </div>
            <div>
            <Link to='/VenueManager'>Venue Manager</Link>
            </div>
        </body>
    )
}


export default Authenticate;