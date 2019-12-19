import React from "react";
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";

import Papeleria from "./Papeleria";
import PapeleriaForm from "./PapeleriaForm";
import EditarPapeleria from "./EditarPapeleria";

export default function ContadoresContainer() {
  let { path, url } = useRouteMatch();

  return (
    <div className="container">
      <Link
        to={`${url}/añadirPapeleria`}
        className="btn btn-outline-warning m-1"
      >
        Añadir Papeleria
      </Link>
      <Link to={`${url}`} className="btn btn-warning m-1">
        Ver Papeleria
      </Link>
      <Switch>
        <Route path={`${path}`} exact component={Papeleria} />
        <Route path={`${path}/añadirPapeleria`} component={PapeleriaForm} />
<Route path={`${path}/editarPapeleria/:id`} component={EditarPapeleria} /> 
      </Switch>
    </div>
  );
}
