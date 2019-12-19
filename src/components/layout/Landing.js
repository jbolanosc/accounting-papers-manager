import React from "react";
import { Link } from "react-router-dom";

const Landing = () => (
  <div
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)"
    }}
    className=" jumbotron-fluid"
  >
    <div className="container text-center">
      <h1 className="display-4"> Tangamandapio Contadores 1.0</h1>
      <p className="lead">Bienvenido</p>
      <p className="lead">
        <Link to="/contadores" className="btn btn-outline-warning btn-lg">
          Ir a Contadores
        </Link>
        <Link to="/papeleria" className="m-1 btn btn-warning btn-lg">
          Ir a papeleria
        </Link>
      </p>
    </div>
  </div>
);

export default Landing;
