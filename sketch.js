let nodes = [];
let edges = [];

function setup() {
    createCanvas(800, 600).parent('canvasContainer');
    // Initialize graph or leave it for the generateGraph function
}

function draw() {
    background(58, 58, 60); // Set the background to graphite gray
    drawGraph();
}

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
