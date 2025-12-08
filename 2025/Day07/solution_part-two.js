const fs = require('fs');

let splitCount = 0;
const input = fs.readFileSync('./Input.txt', 'utf-8');
const grid = input.split('\r\n');

// find starting position
const startRow = 0;
let startCol = grid[0].indexOf('S');

// bfs with memoization
const memo = new Map();

function countTimelines(row, col) {
    // out of bounds = one complete timeline
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
        return 1;
    }

    const key = `${row},${col}`;
    if (memo.has(key)) {
        return memo.get(key);
    }

    const cell = grid[row][col];
    let count;

    if (cell === '^') {
        // splitter: sum timelines from both directions
        count = countTimelines(row + 1, col - 1) + countTimelines(row + 1, col + 1);
    } else {
        // empty space or 'S': continue downwards
        count = countTimelines(row + 1, col);
    }

    memo.set(key, count);
    return count;
}

splitCount = countTimelines(startRow, startCol);

console.log(splitCount);