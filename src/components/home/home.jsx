import './home.css'
import { VscEdit } from 'react-icons/vsc'
import {AiOutlineDelete} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import {fetchCandidateDetails, updateCandidateDetails,deleteCandidateDetails } from '../../util/api/apiCalls'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

const CandidateDetails = (props) => {
 
    const navigate = useNavigate();
    const location = useLocation();
    const [candidateData, setCandidateData] = useState([]);
   const [reRender,setRerender]=useState(false)
    useEffect(() => {   
        if (!props.token) navigate("/login");
        else {
            if (candidateData.length > 0) return
            else { 
                props.setLoadingHandler(true)
             fetchCandidateDetails().then(e => {
                props.setLoadingHandler(false)
                 setCandidateData(e.data)
                  
            })
            }
            
        }
    },[reRender])
    const handleChange = (e) => {
        alert('do u want to change the status')
        props.setLoadingHandler(true)
        const shortlistState= e.target.value === 'shortlist' ? true : false;
        updateCandidateDetails(e.target.id,{shortlisted:shortlistState}).then(e => {
             props.setLoadingHandler(false)
            console.log(e)
        })  
    }
    const editDetailsHandler = (event) => {
        props.subscibeEditHandler(candidateData)
        navigate('/candidate')
    }
    const deleteDetailsHandler = (event) => {
        props.setLoadingHandler(true);
        deleteCandidateDetails(event.target.id).then(e => {
            // console.log(e)
        })
            .finally(() => {
                setRerender(true);
               props.setLoadingHandler(false);
        })
    }
    return (
        <div className="home-container">
            <table >
                <tr >
                    <th>{ null}</th>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Email</th>
                    <th>Result</th>
                    <th className='ommit'>{ null}</th>
                </tr>
               
                {candidateData.candidate?.map((e, index) => {
                    return (
                    <tr key={e._id} >
                            <td className='ommit'>{ index+1}</td>
                            <td className='name'>{e.name}</td>
                            <td>{`${new Date(e?.DateofBirth).getMonth()}/${new Date(e?.DateofBirth).getDate()}/${new Date(e?.DateofBirth).getFullYear()}`}</td>
                            <td>{e.emailAddress}</td>
                            <td>
                                <select id={ e._id} onChange={handleChange}>
                                <option selected={e.shortlisted}>shortlist</option>
                                <option selected={!e.shortlisted}>reject</option>
                            </select>
                            </td>
                            <td className='icons'>
                                <a  onClick={editDetailsHandler} className='icon'  href={`#${e._id}`}>
                                  <VscEdit  style={{color:'hsl(206deg 100% 52%)'}}/>
                                </a>
                                <a onClick={deleteDetailsHandler} className='icon' href={`#${e._id}`}>
                                    <AiOutlineDelete id={e._id} style={{ color: 'hsl(206deg 100% 52%)',cursor:"pointer"}} />
                                </a>
                            </td>
                </tr>
                  )
                })}
                <tr style={{backgroundColor:'white'}}>
                <td>
                 <Link className='add-btn' to='/candidate'>+Add new Candidate</Link>
                </td>
                </tr>
               
         
            </table>
          
        </div>
    )
}
export default CandidateDetails;