import ArtistDetails from "../Components/ArtistDetails"
import "./Show.css"

function Show(){
    return (
        <div className="show">
            <div className="title-show"> Artist Details</div>
            <ArtistDetails />
        </div>
    )
}

export default Show