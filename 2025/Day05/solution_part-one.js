const fs = require('fs');

let freshCount = 0;

const input = fs.readFileSync('./Input.txt', 'utf-8');
const sections = input.split('\r\n\r\n');

const rangesSection = sections[0];
const idsSection = sections[1];

const rangesLines = rangesSection.split('\r\n');
const ranges = rangesLines.map(line => {
    const [min, max] = line.split('-').map(Number);
    return {min, max};
});

const idsLines = idsSection.split('\r\n');
const ids = idsLines.map(Number);

for (const id of ids) {
    const isFresh = ranges.some(range => id >= range.min && id <= range.max);
    if (isFresh) {
        freshCount++;
    }
}    

console.log(freshCount);