import React, {useState, useEffect} from "react";
import { Link, useHistory, useParams } from "react-router-dom"
import BreadCrumb from "../BreadCrumb";
import { createDeck, updateDeck, readDeck } from "../../utils/api/index"

export default function CreateDeckScreen({ makeDeck }) {
  const { deckId } = useParams();
  const history = useHistory();

  const initialFormState = {
    name: "",
    description: "",
  }

  const [deck, setDeck] = useState({...initialFormState});
  const [ disableSubmit, setDisableSubmit ] = useState(false)

  const changeHandler = event => {
    event.preventDefault();
    setDeck({
      ...deck,
      [event.target.name]: event.target.value
    })
  }

  useEffect(()=>{
    const controller = new AbortController();
    if(!makeDeck){
    readDeck(deckId, controller.signal)
    .then(response => setDeck({...response}))}
    return () => controller.abort();
  },[makeDeck])

  const submitHandler = event => {
    event.preventDefault();
    const controller = new AbortController();
    if(makeDeck){
    createDeck(deck, controller.signal)
    .then(notRelevant => history.push(`/decks/${deckId}`));
    }
    else{
    setDisableSubmit(true)
    updateDeck(deck, controller.signal)
    .then(notRelevant => window.alert('The deck has been updated'))
    .then(notRelevant => setDisableSubmit(false))
    }
    return () => controller.abort();
  }

  return (
    <div>
      {makeDeck ? <BreadCrumb /> : <BreadCrumb deck={deck.name} />}
      <form onSubmit={submitHandler}>
        {makeDeck ? <h2>Add Deck</h2> : <h2>Edit Deck</h2>}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            name="name"
            onChange={changeHandler}
            placeholder="Deck Name"
            value={deck.name}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Brief description of the deck"
            onChange={changeHandler}
            name="description"
            value={deck.description}
          ></textarea>
        </div>
        <div className="mb-3">
          <Link to={makeDeck ? "/" : `/decks/${deckId}`}><button type="reset" className="btn btn-secondary mr-2">
            Cancel
          </button></Link>
          <button type="submit" className="btn btn-primary" disabled={disableSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}