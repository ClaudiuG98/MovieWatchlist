import React from "react";
import backgroundImg from "../assets/background.png"

import {Link} from "react-router-dom"

function Navbar() {
    return(
        <div className="navbar-container">
            <div className="img-container"></div>
            <div className="header-container">
                <Link to="/"><h1>Find your film</h1></Link>
                <Link to="/watchlist"><p>My Watchlist</p></Link>
            </div>
        </div>
    )
}

export default Navbar