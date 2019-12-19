import React from "react";
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";

import Clientes from "./Clientes";
import ClientesForm from "./ClientesForm";
import EditarCliente from "./EditarCliente";

export default function ClientesContainer() {
  let { path, url } = useRouteMatch();

  return (
    <div className="container">
      <Link
        to={`${url}/añadirCliente`}
        className="btn btn-outline-warning m-1"
      >
        Añadir Clientes
      </Link>
      <Link to={`${url}`} className="btn btn-warning m-1">
        Ver Clientes
      </Link>
      <Switch>
        <Route path={`${path}`} exact component={Clientes} />
        <Route path={`${path}/añadirCliente`} component={ClientesForm} />
        <Route path={`${path}/editarCliente/:id`} component={EditarCliente} />
      </Switch>
    </div>
  );
}
