
import React from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import "./ArtworkNewForm.css"
const API = import.meta.env.VITE_API_URL

export default function ArtworkNewForm() {
    const { artist_id } = useParams()
    const [artwork, setArtwork] = useState({
        artwork_name: "",
        style: "",
        date_created: "",
        img_link: "",
        is_favorite: false
    })
    const navigate = useNavigate()

    const addArtwork = () => {
        fetch(`${API}/artistes/${artist_id}/artworks`, {
            method: "POST",
            body: JSON.stringify(artwork),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(() => {
                navigate(`${API}/artistes/${artist_id}/artworks`)
            })
            .catch((error) => console.error("catch", error))
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setArtwork({
            ...artwork,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addArtwork()
    }

    const handleCancel = () => {
        navigate(`/artistes/${artist_id}/artworks`)
    }

    const handleReset = () => {
        setArtist({
            artwork_name: "",
            style: "",
            date_created: "",
            img_link: "",
            is_favorite: false
        })
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
                <div className="form-container-button">
                    <Button className="new" variant="primary" type="submit">
                        <span>New Artwork</span>
                    </Button>
                    <Button className="clear" variant="outline-primary" onClick={handleReset} type="button">
                        <span>Clear</span>
                    </Button>
                    <Button className="cancel" variant="secondary" onClick={handleCancel} type="button">
                        <span>Cancel</span>
                    </Button>
                </div>
            </Form>
        </div>
    )
}