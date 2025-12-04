const fs = require('fs');

let answer = 0;

const grid = fs.readFileSync('./Input.txt', 'utf-8').split('\r\n');

for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
        //check if current cell is a paper roll
        if (grid[row][col] === '@') {
            //count adjacent rolls
            let adjacentRolls = 0;

            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) continue; //skip self
                    const neighborRow = row + dr;
                    const neighborCol = col + dc;

                    //check bounds
                    if (neighborRow >= 0 && neighborRow < grid.length &&
                        neighborCol >= 0 && neighborCol < grid[row].length) {
                        if (grid[neighborRow][neighborCol] === '@') {
                            adjacentRolls++;
                        }
                    }
                }
            }

            if (adjacentRolls < 4) {
                answer++;
            }
        }
    }
}

console.log(answer);