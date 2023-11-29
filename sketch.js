// sketch.js

let nodes = [];
let edges = [];

class Node {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.color = "white"; // White color by default, indicating unexplored
        this.adjacencyList = [];
        this.parent = null; // Optional, if you want to keep track of the BFS tree
        this.distance = 0;  // Optional, to store distance from the start node
    }

    draw() {
        fill(this.color);
        stroke(0); // Black border
        strokeWeight(1);
        ellipse(this.x, this.y, 20, 20);
    }

    addEdge(node) {
        this.adjacencyList.push(node);
    }

    // Method to change node color based on its status
    setColor(status) {
        const colorMap = {
            unexplored: "white",
            exploring: "gray",
            explored: "black"
        };
        this.color = colorMap[status];
    }
}




function setup() {
    createCanvas(800, 600).parent('canvasContainer');

    // Set default values for nodes and edges
    document.getElementById('numNodes').value = 10;
    document.getElementById('numEdges').value = 9;

    // Call generateGraph to create the default graph
    generateGraph();


    // Generate a tree-like graph with the specified number of nodes
    //generateTreeGraph();
}

function draw() {
    background(58, 58, 60); // Set the background to graphite gray
    drawGraph();
}
/*
function drawGraph() {
    // Draw edges
    stroke(0); // Set the color of the stroke (black) for edges
    strokeWeight(1); // Set the stroke weight for edges
    for (let edge of edges) {
        let node1 = nodes[edge[0]];
        let node2 = nodes[edge[1]];
        line(node1.x, node1.y, node2.x, node2.y);
    }

    // Draw nodes
    fill(255); // Set the color of the nodes to white
    stroke(0); // Set the color of the stroke (black) for node borders
    strokeWeight(1); // Set the stroke weight for node borders
    for (let node of nodes) {
        ellipse(node.x, node.y, 20, 20); // Draw nodes as circles
    }
}
*/

/*
function generateGraph() {
    // Get values from input fields
    let numNodes = parseInt(document.getElementById('numNodes').value);
    let numEdges = parseInt(document.getElementById('numEdges').value);

    // Validate input
    if (isNaN(numNodes) || isNaN(numEdges) || numNodes <= 0 || numEdges < numNodes - 1 || numEdges > numNodes * (numNodes - 1) / 2) {
        alert("Invalid number of nodes or edges.");
        return;
    }

    // Clear existing graph
    nodes = [];
    edges = [];

    // Create nodes within the bounds of the canvas
    let nodeRadius = 10; // Half of the diameter
    for (let i = 0; i < numNodes; i++) {
        let x = random(nodeRadius, width - nodeRadius); // Adjust x-coordinate
        let y = random(nodeRadius, height - nodeRadius); // Adjust y-coordinate
        nodes.push({x, y});
    }

    // Create a connected graph first to ensure each node has at least one edge
    for (let i = 0; i < numNodes - 1; i++) {
        edges.push([i, i + 1]);
    }

    // Add additional edges randomly if needed
    if (numEdges > numNodes - 1) {
        let additionalEdges = numEdges - (numNodes - 1);
        let possibleEdges = [];

        for (let i = 0; i < numNodes; i++) {
            for (let j = i + 2; j < numNodes; j++) { // Avoid duplicating edges created above
                possibleEdges.push([i, j]);
            }
        }

        shuffle(possibleEdges, true);
        for (let i = 0; i < additionalEdges; i++) {
            if (i < possibleEdges.length) {
                edges.push(possibleEdges[i]);
            }
        }
    }

    // Redraw the graph
    redraw();
}
*/


function drawGraph() {
    // Draw edges
    stroke(0);
    strokeWeight(1);
    for (let [i, j] of edges) {
        line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
    }

    // Draw nodes
    for (let node of nodes) {
        node.draw(); // Use the draw method of the Node class
    }
}


/*
function generateGraph() {
    // Get values from input fields
    let numNodes = parseInt(document.getElementById('numNodes').value);
    let numEdges = parseInt(document.getElementById('numEdges').value);

    // Validate input
    if (isNaN(numNodes) || isNaN(numEdges) || numNodes <= 0 || numEdges < numNodes - 1 || numEdges > numNodes * (numNodes - 1) / 2) {
        alert("Invalid number of nodes or edges.");
        return;
    }

    // Clear existing graph
    nodes = [];
    edges = [];

    // Create nodes within the bounds of the canvas
    let nodeRadius = 10; // Half of the diameter
    for (let i = 0; i < numNodes; i++) {
        let x = random(nodeRadius, width - nodeRadius); // Adjust x-coordinate
        let y = random(nodeRadius, height - nodeRadius); // Adjust y-coordinate
        nodes.push(new Node(x, y, i)); // Using node index as the value
    }

    // Create a connected graph first to ensure each node has at least one edge
    for (let i = 0; i < numNodes - 1; i++) {
        edges.push([i, i + 1]);
        nodes[i].addEdge(nodes[i + 1]);
        nodes[i + 1].addEdge(nodes[i]); // If the graph is undirected
    }

    // Add additional edges randomly if needed
    if (numEdges > numNodes - 1) {
        let additionalEdges = numEdges - (numNodes - 1);
        let possibleEdges = [];

        for (let i = 0; i < numNodes; i++) {
            for (let j = i + 2; j < numNodes; j++) { // Avoid duplicating edges created above
                possibleEdges.push([i, j]);
            }
        }

        shuffle(possibleEdges, true);
        for (let i = 0; i < additionalEdges; i++) {
            if (i < possibleEdges.length) {
                let [from, to] = possibleEdges[i];
                edges.push(possibleEdges[i]);
                nodes[from].addEdge(nodes[to]);
                nodes[to].addEdge(nodes[from]); // If the graph is undirected
            }
        }
    }

    // Redraw the graph
    redraw();
}
*/

function generateGraph() {
    // Get values from input fields
    let numNodes = parseInt(document.getElementById('numNodes').value);
    let numEdges = parseInt(document.getElementById('numEdges').value);

    // Validate input
    if (isNaN(numNodes) || isNaN(numEdges) || numNodes <= 0 || numEdges < 0 || numEdges > numNodes * (numNodes - 1) / 2) {
        alert("Invalid number of nodes or edges.");
        return;
    }

    // Clear existing graph
    nodes = [];
    edges = [];

    // Create nodes within the bounds of the canvas
    let nodeRadius = 10; // Half of the diameter
    for (let i = 0; i < numNodes; i++) {
        let x = random(nodeRadius, width - nodeRadius); // Adjust x-coordinate
        let y = random(nodeRadius, height - nodeRadius); // Adjust y-coordinate
        nodes.push(new Node(x, y, i)); // Using node index as the value
    }

    // Create edges randomly
    for (let i = 0; i < numEdges; i++) {
        let from = Math.floor(random(numNodes));
        let to = Math.floor(random(numNodes));

        // Check if the edge already exists or if it's a self-loop
        while (from === to || hasEdge(from, to)) {
            from = Math.floor(random(numNodes));
            to = Math.floor(random(numNodes));
        }

        edges.push([from, to]);
        nodes[from].addEdge(nodes[to]);
        nodes[to].addEdge(nodes[from]); // If the graph is undirected
    }

    // Redraw the graph
    redraw();
}

// Function to check if an edge already exists
function hasEdge(from, to) {
    for (let edge of edges) {
        if ((edge[0] === from && edge[1] === to) || (edge[0] === to && edge[1] === from)) {
            return true;
        }
    }
    return false;
}


function redrawGraph() {
    redraw(); // This assumes your draw function handles drawing the graph correctly
}




function generateTreeGraph() {
    console.log("SIFLUHBSLIFUSHLEIUHWLIFHW")

    // Get values from input fields
    let numNodes = parseInt(document.getElementById('numNodes').value);


    // Clear existing graph
    nodes = [];
    edges = [];

    // Create nodes within the bounds of the canvas
    let nodeRadius = 10; // Half of the diameter
    for (let i = 0; i < numNodes; i++) {
        let x = random(nodeRadius, width - nodeRadius); // Adjust x-coordinate
        let y = random(nodeRadius, height - nodeRadius); // Adjust y-coordinate
        nodes.push(new Node(x, y, i)); // Create Node instances
    }

    // Create edges to form a tree structure
    for (let i = 1; i < numNodes; i++) {
        let parentIndex = floor((i - 1) / 2);
        edges.push([parentIndex, i]);
    }
    
    // Redraw the graph
    redraw();
}
