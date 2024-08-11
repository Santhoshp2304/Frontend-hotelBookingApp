import React, { useContext, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../context/AuthContext";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    role: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    role: Yup.string().required("Role is required"),
  });

  const { register } = useContext(AuthContext);
  const onSubmit = async (values) => {
    try {
      await register(values);
      message.success("User Registered Sucessfully");
      navigate("/login");
    } catch (error) {
      message.error("Registration Failed!!!");
    }
  };

  return (
    <Container className="bs mt-5 p-3">
      <h1 className="text-center">Register</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" className="w-100" name="name" />
              <ErrorMessage name="name" component="div"></ErrorMessage>
            </div>
            <div>
              <label htmlFor="email">Email Address</label>
              <Field type="email" id="email" className="w-100" name="email" />
              <ErrorMessage name="email" component="div"></ErrorMessage>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                className="w-100"
                name="password"
              />
              <ErrorMessage name="password" component="p"></ErrorMessage>
            </div>
            <div>
              <label htmlFor="role">Role</label>
              <Field name="role" as="select" className="w-100">
                <option id="select" label="Select role" />
                <option id="user">user</option>
                <option id="admin">admin</option>
              </Field>
            </div>
            <div className="d-flex mt-4 justify-content-center">
              <Button variant="dark" size="lg" type="submit">
                Register
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default Register;
