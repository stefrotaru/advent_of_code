const fs = require('fs');

let answer = 0;

const inputArray = fs.readFileSync('./Input.txt', 'utf-8').split(',')

inputArray.forEach(rangeString => {
    const start = Number(rangeString.split('-')[0]);
    const end = Number(rangeString.split('-')[1]);

    for (var num = start; num <= end; num++) {
        const numStr = num.toString();
        
        if (numStr.length % 2 !== 0) {
            continue;
        }

        var firstHalf = numStr.substr(0, numStr.length / 2);
        var secondHalf = numStr.substr(numStr.length / 2);

        if (firstHalf === secondHalf) {
            answer += num;
        }
    }
});

console.log(answer);
