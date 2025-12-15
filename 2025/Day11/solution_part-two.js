const fs = require('fs');
const input = fs.readFileSync('./Input.txt', 'utf-8');
const lines = input.trim().split('\r\n');

// Build graph
const graph = {};
for (const line of lines) {
    const [device, outputs] = line.split(':').map(s => s.trim());
    graph[device] = outputs.split(/\s+/);
}

// Check if graph is a DAG (no cycles)
function hasCycle() {
    const WHITE = 0, GRAY = 1, BLACK = 2;
    const colors = {};
    
    function dfs(node) {
        if (colors[node] === BLACK) return false;
        if (colors[node] === GRAY) return true; // Cycle found!
        
        colors[node] = GRAY;
        if (graph[node]) {
            for (const neighbor of graph[node]) {
                if (dfs(neighbor)) return true;
            }
        }
        colors[node] = BLACK;
        return false;
    }
    
    // Check from svr
    return dfs('svr');
}

console.log('Checking for cycles...');
if (hasCycle()) {
    console.log('Graph has cycles - need visited tracking');
} else {
    console.log('Graph is acyclic (DAG) - can use simple DP!');
    
    // Simple DP without visited tracking
    const memo = new Map();
    
    function countPaths(node, seenDac, seenFft) {
        const key = `${node}|${seenDac}|${seenFft}`;
        if (memo.has(key)) return memo.get(key);
        
        if (node === "dac") seenDac = true;
        if (node === "fft") seenFft = true;
        
        if (node === "out") {
            return (seenDac && seenFft) ? 1 : 0;
        }
        
        if (!graph[node]) return 0;
        
        let total = 0;
        for (const next of graph[node]) {
            total += countPaths(next, seenDac, seenFft);
        }
        
        memo.set(key, total);
        return total;
    }
    
    console.log('Answer:', countPaths('svr', false, false));
}