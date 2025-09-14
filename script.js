
let num1 = ``
let operator = null
let num2 = ``
let finalVal
let operators = ["/", "×", "+", "-", "%"]
let display=document.querySelector(".display")
let expression = document.querySelector(".expression")
let buttons = document.querySelectorAll(".keys button")
let finalValue = document.querySelector(".finalValue")

//functions
function add(num1, num2) {
    return num1 + num2;
}
function subtract(num1, num2) {
    return num1 - num2
}
function multiply(num1, num2) {
    return num1 * num2
}
function division(num1, num2) {
    return num1 / num2
}
function percent(num1, num2) {
    return (num1 / num2) * 100
}

function calci(number1, expression, number2) {
    switch (expression) {
        case "/":
            return division(number1, number2);
        case "-":
            return subtract(number1, number2);
        case "+":
            return add(number1, number2);
        case "×":
            return multiply(number1, number2);
        case "%":
            return percent(number1, number2);
    }

}


Array.from(buttons).forEach((button, index, array) => {
    button.addEventListener("click", (event) => {
        const value = event.target.innerText;

        if (value === "c") {
            num1 = '';
            num2 = '';
            operator = null;
            expression.innerText = '0';
            finalValue.innerText = ``
            return;
        }

        if (value === "=") {
            if (num1 !== '' && operator !== null && num2 !== '') {
                finalValue.innerText = ``
                let finalVal = calci(+num1, operator, +num2);
                if (finalVal % 1 !== 0) {
                    finalVal = finalVal.toFixed(2);
                } else {
                    finalVal = finalVal;
                }
                expression.innerText = `${(num1)} ${operator} ${num2}`
                finalValue.innerText = `= ${finalVal}`;
                num1 = finalVal.toString();
                operator = null;
                num2 = '';
            }
            return;
        }

        if (value === "↩") {

            if (num2.length > 0) {
                num2 = num2.slice(0, -1);
                expression.innerText = `${num1}${operator}${num2}`;
            }

            else if (operator !== null) {
                operator = null;
                expression.innerText = num1;
            }

            else if (num1.length > 0) {
                num1 = num1.slice(0, -1);
                expression.innerText = num1;
            }

            if (expression.innerText === '') {
                expression.innerText = '0';
                finalValue.innerText = ``
            }

            return;
        }

        //To assign operator value
        if (operators.includes(value)) {
            if (num1 !== '') {
                operator = value;
                expression.innerText = `${num1}${operator}${num2}`;
            }
            else if (num2 !== ``) {
                operator = value;
                expression.innerText = `${num1}${operator}${num2}`;
            }
            return;
        }

        // Handle number buttons
        if (operator === null) {
            if (value === '.' && num1.includes('.')) {
                return;
            }
            num1 += value;
            expression.innerText = num1;
        } else {
            if (value === '.' && num2.includes('.')) {
                return;
            }
            num2 += value;
            expression.innerText = `${num1}${operator}${num2}`;
        }

        //Handle font size
        if (expression.innerText.length > 15) {
            display.style.fontSize = "20px";
        } else if (display.innerText.length < 15) {
            display.style.fontSize = "30px";
        }
    });
});