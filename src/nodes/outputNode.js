/**
 * Output Node - Refactored
 * 
 * Represents a pipeline output sink.
 * Uses BaseNode abstraction for consistency and maintainability.
 */

import React from 'react';
import { BaseNode } from '../components/BaseNode';
import { getNodeConfig, renderOutputNodeContent } from '../config/nodeConfigs';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleDataChange = (fieldName, fieldValue) => {
    updateNodeField(id, fieldName, fieldValue);
  };

  const config = getNodeConfig('customOutput');

  return (
    <BaseNode
      id={id}
      data={data}
      nodeConfig={{ ...config, content: renderOutputNodeContent }}
      onDataChange={handleDataChange}
    />
  );
};
