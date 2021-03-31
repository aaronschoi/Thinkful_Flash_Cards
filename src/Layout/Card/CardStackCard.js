import React from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { deleteCard } from "../../utils/api/index"

export default function CardStackCard({ front, back, id }) {

  const { url } = useRouteMatch();
  const history = useHistory();

  const deleteHandler = event => {
    event.preventDefault();
    const response = window.confirm("Do you really want to delete this?");
    const controller = new AbortController();
    if(response){
    deleteCard(id,controller.signal)
    .then(notRelevant => history.push('/'));}
    return () => controller.abort();
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-around">
        <p className="card-text">{front}</p>
        <p className="card-text">{back}</p>
        </div>
        <div className="d-flex justify-content-end">
          <Link to={`${url}/cards/${id}/edit`}><button type="button" className="btn btn-secondary mr-2">
            Edit
          </button></Link>
          <button type="button" className="btn btn-danger" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
