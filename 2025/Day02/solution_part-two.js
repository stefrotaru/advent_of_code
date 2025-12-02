const fs = require('fs');

let answer = 0;

const inputArray = fs.readFileSync('./Input.txt', 'utf-8').split(',')

function isInvalid(numStr) {
    for (let patternLen = 1; patternLen <= numStr.length / 2; patternLen++) {
        if (numStr.length % patternLen !== 0) {
            continue;
        }
        
        const pattern = numStr.substring(0, patternLen);
        const repeatCount = numStr.length / patternLen;
        const repeated = pattern.repeat(repeatCount);
        
        if (repeated === numStr) {
            return true;
        }
    }
    
    return false;
}

inputArray.forEach(rangeString => {
    const start = Number(rangeString.split('-')[0]);
    const end = Number(rangeString.split('-')[1]);

    for (var num = start; num <= end; num++) {
        const numStr = num.toString();
        
        if (isInvalid(numStr)) {
            answer += num;
        }
    }
});

console.log(answer);
