import React, { useContext } from "react";
import { Context } from "../Context"

function SearchPage() {
    const {searchInput, handleChange, search, cardElements} = useContext(Context)
    return(
        <div className="search-container">
            <div className="searchbar">
                <input
                    id="myInput"
                    placeholder="Search for a movie"
                    onChange={handleChange}
                    value={searchInput}
                />
                <button onClick={search} id="myBtn">Search</button>
            </div>
            <div className="cards-container">
                {cardElements}
            </div>
        </div>
    )
}

export default SearchPage