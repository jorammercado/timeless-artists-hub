import React, { useState, useEffect, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import Artwork from "./Artwork"
import "./ArtworkListDirect.css"
import Pagination from "./Pagination"

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
    const [itemIndex, setItemIndex] = useState([])
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

    const changeOrderStyle = () => {
        if (styleOrder === false) {
            setStyleOrder(true)
            fetch(`${API}/artworks/?order=ascStyle`)
                .then((response) => response.json())
                .then(artworks => {
                    setAllArtworks(artworks)
                    setItemIndex(artworks.map(elem => elem.id))
                })
                .then((res) => {
                    navigate(`/artworks/?order=ascStyle`)
                })
                .catch(error => console.log(error))
        }
        else {
            setStyleOrder(false)
            fetch(`${API}/artworks/?order=descStyle`)
                .then((response) => response.json())
                .then(artworks => {
                    setAllArtworks(artworks)
                    setItemIndex(artworks.map(elem => elem.id))
                })
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
                .then(artworks => {
                    setAllArtworks(artworks)
                    setItemIndex(artworks.map(elem => elem.id))
                })
                .then((res) => {
                    navigate(`/artworks/?order=ascDate`)
                })
                .catch(error => console.log(error))
        }
        else {
            setDateOrder(false)
            fetch(`${API}/artworks/?order=descDate`)
                .then((response) => response.json())
                .then(artworks => {
                    setAllArtworks(artworks)
                    setItemIndex(artworks.map(elem => elem.id))
                })
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
                .then(artworks => {
                    setAllArtworks(artworks)
                    setItemIndex(artworks.map(elem => elem.id))
                })
                .then((res) => {
                    navigate(`/artworks/?is_favorite=true`)
                })
                .catch(error => console.log(error))
        }
        else {
            setFavOrder(false)
            fetch(`${API}/artworks/?is_favorite=false`)
                .then((response) => response.json())
                .then(artworks => {
                    setAllArtworks(artworks)
                    setItemIndex(artworks.map(elem => elem.id))
                })
                .then((res) => {
                    navigate(`/artworks/?is_favorite=false`)
                })
                .catch(error => console.log(error))
        }
    }

    const changeArtworksOrder = () => {
        if (artworksOrder === false) {
            setArtworksOrder(true)
            fetch(`${API}/artworks/?order=asc`)
                .then((response) => response.json())
                .then(artworks => {
                    setAllArtworks(artworks)
                    setItemIndex(artworks.map(elem => elem.id))
                })
                .then((res) => {
                    navigate(`/artworks/?order=asc`)
                })
                .catch(error => console.log(error))
        }
        else {
            setArtworksOrder(false)
            fetch(`${API}/artworks/?order=desc`)
                .then((response) => response.json())
                .then(artworks => {
                    setAllArtworks(artworks)
                    setItemIndex(artworks.map(elem => elem.id))
                })
                .then((res) => {
                    navigate(`/artworks/?order=desc`)
                })
                .catch(error => console.log(error))
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
                setItemIndex(artworks.map(elem => elem.id))
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
                Artworks in database: {allArtworks.length}
            </div>
            <section>
                <Table className="table" striped bordered hover>
                    <thead>
                        <tr className="table-row">
                            <th>
                                #
                            </th>
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
                        {currentTableData.map((artwork, index) => {
                            { artwork.index = itemIndex.indexOf(artwork.id) + 1 }
                            return (
                                <Artwork
                                    key={artwork.id}
                                    artwork={artwork}
                                />
                            )
                        }, itemIndex)}
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
        </div>
    )
}
