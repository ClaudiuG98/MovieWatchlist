import React, {useState, useContext} from "react";
import { Context } from "../Context";

function Card(props) {
    const [isReadMore, setIsReadMore] = useState(true)
    const card = props.card

    const {addToWatchlist, removeFromWatchlist} = useContext(Context)

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    const descriptionPlot = (
        card.plot !== "N/A" && 
        <p className="plot">
            {isReadMore ? card.plot.slice(0, 145) : card.plot}
            {card.plot.length > 145 && <span onClick={toggleReadMore} className="read-or-hide">
                {isReadMore ? "...read more" : " show less"}
            </span>}
        </p>
    )

    function watchListIcon() {
        if(card.isInWishlist) {
            return <a onClick={() => removeFromWatchlist(card)} className="watchlist"><i className="ri-indeterminate-circle-fill"></i>Remove</a>
        } else {
            return <a onClick={() => addToWatchlist(card)} className="watchlist"><i className="ri-add-circle-fill"></i>Watchlist</a>
        }
    }

    return (
        <div className="card-container">
            <img src={card.img}/>
            <h1>{card.title} <span className="rating"><i className="ri-star-fill"></i> {card.rating}</span></h1>
            <p className="data-watchlist">
                <span className="runtime">{card.runtime}</span> 
                <span className="genre">{card.genre}</span> 
                {watchListIcon()}
            </p>
            
            {descriptionPlot}
        </div>
    )
}

export default Card