import React from "react";
import { useNavigate } from "react-router";
import "./ConsumerPage.css";
import { totalPrice, searchShow, availableSeats, purchaseSeats, listShows } from "../Controller/CustomerController";

export function Consumer() {
    const navigate = useNavigate();
    return (
        <body>
            <h1>This is the consumer page</h1>
            <div className="flex row align-flex-start">
                <select multiple id="venueDisplay" className="pad margin" style={{width:"200px"}}>
                    <option>A1</option>
                    <option>A2</option>
                    <option>A3</option>
                    <option>A4</option>
                    <option>A5</option>
                    <option>A6</option>
                    <option>A7</option>
                    <option>A8</option>
                    <option>B1</option>
                    <option>B2</option>
                    <option>B3</option>
                    <option>B4</option>
                    <option>B5</option>
                    <option>B6</option>
                    <option>B7</option>
                    <option>B8</option>
                </select>
                <div className="flex align-center column width50 height50 align-flex-start">

                </div>
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
                    <button className="right-side-buttons" onClick={e => listShows()}>List Shows</button>
                </div>
                <div className="flex column pad align-center">
                    <input id="searchshowinput" type="text" style={{width: "400px"}} placeholder="Search Show"></input>
                    <button id='searchshow' style={{width: "150px"}} onClick={e => searchShow(document.getElementById('searchshowinput').value)}>Search Show</button>
                    <div id="customerShowsList" className="flex column align-left scroll margin-children" style={{width: "500px", height: "600px", backgroundColor: "gainsboro"}}>
                        <text className="show-display">Test Show 1</text>
                        <text className="show-display">Test Show 2</text>
                        <text className="show-display">Test Show 3</text>
                        <text className="show-display">Test Show 4</text>
                    </div>
                </div>

            </div>
            <button onClick={e => navigate("/")}>Return to Authenticate Page</button>
        </body>
    )
}



export default Consumer;