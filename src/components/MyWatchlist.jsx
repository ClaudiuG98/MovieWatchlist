import {useContext} from "react";
import { Context } from "../Context";

function MyWatchlist() {
    const {watchlistElements} = useContext(Context)

    return(
        <div className="cards-container">
            {watchlistElements}
        </div>
    )
}

export default MyWatchlist