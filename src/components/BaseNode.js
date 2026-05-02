/**
 * BaseNode - Reusable Node Abstraction Component
 * 
 * This is the core building block for all node types in the pipeline.
 * It handles layout, handle positioning, and styling through a configuration-driven approach.
 * 
 * Key features:
 * - Flexible handle configuration (input/output ports)
 * - Dynamic content rendering (JSX or custom render functions)
 * - Consistent styling with modern SaaS aesthetic
 * - Extensible for custom node types
 */

import React, { useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { useTheme } from '../context/ThemeContext';
import '../styles/card.css';

/**
 * Calculate Y position for handles based on index and total count
 * This ensures even distribution of handles along the left/right edges
 */
const calculateHandlePosition = (index, totalCount, nodeHeight) => {
  if (totalCount === 1) return '50%';
  const startY = 40;
  const endY = nodeHeight - 40;
  const spacing = (endY - startY) / (totalCount - 1);
  return `${startY + index * spacing}px`;
};

export const BaseNode = ({ 
  id, 
  data, 
  nodeConfig = {},
  onDataChange = null 
}) => {
  const { isDark } = useTheme();
  // === Config Structure ===
  // {
  //   title: string,
  //   description?: string,
  //   inputs: [{ id, label, type? }],
  //   outputs: [{ id, label, type? }],
  //   content: JSX | function(data, onDataChange),
  //   width?: number (default: 280),
  //   height?: number (default: 200),
  //   color?: string (default: 'slate'),
  //   icon?: JSX,
  // }

  const {
    title = 'Node',
    description = '',
    inputs = [],
    outputs = [],
    content = null,
    width = 280,
    height = 240,
    icon = null,
    autoHeight = false,
  } = nodeConfig;

  // Render input handles (left side)
  const inputHandles = useMemo(() => {
    return inputs.map((input, idx) => {
      // Use custom label from data if available, otherwise use config label
      const customLabel = data?.customInputLabels?.[input.id] || input.label;
      return (
      <React.Fragment key={`input-${input.id}`}>
        <Handle
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{
            top: calculateHandlePosition(idx, inputs.length, height),
            background: '#6366f1',
            width: '10px',
            height: '10px',
          }}
          title={customLabel}
        />
      </React.Fragment>
    );
    });
  }, [inputs, id, height, data]);

  // Render output handles (right side)
  const outputHandles = useMemo(() => {
    return outputs.map((output, idx) => {
      // Use custom label from data if available, otherwise use config label
      const customLabel = data?.customOutputLabels?.[output.id] || output.label;
      return (
      <React.Fragment key={`output-${output.id}`}>
        <Handle
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{
            top: calculateHandlePosition(idx, outputs.length, height),
            background: '#10b981',
            width: '10px',
            height: '10px',
          }}
          title={customLabel}
        />
      </React.Fragment>
    );
    });
  }, [outputs, id, height, data]);

  // Render content section (body of the node)
  const renderContent = () => {
    if (typeof content === 'function') {
      return content(data, onDataChange, isDark);
    }
    return content || <div className="text-sm text-gray-500">No content</div>;
  };

  return (
    <div
      className="node-card"
      style={{
        width: `${width}px`,
        ...(autoHeight ? { minHeight: `${height}px` } : { height: `${height}px` }),
      }}
    >
      <div className="node-card-content">
        {/* ===== Header Section ===== */}
        <div className="node-card-header">
          {icon && <div className="node-card-header-icon">{icon}</div>}
          <div className="node-card-header-text">
            <h3>{title}</h3>
            {description && <p>{description}</p>}
          </div>
        </div>

        {/* ===== Content Section ===== */}
        <div
          className="node-card-body"
          style={{
            ...(autoHeight ? { minHeight: `${height - 50}px` } : { height: `${height - 50}px` }),
            overflowY: 'auto',
          }}
        >
          {renderContent()}
        </div>
      </div>

      {/* ===== Handles ===== */}
      {inputHandles}
      {outputHandles}
    </div>
  );
};

export default BaseNode;
