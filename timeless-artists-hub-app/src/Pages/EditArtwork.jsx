import ArtworkEditForm from "../Components/ArtworkEditForm"
import "./EditArtwork.css"

function EditArtwork() {
    return (
        <div className="edit">
            <div className="edit-artwork-title">
                Edit Artwork 
            </div >
                <ArtworkEditForm />
        </div>
    )
}

export default EditArtwork