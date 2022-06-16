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
    props.formik.resetForm("");
  };
  const createHandler = (e) => {
    if (e.target.textContent === "Edit") {
      props.setLoadingHandler(true);
      updateCandidateDetails(
        window.location.hash.slice(1),
        props.formik.values
      ).then((e) => {
        props.setLoadingHandler(false);
        console.log(e);
      });
    } else {
      props.setLoadingHandler(true);
      createCandidateDetails(props.formik.values).then((e) => {
        props.setLoadingHandler(false);
      });
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
        loading={props.loading}
      />
    </div>
  );
};
export default Candidate;
