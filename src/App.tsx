import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import HeartIntro from "./heart-intro";
import SelfIntro from "./self-intro";
import SelfComp from "./self-comp";
import BnsList from "./self-comp/bns-list";
import Welcome from "./welcome";

function App() {
  return (
    <>
      <HashRouter>
        <Switch>
          <Route path="/" component={Welcome} exact></Route>
          <Route path="/heart" component={HeartIntro} exact></Route>
          <Route path="/self" component={SelfIntro} exact></Route>
          <Route path="/self-comp" component={SelfComp} exact></Route>
          <Route path="/self-comp/bns-list" component={BnsList} exact></Route>
        </Switch>
      </HashRouter>
    </>
  );
}

export default App;
