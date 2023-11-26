import ArtworkDetails from "../Components/ArtworkDetails"
import "./ShowArtworkDirect.css"

function ShowArtworkDirect(){
    return (
        <div className="show-artwork">
            <div className="title-show-artwork"> Artwork Details</div>
            <ArtworkDetails />
        </div>
    )
}

export default ShowArtworkDirect