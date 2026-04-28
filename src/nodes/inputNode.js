/**
 * Input Node - Refactored
 * 
 * Represents a pipeline input source.
 * Uses BaseNode abstraction for consistency and maintainability.
 */

import React from 'react';
import { BaseNode } from '../components/BaseNode';
import { getNodeConfig, renderInputNodeContent } from '../config/nodeConfigs';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleDataChange = (fieldName, fieldValue) => {
    updateNodeField(id, fieldName, fieldValue);
  };

  const config = getNodeConfig('customInput');

  return (
    <BaseNode
      id={id}
      data={data}
      nodeConfig={{ ...config, content: renderInputNodeContent }}
      onDataChange={handleDataChange}
    />
  );
};
