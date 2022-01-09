import React, { useState } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Context } from './context';
import RouterGuard from './utils/routerGuard';
import HeartIntro from "./heart-intro";
import SelfIntro from "./self-intro";

function App() {
  const [showMenus, setShow] = useState(true);
  const [imgLoaded, setImgLoad] = useState(false);
  const router = new RouterGuard();

  return (
    <Context.Provider value={{ showMenus, imgLoaded, changeMenuShow: setShow, setImgLoad, router }}>
      <HashRouter>
        <Switch>
          <Route path="/" component={SelfIntro} exact></Route>
          <Route path="/heart" component={HeartIntro} exact></Route>
        </Switch>
      </HashRouter>
    </Context.Provider>
  );
}

export default App;
