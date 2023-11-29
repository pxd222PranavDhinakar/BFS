// bfs.js
/*
// Function to color a random node
function runBFS() {
    // Check if there are nodes
    if (nodes.length === 0) return; 

    //else {
    //    console.log("Number of nodes:", nodes.length);
    //}

    // Pick a random node
    let randomNodeIndex = Math.floor(Math.random() * nodes.length);

    // Color the random node black
    nodes[randomNodeIndex].color = 'black';

    // Redraw the graph
    redrawGraph(); // This function should be defined in sketch.js
}
*/

// Animated BFS
/*
function runBFS() {
    if (nodes.length === 0) return;

    // Initialize all nodes to unexplored
    nodes.forEach(node => node.color = "white");

    // Pick a random start node
    let startIndex = Math.floor(Math.random() * nodes.length);
    let startNode = nodes[startIndex];
    startNode.color = "gray"; // Mark as currently exploring

    // Initialize the queue with the start node
    let queue = [startNode];

    // Function to process one step of BFS
    function bfsStep() {
        if (queue.length > 0) {
            let currentNode = queue.shift(); // Dequeue a node

            // Process the current node
            currentNode.adjacencyList.forEach(neighbor => {
                if (neighbor.color === "white") { // Check if unexplored
                    neighbor.color = "gray"; // Mark as currently exploring
                    queue.push(neighbor);
                }
            });

            currentNode.color = "black"; // Mark as fully explored

            // Redraw the graph
            redrawGraph();

            // Continue with the next step after a delay
            setTimeout(bfsStep, 500); // Adjust delay as needed
        }
    }

    // Start the BFS animation
    bfsStep();
}
*/


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


function updateChart(currentNode) {
    // Update current node information
    document.getElementById('currentNode').textContent = `Current Node: ${currentNode.value}`;

    // Update adjacency list
    const adjacencyListElement = document.getElementById('adjacencyList');
    adjacencyListElement.innerHTML = ''; // Clear previous list
    currentNode.adjacencyList.forEach(neighbor => {
        let listItem = document.createElement('li');
        listItem.textContent = neighbor.value;
        adjacencyListElement.appendChild(listItem);
    });
}

function bfsStep() {
    if (queue.length > 0) {
        let currentNode = queue.shift(); // Dequeue a node

        // Update chart with current node information
        updateChart(currentNode);

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

function runFullBFS() {
    if (!initializeBFS()) return;

    bfsInterval = setInterval(bfsStep, 500); // Adjust delay as needed
}

function stepBFS() {
    if (queue.length === 0 && !initializeBFS()) return;

    bfsStep();
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('runBfs').addEventListener('click', runFullBFS);
    document.getElementById('stepBfs').addEventListener('click', stepBFS);
});



