import React, { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import Artist from "./Artist"
import "./ArtistList.css"
import Pagination from "./Pagination"

const API = import.meta.env.VITE_API_URL

export default function ArtistList() {
    const navigate = useNavigate()
    const [itemIndex, setItemIndex] = useState([])
    const [allArtists, setAllArtists] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [artistsPerPage, setArtistsPerPage] = useState(10)
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
                .then(artists => {
                    setAllArtists(artists)
                    setItemIndex(artists.map(elem => elem.id))
                })
                .then((res) => {
                    navigate('/artists/?order=ascGen')
                })
                .catch(error => console.log(error))
        }
        else {
            setGenreOrder(false)
            fetch(`${API}/artistes/?order=descGen`)
                .then((response) => response.json())
                .then(artists => {
                    setAllArtists(artists)
                    setItemIndex(artists.map(elem => elem.id))
                })
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
                .then(artists => {
                    setAllArtists(artists)
                    setItemIndex(artists.map(elem => elem.id))
                })
                .then((res) => {
                    navigate('/artists/?order=ascBir')
                })
                .catch(error => console.log(error))
        }
        else {
            setBirthOrder(false)
            fetch(`${API}/artistes/?order=descBir`)
                .then((response) => response.json())
                .then(artists => {
                    setAllArtists(artists)
                    setItemIndex(artists.map(elem => elem.id))
                })
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
                .then(artists => {
                    setAllArtists(artists)
                    setItemIndex(artists.map(elem => elem.id))
                })
                .then((res) => {
                    navigate('/artists/?is_favorite=true')
                })
                .catch(error => console.log(error))
        }
        else {
            setFavOrder(false)
            fetch(`${API}/artistes/?is_favorite=false`)
                .then((response) => response.json())
                .then(artists => {
                    setAllArtists(artists)
                    setItemIndex(artists.map(elem => elem.id))
                })
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
                .then(artists => {
                    setAllArtists(artists)
                    setItemIndex(artists.map(elem => elem.id))
                })
                .then((res) => {
                    navigate('/artists/?order=ascNa')
                })
                .catch(error => console.log(error))
        }
        else {
            setNationalityOrder(false)
            fetch(`${API}/artistes/?order=descNa`)
                .then((response) => response.json())
                .then(artists => {
                    setAllArtists(artists)
                    setItemIndex(artists.map(elem => elem.id))
                })
                .then((res) => {
                    navigate('/artists/?order=descNa')
                })
                .catch(error => console.log(error))
        }
    }

    const changeArtistOrder = () => {
        if (artistsOrder === false) {
            setArtistsOrder(true)
            fetch(`${API}/artistes/?order=asc`)
                .then((response) => response.json())
                .then(artists => {
                    setAllArtists(artists)
                    setItemIndex(artists.map(elem => elem.id))
                })
                .then((res) => {
                    navigate('/artists/?order=asc')
                })
                .catch(error => console.log(error))
        }
        else {
            setArtistsOrder(false)
            fetch(`${API}/artistes/?order=desc`)
                .then((response) => response.json())
                .then(artists => {
                    setAllArtists(artists)
                    setItemIndex(artists.map(elem => elem.id))
                })
                .then((res) => {
                    navigate('/artists/?order=desc')
                })
                .catch(error => console.log(error))
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
                setItemIndex(artists.map(elem => elem.id))
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
        return allArtists.slice(firstPageIndex, lastPageIndex)
    }, [currentPageV2, allArtists])

    return (
        <div className="artists">
            <section>
                <Table className="table" striped bordered hover>
                    <thead>
                        <tr className="table-row">
                            <th>
                                #
                            </th>
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
                        {currentTableData.map(artist => {
                            { artist.index = itemIndex.indexOf(artist.id) + 1 }
                            return (
                                <Artist
                                    key={artist.id}
                                    artist={artist}
                                />
                            )
                        }, itemIndex)}
                    </tbody>
                </Table>
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPageV2}
                    totalCount={allArtists.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPageV2(page)}
                />
            </section>
        </div>
    )
}
