import Reat, { useEffect } from 'react'
import '../../components/auth.css'
import { Card } from '@mui/material'; 
import FormTemplate from "../UI/formTemplate";
import { useLocation, useNavigate } from 'react-router';
import LinearIndeterminate from '../UI/loader';
const SignUp = (props) => {
  const location = useLocation()
  const navigate=useNavigate()
  if(props.token)navigate("/home")
  useEffect(() => {
    props.setLocationHandler(location);
  },[])
    return (     
      <Card>
          {props.loading?<LinearIndeterminate />:null}
        <FormTemplate logIn={false} formik={props.formik} loading={props.loading} err={props.err } />
      </Card>
    )
}
export default SignUp;