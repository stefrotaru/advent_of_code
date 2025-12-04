const fs = require('fs');

let totalRemoved = 0;

let grid = fs.readFileSync('./Input.txt', 'utf-8').split('\r\n').map(row => row.split(''));

function findAccessibleRolls(grid) {
    let accessibleRolls = [];
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
                    accessibleRolls.push({row, col});
                }
            }
        }
    }
    return accessibleRolls;
}

while (true) {
    const accessible = findAccessibleRolls(grid);
    if (accessible.length === 0) {
        break;
    }

    for (const {row, col} of accessible) {
        grid[row][col] = '.';
        totalRemoved++;
    }
}

console.log(totalRemoved);
