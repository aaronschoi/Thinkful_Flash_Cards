import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index"

export default function ShowDecks() {
  //should take the decks and place them here to see
  //if you click a deck, you should be able to go to the deck at that id
  const { url } = useRouteMatch();

  const [decks, setDecks] = useState([]);
  const [rerender, setRerender] =useState(0)

  useEffect(() => {
    const controller = new AbortController();
    listDecks(controller.signal)
    .then(cardStack => setDecks(cardStack));
    return () => controller.abort();
  }, [rerender]);

  const deleteHandler = event => {
    const controller = new AbortController();
    const response = window.confirm("Do you really want to delete this?");
    if(response){
    deleteDeck(event.target.parentNode.parentNode.parentNode.getAttribute("banana"),controller.signal)
    .then(notRelevant => setRerender(rerender + 1));}
    return () => controller.abort();
  };

  return (
    <div className="mt-2" dependency={rerender}>
      {decks.map((deck, index) => {
        return (
          <div key={index} className="card" banana={deck.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
              <h5 className="card-title">{deck.name}</h5>
              <h6>{deck.cards.length} cards</h6>
              </div>
              <p className="card-text">{deck.description}</p>
              <div className="d-flex align-items-center">
              <Link to={`${url}decks/${deck.id}`} className="mr-2">
                <button type="button" className="btn btn-secondary">
                  View
                </button>
              </Link>
              <Link to={`${url}decks/${deck.id}/study`} className="mr-2">
                <button type="button" className="btn btn-primary">
                  Study
                </button>
              </Link>
                <button type="button" className="btn btn-danger ml-auto p-2" onClick={deleteHandler}>
                  Delete
                </button>
            </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
