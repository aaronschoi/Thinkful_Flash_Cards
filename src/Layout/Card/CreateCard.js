import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import BreadCrumb from "../BreadCrumb";
import { createCard, updateCard, readCard, readDeck } from "../../utils/api/index";

export default function CreateCard({ makeCard }) {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const defaultForm = {
    front: "",
    back: "",
    deckId: deckId,
  };
  const [formValue, setFormValue] = useState({ ...defaultForm });
  const [breadcrumb, setBreadcrumb] = useState("");
  const [ disableSubmit, setDisableSubmit ] = useState(false)
  //turn api call into cards and deckWithoutCards(like everything else)

  const changeHandler = (event) => {
    event.preventDefault();
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(()=>{
    const controller = new AbortController();
    readDeck(deckId, controller.signal)
    .then(response => setBreadcrumb(response.name));
    if(!makeCard){
    readCard(cardId, controller.signal)
    .then(response => setFormValue({...response}))}
    return () => controller.abort();
  },[makeCard])

  const submitHandler = (event) => {
    event.preventDefault();
    const controller = new AbortController();
    if (makeCard) {
      createCard(deckId, formValue, controller.signal)
      .then(notRelevant => history.push(`/decks/${deckId}`));
    } else {
      setDisableSubmit(true);
      updateCard(formValue, controller.signal)
      .then(notRelevant => window.alert('The card has been updated'))
    .then(notRelevant => setDisableSubmit(false));
    }
    return () => controller.abort();
  };

  return (
    <div>
      <BreadCrumb deck={breadcrumb}/>
      <form onSubmit={submitHandler}>
        {makeCard ? <h2>Add Card</h2> : <h2>Edit Card</h2>}
        <div className="mb-3">
          <label htmlFor="front" className="form-label">
            Front
          </label>
          <textarea
            className="form-control"
            name="front"
            rows="3"
            placeholder="Front side of card"
            value={formValue.front}
            onChange={changeHandler}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Back
          </label>
          <textarea
            className="form-control"
            name="back"
            rows="3"
            placeholder="Back side of card"
            value={formValue.back}
            onChange={changeHandler}
          ></textarea>
        </div>
        <div className="mb-3">
          <Link to={`/decks/${deckId}`}>
            <button type="reset" className="btn btn-secondary mr-2">
              Done
            </button>
          </Link>
          <button type="submit" className="btn btn-primary" disabled={disableSubmit}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
