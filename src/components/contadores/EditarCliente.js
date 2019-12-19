import React, { Fragment, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import firebase from "../firebase/firebase";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

import Loading from "../layout/Loader";
import { InputField, ErrorField } from "../fields/inputField";

const SignupSchema = Yup.object().shape({
  Nombre: Yup.string()
    .min(2, "Nombre muy corto")
    .max(100, "Nombre muy corto")
    .required("Nombre requerido"),
  Telefono1: Yup.number()
    .min(6, "Telefono muy corto")
    .max(999999999, "elefono muy largo")
    .integer("Only numbers are allowed")
    .required("Telefono1 requerido"),
  Telefono2: Yup.number()
    .min(6, "Telefono muy corto")
    .max(999999999, "elefono muy largo")
    .integer("Only numbers are allowed")
    .required("Telefono2 requerido"),
  Email: Yup.string()
    .email("Email Invalido")
    .required("Email requerido"),
  Cedula: Yup.string()
    .min(2, "Cedula muy corta")
    .max(99999999999, "Cedula muy corta")
    .required("Cedula requerida"),
  Direccion: Yup.string()
    .min(2, "Direccion muy corta")
    .max(100, "Direccion muy corta")
    .required("Direccion requerida")
});

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

const EditarCliente = props => {
  const [isLoading, setIsLoading] = useState(1);
  const [key, setkey] = useState("");
  const [cliente, setCliente] = useState({
    Cedula: "",
    Nombre: "",
    Telefono1: "",
    Telefono2: "",
    Email: "",
    Direccion: ""
  });

  const saveCliente = () => {
    const { Cedula, Nombre, Telefono1, Telefono2, Email, Direccion } = cliente;
    const updateRef = firebase
      .firestore()
      .collection("clientes")
      .doc(key);

    updateRef
      .set({
        Cedula,
        Nombre,
        Telefono1,
        Telefono2,
        Email,
        Direccion
      })
      .then(docRef => {
        generateToast(false, "Cliente actualizado.");
        props.history.push("/clientes");
      })
      .catch(error => {
        generateToast(true, "Error updating document: ", error);
      });
  };

  const handleChange = name => event => {
    setCliente({ ...cliente, [name]: event.target.value });
  };

  useEffect(() => {
    const loadCliente= () => {
      const ref = firebase
        .firestore()
        .collection("clientes")
        .doc(props.match.params.id);
      ref.get().then(doc => {
        if (doc.exists) {
          const data = doc.data();
          setkey(props.match.params.id);
          setCliente(data);
        } else {
          generateToast(true, "No document with given ID.");
          props.history.push("/clientes");
        }
      });
    };

    const loading = () => {
      setTimeout(() => {
        setIsLoading(0);
      }, 1200);
    };
    loadCliente();
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
          <h2 className="m-1">Editar Cliente</h2>
          <Formik
            onSubmit={data => {
              saveCliente();
            }}
            validationSchema={SignupSchema}
            initialValues={{
              Cedula: cliente.Cedula,
              Nombre: cliente.Nombre,
              Telefono1: cliente.Telefono1,
              Telefono2: cliente.Telefono2,
              Email: cliente.Email,
              Direccion: cliente.Direccion
            }}
          >
            {({ touched, errors }) => (
              <Form>
                <Field
                  name="Cedula"
                  placeholder="Cedula"
                  component={InputField}
                  value={cliente.Cedula}
                  onChange={handleChange("Cedula")}
                />
                {errors.Cedula && touched.Cedula ? (
                  <ErrorMessage
                    errors={errors.Cedula}
                    name="Cedula"
                    component={ErrorField}
                  />
                ) : null}
                <Field
                  name="Nombre"
                  placeholder="Nombre"
                  component={InputField}
                  value={cliente.Nombre}
                  onChange={handleChange("Nombre")}
                />
                {errors.Nombre && touched.Nombre ? (
                  <ErrorMessage
                    errors={errors.Nombre}
                    name="Nombre"
                    component={ErrorField}
                  />
                ) : null}
                <Field
                  name="Telefono1"
                  placeholder="Telefono 1"
                  component={InputField}
                  value={cliente.Telefono1}
                  onChange={handleChange("Telefono1")}
                />
                {errors.Telefono1 && touched.Telefono1 ? (
                  <ErrorMessage
                    errors={errors.Telefono1}
                    name="Telefono1"
                    component={ErrorField}
                  />
                ) : null}
                <Field
                  name="Telefono2"
                  placeholder="Telefono 2"
                  component={InputField}
                  value={cliente.Telefono2}
                  onChange={handleChange("Telefono2")}
                />
                {errors.Telefono2 && touched.Telefono2 ? (
                  <ErrorMessage
                    errors={errors.Telefono2}
                    name="Telefono2"
                    component={ErrorField}
                  />
                ) : null}
                <Field
                  name="Email"
                  type="email"
                  placeholder="Email"
                  component={InputField}
                  value={cliente.Email}
                  onChange={handleChange("Email")}
                />
                {errors.Email && touched.Email ? (
                  <ErrorMessage
                    errors={errors.Email}
                    name="Email"
                    component={ErrorField}
                  />
                ) : null}
                <Field
                  name="Direccion"
                  placeholder="Direccion"
                  component={InputField}
                  value={cliente.Direccion}
                  onChange={handleChange("Direccion")}
                />
                {errors.Direccion && touched.Direccion ? (
                  <ErrorMessage
                    errors={errors.Direccion}
                    name="Direccion"
                    component={ErrorField}
                  />
                ) : null}
                <button type="submit" className="btn btn-info">
                  Actualizar
                </button>
              </Form>
            )}
          </Formik>
        </Fragment>
      )}
    </div>
  );
};

export default EditarCliente;
