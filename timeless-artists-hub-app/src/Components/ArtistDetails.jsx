import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button"
import React from 'react'
import "./ArtistDetails.css"
const API = import.meta.env.VITE_API_URL

function ArtistDetails() {
    const [artist, setArtist] = useState({
        artiste_name: "",
        birth_year: 0,
        death_year: 0,
        genre: "",
        nationality: "",
        bio: "",
        wikipedia_link: "",
        youtube_link: "",
        is_favorite: false
    })

    let navigate = useNavigate()
    let { artist_id } = useParams()

    useEffect(() => {
        fetch(`${API}/artistes/${artist_id}`)
            .then(response => response.json())
            .then(artist => {
                setArtist(artist)
            })
            .catch(() => navigate("/not-found"))
    }, [artist_id, navigate])

    const handleDelete = () => {
        const httpOptions = { "method": "DELETE" }
        fetch(`${API}/artistes/${artist_id}`, httpOptions)
            .then(response => response.json())
            .then((res) => {
                alert(`Artist ${res.deletedArtiste.artiste_name} was deleted!`)
                navigate('/artists')
            })
            .catch((err) => console.error(err))
    }

    const handleNavArtworks = () => {
        fetch(`${API}/artistes/${artist_id}/artworks`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error)
                }
                else if (data.err) {
                    throw new Error(data.err)
                }
                else {
                    navigate(`/artists/${artist_id}/artworks`)
                }
            })
            .catch((err) => {
                alert(err)
                console.error(err)
                navigate(`/artists/${artist_id}`)
            })
    }

    return (
        <article className="topArtist">
            <table className="tableArtist table table-bordered">
                <tbody>
                    <tr className="artistName">
                        <th colSpan="4"> Name: {artist.artiste_name} </th>
                    </tr>
                    <tr className="artistName">
                        <th colSpan="4"> Bio: {artist.bio} </th>
                    </tr>
                    <tr className="artistName">
                        <th colSpan="4"> Nationality: {artist.nationality} </th>
                    </tr>
                    <tr className="artistName">
                        <th colSpan="4"> Genre: {artist.genre} </th>
                    </tr>
                    <tr className="artistName">
                        <th colSpan="4">
                            Further Reading:
                            <Link to={artist.wikipedia_link} target="_blank"> {artist.wikipedia_link}</Link>
                        </th>
                    </tr>
                </tbody>
                <tbody >
                    <tr >
                        <th colSpan="4">
                            <form>
                                <iframe width="320" height="215"
                                    src={`${artist.youtube_link}`}
                                    title="youtube link"
                                    className="video"
                                >
                                </iframe>
                            </form>
                        </th>
                    </tr>
                </tbody>
            </table>
            <div className="show-navigation">
                <Link to={`/artists`}>
                    <button className="btn btn-dark btn-sm" onClick={handleDelete}>Delete</button>
                </Link>
                <Link className="edit" to={`/artists/${artist_id}/edit`}>
                    <button className="btn btn-dark btn-sm">
                        Edit Artist
                    </button>
                </Link>
                <Link className="edit" to={`/artists/${artist_id}/artworks/new`}>
                    <button className="btn btn-dark btn-sm">
                        New Artwork
                    </button>
                </Link>
                <button className="btn btn-dark btn-sm" onClick={handleNavArtworks}>
                    Artist Artworks List
                </button>



            </div>
            <br></br>
        </article>
    )
}

export default ArtistDetails
