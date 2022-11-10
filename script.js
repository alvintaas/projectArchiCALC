//tutorial from https://www.youtube.com/watch?v=j59qQ7YWLxw&list=PL0odFQ0LK7PZAtcN2n3UWuFaWu4_11SbF&index=2&ab_channel=WebDevSimplified

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ""
    this.previousOperand = ""
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    //this line of code ensures that only one decimal point is allowed to be inputted, before the operand is returned
    if (number === "." && this.currentOperand.includes(".")) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    //to check if there is already an operator in use
    if (this.currentOperand === "") return
    if (this.previousOperand !== "") {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ""
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case "+":
        computation = prev + current
        break
      case "-":
        computation = prev - current
        break
      case "*":
        computation = prev * current
        break
      case "÷":
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ""
  }

getDisplayNumber(number) {
  const stringNumber = number.toString()
  const integerDigits = parseFloat(stringNumber.split('.')[0])
  const decimalDigits = stringNumber.split('.')[1]
  let integerDisplay
  if (isNaN(integerDigits)) {
  integerDisplay = ''
} else {
  integerDisplay = integerDigits.toLocaleString('en', {
  maximumFractionDigits: 0 })
  }
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`
  } else {
    return integerDisplay
  }
}

  updateDisplay() {
    //ensures that inputs are registered into the display after pressing
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
 }
}

const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-all-clear]")
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

//on click, each number is shown on the display
numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

//on click, each operation is shown on the display
operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener("click", button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener("click", button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener("click", button => {
  calculator.delete()
  calculator.updateDisplay()
})
