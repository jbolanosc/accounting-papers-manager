import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import firebase from "../firebase/firebase";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
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

const ClientesForm = props => {
  const ref = firebase.firestore().collection("clientes");
  const saveCliente = data => {
    const { Cedula, Nombre, Telefono1, Telefono2, Email, Direccion } = data;

    ref
      .add({
        Cedula,
        Nombre,
        Telefono1,
        Telefono2,
        Email,
        Direccion
      })
      .then(docRef => {
        generateToast(false, "Cliente guardado.");
        props.history.push("/clientes");
      })
      .catch(error => {
        generateToast(true, "Error adding document: ", error);
      });
  };

  return (
    <div className="container-fluid">
      <h2 className="m-1">Registro Clientes</h2>
      <Formik
        onSubmit={data => {
          saveCliente(data);
        }}
        validationSchema={SignupSchema}
        initialValues={{
          Cedula:"",
          Nombre:"",
          Telefono1:"",
          Telefono2:"",
          Email:"",
          Direccion:""
        }}
      >
        {({ touched, errors }) => (
          <Form>
            <Field name="Cedula" placeholder="Cedula" component={InputField} />
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
              type="number"
              component={InputField}
            />
            {errors.Telefono1 && touched.Telefono1 ? (
              <ErrorMessage
                errors={errors.Telefono1}
                name="Telefono1"
                component={ErrorField}
              />
            ) : null}
            <Field name="Telefono2" placeholder="Telefono 2" component={InputField} />
            {errors.Telefono2 && touched.Telefono2 ? (
              <ErrorMessage
                errors={errors.Telefono2}
                name="Telefono2"
                component={ErrorField}
                type="number"
              />
            ) : null}
            <Field
              name="Email"
              type="email"
              placeholder="Email"
              component={InputField}
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
            />
            {errors.Direccion && touched.Direccion ? (
              <ErrorMessage
                errors={errors.Direccion}
                name="Direccion"
                component={ErrorField}
              />
            ) : null}
            <button type="submit" className="btn btn-info">
              Guardar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ClientesForm;
