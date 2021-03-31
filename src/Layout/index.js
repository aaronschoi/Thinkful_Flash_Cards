import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeckScreenButton from "./CreateDeckScreenButton";
import CreateDeckScreen from "./CreateDeckScreen/CreateDeckScreen";
import ShowDecks from "./ShowDecks";
import CreateCard from "./Card/CreateCard";
import CardStack from "./Card/CardStack"
import Study from "./study/Study"

export default function Layout() {

  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/decks/new">
            <CreateDeckScreen makeDeck={true} />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <CreateCard makeCard={false} />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CreateCard makeCard={true} />
          </Route>
          <Route path="/decks/:deckId/edit">
            <CreateDeckScreen makeDeck={false} />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId">
            <CardStack />
          </Route>
          <Route exact path="/">
            <CreateDeckScreenButton />
            <ShowDecks />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}