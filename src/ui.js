/**
 * PipelineUI Component
 * 
 * Main React Flow canvas for the pipeline builder.
 * Handles drag-and-drop, node management, and visualization.
 */

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { useTheme } from './context/ThemeContext';
import { shallow } from 'zustand/shallow';

// Import all node types
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { APINode } from './nodes/apiNode';
import { FilterNode } from './nodes/filterNode';
import { MathNode } from './nodes/mathNode';
import { DelayNode } from './nodes/delayNode';
import { ConditionNode } from './nodes/conditionNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

// Register all node types
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  api: APINode,
  filter: FilterNode,
  math: MathNode,
  delay: DelayNode,
  condition: ConditionNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const { isDark } = useTheme();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  // Update edge colors based on theme
  const themeAwareEdges = edges.map(edge => ({
    ...edge,
    style: {
      ...edge.style,
      stroke: isDark ? '#FFFFFF' : '#000000',
    },
    markerEnd: {
      ...edge.markerEnd,
      color: isDark ? '#FFFFFF' : '#000000',
    },
  }));

  const getInitNodeData = (nodeID, type) => {
    return { id: nodeID, nodeType: type };
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(
          event.dataTransfer.getData('application/reactflow')
        );
        const type = appData?.nodeType;

        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const backgroundColor = isDark ? '#0f172a' : '#f8fafc';
  const gridColor = isDark ? '#1e293b' : '#e1e1e1';
  const gridMainBg = isDark ? '#0f172a' : '#f3f3f3';
  const borderColor = isDark ? 'hsl(240, 9%, 17%)' : 'hsl(0, 0%, 85%)';

  const canvasStyle = {
    height: '70vh',
    backgroundColor: gridMainBg,
    backgroundImage: `
      linear-gradient(0deg, transparent 24%, ${gridColor} 25%, ${gridColor} 26%, transparent 27%, transparent 74%, ${gridColor} 75%, ${gridColor} 76%, transparent 77%, transparent),
      linear-gradient(90deg, transparent 24%, ${gridColor} 25%, ${gridColor} 26%, transparent 27%, transparent 74%, ${gridColor} 75%, ${gridColor} 76%, transparent 77%, transparent)
    `,
    backgroundSize: '55px 55px',
    borderColor,
  };

  return (
    <div
      ref={reactFlowWrapper}
      className="w-full border-t transition-colors duration-200"
      style={canvasStyle}
    >
      <ReactFlow
        nodes={nodes}
        edges={themeAwareEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
      >
        <Background
          color="transparent"
          gap={gridSize}
          style={{ backgroundColor: 'transparent' }}
        />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
