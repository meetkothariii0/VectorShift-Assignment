/**
 * Backend API Service
 * 
 * Handles all HTTP communication with the FastAPI backend.
 * Provides functions for validation, graph analysis, and pipeline execution.
 */

import axios from 'axios';

// Configure base URL - update based on your backend deployment
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add error interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);

/**
 * Validate and analyze the pipeline graph
 * 
 * Sends nodes and edges to backend for:
 * - DAG (Directed Acyclic Graph) validation
 * - Cycle detection
 * - Node/edge counting
 * 
 * @param {Array} nodes - React Flow nodes
 * @param {Array} edges - React Flow edges
 * @returns {Promise<Object>} Analysis result
 */
export const validatePipeline = async (nodes, edges) => {
  try {
    const response = await apiClient.post('/api/pipeline/validate', {
      nodes: nodes.map((n) => ({
        id: n.id,
        type: n.type,
        data: n.data,
        position: n.position,
      })),
      edges: edges.map((e) => ({
        source: e.source,
        target: e.target,
        id: e.id,
        animated: e.animated,
      })),
    });

    return response.data;
  } catch (error) {
    console.error('Pipeline validation failed:', error);
    throw new Error(
      error.response?.data?.detail || 'Failed to validate pipeline'
    );
  }
};

/**
 * Parse and analyze the pipeline structure
 * 
 * @param {Array} nodes - React Flow nodes
 * @param {Array} edges - React Flow edges
 * @returns {Promise<Object>} Parse result
 */
export const parsePipeline = async (nodes, edges) => {
  try {
    const response = await apiClient.post('/api/pipeline/parse', {
      nodes,
      edges,
    });

    return response.data;
  } catch (error) {
    console.error('Pipeline parsing failed:', error);
    throw error;
  }
};

/**
 * Health check endpoint
 * 
 * @returns {Promise<Object>} Health status
 */
export const healthCheck = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

// Export default client for custom requests
export default apiClient;
