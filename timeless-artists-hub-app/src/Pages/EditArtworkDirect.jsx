import ArtworkEditForm from "../Components/ArtworkEditForm"
import "./EditArtworkDirect.css"

function EditArtworkDirect() {
    return (
        <div className="edit">
            <div className="edit-artwork-title">
                Edit Artwork Form Direct Access
            </div >
            <div className="edit-artwork-form-container">
                <ArtworkEditForm />
            </div>
        </div>
    )
}

export default EditArtworkDirect
