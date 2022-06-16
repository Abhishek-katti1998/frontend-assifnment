import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import './ui.css'
const FormTemplate = (props) => {
    const location = useLocation();
    return (
        <div className="form-container">
            <h2>{ props.logIn?'Login':'SignUp'}</h2>
            <form className='form-auth' onSubmit={props.formik.handleSubmit}>
                <div className='form-control'>
                 <label className='label-auth' htmlFor="email">Email Id</label>
                <input onBlur={props.formik.handleBlur} value={props.formik.values.email} onChange={props.formik.handleChange} className='input-auth' type='email' placeholder='Email' name='email'></input>
                {props.formik.errors.email &&props.formik.touched.email?<div className='errors'>{ props.formik.errors.email}</div>:null}
                </div>
                <div className='form-control'>
                         {!props.logIn && (
                <>
                <label className='label-auth' htmlFor="phoneNumber">Phone number</label>
                <input onBlur={props.formik.handleBlur} value={props.formik.values.phoneNumber} onChange={props.formik.handleChange} className='input-auth' placeholder='Phone number' type='number' name='phoneNumber'></input>
                {props.formik.errors.phoneNumber && !props.logIn&&props.formik.touched.phoneNumber ? <div className='errors'>{props.formik.errors.phoneNumber}</div>:null}
                </>
                )} 
                </div>
                <div className='form-control'>
                <label className='label-auth' htmlFor="password">Password</label>
                <input onBlur={props.formik.handleBlur} value={props.formik.values.password} onChange={props.formik.handleChange} className='input-auth' placeholder='Password' type='password' name='password'></input>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <div className='errors'>{props.formik.errors.password && props.formik.touched.password ? props.formik.errors.password:null}</div> 
                        <sub style={{position:'relative',bottom:'20px'}}>minimum 8 charecters</sub>
                    </div>
                <Link className='link' to={`${location.pathname==='/signUp'?'/login':'/signUp'}`}>{location.pathname==='/signUp'?'Login': 'SignUp'}</Link>
                </div>
                <button style={props.loading?{opacity:'0.5',cursor:'not-allowed'}:null} onClick={props.handleSubmit} type='submit' name={props.logIn ? 'LogIn' : 'SignUp'} className='btnAuth'>{props.logIn ? 'LogIn' : 'SignUp'}</button>
            </form>
        
        </div>
          
          
    )
}
export default FormTemplate;