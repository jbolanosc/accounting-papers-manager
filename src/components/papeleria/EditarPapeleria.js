import React, { Fragment, useEffect, useState } from "react";
import { Formik, Form, Field} from "formik";

import firebase from "../firebase/firebase";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

import Loading from "../layout/Loader";
import { InputField } from "../fields/inputField";

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

const EditarPapeleria = props => {
  const [isLoading, setIsLoading] = useState(1);
  const [key, setkey] = useState("");
  const [papeleria, setPapeleria] = useState({
    Cliente: "",
    Mes: "",
    FechaEntrega: "",
    FechaRecepcion: "",
    Datos: "",
    Contabilidad: "",
    Papeleria: "",
    Documentos: "",
    Servicios: ""
  });

  const savePapeleria = (data) => {
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
    const updateRef = firebase
      .firestore()
      .collection("papeleria")
      .doc(key);

    updateRef
      .set({
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
        generateToast(false, "Papeleria actualizada.");
        props.history.push("/papeleria");
      })
      .catch(error => {
        generateToast(true, "Error updating document: ", error);
      });
  };

  useEffect(() => {
    const loadPapeleria = () => {
      const ref = firebase
        .firestore()
        .collection("papeleria")
        .doc(props.match.params.id);
      ref.get().then(doc => {
        if (doc.exists) {
          const data = doc.data();
          setkey(props.match.params.id);
          setPapeleria(data);
        } else {
          generateToast(true, "No document with given ID.");
          props.history.push("/papeleria");
        }
      });
    };

    const loading = () => {
      setTimeout(() => {
        setIsLoading(0);
      }, 1200);
    };
    loadPapeleria();
    loading();
  }, [props.history, props.match.params.id]);

  return (
    <div className="container">
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <Fragment>
          <h2 className="m-1">Editar Papeleria</h2>
          <Formik
            onSubmit={data => {
              savePapeleria(data);
            }}
            initialValues={{
              Cliente: papeleria.Cliente,
              Mes: papeleria.Mes,
              FechaEntrega: papeleria.FechaEntrega,
              FechaRecepcion: papeleria.FechaRecepcion,
              Datos: papeleria.Datos,
              Contabilidad: papeleria.Contabilidad,
              Papeleria: papeleria.Papeleria,
              Documentos: papeleria.Documentos,
              Servicios: papeleria.Servicios
            }}
          >
            {({ touched, errors }) => (
              <Form>
                <div className="row">
                  <div className="col-md-6">
                    <Field
                      name="Cliente"
                      placeholder="Cliente"
                      component={InputField}
                      value={papeleria.Cliente}
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
                      value={papeleria.FechaEntrega}
                      required
                    />
                    <Field
                      name="FechaRecepcion"
                      type="date"
                      className="form-control"
                      placeholder="Fecha Recepcion"
                      component={InputField}
                      value={papeleria.FechaRecepcion}
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
        </Fragment>
      )}
    </div>
  );
};

export default EditarPapeleria;
