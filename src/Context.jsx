import React, { useState, useEffect } from "react";
import Card from "./components/Card";

const Context = React.createContext()

function ContextProvider(props) {
    const [searchInput, setSearchInput] = useState('')
    const [searchData, setSearchData] = useState([])
    const [watchlistData, setWatchlistData] = useState(() => {
        const ls = localStorage.getItem("watchlist");
        if (ls) return JSON.parse(ls);
        else return [];
      })
    
    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlistData));
    }, [watchlistData])

    function handleChange(event) {
        setSearchInput(event.target.value)
    }
    
    function search() {
        setSearchData([])
        fetch(`https://www.omdbapi.com/?apikey=f8be1555&s=${searchInput}&page=1`)
            .then(res => res.json())
            .then(data => {
                if(data.Response === 'False') {
                    throw Error(data.Error)
                }
                for(let movie of data.Search) {
                    fetch(`https://www.omdbapi.com/?apikey=f8be1555&i=${movie.imdbID}`)
                        .then(res => res.json())
                        .then(data => {
                            setSearchData(prevData => [...prevData, {
                                id: data.imdbID,
                                img: data.Poster,
                                title: data.Title,
                                plot: data.Plot,
                                rating: data.imdbRating,
                                runtime: data.Runtime,
                                genre: data.Genre,
                                isInWishlist: watchlistData.find(d => d.id === data.imdbID) === undefined ? false : true
                            }])
                        }
                    )
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    function addToWatchlist(card) {
        const updatedData = searchData.map(data => {
            if(data.id === card.id) {
                return {...data, isInWishlist: true}
            }
            return data
        })
        setSearchData(updatedData)
        setWatchlistData(prevData => [...prevData, {...card, isInWishlist: true}])
    }

    function removeFromWatchlist(card) {
        const updatedData = searchData.map(data => {
            if(data.id === card.id) {
                return {...data, isInWishlist: false}
            }
            return data
        })
        setSearchData(updatedData)
        setWatchlistData(prevData => prevData.filter(d => d.id !== card.id))
    }

    const cardElements = searchData.map(el => (
        <div key={el.id}>
            <Card card={el} />
            <hr />
        </div>
    ))
    
    const watchlistElements = watchlistData.map(el => (
        <div key={el.id}>
            <Card card={el} />
            <hr />
        </div>
    ));

    console.log(watchlistData)
    
    return (
        <Context.Provider value={{searchInput, search, handleChange, cardElements, watchlistElements, addToWatchlist, removeFromWatchlist}}>
            {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}