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

const Papeleria = () => {
  const [papeleria, setPapeleria] = useState([]);
  const [data, setData] = useState([]);

  let { url } = useRouteMatch();

  const ref = firebase.firestore().collection("papeleria");

  const onCollectionUpdate = querySnapshot => {
    const firebaseData = [];
    querySnapshot.forEach(doc => {
      const {
        Cliente,
        Mes,
        FechaEntrega,
        FechaRecepcion,
        Datos,
        Contabilidad,
        Papeleria,
        Documentos,
        Servicios
      } = doc.data();
      firebaseData.push({
        key: doc.id,
        doc,
        Cliente,
        Mes,
        FechaEntrega,
        FechaRecepcion,
        Datos,
        Contabilidad,
        Papeleria,
        Documentos,
        Servicios
      });
    });
    setData(firebaseData);
    setPapeleria(firebaseData);
  };

  const deletePapeleria = id => {
    ref
      .doc(id)
      .delete()
      .then(() => {
        generateToast(false, "Papeleria borrada");
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
      setPapeleria(data);
    } else {
      setPapeleria(data);
      const result = data.filter(papeleria => papeleria.Cliente.includes(filter));
      setPapeleria(result);
    }
  };

  useEffect(() => {
    var isSubscribed = true;
    const ref = firebase.firestore().collection("papeleria");
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
            <th scope="col">Cliente</th>
            <th scope="col">Mes</th>
            <th scope="col">Fecha Entrega</th>
            <th scope="col">Fecha Recepcion</th>
            <th scope="col">Datos</th>
            <th scope="col">Contabilidad</th>
            <th scope="col">Papelería</th>
            <th scope="col">Documentos</th>
            <th scope="col">Servicios</th>
          </tr>
        </thead>
        <tbody>
          {papeleria.map(papel => (
            <tr key={papel.key}>
              <td>{papel.Cliente}</td>
              <td>{papel.Mes}</td>
              <td>{papel.FechaEntrega}</td>
              <td>{papel.FechaRecepcion}</td>
              <td>{papel.Datos}</td>
              <td>{papel.Contabilidad}</td>
              <td>{papel.Papeleria}</td>
              <td>{papel.Documentos}</td>
              <td>{papel.Servicios}</td>
              <td>
                <Link
                  to={`${url}/editarPapeleria/${papel.key}`}
                  className="btn btn-success btn-md"
                >
                  Editar
                </Link>
              </td>
              <td>
                <button
                  onClick={() => deletePapeleria(papel.key)}
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

export default Papeleria;
