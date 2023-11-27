import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import Artist from "./Artist"
import "./ArtistList.css"

const API = import.meta.env.VITE_API_URL

export default function ArtistList() {
    const navigate = useNavigate()
    const [allArtists, setAllArtists] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [artistsPerPage, setArtistsPerPage] = useState(7)
    const [artistsOrder, setArtistsOrder] = useState(false)
    const [genreOrder, setGenreOrder] = useState(false)
    const [nationalityOrder, setNationalityOrder] = useState(false)
    const [birthOrder, setBirthOrder] = useState(false)
    const [favOrder, setFavOrder] = useState(false)

    const changeOrderGe = () => {
        if (genreOrder === false) {
            setGenreOrder(true)
            fetch(`${API}/artistes/?order=ascGen`)
                .then((response) => response.json())
                .then(artists => setAllArtists(artists))
                .then((res) => {
                    navigate('/artists/?order=ascGen')
                })
                .catch(error => console.log(error))
        }
        else {
            setGenreOrder(false)
            fetch(`${API}/artistes/?order=descGen`)
                .then((response) => response.json())
                .then(artists => setAllArtists(artists))
                .then((res) => {
                    navigate('/artists/?order=descGen')
                })
                .catch(error => console.log(error))
        }
    }

    const changeOrderBir = () => {
        if (birthOrder === false) {
            setBirthOrder(true)
            fetch(`${API}/artistes/?order=ascBir`)
                .then((response) => response.json())
                .then(artists => setAllArtists(artists))
                .then((res) => {
                    navigate('/artists/?order=ascBir')
                })
                .catch(error => console.log(error))
        }
        else {
            setBirthOrder(false)
            fetch(`${API}/artistes/?order=descBir`)
                .then((response) => response.json())
                .then(artists => setAllArtists(artists))
                .then((res) => {
                    navigate('/artists/?order=descBir')
                })
                .catch(error => console.log(error))
        }
    }

    const changeOrderFav = () => {
        if (favOrder === false) {
            setFavOrder(true)
            fetch(`${API}/artistes/?is_favorite=true`)
                .then((response) => response.json())
                .then(artists => setAllArtists(artists))
                .then((res) => {
                    navigate('/artists/?is_favorite=true')
                })
                .catch(error => console.log(error))
        }
        else {
            setFavOrder(false)
            fetch(`${API}/artistes/?is_favorite=false`)
                .then((response) => response.json())
                .then(artists => setAllArtists(artists))
                .then((res) => {
                    navigate('/artists/?is_favorite=false')
                })
                .catch(error => console.log(error))
        }
    }

    const changeOrderNa = () => {
        if (nationalityOrder === false) {
            setNationalityOrder(true)
            fetch(`${API}/artistes/?order=ascNa`)
                .then((response) => response.json())
                .then(artists => setAllArtists(artists))
                .then((res) => {
                    navigate('/artists/?order=ascNa')
                })
                .catch(error => console.log(error))
        }
        else {
            setNationalityOrder(false)
            fetch(`${API}/artistes/?order=descNa`)
                .then((response) => response.json())
                .then(artists => setAllArtists(artists))
                .then((res) => {
                    navigate('/artists/?order=descNa')
                })
                .catch(error => console.log(error))
        }
    }

    const changeArtistOrder = () => {
        if (artistsOrder === false) {
            setArtistsOrder(true)
            const newOrder = allArtists.sort((a, b) => {
                if (a.artiste_name.toLowerCase() < b.artiste_name.toLowerCase())
                    return -1
                else if (a.artiste_name.toLowerCase() > b.artiste_name.toLowerCase())
                    return 1
                else
                    return 0
            })
            setAllArtists(newOrder)
        }
        else {
            setArtistsOrder(false)
            const newOrder = allArtists.sort((b, a) => {
                if (a.artiste_name.toLowerCase() < b.artiste_name.toLowerCase())
                    return -1
                else if (a.artiste_name.toLowerCase() > b.artiste_name.toLowerCase())
                    return 1
                else
                    return 0
            })
            setAllArtists(newOrder)
        }
    }

    const handleSortArtists = event => {
        event.preventDefault()
        changeArtistOrder()
    }

    const handleSortArtistsNa = event => {
        event.preventDefault()
        changeOrderNa()
    }

    const handleSortArtistsFav = event => {
        event.preventDefault()
        changeOrderFav()
    }

    const handleSortArtistsBir = event => {
        event.preventDefault()
        changeOrderBir()
    }

    const handleSortArtistsGe = event => {
        event.preventDefault()
        changeOrderGe()
    }

    useEffect(() => {
        fetch(`${API}/artistes`)
            .then((response) => response.json())
            .then((artists) => {
                setAllArtists(artists)
            })
            .catch((error) => {
                console.error("Error fetching data: ", error)
            })
    }, [])

    const indexOfLastArtist = currentPage * artistsPerPage
    const indexOfFirstArtist = indexOfLastArtist - artistsPerPage
    const currentArtists = allArtists.slice(indexOfFirstArtist, indexOfLastArtist)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className="artists">
            <section>
                <Table className="table" striped bordered hover>
                    <thead>
                        <tr className="table-row">
                            <th className="is_favorite">
                                <Button className="btn btn-secondary btn-sm" onClick={handleSortArtistsFav}>
                                    {`\u2605`}
                                </Button>
                            </th>
                            <th className="name">
                                <Button className="btn btn-secondary btn-sm" onClick={handleSortArtists}>
                                    Artist {` \u21f3`}
                                </Button>
                            </th>
                            <th className="years_alive">
                                <Button className="btn btn-secondary btn-sm" onClick={handleSortArtistsBir}>
                                    Years {` \u21f3`}
                                </Button>
                            </th>
                            <th className="genre">
                                <Button className="btn btn-secondary btn-sm" onClick={handleSortArtistsGe}>
                                    Genre {` \u21f3`}
                                </Button>
                            </th>
                            <th className="nationality">
                                <Button className="btn btn-secondary btn-sm" onClick={handleSortArtistsNa}>
                                    Nationality {` \u21f3`}
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentArtists.map((artist, index) => {
                            return (
                                <Artist
                                    key={artist.id}
                                    artist={artist}
                                    index={index + 1 + (currentPage - 1) * artistsPerPage}
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
                        disabled={indexOfLastArtist >= allArtists.length}
                        variant="primary"
                    >
                        Next
                    </Button>
                </div>
            </section>
        </div>
    )
}
