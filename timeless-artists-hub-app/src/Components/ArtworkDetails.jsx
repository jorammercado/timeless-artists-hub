import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import React from 'react'
import "./ArtworkDetails.css"
const API = import.meta.env.VITE_API_URL

function ArtworkDetails() {
    const [artwork, setArtwork] = useState({
        artwork_name: "",
        artiste_name: "",
        style: "",
        date_created: "",
        img_link: ""
    })

    let navigate = useNavigate()
    let { artist_id, id } = useParams()

    useEffect(() => {
        fetch(`${API}/artistes/${artist_id}/artworks/${id}`)
            .then(response => response.json())
            .then(artwork => {
                setArtwork(artwork[0])
            })
            .catch(() => navigate("/not-found"))
    }, [artist_id, id, navigate])

    const handleDelete = () => {
        const httpOptions = { "method": "DELETE" }
        fetch(`${API}/artistes/${artist_id}/artworks/${id}`, httpOptions)
            .then((res) => {
                alert("Artwork was deleted!")
                navigate(`/artistes/${artist_id}/artworks`)
            })
            .catch((err) => console.error(err))
    }

    return (
        <article className="topArtist">
            <table className="tableArtist">
                <tbody>
                    <tr>
                        <td> <img src={`${artwork.img_link}`} /> </td>
                    </tr>
                    <tr >
                        <th colSpan="4"> <img src={`${artwork.img_link}`} /> </th>
                    </tr>
                    <tr >
                        <th colSpan="4"> Artist: {artwork.artiste_name} </th>
                    </tr>
                    <tr >
                        <th colSpan="4"> Artwork: {artwork.artwork_name} </th>
                    </tr>
                    <tr >
                        <th colSpan="4"> Style: {artwork.style} </th>
                    </tr>
                    <tr >
                        <th colSpan="4"> Date Created: {artwork.date_created} </th>
                    </tr>
                    

                </tbody>

            </table>
            <div className="show-navigation">
                <Link to={`/artistes/${artist_id}/artworks`}>
                    <button>Artworks</button>
                </Link>
                <Link to={`/artistes/${artist_id}/artworks`}>
                    <button onClick={handleDelete}>Delete</button>
                </Link>
                <Link className="back" to={`/artistes/${artist_id}/artworks`}>Back</Link>
                <Link className="edit" to={`/artistes/${artist_id}/artworks/${id}`}>Edit</Link>
                <Link className="artworks" to={`/artists/${artist_id}/artworks`}>Artworks</Link>
                <Link className="delete" onClick={handleDelete}>Delete</Link>
            </div>
            <br></br>
        </article>
    )
}

export default ArtworkDetails
