import React, { useState } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Context } from './context';
import RouterGuard from './utils/routerGuard';
import HeartIntro from "./heart-intro";
import SelfIntro from "./self-intro";
import SelfComp from "./self-comp";
import BnsList from "./self-comp/comp-bnslist";
import CtyList from "./self-comp/comp-ctylist";
import CompTab from "./self-comp/comp-tab";
import CompRolling from "./self-comp/comp-rolling";
import CompVirtual from "./self-comp/comp-virtual";
import CompCode from "./self-comp/comp-code";

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
          <Route path="/self-comp" component={SelfComp} exact></Route>
          <Route path="/self-comp/bns-list" component={BnsList} exact></Route>
          <Route path="/self-comp/cty-list" component={CtyList} exact></Route>
          <Route path="/self-comp/comp-tab" component={CompTab} exact></Route>
          <Route path="/self-comp/comp-rolling" component={CompRolling} exact></Route>
          <Route path="/self-comp/comp-virtual" component={CompVirtual} exact></Route>
          <Route path="/self-comp/comp-code" component={CompCode} exact></Route>
        </Switch>
      </HashRouter>
    </Context.Provider>
  );
}

export default App;
