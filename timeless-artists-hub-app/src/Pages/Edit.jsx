import ArtistEditForm from "../Components/ArtistEditForm"
import "./Edit.css"

function Edit() {
    return (
        <div className="edit">
            <div className="edit-title">
                Edit Artist
            </div>
            <ArtistEditForm />
        </div>
    )
}

export default Edit