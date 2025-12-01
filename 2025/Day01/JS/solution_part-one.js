const fs = require('fs');

let position = 50;
let answer = 0;

const listOfMoves = fs.readFileSync('./Input.txt', 'utf-8').split('\r\n')

for (move of listOfMoves) {
    const moveDir = move[0];
    const moveVal = Number(move.substr(1));
    if (moveDir === 'L') {
        position = (position - moveVal + 100) % 100;
    } else {
        position = (position + moveVal) % 100;
    }

    if (position === 0) {
        answer++;
    }
}

console.log(answer);
