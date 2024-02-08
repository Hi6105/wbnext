import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import { signupValidation } from "utilities/schema/signupValidation";
import "bootstrap/dist/css/bootstrap.min.css";
const axios = require("axios");

let signupInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  signupConfirmPassword: "",
};

const SignUp = ({ show, setShow, handleClose }) => {
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: signupInitialValues,
    validationSchema: signupValidation,
    onSubmit: (values) => {
      signupInitialValues.email = values.email;
      signupInitialValues.lastName = values.lastName;
      signupInitialValues.password = values.password;
      signupInitialValues.firstName = values.firstName;
      //console.log(loginInitialValues.email);
      axios
        .post("http://localhost:7000/signup", signupInitialValues)
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
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="firstName"
              type="text"
              placeholder=""
              autoFocus
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {
              <p className="form-error" style={{ color: "red" }}>
                {errors.firstName}
              </p>
            }
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="lastName"
              type="text"
              placeholder=""
              autoFocus
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {
              <p className="form-error" style={{ color: "red" }}>
                {errors.lastName}
              </p>
            }
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="name@example.com"
              autoFocus
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {
              <p className="form-error" style={{ color: "red" }}>
                {errors.signupEmail}
              </p>
            }
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder=""
              autoFocus
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {
              <p className="form-error" style={{ color: "red" }}>
                {errors.signupPassword}
              </p>
            }
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              name="signupConfirmPassword"
              type="password"
              placeholder=""
              autoFocus
              value={values.signupConfirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {
              <p className="form-error" style={{ color: "red" }}>
                {errors.signupConfirmPassword}
              </p>
            }
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          ></Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleSubmit}>
          Sign Up
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignUp;
