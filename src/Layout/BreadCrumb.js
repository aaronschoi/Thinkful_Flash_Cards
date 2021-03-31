import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

export default function BreadCrumb({ deck, mutedDeck }) {
  const { url, path } = useRouteMatch();

  const currentPage = () => {
    switch (path) {
      case "/decks/:deckId/study":
        return (
          <li className="breadcrumb-item" aria-current="page">
            Study
          </li>
        );
      case "/decks/new":
        return (
          <li className="breadcrumb-item" aria-current="page">
            Create Deck
          </li>
        );
      case "/decks/:deckId/edit":
        return (
          <li className="breadcrumb-item" aria-current="page">
            Edit Deck
          </li>
        );
      case "/decks/:deckId/cards/new":
        return (
          <li className="breadcrumb-item" aria-current="page">
            Create Card
          </li>
        );
        case "/decks/:deckId":
          return (
            <li className="breadcrumb-item" aria-current="page">
              {mutedDeck}
            </li>);
      default:
        return null;
    }
  };

  const middlePages = () => {
    if (!deck) {
      return null;
    } else {
      const reducedUrl = url.split("/");
      reducedUrl.pop();
      return (
        <li className="breadcrumb-item active" aria-current="page">
          <Link to={reducedUrl.join("/")}>{deck}</Link>
        </li>
      );
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            <Link to="/">Home</Link>
          </li>
          {middlePages()}
          {currentPage()}
        </ol>
      </nav>
    </div>
  );
}
