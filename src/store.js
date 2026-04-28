/**
 * Global State Store
 * 
 * Zustand store for managing pipeline state (nodes, edges).
 * Provides actions for creating, updating, and managing graph structure.
 * 
 * State:
 * - nodes: Array of node objects
 * - edges: Array of connection objects
 * - nodeIDs: Counter to generate unique node IDs
 * 
 * Actions:
 * - getNodeID(type): Generate unique ID for new node
 * - addNode(node): Add node to pipeline
 * - onNodesChange(changes): Handle node modifications (drag, delete, etc)
 * - onEdgesChange(changes): Handle edge modifications
 * - onConnect(connection): Handle new edge creation
 * - updateNodeField(nodeId, fieldName, fieldValue): Update node data
 */

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {}, // Counter for each node type

  /**
   * Get current theme from document attribute
   */
  getTheme: () => {
    const theme = document.documentElement.getAttribute('data-theme');
    return theme === 'dark';
  },

  /**
   * Generate a unique ID for a new node
   * Format: "{type}-{incrementingNumber}"
   * Example: "text-1", "text-2", "api-1"
   */
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  /**
   * Add a new node to the pipeline
   */
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  /**
   * Handle node changes from React Flow
   * Examples: drag, delete, select, etc.
   */
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  /**
   * Handle edge changes from React Flow
   * Examples: delete, select, etc.
   */
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  /**
   * Handle new edge creation
   * Automatically applies styling: smoothstep, animated, arrow marker
   */
  onConnect: (connection) => {
    const isDark = get().getTheme();
    const edgeColor = isDark ? '#FFFFFF' : '#000000';
    
    set({
      edges: addEdge(
        {
          ...connection,
          type: 'smoothstep',
          animated: true,
          style: {
            stroke: edgeColor,
            strokeWidth: 2,
            strokeDasharray: '5,5',
          },
          markerEnd: {
            type: MarkerType.Arrow,
            color: edgeColor,
            height: '20px',
            width: '20px',
          },
        },
        get().edges
      ),
    });
  },

  /**
   * Update a specific field in a node's data
   * Used by node components to persist changes
   * 
   * @param nodeId - ID of the node to update
   * @param fieldName - Name of the field to update
   * @param fieldValue - New value for the field
   */
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, [fieldName]: fieldValue },
          };
        }
        return node;
      }),
    });
  },
}));
