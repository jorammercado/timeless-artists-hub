import React, { useState, useEffect, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import Artwork from "./Artwork"
import "./ArtworkList.css"
import Pagination from "./Pagination"

const API = import.meta.env.VITE_API_URL

export default function ArtworkList() {
    const navigate = useNavigate()
    let { artist_id } = useParams()
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
    const [allArtworks, setAllArtworks] = useState([])
    const [artworksOrder, setArtworksOrder] = useState(false)
    const [styleOrder, setStyleOrder] = useState(false)
    const [dateOrder, setDateOrder] = useState(false)
    const [favOrder, setFavOrder] = useState(false)

    const changeOrderStyle = () => {
        if (styleOrder === false) {
            setStyleOrder(true)
            fetch(`${API}/artistes/${artist_id}/artworks/?order=ascStyle`)
                .then((response) => response.json())
                .then(artworks => setAllArtworks(artworks.allArtworks))
                .then((res) => {
                    navigate(`/artists/${artist_id}/artworks/?order=ascStyle`)
                })
                .catch(error => console.log(error))
        }
        else {
            setStyleOrder(false)
            fetch(`${API}/artistes/${artist_id}/artworks/?order=descStyle`)
                .then((response) => response.json())
                .then(artworks => setAllArtworks(artworks.allArtworks))
                .then((res) => {
                    navigate(`/artists/${artist_id}/artworks/?order=descStyle`)
                })
                .catch(error => console.log(error))
        }
    }

    const changeOrderDate = () => {
        if (dateOrder === false) {
            setDateOrder(true)
            fetch(`${API}/artistes/${artist_id}/artworks/?order=ascDate`)
                .then((response) => response.json())
                .then(artworks => setAllArtworks(artworks.allArtworks))
                .then((res) => {
                    navigate(`/artists/${artist_id}/artworks/?order=ascDate`)
                })
                .catch(error => console.log(error))
        }
        else {
            setDateOrder(false)
            fetch(`${API}/artistes/${artist_id}/artworks/?order=descDate`)
                .then((response) => response.json())
                .then(artworks => setAllArtworks(artworks.allArtworks))
                .then((res) => {
                    navigate(`/artists/${artist_id}/artworks/?order=descDate`)
                })
                .catch(error => console.log(error))
        }
    }

    const changeOrderFav = () => {
        if (favOrder === false) {
            setFavOrder(true)
            fetch(`${API}/artistes/${artist_id}/artworks/?is_favorite=true`)
                .then((response) => response.json())
                .then(artworks => setAllArtworks(artworks))
                .then((res) => {
                    navigate(`/artists/${artist_id}/artworks/?is_favorite=true`)
                })
                .catch(error => console.log(error))
        }
        else {
            setFavOrder(false)
            fetch(`${API}/artistes/${artist_id}/artworks/?is_favorite=false`)
                .then((response) => response.json())
                .then(artworks => setAllArtworks(artworks))
                .then((res) => {
                    navigate(`/artists/${artist_id}/artworks/?is_favorite=false`)
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
        fetch(`${API}/artistes/${artist_id}/artworks`)
            .then((response) => response.json())
            .then((data) => {
                setAllArtworks(data.allArtworks)
                setArtist(data)
            })
            .catch((error) => {
                console.error("Error fetching data: ", error)
            })
    }, [])

    let PageSize = 10
    const [currentPageV2, setCurrentPageV2] = useState(1)
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPageV2 - 1) * PageSize
        const lastPageIndex = firstPageIndex + PageSize
        return allArtworks.slice(firstPageIndex, lastPageIndex)
    }, [currentPageV2, allArtworks])

    return (
        <div className="artworks">
            <div>
                {artist.artiste_name}'s artworks in database: {allArtworks.length}
            </div>
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
                            <th className="created">
                                <Button className="btn btn-secondary btn-sm" onClick={handleSortArtworksDate}>
                                    Created {` \u21f3`}
                                </Button>
                            </th>
                            <th className="style">
                                <Button className="btn btn-secondary btn-sm" onClick={handleSortArtworksStyle}>
                                    Style {` \u21f3`}
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTableData.map((artwork, index) => {
                            return (
                                <Artwork
                                    key={artwork.id}
                                    artwork={artwork}
                                />
                            )
                        })}
                    </tbody>
                </Table>

                <Pagination
                    className="pagination-bar"
                    currentPage={currentPageV2}
                    totalCount={allArtworks.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPageV2(page)}
                />
            </section>
            <button onClick={() => navigate(-1)}>
                <span>Back</span>
            </button>
        </div>
    )
}
