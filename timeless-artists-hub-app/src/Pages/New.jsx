import ArtistNewForm from "../Components/ArtistNewForm"
import "./New.css"

function New() {
    return (
        <div className="top-new">
            <div className="new-title">
                Add Artist
            </div>
            <ArtistNewForm />
        </div>
    )
}

export default New