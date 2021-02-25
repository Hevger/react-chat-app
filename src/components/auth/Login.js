import React, { useState, useEffect } from "react";
import { FormGroup } from "react-bootstrap";
import { Form, Button, Card, Alert } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { auth, firestore } from "../../firebase";
import validator from "validator";
import isEmpty from "../../validation/isEmpty";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { currentUser, login } = useAuth();
  const history = useHistory();

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  // Redirect if user is singedin
  useEffect(() => {
    if (currentUser) {
      history.push("/dashboard");
    }
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    // Validate and set error messages
    let signinErrors = {
      validEmail: validator.isEmail(userInfo.email)
        ? ""
        : "E-mail is not valid",

      validPassword: validator.isLength(userInfo.password, { min: 8 })
        ? ""
        : "Password must be 8 characters",
    };
    setErrors(signinErrors);

    // Check if there is no errors
    if (
      isEmpty(signinErrors.validEmail) &&
      isEmpty(signinErrors.validPassword)
    ) {
      try {
        setLoading(true);
        await login(userInfo.email, userInfo.password);
        history.push("/dashboard");
      } catch (e) {
        setErrors({ signinFail: e.message });
      }
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
        Login
      </h1>
      <Alert
        show={!isEmpty(errors.signinFail)}
        onClose={() => setErrors({})}
        variant="danger"
        dismissible
      >
        <Alert.Heading>Error !</Alert.Heading>
        <p>{errors.signinFail}</p>
      </Alert>

      <Form className="mb-5" onSubmit={submitForm}>
        <FormGroup>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            value={userInfo.email}
            type="email"
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
            onChange={handleChange}
            isInvalid={errors.validPassword ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            {errors.validPassword}
          </Form.Control.Feedback>
        </FormGroup>

        <p style={{ marginTop: "-10px", textAlign: "right", fontSize: "12px" }}>
          Doesn't have an account? Sign up <Link to="/">here</Link>
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
