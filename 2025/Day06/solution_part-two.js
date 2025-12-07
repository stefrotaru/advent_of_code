const fs = require('fs');

let answer = 0;

const input = fs.readFileSync('./Input.txt', 'utf-8');
const numberRows = input.split('\r\n');
const operatorsRow = numberRows.pop(); // last row contains operators

let currentNumbers = [];
let currentOperator = null;

// Helper function to calculate result
function calculateResult(numbers, operator) {
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (operator === '+') {
            result += numbers[i];
        } else if (operator === '*') {
            result *= numbers[i];
        }
    }
    return result;
}

// Work rtl though columns
for (let col = operatorsRow.length - 1; col >= 0; col--) {
    const operator = operatorsRow[col];

    if (operator === '+' || operator === '*') {
        currentOperator = operator;
    }

    const digits = [];
    for (let row = 0; row < numberRows.length; row++) {
        const char = numberRows[row][col];
        if (char && /\d/.test(char)) {
            digits.push(char);
        }
    }

    // if digits found, form a number (reading top-to-bottom)
    if (digits.length > 0) {
        const number = parseInt(digits.join(''));
        currentNumbers.push(number);
    }

    // check if this column is all spaces (separator or start)
    const isAllSpaces = operator === ' ' && digits.length === 0;

    // if separator or start of line, compute current result
    if ((isAllSpaces || col === 0) && currentOperator && currentNumbers.length > 0) {
        const result = calculateResult(currentNumbers, currentOperator);
        answer += result;

        // reset for next calculation
        currentNumbers = [];
        currentOperator = null;
    }
}

console.log(answer);