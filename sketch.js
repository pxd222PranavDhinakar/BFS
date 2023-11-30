// test Sketch for BFS

class Node {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.color = "white"; // White color by default, indicating unexplored
        this.adjacencyList = [];
        this.parent = null; // Optional, for BFS tree
        this.distance = 0;  // Optional, for distance from start node
        this.isHighlighted = false; // New property for highlight state
    }

    draw() {
        // Change fill color and size if highlighted
        if (this.isHighlighted) {
            fill('red'); // Highlight color
            ellipse(this.x, this.y, 30, 30); // Slightly larger size for highlight
        } else {
            fill(this.color);
            ellipse(this.x, this.y, 20, 20);
        }

        stroke(0); // Black border
        strokeWeight(1);
    }

    addEdge(node) {
        this.adjacencyList.push(node);
    }

    setColor(status) {
        const colorMap = {
            unexplored: "white",
            exploring: "gray",
            explored: "black"
        };
        this.color = colorMap[status];
    }

    highlight() {
        this.isHighlighted = true;
        setTimeout(() => this.isHighlighted = false, 500); // Remove highlight after 500ms
    }
}


// Define Edge class
class Edge {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.color = 'black'; // Default color
    }

    // Method to draw the edge
    draw() {
        let fromNode = nodes[this.from];
        let toNode = nodes[this.to];
        stroke(this.color);
        line(fromNode.x, fromNode.y, toNode.x, toNode.y);
    }

    // Method to set the color of the edge
    setColor(color) {
        this.color = color;
    }
}



// Array to store nodes and edges
let nodes = [];
let edges = [];

function setup() {
    createCanvas(800, 600);

    // Set default values for nodes and edges
    document.getElementById('numNodes').value = 100;
    document.getElementById('numEdges').value = 99;


    generateGraph(); // Example: Generate graph with 10 nodes and 15 edges
}

function draw() {
    background(58, 58, 60); // Set the background to graphite gray
    for (let edge of edges) {
        edge.draw();
    }
    for (let node of nodes) {
        node.draw();
    }

    drawLegend(); // Draw the legend on the canvas
}


function drawLegend() {
    let startX = 0; // Starting X position of the legend
    let startY = 0; // Starting Y position of the legend
    let gap = 20; // Gap between lines

    // Adjust the size of the legend box to fit new items
    fill(255); // White background for the legend
    stroke(0); // Black border for the legend box
    rect(startX, startY, 180, 130); // Adjust size as needed

    // Legend for Unexplored Node
    fill("white");
    ellipse(startX + 15, startY + 20, 10, 10); // Node color 'white'
    fill(0);
    text("Unexplored", startX + 30, startY + 25);

    // Legend for Exploring Node
    fill("gray");
    ellipse(startX + 15, startY + 40, 10, 10); // Node color 'gray'
    fill(0);
    text("Exploring", startX + 30, startY + 45);

    // Legend for Explored Node
    fill("black");
    ellipse(startX + 15, startY + 60, 10, 10); // Node color 'black'
    fill(0);
    text("Explored", startX + 30, startY + 65);

    // Legend for Highlighted Node
    fill("red");
    ellipse(startX + 15, startY + 80, 10, 10); // Node color for highlighting
    fill(0);
    text("Highlighted Node", startX + 30, startY + 85);

    // Legend for Highlighted Edge
    stroke('red');
    line(startX + 10, startY + 105, startX + 20, startY + 105); // Edge color for highlighting
    fill(0);
    noStroke();
    text("Highlighted Edge", startX + 30, startY + 110);
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

    // Generate graph structure
    generateGraphStructure(numNodes, numEdges);

    // Apply force-directed layout
    applyForceDirectedLayout(150);
}

function generateGraphStructure(numNodes, numEdges) {
    // Initialize nodes randomly
    //for (let i = 0; i < numNodes; i++) {
    //    nodes.push(new Node(random(width), random(height), i));
    //}

    // Initialize nodes in a grid or circular pattern
    let angleStep = TWO_PI / numNodes;
    for (let i = 0; i < numNodes; i++) {
        let x = width / 2 + cos(angleStep * i) * 200; // Adjust for circular placement
        let y = height / 2 + sin(angleStep * i) * 200;
        nodes.push(new Node(x, y, i));
    }

    // Generate random edges
    for (let i = 0; i < numEdges; i++) {
        let from, to;
        do {
            from = floor(random(numNodes));
            to = floor(random(numNodes));
        } while (from === to);

        nodes[from].addEdge(nodes[to]);
        nodes[to].addEdge(nodes[from]); // If it's an undirected graph
        edges.push(new Edge(from, to));
    }
}

function applyForceDirectedLayout(iterations) {
    // Basic implementation of a force-directed layout algorithm
    let repulsionForce = 20;
    let attractionForce = 0.0002;

    for (let iteration = 0; iteration < iterations; iteration++) {
        // Repulsion between all pairs of nodes
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                let dx = nodes[j].x - nodes[i].x;
                let dy = nodes[j].y - nodes[i].y;
                let distance = sqrt(dx * dx + dy * dy);
                if (distance < 50) { // Threshold to avoid excessive repulsion
                    let force = repulsionForce / (distance * distance);
                    nodes[i].x -= dx * force;
                    nodes[i].y -= dy * force;
                    nodes[j].x += dx * force;
                    nodes[j].y += dy * force;
                }
            }
        }

        // Attraction along edges
        for (let edge of edges) {
            let fromNode = nodes[edge.from];
            let toNode = nodes[edge.to];
            let dx = toNode.x - fromNode.x;
            let dy = toNode.y - fromNode.y;
            fromNode.x += dx * attractionForce;
            fromNode.y += dy * attractionForce;
            toNode.x -= dx * attractionForce;
            toNode.y -= dy * attractionForce;
        }
    }
}
