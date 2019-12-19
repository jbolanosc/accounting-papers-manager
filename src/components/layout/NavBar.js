import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning">
      <Link to="/" className="navbar-brand">
        Tangamandapio Contadores 1.0
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link to="/clientes" className="nav-item nav-link" >Clientes</Link>
          <Link to="/papeleria" className="nav-item nav-link" >Papeleria</Link>
        </div>
      </div>
    </nav>
);

export default NavBar;