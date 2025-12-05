const fs = require('fs');

let freshRangeIdsCount = 0;

const input = fs.readFileSync('./Input.txt', 'utf-8');
const sections = input.split('\r\n\r\n');

const rangesSection = sections[0];

const rangesLines = rangesSection.split('\r\n');
let ranges = rangesLines.map(line => {
    const [min, max] = line.split('-').map(Number);
    return {min, max};
});

//sort ranges by start
ranges.sort((a, b) => a.min - b.min);

//merge overlapping ranges
let mergedRanges = [];
let currentRange = ranges[0];

for (let i = 1; i < ranges.length; i++) {
    if (ranges[i].min <= currentRange.max + 1) { //overlap or adjacent
        currentRange.max = Math.max(currentRange.max, ranges[i].max); //extend current range
    } else {
        mergedRanges.push(currentRange); //no overlap, push current range
        currentRange = ranges[i]; //start new range
    }
}

mergedRanges.push(currentRange); //push last range

//count total IDs in merged ranges
for (const range of mergedRanges) {
    freshRangeIdsCount += (range.max - range.min + 1);
}
       
console.log(freshRangeIdsCount);
