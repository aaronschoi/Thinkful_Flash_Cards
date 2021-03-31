import React from "react";
import { useRouteMatch, Link } from "react-router-dom";

export default function CreateDeckScreenButton() {

    const { url } = useRouteMatch();

    return (
        <Link to={`${url}decks/new`}><button type="button" className="btn btn-secondary">Create Deck</button></Link>
    )
}