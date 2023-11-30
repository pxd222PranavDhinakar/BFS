// bfs.js


// Animated and Stepped BFS
let queue = [];
let bfsInterval;

function initializeBFS() {
    if (nodes.length === 0) return false;

    // Initialize all nodes to unexplored
    nodes.forEach(node => node.color = "white");

    // Pick a random start node
    let startIndex = Math.floor(Math.random() * nodes.length);
    let startNode = nodes[startIndex];
    startNode.color = "gray"; // Mark as currently exploring

    // Reset and initialize the queue with the start node
    queue = [startNode];
    return true;
}

/*
// ITERATION #1: Basic BFS Step
function bfsStep() {
    if (queue.length > 0) {
        let currentNode = queue.shift(); // Dequeue a node

        currentNode.adjacencyList.forEach(neighbor => {
            if (neighbor.color === "white") {
                neighbor.color = "gray";
                queue.push(neighbor);
            }
        });

        currentNode.color = "black";
        redrawGraph();
    } else {
        clearInterval(bfsInterval);
    }
}
*/

/*
// ITERATION #2: Highlighting Nodes
function bfsStep() {
    if (queue.length > 0) {
        let currentNode = queue.shift(); // Dequeue a node

        // Highlight current node
        currentNode.highlight(); // Implement this method in the Node class

        currentNode.adjacencyList.forEach(neighbor => {
            if (neighbor.color === "white") {
                neighbor.color = "lightgray"; // Color for nodes added to the queue
                queue.push(neighbor);
            }
        });

        setTimeout(() => {
            currentNode.color = "black"; // Final color for explored nodes
            redrawGraph();
        }, 250); // Delay for color transition effect
    } else {
        clearInterval(bfsInterval);
    }
}
*/


// ITERATION #3: Highlighting Edges
function bfsStep() {
    if (queue.length > 0) {
        let currentNode = queue.shift(); // Dequeue a node
        currentNode.highlight(); // Highlight the current node

        currentNode.adjacencyList.forEach(neighbor => {
            if (neighbor.color === "white") {
                neighbor.color = "gray"; // Color for nodes added to the queue

                // Find and color the edge
                colorEdge(currentNode, neighbor, 'red'); // Use a function to color the edge

                queue.push(neighbor);
            }
        });

        currentNode.color = "black"; // Final color for explored nodes
        redrawGraph();
    } else {
        clearInterval(bfsInterval);
    }
}


function colorEdge(node1, node2, color) {
    for (let edge of edges) {
        if ((edge.from === node1.value && edge.to === node2.value) ||
            (edge.to === node1.value && edge.from === node2.value)) { // For undirected graph
            edge.setColor(color);
            break;
        }
    }
}


function runFullBFS() {
    if (!initializeBFS()) return;

    bfsInterval = setInterval(bfsStep, 500); // Adjust delay as needed
}

function stepBFS() {
    if (queue.length === 0 && !initializeBFS()) return;

    bfsStep();
}


function highlightPseudoCodeLine(lineNumber) {
    const pseudoCodeElement = document.getElementById('pseudo-code');
    const lines = pseudoCodeElement.getElementsByTagName('div');

    // Reset the background color of all lines
    for (let line of lines) {
        line.style.backgroundColor = 'transparent';
    }

    // Highlight the specific line
    if (lineNumber >= 0 && lineNumber < lines.length) {
        lines[lineNumber].style.backgroundColor = 'yellow';
    }
}



document.addEventListener('DOMContentLoaded', (event) => {
    initializePseudoCodeDisplay();
    document.getElementById('runBfs').addEventListener('click', runFullBFS);
    document.getElementById('stepBfs').addEventListener('click', stepBFS);
});



