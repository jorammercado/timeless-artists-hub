import { Link } from "react-router-dom"
import "./NavBar.css"
const API = import.meta.env.VITE_BASE_URL

export default function NavBar() {
    return (
        <div className="navbar" >
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <div className="container-fluid">
                    <h1>
                        <Link to="/">Home </Link>
                    </h1>
                    <h1>
                        <Link to="/artists">Songs </Link>
                    </h1>
                    <h1>
                        <Link to="/artworks">Artists </Link>
                    </h1>
                    <h1>
                        <Link to="/artists/new">New Artist</Link>
                    </h1>
                    <span className="navbar-text">
                        Timeless Artist Hub
                    </span>
                </div>
            </nav>
        </div>
    )
}
