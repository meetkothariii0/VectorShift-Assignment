/**
 * Math Node
 * 
 * Performs mathematical operations on two inputs.
 * Supports: add, subtract, multiply, divide, modulo, power
 * 
 * Inputs: a (Value A), b (Value B)
 * Outputs: result (operation result)
 */

import React from 'react';
import { BaseNode } from '../components/BaseNode';
import { getNodeConfig, renderMathNodeContent } from '../config/nodeConfigs';
import { useStore } from '../store';

export const MathNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleDataChange = (fieldName, fieldValue) => {
    updateNodeField(id, fieldName, fieldValue);
  };

  const config = getNodeConfig('math');

  return (
    <BaseNode
      id={id}
      data={data}
      nodeConfig={{ ...config, content: renderMathNodeContent }}
      onDataChange={handleDataChange}
    />
  );
};

export default MathNode;
