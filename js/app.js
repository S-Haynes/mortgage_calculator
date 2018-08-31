// General DOM selectors
const years = document.querySelector("#years");
const display_years = document.querySelector("#display-years");
const interest = document.querySelector("#interest");
const display_interest = document.querySelector("#display-interest");
const loan = document.querySelector("#loan");
const tax = document.querySelector("#annualtax");
const insurance = document.querySelector("#annualinsurance");
const calculate = document.querySelector("#calculate");

// Error DOM selectors
const loan_errors = document.querySelector("#loanerrors");
const tax_errors = document.querySelector("#taxerrors");
const insurance_errors = document.querySelector("#insuranceerrors");

// Mortgage storage
const mortgage = {
  years: "",
  interest: "",
  loan: "",
  tax: "",
  insurance: ""
};

// Results storage
const results = {};

// Form errors storage
let errors = {};

// Update mortgage key-values
const updateMortgage = () => {
  //clear errors on input change
  clearErrors();

  //update range input display values
  updateRangeInputs();

  // set mortgage values
  mortgage.years = years.value;
  mortgage.interest = interest.value;
  mortgage.loan = loan.value;
  mortgage.tax = tax.value;
  mortgage.insurance = insurance.value;
};

const updateRangeInputs = () => {
  display_years.innerHTML = years.value;
  display_interest.innerHTML = interest.value;
};

// Submit form handler
const submitForm = () => {
  // Check for errors initially
  const { isValid } = checkErrors(mortgage);

  // Check validity, and return errors if necessary
  if (!isValid) {
    return setErrors();
  }
  // Send result data if form is valid
  displayResults();
};

// Check form for any errors
const checkErrors = data => {
  for (let key in data) {
    // check if input is empty
    if (data[key].length === 0) {
      errors[key] = `${key.substr(0, 1).toUpperCase() +
        key.substr(1)} field is required`;
      // check if input is not a number
    } else if (isNaN(data[key])) {
      errors[key] = `${key.substr(0, 1).toUpperCase() +
        key.substr(1)} field must include a valid numeric input`;
    }
  }

  // return validity of the form
  return {
    isValid: Object.keys(errors).length === 0
  };
};

// Send errors to DOM
const setErrors = () => {
  if (errors.loan) {
    loan_errors.innerHTML = errors.loan;
    loan.classList.add("red-border");
  }

  if (errors.tax) {
    tax_errors.innerHTML = errors.tax;
    tax.classList.add("red-border");
  }

  if (errors.insurance) {
    insurance_errors.innerHTML = errors.insurance;
    insurance.classList.add("red-border");
  }
};

// Clear errors from DOM
const clearErrors = () => {
  if (errors.loan) {
    loan_errors.innerHTML = "";
    loan.classList.remove("red-border");
  }

  if (errors.tax) {
    tax_errors.innerHTML = "";
    tax.classList.remove("red-border");
  }

  if (errors.insurance) {
    insurance_errors.innerHTML = "";
    insurance.classList.remove("red-border");
  }
  // Set errors back to empty obj
  errors = {};
};

const displayResults = () => {
  console.log(mortgage);
};

// Initialize the app values
const init = () => {
  updateRangeInputs();
};

init();

// Event handlers
years.addEventListener("change", updateMortgage);
interest.addEventListener("change", updateMortgage);
loan.addEventListener("input", updateMortgage);
tax.addEventListener("input", updateMortgage);
insurance.addEventListener("input", updateMortgage);
calculate.addEventListener("click", submitForm);
