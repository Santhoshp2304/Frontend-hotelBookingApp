import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useContext, useState } from "react";
import { Button, Container } from "react-bootstrap";
import * as Yup from "yup";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const onSubmit = async (values) => {
    try {
      if(localStorage.getItem('token')) return localStorage.removeItem('token','user','role','userId')
      await login(values);
      message.success("logged in successfully");
      navigate("/home");
      window.location.reload();
      // console.log(values);
    } catch (error) {
      console.log(error);
      message.error("login failed");
    }
  };

  return (
    <Container className="bs p-3 mt-5">
      <h1 className="mt-3 text-center">Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <div>
              <label htmlFor="email">Email Address</label>
              <Field type="email" id="email" className="w-100" name="email" />
              <ErrorMessage name="email" component="div"></ErrorMessage>
            </div>
            <br />
            <div>
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                className="w-100"
                name="password"
              />
              <ErrorMessage name="password" component="div"></ErrorMessage>
            </div>
            <div className="d-flex justify-content-center mt-4 ">
              <Button  variant="dark" type="submit" size="lg">
                Login
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default Login;
