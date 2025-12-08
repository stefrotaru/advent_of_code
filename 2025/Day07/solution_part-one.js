const fs = require('fs');

let splitCount = 0;
const input = fs.readFileSync('./Input.txt', 'utf-8');
const grid = input.split('\r\n');

// find starting position
const startRow = 0;
let startCol = grid[0].indexOf('S');

// bfs implementation
const queue = [{row: startRow, col: startCol}];
const visited = new Set();
while (queue.length > 0) {
    // take first entry from queue
    const {row, col} = queue.shift();
    
    // check bounds
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
        continue;
    }

    // check visited
    const key = `${row},${col}`;
    if (visited.has(key)) {
        continue;
    }
    visited.add(key);

    const cell = grid[row][col];
    if (cell === '^') {
        // hit a splitter
        splitCount++;

        // create 2 new beams (left and right)
        queue.push({row: row + 1, col: col - 1}); // left
        queue.push({row: row + 1, col: col + 1}); // right
    } else {
        // empty space or 'S', continue downwards
        queue.push({row: row + 1, col: col});
    }
}

console.log(splitCount);