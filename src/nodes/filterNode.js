/**
 * Filter Node
 * 
 * Conditional branching based on a filter condition.
 * Routes data to "pass" or "fail" outputs based on condition evaluation.
 * 
 * Inputs: data (to filter)
 * Outputs: pass (if condition is true), fail (if condition is false)
 */

import React from 'react';
import { BaseNode } from '../components/BaseNode';
import { getNodeConfig, renderFilterNodeContent } from '../config/nodeConfigs';
import { useStore } from '../store';

export const FilterNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleDataChange = (fieldName, fieldValue) => {
    updateNodeField(id, fieldName, fieldValue);
  };

  const config = getNodeConfig('filter');

  return (
    <BaseNode
      id={id}
      data={data}
      nodeConfig={{ ...config, content: renderFilterNodeContent }}
      onDataChange={handleDataChange}
    />
  );
};

export default FilterNode;
