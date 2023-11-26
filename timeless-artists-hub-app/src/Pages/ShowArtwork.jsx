import ArtworkDetails from "../Components/ArtworkDetails"
import "./ShowArtwork.css"

function ShowArtwork(){
    return (
        <div className="show-artwork">
            <div className="title-show-artwork"> Artwork Details</div>
            <ArtworkDetails />
        </div>
    )
}

export default ShowArtwork