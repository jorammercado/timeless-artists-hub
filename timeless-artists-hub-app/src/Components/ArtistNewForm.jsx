
import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import "./ArtistNewForm.css"
const API = import.meta.env.VITE_API_URL

export default function ArtistNewForm() {
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
    const navigate = useNavigate()

    const addArtist = () => {
        fetch(`${API}/artistes`, {
            method: "POST",
            body: JSON.stringify(artist),
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
                    alert(`Artist ${data.artiste_name} succesfully created`)
                    navigate(`/artists/${data.id}`)
                }
            })
            .catch((error) => {
                alert(error)
                console.error(error)
            })
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setArtist({
            ...artist,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addArtist()
    }

    const handleCancel = () => {
        navigate("/")
    }

    const handleReset = () => {
        setArtist({
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
    }

    return (
        <div className="form-new">
            <Form className="form" noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="artiste_name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="artiste_name"
                            placeholder="Artist Name"
                            value={artist.artiste_name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="birth_year">
                        <Form.Label>Birth Year</Form.Label>
                        <Form.Control
                            type="number"
                            name="birth_year"
                            placeholder="year"
                            value={artist.birth_year}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="death_year">
                        <Form.Label>Death Year</Form.Label>
                        <Form.Control
                            type="number"
                            name="death_year"
                            placeholder="year"
                            value={artist.death_year}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="genre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control
                            type="text"
                            name="genre"
                            placeholder="Artist Genre"
                            value={artist.genre}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="nationality">
                        <Form.Label>Nationality</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nationality"
                            name="nationality"
                            value={artist.nationality}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="bio">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Bio"
                            name="bio"
                            value={artist.bio}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="wikipedia_link">
                        <Form.Label>Wikipedia Link</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="wikipedia url link"
                            name="wikipedia_link"
                            value={artist.wikipedia_link}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="youtube_link">
                        <Form.Label>Youtube Link</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="youtube url link"
                            name="youtube_link"
                            value={artist.youtube_link}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="is_favorite">
                    <Form.Label>Is Favorite</Form.Label>
                    <Form.Check
                        type="checkbox"
                        name="is_favorite"
                        checked={artist.is_favorite}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <div className="form-container-button">
                    <button className="btn btn-dark btn-md" variant="primary" type="submit">
                        Create Artist
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