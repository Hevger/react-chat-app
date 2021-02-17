import React from "react";
import { FormGroup } from "react-bootstrap";
import { Form, Button, Card } from "react-bootstrap";

export default function Signup() {
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
      <Form className="mb-5">
        <FormGroup>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </FormGroup>

        <FormGroup>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="repassword"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          />
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
