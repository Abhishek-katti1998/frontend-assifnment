const validator = (curLocation, values) => {
  const errors = {};
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  let mailformat =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  const passwordReg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (
    (curLocation.pathname === "/signUp" || curLocation.pathname === "/login") &&
    !values.email
  ) {
    errors.email = "Required";
  }
  if (values.email && !mailformat.test(values.email)) {
    errors.email = "Invalid email ID";
  }
  if (curLocation.pathname === "/signUp" && !values.phoneNumber) {
    errors.phoneNumber = "Required";
  }
  if (
    curLocation.pathname === "/signUp" &&
    values.phoneNumber &&
    !phoneRegex.test(values.phoneNumber)
  ) {
    errors.phoneNumber = "Enter valid phone number";
  }
  if (
    (curLocation.pathname === "/signUp" || curLocation.pathname === "/login") &&
    !values.password
  ) {
    errors.password = "Required";
  }
  if (values.password && !passwordReg.test(values.password)) {
    errors.password = "Enter valid password";
  }
  if (curLocation.pathname === "/candidate" && !values.name) {
    errors.name = "Required";
  }
  if (curLocation.pathname === "/candidate" && !values.DateofBirth) {
    errors.DateofBirth = "Required";
  }
  if (
    curLocation.pathname === "/candidate" &&
    values.DateofBirth.length < 10 &&
    isNaN(new Date(values.DateofBirth)) &&
    values.DateofBirth
  ) {
    errors.DateofBirth = "Enter valid date";
  }
  if (curLocation.pathname === "/candidate" && !values.age) {
    errors.age = "Required";
  }
  if (curLocation.pathname === "/candidate" && isNaN(Number(values.age))) {
    errors.age = "Enter valid Age!";
  }
  if (curLocation.pathname === "/candidate" && !values.emailAddress) {
    errors.emailAddress = "Required";
  }
  if (
    curLocation.pathname === "/candidate" &&
    values.emailAddress &&
    !mailformat.test(values.emailAddress)
  ) {
    errors.emailAddress = "Enter valid email Address";
  }
  if (curLocation.pathname === "/candidate" && !values.state) {
    errors.state = "Required";
  }
  if (curLocation.pathname === "/candidate" && !values.pinCode) {
    errors.pinCode = "Required";
  }
  if (curLocation.pathname === "/candidate" && isNaN(Number(values.pinCode))) {
    errors.pinCode = "Enter a valid Pin Code!";
  }
  return errors;
};
export default validator;
