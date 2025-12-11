const fs = require('fs');
const input = fs.readFileSync('./Input.txt', 'utf-8');
const lines = input.trim().split('\r\n');
const tiles = lines.map(line => line.split(',').map(Number));

let maxArea = 0;

for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles.length; j++) {
        if (i === j) continue;

        const width = Math.abs(tiles[i][0] - tiles[j][0]) + 1;
        const height = Math.abs(tiles[i][1] - tiles[j][1]) + 1;
        const area = width * height;

        if (area > maxArea) {
            maxArea = area;
        }
    }
}

console.log(maxArea);
