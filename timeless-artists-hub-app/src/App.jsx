
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Edit from "./Pages/Edit"
import EditArtwork from "./Pages/EditArtwork"
import FourOFour from "./Pages/FourOFour"
import Home from "./Pages/Home"
import Index from "./Pages/Index"
import IndexArtwork from "./Pages/IndexArtwork"
import New from "./Pages/New"
import NewArtwork from "./Pages/NewArtwork"
import Show from "./Pages/Show"
import ShowArtwork from "./Pages/ShowArtwork"
import NavBar from "./Components/NavBar"
import IndexArtworkDirect from "./Pages/IndexArtworkDirect"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css"

function App() {

  return (
    <div className='app'>
      <Router>
        <div className="nav">
          <NavBar />
        </div>
        <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artists" element={<Index />} />
          <Route path="/artworks" element={<IndexArtworkDirect />} />
          <Route path="/artists/new" element={<New />} />
          <Route path="/artists/:artist_id" element={<Show />} />
          <Route path="/artists/:artist_id/artworks" element={<IndexArtwork />} />
          <Route path="/artists/:artist_id/artworks/new" element={<NewArtwork />} />
          <Route path="/artists/:artist_id/artworks/:id" element={<ShowArtwork />} />
          <Route path="/artists/:artist_id/artworks/:id/edit" element={<EditArtwork />} />
          <Route path="/artists/:id/edit" element={<Edit />} />
          <Route path="*" element={<FourOFour />} />
        </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App