let digit;
let newNum = "";

let selectedFirstNum = "";
let selectedOperator = "";
let selectedSecondNum = "";

let justEvaluated = false;

const display = document.querySelector("#display-text");
const allOperator = document.querySelectorAll(".operator");
const allNumbers = document.querySelectorAll(".numbers");
const decimalButton = document.querySelector(".decimal");
const result = document.querySelector("#result");

function initCalculator() {
  setupNumberListener();
  setupOperatorListeners();
  setupEqualListeners();
  setupDotListeners();
}

function handleNumber(event) {
  digit = event.currentTarget.dataset.number;

  if (justEvaluated) {
    selectedFirstNum = "";
    selectedOperator = "";
    selectedSecondNum = "";
    newNum = "";
    justEvaluated = false;
  }

  if (digit === "." && newNum.includes(".")) return;

  newNum += digit;

  if (!selectedOperator) {
    selectedFirstNum = Number(newNum);
    // display.textContent = selectedFirstNum;
    display.textContent = newNum;
    console.log("El primer numero es:", selectedFirstNum);
  } else {
    selectedSecondNum = Number(newNum);
    if (selectedSecondNum === 0 && selectedOperator === "/") {
      display.textContent = "Really? Zero?";
      console.log("El segundo numero es:", selectedSecondNum);
    } else {
      // display.textContent = selectedSecondNum;
      display.textContent = newNum;
      console.log("El segundo numero es:", selectedSecondNum);
    }
  }
}

function handleOperator(event) {
  if (selectedFirstNum !== "" && selectedOperator && selectedSecondNum !== "") {
    const result = operate(
      selectedFirstNum,
      selectedOperator,
      selectedSecondNum
    );
    const rounded = Number(result);
    display.textContent = rounded;
    selectedFirstNum = rounded;
    selectedSecondNum = "";
    newNum = "";
    justEvaluated = false;
  }
  if (justEvaluated) {
    selectedSecondNum = "";
    newNum = "";
    justEvaluated = false;
  }

  selectedOperator = event.currentTarget.dataset.operator;

  if (!selectedSecondNum) {
    display.textContent = selectedFirstNum;
  } else {
    display.textContent = selectedOperator;
  }
  newNum = "";
}

function handleResult() {
  if (
    selectedFirstNum === "" ||
    selectedSecondNum === "" ||
    selectedOperator === ""
  ) {
    return;
  }

  const output = operate(selectedFirstNum, selectedOperator, selectedSecondNum);
  const result = Number(output);
  display.textContent = result;
  selectedFirstNum = result;
  selectedSecondNum = "";
  newNum = "";
  justEvaluated = true;
  return result;
}

function handlerDot() {
  if (newNum.includes(".")) return;

  if (newNum === "") {
    newNum = "0.";
  } else {
    newNum += ".";
  }

  if (!selectedOperator) {
    selectedFirstNum = Number(newNum);
    display.textContent = newNum;
  } else {
    selectedSecondNum = Number(newNum);
    display.textContent = newNum;
  }
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

function setupDotListeners() {
  decimalButton.addEventListener("click", handlerDot);
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Really? Zero?";
  return a / b;
}
function percentage(a, b) {
  return (a * b) / 100;
}

function operate(digit1, operator, digit2) {
  digit1 = Number(digit1);
  digit2 = Number(digit2);

  if (operator === "+") return add(digit1, digit2);
  if (operator === "-") return subtract(digit1, digit2);
  if (operator === "*") return multiply(digit1, digit2);
  if (operator === "/") return divide(digit1, digit2);
  if (operator === "%") return percentage(digit1, digit2);
}

document.addEventListener("DOMContentLoaded", function () {
  //add event listener to clear display
  const clearButton = document.querySelector(".clear");
  clearButton.addEventListener("click", function clearDisplay() {
    selectedFirstNum = "";
    selectedOperator = "";
    selectedSecondNum = "";
    newNum = "";
    display.textContent = 0;
  });

  // BACKSPACE
  const backspaceButton = document.querySelector(".backspace");
  backspaceButton.addEventListener("click", function backspace() {
    newNum = newNum.slice(0, -1);
    if (!selectedOperator) {
      selectedFirstNum = newNum;
      display.textContent = newNum || "0";
    } else {
      selectedSecondNum = newNum;
      display.textContent = newNum || "0";
    }
  });
});

initCalculator();
