
import React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import "./ArtworkNewForm.css"
const API = import.meta.env.VITE_API_URL

export default function ArtworkNewForm() {
    const { artist_id, id } = useParams()
    const [artiste_name, setArtiste] = useState("")
    const [artiste_id, setArtisteId] = useState(0)
    const [artwork, setArtwork] = useState({
        artiste_name: "",
        ariste_id: 0,
        artwork_name: "",
        style: "",
        date_created: "",
        img_link: "",
        is_favorite: false
    })
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${API}/artistes/${artist_id}`)
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.error) {
                    throw new Error(responseJSON.error)
                }
                else if (responseJSON.err) {
                    throw new Error(responseJSON.err)
                }
                else {
                    setArtiste(responseJSON.artiste_name)
                    setArtisteId(responseJSON.artiste_id)
                    setArtwork({ ...artwork, artiste_name, artiste_id })
                }
            })
            .catch((error) =>{
                 console.error(error)
            })
    }, [artist_id, id])

    const addArtwork = () => {
        fetch(`${API}/artistes/${artist_id}/artworks`, {
            method: "POST",
            body: JSON.stringify(artwork),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error)
                }
                else if (data.err) {
                    throw new Error(data.err)
                }
                else {
                    alert(`Artwork ${data.artwork_name} succesfully created`)
                    navigate(`/artists/${artist_id}/artworks/${data.id}`)
                }
            })
            .catch((error) => {
                alert(error)
                console.error(error)
            })
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
        navigate(`/artists/${artist_id}`)
    }

    const handleReset = () => {
        setArtwork({
            artwork_name: "",
            style: "",
            date_created: "",
            img_link: "",
            is_favorite: false
        })
    }

    return (
        <div className="form-new-artwork">
            <Form className="form" noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="artwork_name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            name="artwork_name"
                            type="text"
                            placeholder="name"
                            value={artwork.artwork_name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="style">
                        <Form.Label>Style</Form.Label>
                        <Form.Control
                            name="style"
                            type="text"
                            placeholder="style"
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
                            placeholder="date"
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
                            placeholder="link"
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
                    <button className="btn btn-dark btn-md" variant="primary" type="submit">
                        Create
                    </button>
                    <button className="btn btn-dark btn-md" variant="outline-primary" onClick={handleReset} type="button">
                        Clear
                    </button>
                    <button className="btn btn-dark btn-md" variant="secondary" onClick={handleCancel} type="button">
                        Cancel
                    </button>
                </div>
            </Form>
        </div>
    )
}