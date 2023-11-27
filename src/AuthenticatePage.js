import React from "react";
import { Link } from "react-router-dom";
import './AuthenticatePage.css';


export function Authenticate() {
    return (
        <body>
            <h1>This is the authenticate page, while we will need to actually authenticate later, below are buttons to send to other pages</h1>
            <div className="flex-container-row">
                <p>Authenticate:    </p>
                <input type="text" id="authenticatePageID" name="name" height="2" required minlength="1" maxlength="20" size="10" />
            </div>

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