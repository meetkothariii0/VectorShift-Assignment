# VectorShift Assignment

A visual pipeline builder for creating and validating data processing workflows.

## 🚀 Live Demo

Check out the live application: **[https://vector-shift-assignment-ioja.vercel.app/](https://vector-shift-assignment-ioja.vercel.app/)**

## ✨ Features

- **Visual Pipeline Builder**: Drag and drop nodes to create data processing pipelines
- **Dark/Light Mode**: Toggle between dark and light themes for comfortable viewing
- **Node Types**: Input, Output, Text, and LLM nodes for building complex workflows
- **Validation**: Real-time validation of pipeline structure and connectivity
- **Cycle Detection**: Automatic detection of invalid circular pipelines
- **Topological Sorting**: Ensures proper execution order of nodes

## 🛠️ Tech Stack

### Frontend
- React with Create React App
- React Flow for pipeline visualization
- Zustand for state management
- Tailwind CSS for styling
- Axios for API communication

### Backend
- FastAPI with Uvicorn
- Pydantic for data validation
- NetworkX for graph algorithms

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)

### Frontend Setup

```bash
cd frontend-20260428T104427Z-3-001/frontend
npm install
npm start
```

The app will run on [http://localhost:3000](http://localhost:3000)

### Backend Setup

```bash
cd backend-20260428T104309Z-3-001/backend
pip install fastapi uvicorn pydantic networkx
python -m uvicorn main:app --reload
```

The backend API will run on [http://localhost:8000](http://localhost:8000)

## 🎨 UI Components

- **Toolbar**: Draggable node palette with glassmorphic design
- **Canvas**: React Flow canvas for pipeline visualization
- **Modal**: Success/error dialogs with humanized messages
- **Theme Toggle**: Switch between dark and light modes

## 🔗 API Endpoints

### POST `/api/pipeline/validate`
Validates a pipeline configuration.

**Request Body:**
```json
{
  "nodes": [...],
  "edges": [...]
}
```

**Response:**
```json
{
  "valid": true,
  "sorted_nodes": [...],
  "message": "Pipeline is valid"
}
```

## 🚢 Deployment

The app is deployed on **Vercel** with automatic deployments on push to main branch.

**Deploy Settings:**
- Build Command: `npm run build`
- Output Directory: `build`
- SPA Fallback: Routes to `/index.html`

## 📝 License

This project is part of the VectorShift Assignment.
