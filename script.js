let selectedFirstNumber = "";
let selectedSecondNumber = "";
let selectedOperator = "";

let displayNum = document.querySelector("#display-text");
let result = document.querySelector("#result");

document.querySelectorAll(".numbers").forEach((button) => {
  button.addEventListener("click", function (event) {
    let newNum = event.currentTarget.dataset.number;
    if (!selectedOperator) {
      selectedFirstNumber = selectedFirstNumber
        ? Number(selectedFirstNumber + newNum)
        : Number(newNum);
      displayNum.textContent = selectedFirstNumber;
    } else {
      selectedSecondNumber = selectedSecondNumber
        ? Number(selectedSecondNumber + newNum)
        : Number(newNum);
      displayNum.textContent = selectedSecondNumber;
    }
  });
});

document.querySelectorAll(".operator").forEach((button) => {
  button.addEventListener("click", function (event) {
    if (!selectedFirstNumber) {
      return;
    }
    displayNum.textContent = selectedFirstNumber;
    selectedOperator = event.currentTarget.dataset.operator;
  });
});

result.addEventListener("click", function () {
  if (!selectedSecondNumber) return;
  displayNum.textContent = operate(
    selectedFirstNumber,
    selectedOperator,
    selectedSecondNumber
  );
});

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
  return a / b;
}

function operate(a, operator, b) {
  if (operator === "+") return add(Number(a), Number(b));
  if (operator === "-") return subtract(Number(a), Number(b));
  if (operator === "*") return multiply(Number(a), Number(b));
  if (operator === "/") return divide(Number(a), Number(b));
}

function clearOperation() {
  selectedFirstNumber = "";
  selectedSecondNumber = "";
  selectedOperator = null;
  displayNum.textContent = "0";
}

document.querySelector(".clear").addEventListener("click", clearOperation);
