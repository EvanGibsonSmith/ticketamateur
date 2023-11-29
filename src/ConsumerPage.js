import React from "react";
import { useNavigate } from "react-router";

export function Consumer() {
    const navigate = useNavigate();
    return (
        <body>
            <h1>This is the consumer page</h1>
            <button onClick={e => navigate("/")}>Return to Authenticate Page</button>
        </body>
    )
}



export default Consumer;