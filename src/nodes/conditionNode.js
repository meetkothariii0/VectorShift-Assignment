/**
 * Condition Node
 * 
 * Ternary/if-else branching logic.
 * Evaluates a condition and returns either true_val or false_val.
 * 
 * Inputs: 
 *   - condition (boolean to test)
 *   - true_val (value if condition is true)
 *   - false_val (value if condition is false)
 * Outputs: result (selected value)
 */

import React from 'react';
import { BaseNode } from '../components/BaseNode';
import { getNodeConfig, renderConditionNodeContent } from '../config/nodeConfigs';
import { useStore } from '../store';

export const ConditionNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleDataChange = (fieldName, fieldValue) => {
    updateNodeField(id, fieldName, fieldValue);
  };

  const config = getNodeConfig('condition');

  return (
    <BaseNode
      id={id}
      data={data}
      nodeConfig={{ ...config, content: renderConditionNodeContent }}
      onDataChange={handleDataChange}
    />
  );
};

export default ConditionNode;
