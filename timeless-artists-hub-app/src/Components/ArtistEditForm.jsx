import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import "./ArtistEditForm.css"

const API = import.meta.env.VITE_API_URL

export default function ArtistEditForm() {
    let { id } = useParams()
    const navigate = useNavigate()
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

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setArtist({
            ...artist,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const updateArtist = () => {
        fetch(`${API}/artistes/${id}`, {
            method: "PUT",
            body: JSON.stringify(artist),
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
                    alert(`Artist ${data.artiste_name} succesfully updated`)
                    navigate(`/artists/${id}`)
                }
            })
            .catch((error) => {
                alert(error)
                console.error(error)
            })
    }

    useEffect(() => {
        fetch(`${API}/artistes/${id}`)
            .then((response) => response.json())
            .then((responseJSON) => {
                setArtist(responseJSON)
            })
            .catch((error) => console.error("Error:", error))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        updateArtist()
    }

    const handleBack = () => {
        navigate(`/artists/${id}`)
    }

    return (
        <div className="form-edit">
            <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="artiste_name">
                        <Form.Label>Artist Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="artiste_name"
                            placeholder="name"
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
                            placeholder="nationality"
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

                    <Form.Group as={Col} controlId="wikipedia_link">
                        <Form.Label>Wikipedia Link</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="wikipedia url"
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
                            placeholder="youtube url"
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
                <div className="form-edit-button">
                    <button className="update atlBtnColor" variant="primary" type="submit">
                        Update Artist
                    </button>
                    <button className="back" variant="secondary" onClick={handleBack} type="submit">
                        Back
                    </button>
                </div>
            </Form>
        </div>
    )
}
