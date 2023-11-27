import { Link } from "react-router-dom"
import React from "react"
import "./Artist.css"

export default function Artist({ artist }) {
    return (
        <tr>
            <td>{artist.is_favorite}</td>
            <td>
                <Link to={`/artists/${artist.id}`}>{artist.artiste_name}</Link>
            </td>
            <td>{artist.birth_year}-{artist.death_year}</td>
            <td>{artist.genre}</td>
            <td>{artist.nationality}</td>
        </tr>
    )
}