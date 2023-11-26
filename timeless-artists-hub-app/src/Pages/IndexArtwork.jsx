import ArtworkList from "../Components/ArtworkList"
import "./IndexArtwork.css"

function IndexArtwork() {
    return (
        <div className="artwork-Index">
            <div className="artwork-title-index">Artwork List</div>
            <ArtworkList />
        </div>
    )
}

export default IndexArtwork