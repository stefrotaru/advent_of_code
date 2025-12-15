const fs = require('fs');
const input = fs.readFileSync('./Input.txt', 'utf-8');
const lines = input.trim().split('\r\n');

// graph[device] = [array of devices it connects to]
const graph = {};

for (const line of lines) {
    // split by ':' to separate device name from outputs
    const [device, outputsStr] = line.split(':').map(s => s.trim());

    // split outputs by whitespace
    const outputs = outputsStr.split(/\s+/);

    graph[device] = outputs;
}

// DFS fn to count all paths from current node ("you") to "out"
function countPaths(currentNode, visitedInPath) {
    if (currentNode === 'out') {
        return 1; // found a valid path to "out"
    }

    // if node has no outputs
    if (!graph[currentNode]) {
        return 0;
    }

    let pathCount = 0;

    for (const neighbor of graph[currentNode]) {
        // avoid cycles by checking if neighbor is already in the current path
        if (!visitedInPath.has(neighbor)) {
            visitedInPath.add(neighbor);
            pathCount += countPaths(neighbor, visitedInPath);
            visitedInPath.delete(neighbor); // backtrack
        }
    }

    return pathCount;
}

const initialVisited = new Set(['you']);
const result = countPaths('you', initialVisited);

console.log(result);
