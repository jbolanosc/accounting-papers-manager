import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import firebase from "../firebase/firebase";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { InputField} from "../fields/inputField";

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

const PapeleriaForm = props => {
  const ref = firebase.firestore().collection("papeleria");
  const refClient = firebase.firestore().collection("clientes");

  const [cliente, setCliente] = useState({
    Nombre: "",
    Cedula: ""
  });

  const getClientInfo = () => {
    if (!cliente.Cedula) {
      return;
    } else {
      refClient
        .where("Cedula", "==", cliente.Cedula)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            generateToast(true, "No document with given ID.");
            return;
          }
          generateToast(false, "Cliente encontrado.");
          snapshot.forEach(doc => {
            setCliente(doc.data());
          });
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    }
  };

  const savePapeleria = data => {
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
    } = data;

    ref
      .add({
        Cliente,
        Mes,
        FechaEntrega,
        FechaRecepcion,
        Datos,
        Contabilidad,
        Papeleria,
        Documentos,
        Servicios
      })
      .then(docRef => {
        generateToast(false, "Papeleria guardad");
        props.history.push("/papeleria");
      })
      .catch(error => {
        generateToast(true, "Error adding document: ", error);
      });
  };

  const handleClient = name => event => {
    setCliente({ ...cliente, [name]: event.target.value });
  };

  return (
    <div className="container-fluid">
      <h2 className="m-1">Registro Papeleria</h2>
      <Formik
        onSubmit={data => {
          data.Cliente = cliente.Nombre;
          savePapeleria(data);
        }}
        initialValues={{
          Cliente: cliente.Nombre,
          Mes: "",
          FechaEntrega: "",
          FechaRecepcion: "",
          Datos: "",
          Contabilidad: "",
          Papeleria: "",
          Documentos: "",
          Servicios: ""
        }}
      >
        {({ touched, errors }) => (
          <Form>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Cedula Cliente</label>
                  <input
                    onChange={handleClient("Cedula")}
                    className="form-control"
                    type="text"
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-info btn-sm"
                    onClick={() => getClientInfo()}
                  >
                    Obtener Cliente
                  </button>
                </div>
                <Field
                  name="Cliente"
                  placeholder="Cliente"
                  component={InputField}
                  value={cliente.Nombre}
                  readOnly
                  required
                />

                <div className="form-group">
                  <label>Mes</label>
                  <Field
                    as="select"
                    name="Mes"
                    className="form-control"
                    required
                  >
                    <option value="" label="Selecciona un mes" />
                    <option value="Enero" label="Enero" />
                    <option value="Febrero" label="Febrero" />
                    <option value="Marzo" label="Marzo" />
                    <option value="Abril" label="Abril" />
                    <option value="Mayo" label="Mayo" />
                    <option value="Junio" label="Junio" />
                    <option value="Julio" label="Julio" />
                    <option value="Agosto" label="Agosto" />
                    <option value="Setiembre" label="Setiembre" />
                    <option value="Octubre" label="Octubre" />
                    <option value="Noviembre" label="Noviembre" />
                    <option value="Diciembre" label="Diciembre" />
                  </Field>
                </div>
                <Field
                  name="FechaEntrega"
                  type="date"
                  className="form-control"
                  placeholder="Fecha Entrega"
                  component={InputField}
                  required
                />
                <Field
                  name="FechaRecepcion"
                  type="date"
                  className="form-control"
                  placeholder="Fecha Recepcion"
                  component={InputField}
                  required
                />
                <div className="form-group">
                  <label>Datos</label>
                  <Field
                    as="select"
                    name="Datos"
                    className="form-control"
                    required
                  >
                    <option value="" label="Selecciona un opcion" />
                    <option defaultValue value="Si" label="Si" />
                    <option value="No" label="No" />
                  </Field>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Contabilidad</label>
                  <Field
                    as="select"
                    name="Contabilidad"
                    className="form-control"
                    required
                  >
                    <option value="" label="Selecciona un opcion" />
                    <option defaultValue value="Si" label="Si" />
                    <option value="No" label="No" />
                  </Field>
                </div>
                <div className="form-group">
                  <label>Papeleria</label>
                  <Field
                    as="select"
                    name="Papeleria"
                    className="form-control"
                    required
                  >
                    <option value="" label="Selecciona un opcion" />
                    <option defaultValue value="Si" label="Si" />
                    <option value="No" label="No" />
                  </Field>
                </div>

                <div className="form-group">
                  <label>Documentos</label>
                  <Field
                    as="select"
                    name="Documentos"
                    className="form-control"
                    required
                  >
                    <option value="" label="Selecciona un opcion" />
                    <option defaultValue value="Si" label="Si" />
                    <option value="No" label="No" />
                  </Field>
                </div>
                <div className="form-group">
                  <label>Servicios</label>
                  <Field
                    as="select"
                    name="Servicios"
                    className="form-control"
                    required
                  >
                    <option value="" label="Selecciona un opcion" />
                    <option defaultValue value="Si" label="Si" />
                    <option value="No" label="No" />
                  </Field>
                </div>
                <button type="submit" className="btn btn-info">
                  Guardar
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PapeleriaForm;
