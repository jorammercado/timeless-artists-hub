
import React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import "./ArtworkEditForm.css"
const API = import.meta.env.VITE_API_URL

export default function ArtworkEditForm() {
    let { artist_id, id } = useParams()
    const [artwork, setArtwork] = useState({
        artiste_name: "",
        artwork_name: "",
        style: "",
        date_created: "",
        img_link: "",
        is_favorite: false,
        artiste_id: 0
    })
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setArtwork({
            ...artwork,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const updateArtwork = () => {
        fetch(`${API}/artistes/${artist_id}/artworks/${id}`, {
            method: "PUT",
            body: JSON.stringify(artwork),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then((data) => {
                if (data.error) {
                    throw new Error(data.error)
                }
                else if (data.err) {
                    throw new Error(data.err)
                }
                else {
                    alert(`Artwork ${data.artwork_name} successfully updated!`)
                    navigate(`/artists/${artist_id}/artworks/${id}`)
                }
            })
            .catch((error) => {
                alert(error)
                console.error(error)
            })
    }

    useEffect(() => {
        fetch(`${API}/artistes/${artist_id}/artworks/${id}`)
            .then((response) => response.json())
            .then((responseJSON) => {
                setArtwork(responseJSON[0])
            })
            .catch((error) => console.error("Error:", error))
    }, [artist_id, id])

    const handleSubmit = (e) => {
        e.preventDefault()
        updateArtwork()
    }

    const handleBack = () => {
        navigate(`/artists/${artist_id}/artworks/${id}`)
    }

    return (
        <div>
            <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="artwork_name">
                        <Form.Label>Artwork Name</Form.Label>
                        <Form.Control
                            required
                            name="artwork_name"
                            type="text"
                            placeholder="artwork name"
                            value={artwork.artwork_name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="style">
                        <Form.Label>Artwork Style</Form.Label>
                        <Form.Control
                            name="style"
                            type="text"
                            placeholder="Enter Actor Image URL"
                            value={artwork.style}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="date_created">
                        <Form.Label>Date Created</Form.Label>
                        <Form.Control
                            name="date_created"
                            type="text"
                            placeholder="Date Artwork Created"
                            value={artwork.date_created}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="img_link">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            name="img_link"
                            type="text"
                            placeholder="image link"
                            value={artwork.img_link}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="is_favorite">
                    <Form.Label>Is Favorite</Form.Label>
                    <Form.Check
                        type="checkbox"
                        name="is_favorite"
                        onChange={handleInputChange}
                        checked={artwork.is_favorite}
                    />
                </Form.Group>
                <div className="form-edit-button">
                    <button className="update" variant="primary" type="submit">
                        Update Artwork
                    </button>
                    <button variant="primary" onClick={handleBack} type="submit">
                        Back
                    </button>
                </div>
            </Form>
        </div>
    )
}