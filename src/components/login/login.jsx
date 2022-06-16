import React, { useEffect } from 'react';
import { Formik } from 'formik';
import {useNavigate} from 'react-router-dom'
// import FormikControl from './FormikControl'
import FormTemplate from '../UI/formTemplate';
import { Card } from '@mui/material';
import { Navigate, useLocation } from 'react-router';
import LinearIndeterminate from '../UI/loader'


const LogInForm = (props) => {
    const location = useLocation()
    const navigate=useNavigate()

    useEffect(() => {
       if(props.token)navigate("/home")
      props.setLocationHandler(location);

  },[props.token])
    return (<Card>
        {props.loading?<LinearIndeterminate />:null}
        <FormTemplate logIn={true} formik={props.formik} loading={props.loading } />
    </Card>)

}
export default LogInForm