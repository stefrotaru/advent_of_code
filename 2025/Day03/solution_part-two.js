const fs = require('fs');

let answer = 0;

const inputArray = fs.readFileSync('./Input.txt', 'utf-8').split('\r\n');

function getMaxKDigit(bank, k) {
    const toRemove = bank.length - k;
    const stack = [];
    let removed = 0;

    for (let i = 0; i < bank.length; i++) {
        while (removed < toRemove && stack.length > 0 && stack[stack.length - 1] < bank[i]) {
            stack.pop();
            removed++;
        }
        stack.push(bank[i]);
    }

    while (removed < toRemove) {
        stack.pop();
        removed++;
    }

    return stack;
}

inputArray.forEach(bank => {
    const k = 12;
    const maxKDigit = getMaxKDigit(bank, k);
    const joltage = parseInt(maxKDigit.join(''));
    answer += joltage;
});

console.log(answer);