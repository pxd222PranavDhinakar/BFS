// bfs.js

// Function to run BFS and color a random node
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

// Wait for the document to load before adding the event listener
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('runBfs').addEventListener('click', runBFS);
});