import { Link } from "react-router-dom"
import "./NavBar.css"
const API = import.meta.env.VITE_BASE_URL

export default function NavBar() {
    return (
        <div className="navbar" >
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <div className="container-fluid">
                    <div>
                        <Link to="/">Home </Link>

                        <Link to="/artists"> Artists </Link>

                        <Link to="/artworks">Artworks </Link>

                        <Link to="/artists/new">New Artist</Link>
                    </div>
                    <span className="navbar-text">
                        Timeless Artist Hub
                    </span>
                </div>
            </nav>
        </div>
    )
}

