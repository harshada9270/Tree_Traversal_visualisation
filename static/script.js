class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function buildTree(nodes) {
    if (!nodes || nodes.length === 0) return null;
    
    const root = new TreeNode(nodes[0]);
    const queue = [root];
    let i = 1;
    
    while (queue.length > 0 && i < nodes.length) {
        const current = queue.shift();
        
        if (nodes[i] !== null) {
            current.left = new TreeNode(nodes[i]);
            queue.push(current.left);
        }
        i++;
        
        if (i < nodes.length && nodes[i] !== null) {
            current.right = new TreeNode(nodes[i]);
            queue.push(current.right);
        }
        i++;
    }
    
    return root;
}

function drawTree(root) {
    const canvas = document.getElementById('treeCanvas');
    canvas.innerHTML = '';
    
    if (!root) return;
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "300");
    canvas.appendChild(svg);
    
    const drawNode = (node, x, y, level) => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", 20);
        circle.setAttribute("fill", "#1a73e8");
        circle.setAttribute("stroke", "white");
        circle.setAttribute("stroke-width", "2");
        svg.appendChild(circle);
        
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", x);
        text.setAttribute("y", y + 5);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", "white");
        text.textContent = node.value;
        svg.appendChild(text);
        
        const spacing = 200 / Math.pow(2, level);
        
        if (node.left) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x);
            line.setAttribute("y1", y + 20);
            line.setAttribute("x2", x - spacing);
            line.setAttribute("y2", y + 60);
            line.setAttribute("stroke", "#1a73e8");
            line.setAttribute("stroke-width", "2");
            svg.appendChild(line);
            drawNode(node.left, x - spacing, y + 80, level + 1);
        }
        
        if (node.right) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x);
            line.setAttribute("y1", y + 20);
            line.setAttribute("x2", x + spacing);
            line.setAttribute("y2", y + 60);
            line.setAttribute("stroke", "#1a73e8");
            line.setAttribute("stroke-width", "2");
            svg.appendChild(line);
            drawNode(node.right, x + spacing, y + 80, level + 1);
        }
    };
    
    drawNode(root, 400, 40, 1);
}

async function traverse(type) {
    const input = document.getElementById('treeInput').value;
    const nodes = input.split(',').map(node => {
        const trimmed = node.trim();
        return trimmed === 'null' ? null : parseInt(trimmed);
    });
    
    try {
        const response = await fetch('http://localhost:5000/traverse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nodes: nodes,
                type: type
            })
        });
        
        const data = await response.json();
        document.getElementById('traversalResult').textContent = data.result.join(' → ');
        
        // Draw the tree
        const root = buildTree(nodes);
        drawTree(root);
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('traversalResult').textContent = 'Error occurred while traversing the tree';
    }
} 