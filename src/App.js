import React, { useEffect, useState } from "react";

import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import SignUp from "./components/signUp/signUp";
import LogInForm from "./components/login/login";
import Candidate from "./components/canidate/candidate";
import { useFormik } from "formik";
import { useLocation } from "react-router";
import CandidateDetails from "./components/home/home";
import validator from "./util/validator";
import { signUp, login } from "./util/api/auth";

function App() {
  const [curLocation, setcurLocation] = useState({});
  const [token, setToken] = useState("");
  const [edit, setEdit] = useState({ edit: false, data: null });
  const [id, setId] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    DateofBirth: "",
    state: "",
    pinCode: "",
    emailAddress: "",
    age: "",
  });

  const subscibeEditHandler = (data) => {
    setEdit({ edit: true, data });
  };

  const autoFillForm = (data) => {
    const savedValues = {
      name: data?.name,
      DateofBirth: data
        ? `${new Date(data?.DateofBirth).getMonth()}/${new Date(
            data?.DateofBirth
          ).getDate()}/${new Date(data?.DateofBirth).getFullYear()}`
        : "",
      state: data?.state,
      pinCode: data?.pinCode,
      emailAddress: data?.emailAddress,
      age: data?.age,
    };

    setFormValues(savedValues);
  };

  const initialValues = {
    name: "",
    DateofBirth: "",
    state: "",
    pinCode: "",
    emailAddress: "",
    age: "",
    email: "",
    phoneNumber: "",
    password: "",
  };

  const resetFormValues = () => {
    setFormValues({
      name: "",
      DateofBirth: "",
      state: "",
      pinCode: "",
      emailAddress: "",
      age: "",
    });
  };
  const onSubmit = (values) => {
    if (values.email && values.password && values.phoneNumber) {
      signUp(values.email, values.password, values.phoneNumber).then((e) => {
        setToken(e.token);
      });
      formik.resetForm("");
      return;
    }
    if (values.email && values.password) {
      login(values.email, values.password).then((e) => {
        setToken(e.token);
      });
    }
    formik.resetForm("");
  };
  const validate = (values) => validator(curLocation, values);

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  const setLocationHandler = (loc) => {
    setcurLocation(loc);
  };

  useEffect(() => {
    ["hashchange", "load"].forEach((e) => {
      window.addEventListener(e, function () {
        setId(window.location.hash.slice(1));

        formik.resetForm("");
      });
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <LogInForm
                formik={formik}
                setLocationHandler={setLocationHandler}
                token={token}
              />
            }
            path="/login"
          ></Route>
          <Route
            element={
              <Candidate
                formik={formik}
                setLocationHandler={setLocationHandler}
                token={token}
                edit={edit}
                formValues={formValues}
                autoFillForm={autoFillForm}
                id={id}
                // editData={editData}
                resetFormValues={resetFormValues}
              />
            }
            path="/candidate"
          ></Route>
          <Route
            element={
              <SignUp
                formik={formik}
                setLocationHandler={setLocationHandler}
                token={token}
              />
            }
            path="/signUp"
          ></Route>
          <Route
            element={
              <CandidateDetails
                token={token}
                formik={formik}
                subscibeEditHandler={subscibeEditHandler}
                // idSetHandler={idSetHandler}
                id={id}
              />
            }
            path="/home"
          ></Route>
          <Route exact path="/" element={<Navigate to="/login" />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
