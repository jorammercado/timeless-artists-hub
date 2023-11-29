import ArtworkNewForm from "../Components/ArtworkNewForm"
import "./NewArtwork.css"

function NewArtwork() {

    return (
        <div className="top-new-artwork">
            <div className="new-artwork-title">
                Add Artwork
            </div>
            <ArtworkNewForm />

        </div>
    );
}

export default NewArtwork