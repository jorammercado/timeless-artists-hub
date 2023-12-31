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
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error)
                }
                else if (data.err) {
                    throw new Error(data.err)
                }
                else {
                    alert(`Artwork ${data.artwork_name}` +
                        ` by ${data.artiste_name} was deleted!`)
                    navigate(`/artists/${artist_id}`)
                }
            })
            .catch((err) => {
                alert(err)
                console.error(err)
            })
    }

    return (
        <article className="top-artwork">
            <table className="table-artwork table table-bordered table-responsive ">
                <tbody>
                    <tr >
                        <th colSpan="4">
                            <img
                                src={`${artwork.img_link}`}
                                alt={`Image of ${artwork.artwork_name}`}
                                style={{ height: "400px" }}
                                className="image"
                            />
                        </th>
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
                <button className="btn btn-dark btn-sm" onClick={handleDelete}>
                    Delete
                </button>
                <button className="btn btn-dark btn-sm" onClick={() => navigate(`/artists/${artist_id}`)}>
                    Artist Details
                </button>
                <button className="btn btn-dark btn-sm" onClick={() => navigate(`/artists/${artist_id}/artworks`)}>
                    Artist Artworks
                </button>
                <button className="btn btn-dark btn-sm" onClick={() => navigate(`/artists/${artist_id}/artworks/${id}/edit`)} >
                    Edit Artwork
                </button>
            </div>
            <br></br>
        </article>
    )
}

export default ArtworkDetails
