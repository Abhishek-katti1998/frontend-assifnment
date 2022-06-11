import CandidateForm from "../UI/candidateForm";
import "./candidate.css";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import {
  updateCandidateDetails,
  createCandidateDetails,
} from "../../util/api/apiCalls";
const Candidate = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const cancelHandler = () => {
    props.resetFormValues();
  };
  const createHandler = (e) => {
    if (e.target.textContent === "Edit") {
      updateCandidateDetails(props.id, props.formik.values).then((e) => {});
    } else {
      createCandidateDetails(props.formik.values).then((e) => {});
    }
  };

  useEffect(() => {
    if (!props.token) navigate("/login");
    props.setLocationHandler(location);
  }, []);

  return (
    <div className="candidate-container">
      <CandidateForm
        formik={props.formik}
        cancelHandler={cancelHandler}
        createHandler={createHandler}
        edit={props.edit}
        editData={props.editData}
        autoFillForm={props.autoFillForm}
        formValues={props.formValues}
        id={props.id}
      />
    </div>
  );
};
export default Candidate;
