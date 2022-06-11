import Reat, { useEffect } from 'react'
import '../../components/auth.css'
import { Card } from '@mui/material'; 
import FormTemplate from "../UI/formTemplate";
import { useLocation, useNavigate } from 'react-router';
const SignUp = (props) => {
  const location = useLocation()
  const navigate=useNavigate()
  if(props.token)navigate("/home")
  useEffect(() => {
    props.setLocationHandler(location);
  },[])
    return (     
        <Card>
          <FormTemplate logIn={false} formik={ props.formik}/>
      </Card>
    )
}
export default SignUp;