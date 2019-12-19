import React from "react";
import { Route } from "react-router-dom";

import ClientesContainer from "../contadores/ClientesContainer";
import PapeleriaContainer from "../papeleria/PapeleriaContainer";
import Landing from "./Landing";

const MainContainer = () => (
  <div className="container-fluid h-100 w-100 p-0">
    <Route path="/" exact component={Landing} />
    <Route path="/clientes" component={ClientesContainer} />
    <Route path="/papeleria" component={PapeleriaContainer} />
  </div>
);

export default MainContainer;
