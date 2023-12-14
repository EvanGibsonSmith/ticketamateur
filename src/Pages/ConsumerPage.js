import React from "react";
import { useNavigate } from "react-router";
import "./ConsumerPage.css";
import { totalPrice, searchActiveShows, availableSeats, purchaseSeats, listActiveShows, showAllActiveShows, sortSeats } from "../Controller/CustomerController";

export function Consumer() {
    const navigate = useNavigate();
    return (
        <body>
            <h1>This is the consumer page</h1>
            <div className="flex row align-flex-start">
                <div className="flex column pad align-center">
                    <input id="searchshowinput" type="text" style={{width: "400px"}} placeholder="Type here to Search Show and Venue"></input>
                    <button id='searchshow' style={{width: "150px"}} onClick={e => searchActiveShows()}>Search Show/Venue</button>
                    <div id="customerShowsList" style={{width: "500px", height: "600px", backgroundColor: "gainsboro", display: "block"}}>
                        <p className="show-display">Press "List Shows" to view</p>
                    </div>
                </div>
                <div className="flex column justify-spaced align-center margin">
                    <button className="right-side-buttons" onClick={e => availableSeats()}>Available Seats</button>
                    <button className="right-side-buttons" onClick={e => purchaseSeats()}>Purchase Seats</button>
                    <text id="didPurchaseSeat"></text>
                    <button className="right-side-buttons" onClick={e => listActiveShows()}>List Shows</button>
                </div>
                <div id="seatsDisplay" className="flex column pad margin" style={{width:"200px", paddingLeft:"10px"}}>
                    <h2 type="text" style={{width: "400px"}} placeholder="Search Seats"> Seats </h2>
                    <div className="flex row align-center" style={{width:"600px"}}>
                        <h3 className="margin-right"> Select Show </h3>
                        <div className="flex column align-center">
                            <select onChange={e => availableSeats()} id="selectActiveShow" style={{fontSize :"20px", backgroundColor: "gainsboro"}}>
                                <option className="show-display">Press "List Shows" to view</option>
                            </select>
                        </div>
                    </div>
                    <select onChange={e => sortSeats()} id="sortBySeats" style={{fontSize :"20px", backgroundColor: "gainsboro"}}>
                        <option className="sortSeats">Default</option>
                        <option className="sortSeats">Price</option>
                        <option className="sortSeats">Section</option>
                        <option className="sortSeats">Row</option>
                    </select>                   
                    <select multiple id="seatsList" className="flex column align-left scroll margin-children" style={{width: "500px", height: "600px", backgroundColor: "gainsboro"}}>
                        <option className="seat">Select a show from the dropdown or press "Availabe Seats" to view available seats.</option>
                    </select>
                </div>
            </div>
            <button onClick={e => navigate("/")}>Return to Authenticate Page</button>
        </body>
    )
}



export default Consumer;