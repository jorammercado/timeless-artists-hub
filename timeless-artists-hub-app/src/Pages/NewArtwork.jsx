import ArtworkNewForm from "../Components/ArtworkNewForm"
import "./NewArtwork.css"

function NewArtwork() {

    return (
        <div className="top-new-artwork">
            Add Artwork
            <div className="new-artwork-form">
                <ArtworkNewForm />
            </div>
        </div>
    );
}

export default NewArtwork