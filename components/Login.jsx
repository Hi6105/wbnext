import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import { loginValidation } from "utilities/schema/loginValidation";
import "bootstrap/dist/css/bootstrap.min.css";
const axios = require("axios");

let loginInitialValues = {
  email: "",
  password: "",
};

const Login = ({ show, setShow, handleClose }) => {
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidation,
    onSubmit: (values) => {
      loginInitialValues.email = values.email;
      loginInitialValues.password = values.password;
      //console.log(loginInitialValues.email);
      axios
        .post("http://localhost:7000/login", loginInitialValues)
        .then((response) => {
          console.log("Data sent successfully");
          console.log("Response from backend:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="name@example.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus
            />
            {
              <p className="form-error" style={{ color: "red" }}>
                {errors.email}
              </p>
            }
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder=""
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus
            />
            {
              <p className="form-error" style={{ color: "red" }}>
                {errors.password}
              </p>
            }
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleSubmit}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Login;
