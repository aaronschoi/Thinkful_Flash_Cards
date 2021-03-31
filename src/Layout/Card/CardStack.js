import React, { useEffect, useState } from "react";
import { useParams, Link, useRouteMatch, useHistory } from "react-router-dom";
import { readDeck, deleteDeck } from "../../utils/api/index";
import BreadCrumb from "../BreadCrumb";
import CardStackCard from "./CardStackCard";

export default function CardStack() {
  const { deckId } = useParams();
  const { url } = useRouteMatch();
  const [deck, setDeck] = useState({
    fullCard: "",
    cards: []
  });
  const history = useHistory();

  useEffect(() => {
    const controller = new AbortController();
    readDeck(deckId, controller.signal)
    .then(excavatedDeck => setDeck({
      ...deck,
      fullCard: excavatedDeck,
      cards: excavatedDeck.cards
    }));
    return () => controller.abort();
  }, []);

  const deleteHandler = event => {
    event.preventDefault();
    const controller = new AbortController();
    const response = window.confirm("Do you really want to delete this?");
    if(response){
    deleteDeck(deckId,controller.signal)
    .then(notRelevant => history.push(`/decks/${deckId}`));}
    return () => controller.abort();
  }

  return (
    <div>
      <BreadCrumb mutedDeck={deck.fullCard.name}/>
      <h3>{deck.fullCard.name}</h3>
      <p>{deck.fullCard.description}</p>
      <div className="d-flex">
        <Link to={`${url}/edit`}><button type="button" className="btn btn-secondary mr-2">
          Edit
        </button></Link>
        <Link to={`${url}/study`}><button type="button" className="btn btn-primary mr-2">
          Study
        </button></Link>
        <Link to={`${url}/cards/new`}><button type="button" className="btn btn-primary">
          Add Card
        </button></Link>
        <button type="button" className="btn btn-danger ml-auto" onClick={deleteHandler}>
          Delete
        </button>
      </div>
      <h2 className="mt-2">Cards</h2>
      {deck.cards.map((card, index) => {
        return <CardStackCard front={card.front} back={card.back} id={card.id} key={index} />
      })}
    </div>
  );
}
