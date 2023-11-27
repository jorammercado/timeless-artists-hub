import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import Artwork from "./Artwork"
import "./ArtworkListDirect.css"

const API = import.meta.env.VITE_API_URL

export default function ArtworkListDirect() {
    const navigate = useNavigate()
    const [allArtworks, setAllArtworks] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [artworksPerPage, setArtworksPerPage] = useState(10)
    const [artworksOrder, setArtworksOrder] = useState(false)
    const [styleOrder, setStyleOrder] = useState(false)
    const [dateOrder, setDateOrder] = useState(false)
    const [favOrder, setFavOrder] = useState(false)

    const changeOrderStyle = () => {
        if (styleOrder === false) {
            setStyleOrder(true)
            fetch(`${API}/artworks/?order=ascStyle`)
                .then((response) => response.json())
                .then(artworks => setAllArtworks(artworks))
                .then((res) => {
                    navigate(`/artworks/?order=ascStyle`)
                })
                .catch(error => console.log(error))
        }
        else {
            setStyleOrder(false)
            fetch(`${API}/artworks/?order=descStyle`)
                .then((response) => response.json())
                .then(artworks => setAllArtworks(artworks))
                .then((res) => {
                    navigate(`/artworks/?order=descStyle`)
                })
                .catch(error => console.log(error))
        }
    }

    const changeOrderDate = () => {
        if (dateOrder === false) {
            setDateOrder(true)
            fetch(`${API}/artworks/?order=ascDate`)
                .then((response) => response.json())
                .then(artworks => setAllArtworks(artworks))
                .then((res) => {
                    navigate(`/artworks/?order=ascDate`)
                })
                .catch(error => console.log(error))
        }
        else {
            setDateOrder(false)
            fetch(`${API}/artworks/?order=descDate`)
                .then((response) => response.json())
                .then(artworks => setAllArtists(artworks))
                .then((res) => {
                    navigate(`/artworks/?order=descDate`)
                })
                .catch(error => console.log(error))
        }
    }

    const changeOrderFav = () => {
        if (favOrder === false) {
            setFavOrder(true)
            fetch(`${API}/artworks/?is_favorite=true`)
                .then((response) => response.json())
                .then(artworks => setAllArtworks(artworks))
                .then((res) => {
                    navigate(`/artworks/?is_favorite=true`)
                })
                .catch(error => console.log(error))
        }
        else {
            setFavOrder(false)
            fetch(`${API}/artworks/?is_favorite=false`)
                .then((response) => response.json())
                .then(artworks => setAllArtworks(artworks))
                .then((res) => {
                    navigate(`/artworks/?is_favorite=false`)
                })
                .catch(error => console.log(error))
        }
    }

    const changeArtworksOrder = () => {
        if (artworksOrder === false) {
            setArtworksOrder(true)
            const newOrder = allArtworks.sort((a, b) => {
                if (a.artwork_name.toLowerCase() < b.artwork_name.toLowerCase())
                    return -1
                else if (a.artwork_name.toLowerCase() > b.artwork_name.toLowerCase())
                    return 1
                else
                    return 0
            })
            setAllArtworks(newOrder)
        }
        else {
            setArtworksOrder(false)
            const newOrder = allArtworks.sort((b, a) => {
                if (a.artwork_name.toLowerCase() < b.artwork_name.toLowerCase())
                    return -1
                else if (a.artwork_name.toLowerCase() > b.artwork_name.toLowerCase())
                    return 1
                else
                    return 0
            })
            setAllArtworks(newOrder)
        }
    }

    const handleSortArtworks = event => {
        event.preventDefault()
        changeArtworksOrder()
    }

    const handleSortArtworksFav = event => {
        event.preventDefault()
        changeOrderFav()
    }

    const handleSortArtworksDate = event => {
        event.preventDefault()
        changeOrderDate()
    }

    const handleSortArtworksStyle = event => {
        event.preventDefault()
        changeOrderStyle()
    }

    useEffect(() => {
        fetch(`${API}/artworks`)
            .then((response) => response.json())
            .then((artworks) => {
                setAllArtworks(artworks)
            })
            .catch((error) => {
                console.error("Error fetching data: ", error)
            })
    }, [])

    const indexOfLastArtwork = currentPage * artworksPerPage
    const indexOfFirstArtwork = indexOfLastArtwork - artworksPerPage
    const currentArtworks = allArtworks.slice(indexOfFirstArtwork, indexOfLastArtwork)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className="artworks">
            <section>
                <Table className="table" striped bordered hover>
                    <thead>
                        <tr className="table-row">
                            <th className="is_favorite">
                                <Button className="btn btn-secondary btn-sm" onClick={handleSortArtworksFav}>
                                    {`\u2605`}
                                </Button>
                            </th>
                            <th className="name">
                                <Button className="btn btn-secondary btn-sm" onClick={handleSortArtworks}>
                                    Artwork {` \u21f3`}
                                </Button>
                            </th>
                            <th className="years_alive">
                                <Button className="btn btn-secondary btn-sm" onClick={handleSortArtworksDate}>
                                    Created {` \u21f3`}
                                </Button>
                            </th>
                            <th className="genre">
                                <Button className="btn btn-secondary btn-sm" onClick={handleSortArtworksStyle}>
                                    Style {` \u21f3`}
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentArtworks.map((artwork, index) => {
                            return (
                                <Artwork
                                    key={artwork.id}
                                    artwork={artwork}
                                    index={index + 1 + (currentPage - 1) * artworksPerPage}
                                />
                            )
                        })}
                    </tbody>
                </Table>
                <div className="pagination">
                    <Button
                        className="btn"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        variant="primary"
                    >
                        Previous
                    </Button>
                    <span>Page {currentPage}</span>
                    <Button
                        className="btn"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={indexOfLastArtwork >= allArtworks.length}
                        variant="primary"
                    >
                        Next
                    </Button>
                </div>
            </section>
        </div>
    )
}
