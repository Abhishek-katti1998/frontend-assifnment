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
import LinearIndeterminate from "./components/UI/loader";

function App() {
  const [curLocation, setcurLocation] = useState({});
  const [token, setToken] = useState("");
  const [edit, setEdit] = useState({ edit: false, data: null });
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState('');
  // const [id, setId] = useState("");
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
  const setLoadingHandler = (data) => {
    setLoading(data);
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
      setLoading(true);
      signUp(values.email, values.password, values.phoneNumber).then((e) => {
        setToken(e.token);
        setLoading(false);
      });
      formik.resetForm("");
      return;
    }
    if (values.email && values.password) {
      setLoading(true);
      login(values.email, values.password).then((e) => {
        console.log(e);
        if (e.status === 'fail') {
          setError('Something went wrong')
        }
        setToken(e.token);
        setLoading(false);
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

  return (
    <div className="App">
      {loading && token ? <LinearIndeterminate /> : null}
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <LogInForm
                formik={formik}
                setLocationHandler={setLocationHandler}
                token={token}
                loading={loading}
                err={err}
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
                resetFormValues={resetFormValues}
                setLoadingHandler={setLoadingHandler}
                loading={loading}
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
                loading={loading}
                err={err}
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
                setLoadingHandler={setLoadingHandler}
                loading={loading}
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
