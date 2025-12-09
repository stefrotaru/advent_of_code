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

// Step 2: Calculate distance between two boxes
function distance(i, j) {
    const dx = boxes[i].x - boxes[j].x;
    const dy = boxes[i].y - boxes[j].y;
    const dz = boxes[i].z - boxes[j].z;
    return Math.sqrt(dx*dx + dy*dy + dz*dz);
}

// Step 3: Generate all pairs with their distances
console.log('Calculating all pairwise distances...');
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

// Step 4: Sort pairs by distance (shortest first)
pairs.sort((a, b) => a.dist - b.dist);

// Step 5: Try to connect the 1000 closest pairs
const uf = new UnionFind(boxes.length);
let attempted = 0;
let successful = 0;

for (const pair of pairs) {
    if (attempted >= 1000) break;
    
    attempted++;
    // Try to connect (might already be connected, that's OK!)
    if (uf.union(pair.box1, pair.box2)) {
        successful++;
    }
}

console.log(`Attempted ${attempted} connections, ${successful} were successful`);

// Step 6: Get circuit sizes
const sizes = uf.getComponentSizes();
console.log(`Number of circuits: ${sizes.length}`);
console.log(`Three largest circuits: ${sizes[0]}, ${sizes[1]}, ${sizes[2]}`);

// Step 7: Multiply the three largest
const answer = sizes[0] * sizes[1] * sizes[2];
console.log(`Answer: ${answer}`);