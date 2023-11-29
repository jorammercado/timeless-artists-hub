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
                    </div>
                    <div>
                        <Link to="/artists"> Artists </Link>
                    </div>
                    <div>
                        <Link to="/artworks">Artworks </Link>
                    </div>
                    <div>
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
