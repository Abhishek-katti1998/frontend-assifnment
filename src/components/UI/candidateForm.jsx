
import { useEffect, useState } from "react";

const CandidateForm = (props) => {
   
    const stateOptions = ['karnataka', 'Tamilnadu', 'Kerala', 'Andhrapradehsh']
    let creatBtnClass="create"
    useEffect(() => {
        if (!props.formik.isValid) {
            creatBtnClass='create-disabled'
        }
    //   window.history.pushState(null, '', `#${id}`);
        // if(window.location.hash)setId(window.location.hash.slice(1))
        if (props.edit.edit && props.id) {
            const [editData] = props.edit.data?.candidate?.filter(e => (e._id === props.id))
            props.autoFillForm(editData);
        }
    }, [props.id])
    return (
        <div className="candidate-form-container">
            <form className="form-container-candidate" onSubmit={ props.formik.handleSubmit}>
                <div className='left-section'>
                    <h2 id='heading'>{props.formValues.name?'Edit Candidate':'Create Candidate'}</h2>
                    <div className="canidate-form-control">
                            <label className='label-candidate'>Name</label>
                            <input placeholder="enter your name" className="input-candidate"
                            onBlur={props.formik.handleBlur} defaultValue={props.formValues?.name||props.formik.values.name} onChange={props.formik.handleChange}
                          name='name'  
                          ></input>
                        {props.formik.errors.name &&props.formik.touched.name ? <p>{props.formik.errors.name}</p>:null}  
                    </div>
             
                    <div className="canidate-form-control">
                         <label className='label-candidate'>Date of birth</label>
                    <input placeholder="enter your DOB(MM/DD/YY)" className="input-candidate"
                     onBlur={props.formik.handleBlur} defaultValue={props.formValues?.DateofBirth||props.formik.values.DateofBirth} onChange={props.formik.handleChange}
                        name='DateofBirth'
                        ></input> 
                       { props.formik.errors.DateofBirth && props.formik.touched.DateofBirth?<p>{props.formik.errors.DateofBirth}</p>:null}  
                   </div>
                    <div className="canidate-form-control">
                    <label className='label-candidate'>Age</label>
                    <input placeholder="enter your Age" className="input-candidate"
                     onBlur={props.formik.handleBlur} defaultValue={props.formValues?.age||props.formik.values.age} onChange={props.formik.handleChange}
                        name='age'
                        ></input>
                    { props.formik.errors.age && props.formik.touched.age?<p>{props.formik.errors.age}</p>:null}    
                   </div>
                </div>
                <div className='right-section'>
                    <h2>Create Candidate</h2>
                    <div className="canidate-form-control">
                       <label className='label-candidate'>Email</label>
                    <input placeholder="enter your email-address" className="input-candidate"
                 onBlur={props.formik.handleBlur} defaultValue={props.formValues?.emailAddress||props.formik.values.emailAddress} onChange={props.formik.handleChange}
                    name='emailAddress'
                        ></input>
                { props.formik.errors.emailAddress && props.formik.touched.emailAddress ?<p>{props.formik.errors.emailAddress}</p>:null}  
                 
                    </div>
                    <div className="canidate-form-control">
                    <label className='label-candidate'>State</label>
                        <select className="select-state" id="cars"
                            name='state'
                   onBlur={props.formik.handleBlur} defaultValue={props.formValues?.state||props.formik.values.state} onChange={props.formik.handleChange}
                    >
                            {!props.edit.edit ? <option value="" disabled selected hidden id='state-paceholder'>Select state</option> :
                    
                                <option value={props.formValues?.state} >{props.formValues?.state } </option>
                    }
                   
                            {stateOptions.map(e => <option value={`${e}`}>{e}</option>)}
                    </select>
                  { props.formik.errors.state &&  props.formik.touched.state?<p>{props.formik.errors.state}</p>:null}  

     
                    </div>
                    <div className="canidate-form-control">
                    <label className='label-candidate'>Pin Code</label>
                    <input placeholder="enter your pincode" className="input-candidate"
                     onBlur={props.formik.handleBlur} defaultValue={props.formValues?.pinCode||props.formik.values.pinCode} onChange={props.formik.handleChange}
                    name='pinCode'
                        ></input>
                { props.formik.errors.pinCode && props.formik.touched.pinCode?<p>{props.formik.errors.pinCode}</p>:null}
       
                    </div>
                     <div className="buttons">
                    <button type="reset"   onClick={props.cancelHandler} name='cancel' className='cancel'>Cancel</button>
                        <button disabled={!props.formik.isValid} onClick={props.createHandler} type='button' name='create' className={creatBtnClass}>{props.formValues.name?'Edit':'Create'}</button>
                </div>
                </div>
               
            </form>
        </div>
    )
}
export default CandidateForm;