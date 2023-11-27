import { Link } from "react-router-dom"
import "./Artwork.css"

function Artwork(artwork) {
    return (
        <tr>
            <td>{artwork.is_favorite?`\u2605`:""}</td>
            <td>
                <Link to={`/artists/${artwork.artiste_id}/artworks/${artwork.id}`}>{artwork.artwork_name}</Link>
            </td>
            <td>{artwork.date_created}</td>
            <td>{artwork.style}</td>
        </tr>
    )
}

export default Artwork