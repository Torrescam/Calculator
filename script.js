let digit;
let newNum = "";

let selectedFirstNum = "";
let selectedOperator = "";
let selectedSecondNum = "";

const display = document.querySelector("#display-text");
const allOperator = document.querySelectorAll(".operator");
const allNumbers = document.querySelectorAll(".numbers");
const result = document.querySelector("#result");

function initCalculator() {
  setupNumberListener();
  setupOperatorListeners();
  setupEqualListeners();
}

function handleNumber(event) {
  digit = event.currentTarget.dataset.number;

  newNum += digit;

  if (!selectedOperator) {
    selectedFirstNum = Number(newNum);
    display.textContent = selectedFirstNum;
    console.log("El primer numero es:", selectedFirstNum);
  } else {
    selectedSecondNum = Number(newNum);
    display.textContent = selectedSecondNum;
    console.log("El segundo numero es:", selectedSecondNum);
  }
}

function handleOperator(event) {
  if (!isOperationReady()) {
    selectedOperator = event.currentTarget.dataset.operator;
    display.textContent = selectedOperator;
    console.log("operador seleccionado:", selectedOperator);
    newNum = "";
  }
  checkPendingOperation();
  selectedOperator = event.currentTarget.dataset.operator;
  console.log("operador seleccionado:", selectedOperator);
  newNum = "";
}

function handleResult() {
  const output = operate(selectedFirstNum, selectedOperator, selectedSecondNum);
  display.textContent = output;
  return output;
}

function setupNumberListener() {
  allNumbers.forEach((Button) => {
    Button.addEventListener("click", handleNumber);
  });
}

function setupOperatorListeners() {
  allOperator.forEach((Button) => {
    Button.addEventListener("click", handleOperator);
  });
}

function setupEqualListeners() {
  result.addEventListener("click", handleResult);
}

function isOperationReady() {
  return (
    selectedFirstNum !== "" &&
    selectedOperator !== "" &&
    selectedSecondNum !== ""
  );
}

// el nuevo operador esta reemplazando el operador anterior, revisar
function checkPendingOperation() {
  if (isOperationReady()) {
    const result = handleResult();
    selectedFirstNum = result;
    display.textContent = result;
    console.log("el nuevo firstNum es:", result);
    selectedSecondNum = "";
    newNum = "";
  }
}

function add(a, b) {
  return Math.round(a + b);
}

function subtract(a, b) {
  return Math.round(a - b);
}

function multiply(a, b) {
  return Math.round(a * b);
}

function divide(a, b) {
  return (a / b).toFixed(2);
}

// function percentage(a, b) {
//   (a * b) / 100;
// }

function operate(digit1, operator, digit2) {
  digit1 = Number(digit1);
  digit2 = Number(digit2);

  if (operator === "+") return add(digit1, digit2);
  if (operator === "-") return subtract(digit1, digit2);
  if (operator === "*") return multiply(digit1, digit2);
  if (operator === "/") return divide(digit1, digit2);
}

initCalculator();
