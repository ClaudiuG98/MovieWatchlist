import { useState } from 'react'
import MyWatchlist from './components/MyWatchlist'
import Navbar from './components/Navbar'
import {Routes, Route} from "react-router-dom"
import SearchPage from './components/SearchPage'

function App() {
  
  return (
    <div>
      <Navbar />
      <Routes>
          <Route exact path="/MovieWatchlist" element={<SearchPage />}/>
          <Route path="/watchlist" element={<MyWatchlist />}/>
      </Routes>
    </div>
  )
}

export default App
