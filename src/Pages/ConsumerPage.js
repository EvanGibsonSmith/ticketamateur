import React from "react";
import { useNavigate } from "react-router";
import "./ConsumerPage.css";
import { totalPrice, searchActiveShows, availableSeats, purchaseSeats, listActiveShows } from "../Controller/CustomerController";

export function Consumer() {
    const navigate = useNavigate();
    return (
        <body>
            <h1>This is the consumer page</h1>
            <div className="flex row align-flex-start">
                <div className="flex column justify-spaced align-center margin">
                    <text id="total-price">Total Price: {totalPrice}</text>
                    <select className="flex column align-left scroll margin-children" style={{fontSize :"25px",width:"300px", backgroundColor: "gainsboro"}}>
                        <option className="show-display">Test Show 1</option>
                        <option className="show-display">Test Show 2</option>
                        <option className="show-display">Test Show 3</option>
                        <option className="show-display">Test Show 4</option>
                    </select>
                    <button className="right-side-buttons" onClick={e => availableSeats()}>Available Seats</button>
                    <button className="right-side-buttons" onClick={e => purchaseSeats()}>Purchase Seats</button>
                    <button className="right-side-buttons" onClick={e => listActiveShows()}>List Shows</button>
                </div>
                <div className="flex column pad align-center">
                    <input id="searchshowinput" type="text" style={{width: "400px"}} placeholder="Search Show"></input>
                    <button id='searchshow' style={{width: "150px"}} onClick={e => searchActiveShows()}>Search Show</button>
                    <select id="customerShowsList" className="flex column align-left scroll margin-children" style={{width: "500px", height: "600px", backgroundColor: "gainsboro", display: "block"}}>
                        <option className="show-display">Test Show 1</option>
                        <option className="show-display">Test Show 2</option>
                        <option className="show-display">Test Show 3</option>
                        <option className="show-display">Test Show 4</option>
                    </select>
                </div>
                <div id="seatsDisplay" className="flex column pad margin" style={{width:"200px", paddingLeft:"10px"}}>
                    <h2 type="text" style={{width: "400px"}} placeholder="Search Seats"> Seats </h2>
                    <button id='showseats' style={{width: "150px"}} onClick={e => availableSeats()}>Show Available Seats</button>
                    <select multiple id="seatsList" className="flex column align-left scroll margin-children" style={{width: "500px", height: "600px", backgroundColor: "gainsboro"}}>
                        <option className="seat">A1</option>
                        <option className="seat">A2</option>
                        <option className="seat">A3</option>
                        <option className="seat">A4</option>
                    </select>
                </div>
            </div>
            <button onClick={e => navigate("/")}>Return to Authenticate Page</button>
        </body>
    )
}



export default Consumer;