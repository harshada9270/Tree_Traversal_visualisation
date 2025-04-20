from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def build_tree(nodes):
    if not nodes:
        return None
    
    root = Node(nodes[0])
    queue = [root]
    i = 1
    
    while queue and i < len(nodes):
        current = queue.pop(0)
        
        if nodes[i] is not None:
            current.left = Node(nodes[i])
            queue.append(current.left)
        i += 1
        
        if i < len(nodes) and nodes[i] is not None:
            current.right = Node(nodes[i])
            queue.append(current.right)
        i += 1
    
    
    return root

def inorder_traversal(root, result):
    if root:
        inorder_traversal(root.left, result)
        result.append(root.value)
        inorder_traversal(root.right, result)

def preorder_traversal(root, result):
    if root:
        result.append(root.value)
        preorder_traversal(root.left, result)
        preorder_traversal(root.right, result)

def postorder_traversal(root, result):
    if root:
        postorder_traversal(root.left, result)
        postorder_traversal(root.right, result)
        result.append(root.value)

@app.route('/traverse', methods=['POST'])
def traverse():
    data = request.json
    nodes = data.get('nodes', [])
    traversal_type = data.get('type', 'inorder')
    
    root = build_tree(nodes)
    result = []
    
    if traversal_type == 'inorder':
        inorder_traversal(root, result)
    elif traversal_type == 'preorder':
        preorder_traversal(root, result)
    elif traversal_type == 'postorder':
        postorder_traversal(root, result)
    
    return jsonify({'result': result})

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True) 