import ArtistNewForm from "../Components/ArtistNewForm"
import "./New.css"

function New() {
    return (
        <div className="top-new">
            <div className="new-title">
                Add Artist
            </div>
            <div className="new-form">
                <ArtistNewForm />
            </div>
        </div>
    )
}

export default New