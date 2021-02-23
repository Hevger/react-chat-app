import React, { useState } from "react";
import { FormGroup } from "react-bootstrap";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { auth } from "../../firebase";
import validator from "validator";
import isEmpty from "../../validation/isEmpty";

export default function Signup() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();

    // Validate and set error messages
    let signupErrors = {
      validEmail: validator.isEmail(userInfo.email)
        ? ""
        : "E-mail is not valid",

      validPassword: validator.isLength(userInfo.password, { min: 8 })
        ? ""
        : "Password must be 8 characters",

      validConfirmPassword: validator.isLength(userInfo.confirmPassword, {
        min: 8,
      })
        ? ""
        : "Confirm password must be 8 characters",

      validPasswordMatch: validator.equals(
        userInfo.password,
        userInfo.confirmPassword
      )
        ? ""
        : "Password and confirm password must match",
    };
    setErrors(signupErrors);

    // Check if there is no errors
    if (
      isEmpty(signupErrors.validEmail) &&
      isEmpty(signupErrors.validPassword) &&
      isEmpty(signupErrors.validConfirmPassword) &&
      isEmpty(signupErrors.validPasswordMatch)
    ) {
      auth
        .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        .then((authData) => {
          // User created
          console.log("User created successfully with payload-", authData);
          setUserInfo({ email: "", password: "", confirmPassword: "" });
          setErrors({
            signupSucces: "Your account has been created successfully",
          });
        })
        .catch((_error) => {
          console.log("Login Failed!", _error);
          setErrors({ signupFailError: _error.message });
        });
    }
  };

  return (
    <Card
      style={{ boxShadow: "0px 0px 57px -24px rgba(0,0,0,0.75)" }}
      className="container mt-5"
    >
      <h1
        style={{
          textTransform: "uppercase",
          fontSize: "25px",
          textAlign: "center",
          marginTop: "30px",
          marginBottom: "20px",
          color: "#7e7cea",
        }}
      >
        Sign up
      </h1>

      <Alert
        show={!isEmpty(errors.signupSucces)}
        onClose={() => setErrors({})}
        variant="success"
        dismissible
      >
        <Alert.Heading>Succes !</Alert.Heading>
        <p>{errors.signupSucces}</p>
      </Alert>

      <Alert
        show={!isEmpty(errors.signupFailError)}
        onClose={() => setErrors({})}
        variant="danger"
        dismissible
      >
        <Alert.Heading>Error !</Alert.Heading>
        <p>{errors.signupFailError}</p>
      </Alert>

      <Form className="mb-5" onSubmit={submitForm}>
        <FormGroup>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            value={userInfo.email}
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
            isInvalid={errors.validEmail ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            {errors.validEmail}
          </Form.Control.Feedback>
        </FormGroup>

        <FormGroup>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            value={userInfo.password}
            type="password"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            onChange={handleChange}
            isInvalid={errors.validPassword ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            {errors.validPassword}
          </Form.Control.Feedback>
        </FormGroup>

        <FormGroup>
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            name="confirmPassword"
            value={userInfo.confirmPassword}
            type="password"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            onChange={handleChange}
            isInvalid={
              errors.validConfirmPassword
                ? true
                : false || errors.validPasswordMatch
                ? true
                : false
            }
          />
          <Form.Control.Feedback type="invalid">
            {errors.validPassword}
          </Form.Control.Feedback>

          <Form.Control.Feedback type="invalid">
            {errors.validPasswordMatch}
          </Form.Control.Feedback>
        </FormGroup>

        <p style={{ marginTop: "-10px", textAlign: "right", fontSize: "12px" }}>
          Already have an account? login in <a href="#">here</a>
        </p>
        <div className="col text-center">
          <Button
            style={{ background: "#7e7cea", border: 0 }}
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </Card>
  );
}
