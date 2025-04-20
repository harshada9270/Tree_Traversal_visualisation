# Tree Traversal Visualization

A web-based application that helps visualize different tree traversal algorithms (inorder, preorder, and postorder) for binary trees. This interactive tool is built using Flask for the backend and provides a visual representation of how different tree traversal algorithms work.

## Features

- Interactive binary tree visualization
- Support for three traversal algorithms:
  - Inorder Traversal (Left -> Root -> Right)
  - Preorder Traversal (Root -> Left -> Right)
  - Postorder Traversal (Left -> Right -> Root)
- RESTful API endpoint for tree traversal operations
- Web interface for easy interaction

## Prerequisites

- Python 3.x
- pip (Python package installer)

## Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd tree-traversal-visualisation
```

2. Create and activate a virtual environment (recommended):
```bash
python -m venv .venv
# On Windows
.venv\Scripts\activate
# On Unix or MacOS
source .venv/bin/activate
```

3. Install the required dependencies:
```bash
pip install -r requirements.txt
```

## Usage

1. Start the Flask application:
```bash
python app.py
```

2. Open your web browser and navigate to:
```
http://localhost:5000
```

3. Use the web interface to:
   - Input tree nodes
   - Select a traversal algorithm
   - Visualize the traversal process

## API Endpoint

The application provides a REST API endpoint for tree traversal:

- **Endpoint**: `/traverse`
- **Method**: POST
- **Request Body**:
```json
{
    "nodes": [1, 2, 3, 4, 5, 6, 7],
    "type": "inorder"
}
```
- **Response**:
```json
{
    "result": [4, 2, 5, 1, 6, 3, 7]
}
```

## Project Structure

```
tree-traversal-visualisation/
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── static/            # Static files (CSS, JS)
├── templates/         # HTML templates
└── README.md         # Project documentation
```

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 