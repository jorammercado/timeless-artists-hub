import ArtworkEditForm from "../Components/ArtworkEditForm"
import "./EditArtwork.css"

function EditArtwork() {
    return (
        <div className="edit">
            <div className="edit-artwork-title">
                Edit Artwork Form
            </div >
            <div className="edit-artwork-form-container">
                <ArtworkEditForm />
            </div>
        </div>
    )
}

export default EditArtwork