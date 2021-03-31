import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link, useRouteMatch } from "react-router-dom";
import { readDeck } from "../../utils/api/index";
import BreadCrumb from "../BreadCrumb";

export default function Study() {
  const { url } = useRouteMatch();
  const redoneUrl = url.split('/')
  redoneUrl.pop()
  const { deckId } = useParams();
  const [card, setcard] = useState({
    deck: {},
    long: 0,
  });
  const history = useHistory();
  const [cardStatus, setCardStatus] = useState({
    slideNumber: 1,
    flipped: true,
  });

  const nextSlide = () => {
    if (cardStatus.slideNumber < card.long) {
      setCardStatus({
        ...cardStatus,
        slideNumber: cardStatus.slideNumber + 1,
        flipped: true,
      });
    } else {
      const redo = window.confirm("Do you want to restart this set?");
      if (redo) {
        setCardStatus({ ...cardStatus, slideNumber: 1, flipped: true });
      } else {
        history.push("/");
      }
    }
  };

  const flip = () => {
    setCardStatus({ ...cardStatus, flipped: !cardStatus.flipped });
  };

  useEffect(() => {
    const controller = new AbortController();
    readDeck(deckId, controller.signal).then((response) =>
      setcard({
        ...card,
        deck: { ...response },
        long: response.cards.length,
      })
    );
    return () => controller.abort();
  }, []);

  return (
    <div>
      {url}
      <BreadCrumb deck={card.deck.name} />
      <h2>{card.deck.name}: Study</h2>
      {card.long >= 3 ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card {cardStatus.slideNumber} of {card.long}
            </h5>
            {cardStatus.flipped ? (
              <>
                <p className="card-text">{card.deck.cards.find((individualCard, index) => cardStatus.slideNumber === index+1).front}</p>
                <div className="d-flex">
                  <button
                    type="button"
                    className="btn btn-secondary mr-2"
                    onClick={flip}
                  >
                    Flip
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="card-text">{card.deck.cards.find((individualCard, index) => cardStatus.slideNumber === index+1).back}</p>
                <div className="d-flex">
                  <button
                    type="button"
                    className="btn btn-secondary mr-2"
                    onClick={flip}
                  >
                    Flip
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={nextSlide}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Not Enough Cards</h5>
            <p className="card-text">
              You need at least 3 cards to study. There are {card.long} cards in
              this deck.
            </p>
            <Link to={`${redoneUrl.join('/')}/cards/new`}>
              <button type="button" className="btn btn-primary mr-2">
                Add Card
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
