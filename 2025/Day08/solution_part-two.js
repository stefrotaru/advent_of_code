const fs = require('fs');
const input = fs.readFileSync('./Input.txt', 'utf-8');
const lines = input.trim().split('\r\n');

class UnionFind {
    constructor(n) {
        // Each box starts as its own parent (its own circuit)
        this.parent = Array.from({length: n}, (_, i) => i);
        // Each circuit starts with size 1
        this.size = Array(n).fill(1);
    }
    
    // Find which circuit a box belongs to
    find(x) {
        if (this.parent[x] !== x) {
            // Path compression: shortcut future lookups
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
    
    // Connect two boxes
    union(x, y) {
        let rootX = this.find(x);
        let rootY = this.find(y);
        
        // Already in same circuit!
        if (rootX === rootY) return false;
        
        // Merge smaller circuit into larger one
        if (this.size[rootX] < this.size[rootY]) {
            [rootX, rootY] = [rootY, rootX];
        }
        this.parent[rootY] = rootX;
        this.size[rootX] += this.size[rootY];
        return true;
    }
    
    // Get all circuit sizes
    getComponentSizes() {
        const sizes = new Map();
        for (let i = 0; i < this.parent.length; i++) {
            const root = this.find(i);
            sizes.set(root, this.size[root]);
        }
        return Array.from(sizes.values()).sort((a, b) => b - a);
    }
}

// Step 1: Parse junction boxes
const boxes = lines.map(line => {
    const [x, y, z] = line.split(',').map(Number);
    return {x, y, z};
});
console.log(`Total boxes: ${boxes.length}`);

// Step 2: Calculate distance
function distance(i, j) {
    const dx = boxes[i].x - boxes[j].x;
    const dy = boxes[i].y - boxes[j].y;
    const dz = boxes[i].z - boxes[j].z;
    return Math.sqrt(dx*dx + dy*dy + dz*dz);
}

// Step 3: Generate all pairs
const pairs = [];
for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
        pairs.push({
            dist: distance(i, j),
            box1: i,
            box2: j
        });
    }
}
console.log(`Total pairs: ${pairs.length}`);

// Step 4: Sort pairs by distance
pairs.sort((a, b) => a.dist - b.dist);

// Step 5: Connect until all in one circuit
const uf = new UnionFind(boxes.length);
const neededConnections = boxes.length - 1; // N-1 for N boxes
let succsessful = 0;
let lastPair = null;

for (const pair of pairs) {
    // Try to connect
    if (uf.union(pair.box1, pair.box2)) {
        succsessful++;
        lastPair = pair; // Track last successful connection

        // Stop when we have one circuit
        if (succsessful === neededConnections) {
            break;
        }
    }
}

console.log(`Made ${succsessful} connections`);
console.log(`Last pair: box ${lastPair.box1} and box ${lastPair.box2}`);
console.log(`Last pair coordinates: (${boxes[lastPair.box1].x}, ...) and (${boxes[lastPair.box2].x}, ...)`);

// Answer: Multiply X coordinates
const answer = boxes[lastPair.box1].x * boxes[lastPair.box2].x;
console.log(`Answer: ${answer}`);