const fs = require('fs');

let answer = 0;

const input = fs.readFileSync('./Input.txt', 'utf-8');
const lines = input.split('\r\n');
const rows = lines.map(line => line.trim().split(/\s+/));
const operatorsRow = rows.pop(); // last row contains operators


for (let col = 0; col < operatorsRow.length; col++) {
    const operator = operatorsRow[col];

    // collect numbers for this column
    const numbers = [];
    for (const row of rows) {
        if (row[col] !== undefined) {
            numbers.push(Number(row[col]));
        }
    }

    // calculate result for this column
    const result = numbers.reduce((acc, num, i) => {
        if (i === 0) return num; // first number
        return operator === '*' ? acc * num : acc + num;
    });

    answer += result;
}

console.log(answer);