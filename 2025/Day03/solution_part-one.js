const fs = require('fs');

let answer = 0;

const inputArray = fs.readFileSync('./Input.txt', 'utf-8').split('\r\n');

inputArray.forEach(bank => {
    let maxJoltage = 0;

    for (var i = 0; i < bank.length; i++) {
        for (var j = i + 1; j < bank.length; j++) {
            const joltage = parseInt(bank[i] + bank[j]);
            if (joltage > maxJoltage) {
                maxJoltage = joltage;
            }
        }
    }

    answer += maxJoltage;
});

console.log(answer);