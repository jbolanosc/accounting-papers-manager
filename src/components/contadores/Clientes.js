import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import firebase from "../firebase/firebase";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const generateToast = (err, msg) => {
  const red =
    "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(215,14,14,1) 99%, rgba(0,212,255,1) 100%)";
  const green =
    "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 0%, rgba(139,213,86,1) 0%)";
  if (err) {
    Toastify({
      text: msg,
      duration: 5000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      backgroundColor: red,
      className: "info",
      stopOnFocus: true // Prevents dismissing of toast on hover
    }).showToast();
  } else {
    Toastify({
      text: msg,
      duration: 5000,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      backgroundColor: green,
      className: "info",
      stopOnFocus: true // Prevents dismissing of toast on hover
    }).showToast();
  }
};

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [data, setData] = useState([]);

  let { url } = useRouteMatch();

  const ref = firebase.firestore().collection("clientes");

  const onCollectionUpdate = querySnapshot => {
    const firebaseData = [];
    querySnapshot.forEach(doc => {
      const {
        Cedula,
        Nombre,
        Telefono1,
        Telefono2,
        Email,
        Direccion
      } = doc.data();
      firebaseData.push({
        key: doc.id,
        doc,
        Cedula,
        Nombre,
        Telefono1,
        Telefono2,
        Email,
        Direccion
      });
    });
    setData(firebaseData);
    setClientes(firebaseData);
  };

  const deleteCliente = id => {
    ref
      .doc(id)
      .delete()
      .then(() => {
        generateToast(false, "Cliente borrado");
      })
      .catch(error => {
        generateToast(false, "Error removing document: " + error);
      });
  };

  const handleChange = name => event => {
    filterData(event.target.value);
  };

  const filterData = filter => {
    if (filter === "") {
      setClientes(data);
    } else {
      setClientes(data);
      const result = data.filter(cliente => cliente.Nombre.includes(filter));
      setClientes(result);
    }
  };

  useEffect(() => {
    var isSubscribed = true;
    const ref = firebase.firestore().collection("clientes");
    ref.onSnapshot(onCollectionUpdate);

    return () => (isSubscribed = false);
  }, []);

  return (
    <React.Fragment>
      <div className="form-group w-25 m-2 float-right">
        <input
          placeholder="Filter By name"
          className="form-control"
          type="text"
          onChange={handleChange("filter")}
        />
      </div>
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th scope="col">Cedula</th>
            <th scope="col">Nombre</th>
            <th scope="col">Telefono 1</th>
            <th scope="col">Telefono 2</th>
            <th scope="col">Email</th>
            <th scope="col">Direccion</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.key}>
              <td>{cliente.Cedula}</td>
              <td>{cliente.Nombre}</td>
              <td>{cliente.Telefono1}</td>
              <td>{cliente.Telefono2}</td>
              <td>{cliente.Email}</td>
              <td>{cliente.Direccion}</td>
              <td>
                <Link
                  to={`${url}/editarCliente/${cliente.key}`}
                  className="btn btn-success btn-md"
                >
                  Editar
                </Link>
              </td>
              <td>
                <button
                  onClick={() => deleteCliente(cliente.key)}
                  className="btn btn-danger btn-md"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Clientes;