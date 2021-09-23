import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Tab from "@/components/Tab";
import HeartIntro from "./heart-intro";
import SelfIntro from "./self-intro";
import Welcome from "./welcome";

function App() {
  return (
    <>
      <HashRouter>
        <Tab></Tab>
        <Switch>
          <Route path="/" component={Welcome} exact></Route>
          <Route path="/heart" component={HeartIntro}></Route>
          <Route path="/self" component={SelfIntro}></Route>
        </Switch>
      </HashRouter>
    </>
  );
}

export default App;
