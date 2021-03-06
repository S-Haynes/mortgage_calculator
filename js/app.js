// Functional approach since this is a smaller module.

// General DOM selectors
const years = document.querySelector("#years");
const display_years = document.querySelector("#display-years");
const interest = document.querySelector("#interest");
const display_interest = document.querySelector("#display-interest");
const loan = document.querySelector("#loan");
const tax = document.querySelector("#annualtax");
const insurance = document.querySelector("#annualinsurance");
const calculate = document.querySelector("#calculate");
const results_interest = document.querySelector("#results-interest");
const results_tax = document.querySelector("#results-tax");
const results_insurance = document.querySelector("#results-insurance");
const results_total = document.querySelector("#results-total");
const wrapper_results = document.querySelector(".wrapper-results");
const value_font = document.querySelectorAll(".value-font");
const range_inputs = document.querySelectorAll(".range");

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
function updateMortgage() {
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
}

function updateRangeInputs() {
  display_years.innerHTML = years.value;
  display_interest.innerHTML = interest.value;

  // range slider-track color updates
  range_inputs.forEach(input => {
    let min = input.getAttribute("min");
    let max = input.getAttribute("max");

    input.addEventListener("input", () => {
      let val = (input.value - min) / (max - min);

      input.style.backgroundImage =
        "-webkit-gradient(linear, left top, right top, " +
        "color-stop(" +
        val +
        ", #1091cc), " +
        "color-stop(" +
        val +
        ", #ccc)" +
        ")";
    });
  });
}

// Submit form handler
function submitForm() {
  // Check for errors initially
  const { isValid } = checkErrors(mortgage);

  // Check validity, and return errors if necessary
  if (!isValid) {
    return setErrors();
  }
  // Send result data if form is valid
  setResults();
}

// Set the results object
function setResults() {
  // Destructure mortgage obj
  const { years, interest, loan, tax, insurance } = mortgage;

  results.interest = (
    ((interest / 100 / 12) * loan) /
    (1 - Math.pow(1 + interest / 100 / 12, -years * 12))
  ).toFixed(2);
  results.tax = (tax / 12).toFixed(2);
  results.insurance = (insurance / 12).toFixed(2);
  results.total = (
    Number(results.interest) +
    Number(results.tax) +
    Number(results.insurance)
  ).toFixed(2);
  // Send results to the DOM
  displayResults();
}

function displayResults() {
  // Destructure results obj
  const { interest, tax, insurance, total } = results;

  results_interest.innerHTML = "$ " + interest;
  results_tax.innerHTML = "$ " + tax;
  results_insurance.innerHTML = "$ " + insurance;
  results_total.innerHTML = "$ " + total;

  wrapper_results.classList.add("fade");

  value_font.forEach(value => {
    value.style.letterSpacing = "0px";
    value.classList.remove("gray");
  });
}
// Check form for any errors
function checkErrors(data) {
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
}

// Send errors to DOM
function setErrors() {
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
}

// Clear errors from DOM
function clearErrors() {
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
}

// Initialize the app values
function init() {
  updateRangeInputs();
}

init();

// Event handlers
years.addEventListener("change", updateMortgage);
interest.addEventListener("change", updateMortgage);
loan.addEventListener("input", updateMortgage);
tax.addEventListener("input", updateMortgage);
insurance.addEventListener("input", updateMortgage);
calculate.addEventListener("click", submitForm);
